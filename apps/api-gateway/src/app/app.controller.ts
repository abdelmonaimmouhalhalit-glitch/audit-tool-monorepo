import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// --- 1. DÉFINITION DU MAPPING (Le Cerveau) ---
const FRAMEWORK_DEFINITIONS = {
  "SOC 2": {
    controls: ["NIS2-MFA-001", "NIS2-ENCRYPTION-001"],
    totalPoints: 87
  },
  "ISO 27001:2022": {
    controls: ["NIS2-MFA-001", "NIS2-ENCRYPTION-001", "NIS2-BACKUP-001"],
    totalPoints: 123
  },
  "HIPAA": {
    controls: ["NIS2-ENCRYPTION-001", "NIS2-ACCESS-001"],
    totalPoints: 73
  },
  "GDPR": {
    controls: ["NIS2-MFA-001", "NIS2-DATA-Locality"],
    totalPoints: 77
  },
  "PCI DSS": {
    controls: ["NIS2-ENCRYPTION-001"], 
    totalPoints: 352
  },
  "US Data Privacy": {
    controls: ["NIS2-MFA-001"],
    totalPoints: 92
  }
};

@Controller('api') // Préfixe '/api' important pour le frontend
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  // --- ENDPOINT 1 : DASHBOARD & SCORES ---
  @Get('dashboard')
  async getDashboardStats(@Query('email') email: string) {
    if (!email) return { error: 'Email required' };

    // A. Récupérer l'utilisateur
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { company: true },
    });

    if (!user || !user.company) return { error: 'Not found' };
    const companyId = user.company.id;

    // B. Récupérer TOUS les résultats
    const allScanResults = await this.prisma.scanResult.findMany({
      where: { companyId },
    });

    // C. CALCUL DYNAMIQUE DES SCORES PAR FRAMEWORK
    const frameworksData = Object.entries(FRAMEWORK_DEFINITIONS).map(([name, config]) => {
      // 1. On ne garde que les scans pertinents pour ce framework
      const relevantScans = allScanResults.filter(scan => 
        config.controls.includes(scan.checkId)
      );

      // 2. On compte les succès
      const passedCount = relevantScans.filter(s => s.status === 'PASS').length;
      
      // 3. On calcule le % basé sur les contrôles surveillés
      const monitoredControls = config.controls.length;
      const progress = monitoredControls > 0 
        ? Math.round((passedCount / monitoredControls) * 100) 
        : 0;

      return {
        name,
        progress,      // ex: 50
        completed: passedCount,
        total: config.totalPoints 
      };
    });

    // D. Stats Globales
    const passedControls = allScanResults.filter((r) => r.status === 'PASS').length;
    const failedControls = allScanResults.filter((r) => r.status === 'FAIL').length;
    
    // E. Liste des erreurs pour le widget "Overdue"
    const failingItems = allScanResults
      .filter((r) => r.status === 'FAIL')
      .map((r) => ({ id: r.id, message: r.evidence, checkId: r.checkId }));

    return {
      companyName: user.company.name,
      totalAssets: await this.prisma.asset.count({ where: { companyId } }),
      passedControls,
      failedControls,
      failingItems,
      frameworks: frameworksData, // On envoie les scores calculés
    };
  }

  // --- ENDPOINT 2 : TABLEAU DÉTAILLÉ (CONTROLS) ---
  @Get('controls')
  async getControls(@Query('email') email: string) {
    if (!email) return { error: 'Email required' };

    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { company: true },
    });

    if (!user || !user.company) return { error: 'Not found' };

    // On récupère la liste complète avec les infos de l'Asset (Qui a échoué ?)
    const results = await this.prisma.scanResult.findMany({
      where: { companyId: user.company.id },
      include: { asset: true },
      orderBy: { status: 'asc' } // Les FAIL en premier
    });

    return results.map(r => ({
      id: r.id,
      name: r.checkId,
      status: r.status,
      description: r.evidence,
      assetName: r.asset.name,
      assetType: r.asset.type,
      lastChecked: r.lastChecked,
    }));
  }
}