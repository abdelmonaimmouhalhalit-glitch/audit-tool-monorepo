import { Queue, ConnectionOptions } from 'bullmq';

// Configuration de la connexion Redis (doit correspondre à ton docker-compose)
const connection: ConnectionOptions = {
  // Correction des barres verticales | qui empêchaient le build
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
};

// Définition de la file d'attente principale
export const complianceQueue = new Queue('compliance-scans', { 
  connection,
  defaultJobOptions: {
    // Crucial pour gérer le rate-limiting (429) de GitHub ou Steampipe
    attempts: 10, 
    backoff: {
      type: 'exponential',
      delay: 5000, // Attente initiale de 5s
    },
    // Historique des preuves pour les auditeurs (Evidence Collection)
    removeOnComplete: { count: 100 }, 
    removeOnFail: { count: 500 },     
  }
});

/**
 * Planifie un scan horaire pour une entreprise spécifique.
 * Vanta effectue ses tests toutes les heures pour garantir la conformité continue.
 */
export const scheduleComplianceScan = async (companyId: string, provider: 'GITHUB' | 'AWS') => {
  const schedulerId = `hourly-${provider.toLowerCase()}-${companyId}`;
  
  // Utilisation de upsertJobScheduler pour éviter les doublons de planification
  await complianceQueue.upsertJobScheduler(
    schedulerId,
    { pattern: '0 * * * *' }, // S'exécute à la minute 0 de chaque heure
    {
      name: `scan-${provider.toLowerCase()}`,
      data: { companyId, provider },
    }
  );
  
  console.log(`🚀 Scan GRC planifié pour ${companyId} sur ${provider}`);
};