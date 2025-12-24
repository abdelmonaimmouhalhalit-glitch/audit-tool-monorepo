import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const companyId = process.env.COMPANY_ID;
  const githubToken = process.env.GITHUB_TOKEN;
  
  if (!companyId || !githubToken) {
    console.error("❌ ERREUR : Il manque COMPANY_ID ou GITHUB_TOKEN !");
    process.exit(1);
  }

  console.log(`🤖 Démarrage de l'audit pour l'entreprise : ${companyId}`);
  console.log("🌍 Connexion à l'API GitHub...");

  // 1. On demande la liste des repos à GitHub
  const response = await fetch('https://api.github.com/user/repos?per_page=100&visibility=all', {
    headers: {
      Authorization: `token ${githubToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    console.error(`❌ Erreur GitHub : ${response.status} ${response.statusText}`);
    throw new Error("Impossible de contacter GitHub");
  }

  const repos = await response.json();
  console.log(`📦 ${repos.length} dépôts trouvés !`);

  // 2. On sauvegarde chaque dépôt dans NocoDB (Postgres)
  console.log("💾 Sauvegarde en cours...");
  
  for (const repo of repos) {
    // Upsert = Si ça existe on met à jour, sinon on crée
    await prisma.asset.upsert({
      where: {
        companyId_externalId: {
          companyId: companyId,
          externalId: String(repo.id)
        }
      },
      update: {
        name: repo.name,
        rawData: repo,
        updatedAt: new Date()
      },
      create: {
        companyId: companyId,
        externalId: String(repo.id),
        name: repo.name,
        type: "REPOSITORY",
        provider: "GITHUB",
        rawData: repo
      }
    });
    console.log(`   -> Traité : ${repo.name}`);
  }

  console.log("✅ TERMINÉ ! Tous vos dépôts sont dans NocoDB.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
