import { Injectable, Logger } from '@nestjs/common';
import { Client } from 'pg';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private prisma = new PrismaClient();

  async runGithubScan(companyId: string) {
    this.logger.log(`🚀 Démarrage du scan GitHub pour la compagnie: ${companyId}`);

    const steampipe = new Client({
      connectionString: process.env.STEAMPIPE_URL || "postgresql://steampipe@localhost:9193/steampipe"
    });

    try {
      await steampipe.connect();
      
      const res = await steampipe.query(`
        SELECT name, full_name, html_url, visibility 
        FROM github_my_repository
      `);

      this.logger.log(`📦 ${res.rows.length} dépôts trouvés.`);

      for (const repo of res.rows) {
        await this.prisma.asset.upsert({
          where: {
            companyId_externalId: { companyId, externalId: repo.html_url },
          },
          update: { name: repo.full_name, rawData: repo, lastSeen: new Date() },
          create: {
            companyId,
            externalId: repo.html_url,
            name: repo.full_name,
            type: 'REPOSITORY',
            provider: 'GITHUB',
            rawData: repo,
          },
        });
      }

      return { success: true, count: res.rows.length };
    } catch (error) {
      this.logger.error(`❌ Erreur lors du scan: ${error.message}`);
      throw error;
    } finally {
      await steampipe.end();
    }
  }
}