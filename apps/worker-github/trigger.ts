import { Queue } from 'bullmq';

const queue = new Queue('compliance-scans', {
  connection: { host: 'localhost', port: 6379 }
});

async function main() {
  await queue.add('github-audit', { 
    companyId: 'dev-company-id', 
    provider: 'GITHUB' 
  });
  console.log('📡 Signal envoyé au Worker !');
  process.exit(0);
}
main();