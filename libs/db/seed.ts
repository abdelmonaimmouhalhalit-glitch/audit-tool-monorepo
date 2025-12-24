import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const companyId = 'dev-company-id';
  console.log('🚀 Injection de la bibliothèque complète de conformité...');

  // 1. Liste exhaustive des Frameworks GRC (Rétablie)
  const frameworks = [
    { id: 'fw-soc2', name: 'SOC2', description: 'System and Organization Controls 2' },
    { id: 'fw-iso27001', name: 'ISO 27001', description: 'Information Security Management System' },
    { id: 'fw-hipaa', name: 'HIPAA', description: 'US Healthcare Privacy & Security' },
    { id: 'fw-gdpr', name: 'GDPR', description: 'General Data Protection Regulation (EU)' },
    { id: 'fw-pci', name: 'PCI DSS', description: 'Payment Card Industry Security' },
    { id: 'fw-nist', name: 'NIST CSF', description: 'NIST Cybersecurity Framework' },
    { id: 'fw-ccpa', name: 'CCPA', description: 'California Consumer Privacy Act' }
  ];

  for (const fw of frameworks) {
    await prisma.framework.upsert({
      where: { id: fw.id },
      update: { description: fw.description },
      create: fw,
    });

    await prisma.companyFramework.upsert({
      where: { id: `cf-${fw.id}-${companyId}` },
      update: {},
      create: { 
        id: `cf-${fw.id}-${companyId}`, 
        companyId, 
        frameworkId: fw.id,
        status: 0 
      },
    });
  }

  // 2. Requirements stratégiques
  await prisma.requirement.upsert({
    where: { id: 'req-soc2-cc61' },
    update: {},
    create: { id: 'req-soc2-cc61', code: 'CC6.1', frameworkId: 'fw-soc2', description: 'Logical access restriction.' }
  });

  // 3. CONTRÔLE 1 : Visibilité du Code
  const ctrlGit = await prisma.control.upsert({
    where: { id: 'ctrl-git-vis' },
    update: {},
    create: { 
      id: 'ctrl-git-vis', 
      name: 'Code Privacy', 
      requirementId: 'req-soc2-cc61' 
    }
  });

  await prisma.automatedTest.upsert({
    where: { id: 'test-git-vis' },
    update: {},
    create: { 
      id: 'test-git-vis', 
      checkId: 'github_repo_visibility', 
      controlId: ctrlGit.id 
    }
  });

  // 4. CONTRÔLE 2 : Authentification (MFA) - CE QUI MANQUAIT
  const ctrlMfa = await prisma.control.upsert({
    where: { id: 'ctrl-github-mfa' },
    update: {},
    create: { 
      id: 'ctrl-github-mfa', 
      name: 'MFA Enforcement', 
      requirementId: 'req-soc2-cc61' // Lié au même requirement SOC2
    }
  });

  await prisma.automatedTest.upsert({
    where: { id: 'test-github-mfa' },
    update: {},
    create: { 
      id: 'test-github-mfa', 
      checkId: 'github_user_mfa', // Clé utilisée dans ton Worker
      controlId: ctrlMfa.id 
    }
  });

  console.log('✅ Bibliothèque GRC et Mappings techniques injectés.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });