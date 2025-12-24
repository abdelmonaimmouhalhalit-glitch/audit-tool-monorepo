import { Injectable, Logger } from '@nestjs/common';
import { Client } from 'pg';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private prisma = new PrismaClient();

  async runGithubScan(companyId: string) {
    this.logger.log(`🚀 Scan HTTP déclenché pour : ${companyId}`);

    const steampipe = new Client({
      connectionString: process.env.STEAMPIPE_URL || "postgresql://steampipe@localhost:9193/steampipe"
    });

    try {
      await steampipe.connect();
      const res = await steampipe.query("SELECT name, url, visibility FROM github_my_repository");

      for (const repo of res.rows) {
        await this.prisma.asset.upsert({
          where: { companyId_externalId: { companyId, externalId: repo.url } },
          update: { name: repo.name, rawData: repo, lastSeen: new Date() },
          create: {
            companyId,
            externalId: repo.url,
            name: repo.name,
            type: 'REPOSITORY',
            provider: 'GITHUB',
            rawData: repo,
          },
        });
      }

      return { success: true, count: res.rows.length };
    } catch (error: any) {
      this.logger.error(`❌ Erreur : ${error.message}`);
      throw error;
    } finally {
      await steampipe.end();
    }
  }
}