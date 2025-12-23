import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1. On crée la boîte qui va posséder les données
  const company = await prisma.company.upsert({
    where: { id: 'dev-company-id' },
    update: {},
    create: {
      id: 'dev-company-id',
      name: 'Ma Société de Test Audit',
    },
  });

  // 2. On crée ton compte utilisateur (lié à ton futur Clerk ID)
  await prisma.user.upsert({
    where: { email: 'ton-email@exemple.com' },
    update: {},
    create: {
      email: 'ton-email@exemple.com',
      clerkId: 'user_dev_01', 
      role: 'ADMIN',
      companyId: company.id,
    },
  });

  // 3. On enregistre que GitHub est "Connecté"
  await prisma.integration.upsert({
    where: { id: 'github-int-01' },
    update: {},
    create: {
      id: 'github-int-01',
      provider: 'GITHUB',
      status: 'CONNECTED',
      companyId: company.id,
    },
  });

  console.log('✅ Environnement de gestion prêt (Company, User, Integration).');
}

main().catch(console.error).finally(() => prisma.$disconnect());