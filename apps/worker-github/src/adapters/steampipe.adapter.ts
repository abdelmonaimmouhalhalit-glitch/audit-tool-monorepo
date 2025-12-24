import { Client } from 'pg';
import { GithubRepoSchema, GithubUserSchema } from '../schemas/github.schema';
import pino from 'pino';

const logger = pino({ name: 'SteampipeAdapter' });

export class SteampipeAdapter {
  private client: Client;

  constructor(connectionString: string) {
    this.client = new Client({ 
      connectionString, 
      connectionTimeoutMillis: 5000 
    });
  }

  async connect() {
    await this.client.connect();
    logger.info('🔌 Connecté à Steampipe');
  }

  async disconnect() {
    await this.client.end();
  }

  async getRepositories() {
    const query = `SELECT name, visibility, html_url as url, owner_login FROM github_my_repository`;
    const res = await this.client.query(query);
    // Validation automatique ici
    return res.rows.map(row => GithubRepoSchema.parse(row));
  }

  async getUser(login: string) {
    const query = `SELECT login, html_url as url FROM github_user WHERE login = $1`;
    const res = await this.client.query(query, [login]);
    if (res.rows.length === 0) return null;
    return GithubUserSchema.parse(res.rows[0]);
  }
}