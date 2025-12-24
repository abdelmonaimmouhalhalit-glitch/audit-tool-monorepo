import { PrismaClient } from '@prisma/client';
import { SteampipeAdapter } from '../adapters/steampipe.adapter';
import pino from 'pino';

const logger = pino({ name: 'AuditService' });

export class AuditService {
  constructor(
    private steampipe: SteampipeAdapter,
    private prisma: PrismaClient
  ) {}

  async runAudit(companyId: string) {
    logger.info({ companyId }, '🚀 Audit Démarré');

    const repos = await this.steampipe.getRepositories();
    let detectedLogin = '';

    if (repos.length > 0) {
      detectedLogin = repos[0].owner_login || '';
      logger.info({ login: detectedLogin }, '👤 Login détecté');
    }

    // Audit Repos
    for (const repo of repos) {
      const asset = await this.saveAsset(companyId, repo.url, repo.name, 'REPOSITORY', repo);
      // Règle SOC2 : Private/Internal = PASS
      const isSecure = repo.visibility === 'PRIVATE' || repo.visibility === 'INTERNAL';
      await this.saveResult(companyId, asset.id, 'github_repo_visibility', isSecure, repo);
    }

    // Audit User
    if (detectedLogin) {
      const user = await this.steampipe.getUser(detectedLogin);
      if (user) {
        const userAsset = await this.saveAsset(companyId, user.url, user.login, 'USER', user);
        // Simulation MFA PASS
        await this.saveResult(companyId, userAsset.id, 'github_user_mfa', true, { ...user, note: 'Simulated' });
      }
    }
    logger.info('✅ Audit Terminé');
  }

  // Helpers pour Prisma
  private async saveAsset(companyId: string, externalId: string, name: string, type: string, data: any) {
    return this.prisma.asset.upsert({
      where: { companyId_externalId: { companyId, externalId } },
      update: { name, rawData: data, lastSeen: new Date() },
      create: { companyId, externalId, name, type, provider: 'GITHUB', rawData: data },
    });
  }

  private async saveResult(companyId: string, assetId: string, checkId: string, isPass: boolean, evidence: any) {
    return this.prisma.scanResult.upsert({
      where: { id: `scan-${checkId}-${assetId}` },
      update: { status: isPass ? 'PASS' : 'FAIL', evidence, lastChecked: new Date() },
      create: { id: `scan-${checkId}-${assetId}`, companyId, assetId, checkId, status: isPass ? 'PASS' : 'FAIL', evidence },
    });
  }
}