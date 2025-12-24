import { calculateFrameworkScore } from './src/lib/compliance-engine'; 
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test() {
  console.log('🧪 Calcul du score GRC basé sur les données réelles...');

  const companyId = 'dev-company-id';
  const frameworkId = 'fw-soc2';

  try {
    // S'assurer que les AutomatedTests sont mappés pour les deux critères
    const checks = ['github_repo_visibility', 'github_user_mfa'];
    
    for (const checkId of checks) {
      const exists = await prisma.automatedTest.findFirst({ where: { checkId } });
      if (!exists) {
        console.log(`⚠️ Mapping manquant pour ${checkId}. Veuillez vérifier votre seed.`);
      }
    }

    const score = await calculateFrameworkScore(companyId, frameworkId);

    console.log(`\n📊 RESULTAT POUR : ${frameworkId}`);
    console.log(`📊 SCORE REEL : ${score}%`);

    if (score === 100) {
      console.log('✅ SUCCÈS : Votre infrastructure est totalement conforme.');
    } else {
      console.log('ℹ️ Score partiel. Vérifiez vos ScanResults pour identifier les FAIL.');
    }
  } catch (error: any) {
    console.error("❌ Erreur lors du calcul du score :", error.message);
  }
}

test().finally(() => prisma.$disconnect());