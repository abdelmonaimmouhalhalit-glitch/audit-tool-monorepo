import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Types d'Assets standardisés pour Toly
type AssetType = 'USER' | 'COMPUTE' | 'DATABASE' | 'REPOSITORY' | 'DEVICE' | 'TICKET' | 'APP';

@Injectable()
export class SyncService {
  constructor(private prisma: PrismaService) {}

  async syncAssets(companyId: string, provider: string, rawAssets: any[]) {
    console.log(`🚀 Syncing ${rawAssets.length} items from ${provider}...`);
    let syncedCount = 0;

    for (const item of rawAssets) {
      let normalized = {
        externalId: '',
        name: '',
        type: 'UNKNOWN' as AssetType
      };

      // LE GRAND SWITCH : La logique de traduction pour les 10 géants
      try {
        switch (provider) {
          // --- 1. IDENTITÉ (Users) ---
          case 'GOOGLE_WORKSPACE':
            // Steampipe table: googleworkspace_user
            normalized = {
              externalId: item.primary_email || item.id, // L'email est l'ID unique souvent
              name: item.name?.fullName || item.name_full_name || item.primary_email,
              type: 'USER'
            };
            break;

          case 'MICROSOFT_365':
             // Steampipe table: azuread_user
            normalized = {
              externalId: item.id, // GUID Azure
              name: item.display_name || item.user_principal_name,
              type: 'USER'
            };
            break;

          // --- 2. INFRASTRUCTURE (Compute/DB) ---
          case 'AWS':
             // Steampipe table: aws_ec2_instance
            normalized = {
              externalId: item.instance_id || item.arn,
              name: item.tags?.Name || item.instance_id,
              type: 'COMPUTE'
            };
            break;

          case 'GCP':
             // Steampipe table: gcp_compute_instance
            normalized = {
              externalId: String(item.id),
              name: item.name,
              type: 'COMPUTE'
            };
            break;

          case 'AZURE':
             // Steampipe table: azure_compute_virtual_machine
            normalized = {
              externalId: item.id,
              name: item.name,
              type: 'COMPUTE'
            };
            break;

          // --- 3. CODE (Repositories) ---
          case 'GITHUB':
             // Steampipe table: github_my_repository
            normalized = {
              externalId: String(item.id), // ID numérique GitHub
              name: item.full_name, // "toly/api-gateway"
              type: 'REPOSITORY'
            };
            break;

          case 'GITLAB':
             // Steampipe table: gitlab_my_project
            normalized = {
              externalId: String(item.id),
              name: item.path_with_namespace,
              type: 'REPOSITORY'
            };
            break;

          // --- 4. DEVICES (Ordinateurs) ---
          case 'FLEET_DM':
             // API Fleet /hosts
            normalized = {
              externalId: String(item.id),
              name: item.hostname,
              type: 'DEVICE'
            };
            break;

          // --- 5. GESTION & APPS ---
          case 'JIRA':
             // API Jira /issue
            normalized = {
              externalId: item.id,
              name: item.key, // "TOLY-123"
              type: 'TICKET'
            };
            break;

          case 'VERCEL':
             // Steampipe table: vercel_project
            normalized = {
              externalId: item.id,
              name: item.name,
              type: 'APP'
            };
            break;

          default:
            console.warn(`⚠️ Provider inconnu: ${provider}`);
            continue;
        }

        // Sécurité : On ignore les items sans ID (erreurs de scan)
        if (!normalized.externalId) continue;

        // --- SAUVEGARDE EN BASE (Upsert) ---
        await this.prisma.asset.upsert({
          where: {
            companyId_externalId: {
              companyId,
              externalId: normalized.externalId
            }
          },
          update: {
            name: normalized.name,
            type: normalized.type,
            rawData: item, // On écrase avec la donnée fraîche
            lastSeen: new Date(),
          },
          create: {
            companyId,
            provider,
            externalId: normalized.externalId,
            name: normalized.name,
            type: normalized.type,
            rawData: item,
          }
        });
        syncedCount++;

      } catch (e) {
        console.error(`❌ Erreur sur un item ${provider}:`, e);
      }
    }
    
    console.log(`✅ ${syncedCount} assets synchronisés pour ${provider}`);
    return { count: syncedCount };
  }
}