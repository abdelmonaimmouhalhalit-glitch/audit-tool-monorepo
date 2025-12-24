import { Queue, ConnectionOptions } from 'bullmq';

// Configuration de la connexion Redis (doit correspondre à votre docker-compose)
const connection: ConnectionOptions = {
  host: process.env.REDIS_HOST |

| 'localhost',
  port: parseInt(process.env.REDIS_PORT |

| '6379'),
};

// Définition de la file d'attente principale
export const complianceQueue = new Queue('compliance-scans', { 
  connection,
  defaultJobOptions: {
    attempts: 10, // Nombre de tentatives en cas d'échec (crucial pour le 429) [3]
    backoff: {
      type: 'exponential',
      delay: 5000, // Attente initiale de 5s, augmente exponentiellement
    },
    removeOnComplete: { count: 100 }, // Historique des succès
    removeOnFail: { count: 500 },     // Historique des échecs pour l'auditeur
  }
});

/**
 * Planifie un scan horaire pour une entreprise spécifique.
 * Vanta effectue ses tests toutes les heures pour garantir la conformité.[4, 5]
 */
export const scheduleComplianceScan = async (companyId: string, provider: 'GITHUB' | 'AWS') => {
  const schedulerId = `hourly-${provider.toLowerCase()}-${companyId}`;
  
  await complianceQueue.upsertJobScheduler(
    schedulerId,
    { pattern: '0 * * * *' }, // S'exécute à la minute 0 de chaque heure
    {
      name: `scan-${provider.toLowerCase()}`,
      data: { companyId, provider },
    }
  );
  
  console.log(` Scan planifié pour ${companyId} sur ${provider}`);
};