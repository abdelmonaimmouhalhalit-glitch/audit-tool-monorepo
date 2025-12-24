import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function calculateFrameworkScore(companyId: string, frameworkId: string) {
  // 1. Récupérer tous les tests liés à ce framework via les Controls
  const tests = await prisma.automatedTest.findMany({
    where: {
      control: {
        requirement: { frameworkId }
      }
    }
  });

  if (tests.length === 0) return 0;

  // 2. Compter combien de tests ont un statut "PASS" dans ScanResult
  const results = await Promise.all(
    tests.map(test => 
      prisma.scanResult.findFirst({
        where: {
          companyId,
          checkId: test.checkId
        },
        orderBy: { lastChecked: 'desc' }
      })
    )
  );

  const passed = results.filter(r => r?.status === 'PASS').length;
  
  // 3. Retourner le pourcentage arrondi
  return Math.round((passed / tests.length) * 100);
}