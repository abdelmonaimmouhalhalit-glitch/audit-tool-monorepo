import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// -------------------------------------------------------------------------
// 1. CORRECTION PRISMA (Singleton Pattern + Debug)
// -------------------------------------------------------------------------
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// On force Prisma à utiliser l'URL du fichier .env explicitement
const prisma = globalForPrisma.prisma || new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export const dynamic = 'force-dynamic';

// -------------------------------------------------------------------------
// 2. CONFIGURATION DU MAPPING
// -------------------------------------------------------------------------
const FRAMEWORK_CONFIG: Record<string, any> = {
  soc2: {
    title: "SOC 2 Type II",
    groups: [
      {
        id: "CC6",
        title: "CC6 - Logical and Physical Access Controls",
        mappings: {
          'github_user_mfa': { code: 'CC 6.1', name: 'Logical Access Security', category: 'Security' },
          'github_repo_visibility': { code: 'CC 6.8', name: 'Prevent Unauthorized Data Access', category: 'Confidentiality' }
        }
      }
    ]
  }
};

// -------------------------------------------------------------------------
// 3. API ROUTE
// -------------------------------------------------------------------------
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    // 🔍 DEBUG: On vérifie l'URL utilisée (ne pas laisser en prod)
    // Cela s'affichera dans ton terminal où tourne 'next dev'
    console.log("🔍 Tentative connexion DB sur :", process.env.DATABASE_URL);

    const { id } = await params;
    const frameworkId = id.toLowerCase(); 
    const companyId = 'fw-soc2'; 

    const config = FRAMEWORK_CONFIG[frameworkId];
    if (!config) {
      return NextResponse.json({ error: 'Framework not found' }, { status: 404 });
    }

    // Tentative de lecture DB
    const scanResults = await prisma.scanResult.findMany({
      where: { companyId },
      include: { asset: true },
    });

    // Mapping
    const responseGroups = config.groups.map((group: any) => {
      const mappedControls = new Map();

      scanResults.forEach(scan => {
        const rule = group.mappings[scan.checkId];
        if (rule) {
          if (!mappedControls.has(rule.code)) {
            mappedControls.set(rule.code, {
              id: rule.code,
              name: rule.name,
              total: 0, passed: 0,
              category: rule.category,
              owner: "Automated",
              code: rule.code,
              items: []
            });
          }
          const control = mappedControls.get(rule.code);
          control.total++;
          if (scan.status === 'PASS') control.passed++;
          control.items.push({ assetName: scan.asset ? scan.asset.name : 'Unknown Asset', status: scan.status });
        }
      });

      const controls = Array.from(mappedControls.values()).map((c: any) => ({
        ...c,
        status: `${c.passed}/${c.total}`,
        isGreen: c.passed === c.total && c.total > 0,
        statusColor: c.passed === c.total ? "text-green-600" : "text-amber-600"
      }));

      return { id: group.id, title: group.title, controls };
    });

    const allControls = responseGroups.flatMap((g: any) => g.controls);
    const total = allControls.length;
    const passed = allControls.filter((c: any) => c.isGreen).length;
    const progress = total === 0 ? 0 : Math.round((passed / total) * 100);

    return NextResponse.json({
      framework: config.title,
      progress,
      totalControls: total,
      passedControls: passed,
      groups: responseGroups
    });

  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json({ error: 'Database Connection Failed', details: String(error) }, { status: 500 });
  }
}