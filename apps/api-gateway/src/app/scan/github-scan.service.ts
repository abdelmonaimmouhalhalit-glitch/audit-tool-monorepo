import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GitHubScanService {
  private prisma = new PrismaClient();

  async triggerRealGitHubScan(companyId: string) {
    // 1. Connexion à Steampipe (Port 9193)
    const steampipe = new Client({
      host: 'localhost',
      port: 9193,
      user: 'steampipe', // Utilisateur par défaut de l'image Docker
      database: 'steampipe',
    });

    try {
      await steampipe.connect();
      console.log('✅ Connecté à Steampipe pour le scan GitHub');

      // 2. Le VRAI scan SQL
      const query = `
        SELECT 
          name, 
          full_name, 
          html_url, 
          visibility, 
          stargazer_count,
          updated_at
        FROM github_my_repository
      `;
      
      const res = await steampipe.query(query);
      const repositories = res.rows;

      console.log(`📦 ${repositories.length} dépôts trouvés. Importation dans Postgres...`);

      // 3. Stockage dans ta DB Postgres (Port 5432)
      for (const repo of repositories) {
        await this.prisma.asset.upsert({
          where: {
            companyId_externalId: {
              companyId: companyId,
              externalId: repo.html_url,
            },
          },
          update: {
            name: repo.name,
            rawData: repo,
            lastSeen: new Date(),
          },
          create: {
            companyId: companyId,
            externalId: repo.html_url,
            name: repo.name,
            type: 'REPOSITORY',
            provider: 'GITHUB',
            rawData: repo,
          },
        });
      }

      return { success: true, count: repositories.length };
    } catch (err) {
      console.error('❌ Erreur lors du scan GitHub:', err);
      throw err;
    } finally {
      await steampipe.end();
    }
  }
}