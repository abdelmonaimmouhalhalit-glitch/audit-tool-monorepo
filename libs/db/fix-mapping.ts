import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function fix() {
  const companyId = 'dev-company-id';

  console.log('🔧 Réparation des liens GRC...');

  // 1. S'assurer que le contrôle existe
  const control = await prisma.control.upsert({
    where: { id: 'ctrl-git-vis' },
    update: {},
    create: {
      id: 'ctrl-git-vis',
      name: 'Code Privacy',
      requirementId: 'req-soc2-cc61'
    }
  });

  // 2. FORCER le lien entre le test technique et le contrôle
  await prisma.automatedTest.upsert({
    where: { id: 'test-git-vis' },
    update: { checkId: 'github_repo_visibility' },
    create: {
      id: 'test-git-vis',
      checkId: 'github_repo_visibility', // DOIT matcher exactement le Worker
      controlId: control.id
    }
  });

  // 3. Vérifier s'il y a des résultats de scan orphelins
  const results = await prisma.scanResult.count({ where: { companyId } });
  console.log(`📊 Résultats de scan trouvés en base : ${results}`);

  if (results === 0) {
    console.log("❌ ERREUR : Aucun scan n'est présent. Relance ton Worker !");
  } else {
    console.log("✅ Liens réparés. Relance le calcul du score.");
  }
}

fix().finally(() => prisma.$disconnect());