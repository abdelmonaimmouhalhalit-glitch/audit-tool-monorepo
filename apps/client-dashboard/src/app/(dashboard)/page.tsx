// apps/client-dashboard/src/app/(dashboard)/page.tsx

// Si l'alias '@/components/audit/ScoreGauge' ne marche pas, essayez le chemin relatif explicite :

import { ScoreGauge } from '../../components/audit/ScoreGauge'; 
import { VulnerabilityList } from '../../components/audit/VulnerabilityList'; 
// Ces chemins sont relatifs à apps/client-dashboard/src/app/(dashboard)/
import Link from 'next/link';
import styles from './dashboard.module.css'; // Importe les styles du layout

// Données de simulation (remplaceront les appels API réels une fois le backend connecté)
const AUDIT_RESULT = {
    scoreNIS2: 72,
    scoreRGPD: 85,
    lastScanDate: '06 Déc. 2025 à 14:45',
    vulnerabilities: [
        { id: 1, severity: 'HIGH' as const, title: 'MFA non activé pour 2 Global Admins', action: 'Activer le MFA pour les comptes critiques', nis2Ref: 'Art. 21 - Contrôle d\'accès' },
        { id: 2, severity: 'MEDIUM' as const, title: 'Politique de partage externe trop permissive', action: 'Limiter le partage aux utilisateurs authentifiés', nis2Ref: 'Art. 21 - Sécurité de la chaîne d\'approvisionnement' },
        { id: 3, severity: 'LOW' as const, title: 'Journal d\'audit non conservé au-delà de 90 jours', action: 'Augmenter la rétention des logs dans M365', nis2Ref: 'Art. 21 - Gestion des incidents' },
    ],
    topActions: [
        'Activer le MFA pour les administrateurs (Urgent)',
        'Désactiver le protocole d\'authentification Legacy (POP/IMAP)',
        'Examiner les 5 applications tierces avec accès R/W au Drive'
    ]
};

// --- Composant principal ---
export default function DashboardHome() {
    return (
        <div className={styles.pagePadded}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Vue d'ensemble de la Conformité Cloud
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                Dernier audit : <strong style={{ fontWeight: 600 }}>{AUDIT_RESULT.lastScanDate}</strong>
            </p>
            
            <div className={styles.cardGrid}>
                
                {/* 1. Zone Scores (1/3 largeur) */}
                <div className={styles.card} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px', width: '100%' }}>
                        Score de Sécurité Global
                    </h2>
                    <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', margin: '20px 0' }}>
                        <ScoreGauge score={AUDIT_RESULT.scoreNIS2} label="Score NIS 2" />
                        <ScoreGauge score={AUDIT_RESULT.scoreRGPD} label="Score RGPD" />
                    </div>
                    <Link 
                        href="/reports" 
                        className="link-button" 
                        style={{ 
                            backgroundColor: 'var(--color-success)',
                            color: 'white',
                            padding: '10px 15px',
                            width: '90%',
                            marginTop: '20px',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            textAlign: 'center'
                        }}
                    >
                        Télécharger le Rapport PDF (Marque Blanche)
                    </Link>
                </div>

                {/* 2. Zone Actions Prioritaires (2/3 largeur) */}
                <div className={`${styles.card} ${styles['card-col-2']}`}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px', width: '100%' }}>
                        Top 3 Actions Prioritaires (Max. Impact)
                    </h2>
                    <ol style={{ paddingLeft: '0', listStyle: 'none' }}>
                        {AUDIT_RESULT.topActions.map((action, index) => (
                            <li 
                                key={index} 
                                style={{ 
                                    padding: '12px 0', 
                                    borderBottom: '1px dashed var(--color-border)',
                                    fontSize: '1rem',
                                    color: 'var(--color-text-primary)',
                                    fontWeight: 500
                                }}
                            >
                                <span style={{ fontWeight: 700, color: 'var(--color-primary)', marginRight: '10px' }}>{index + 1}.</span> {action}
                            </li>
                        ))}
                    </ol>
                    <p style={{ marginTop: '15px', fontSize: '0.85rem', color: 'var(--color-danger)', fontWeight: 500 }}>
                        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', marginRight: '5px', backgroundColor: 'var(--color-danger)' }}></span> Remédier à ces points augmenterait votre score de **21 points**.
                    </p>
                </div>

                {/* 3. Liste des Vulnérabilités (Pleine Largeur) */}
                <div className={styles.card} style={{ gridColumn: 'span 3' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px', width: '100%' }}>
                        Détail des {AUDIT_RESULT.vulnerabilities.length} Non-Conformités Détectées
                    </h2>
                    <VulnerabilityList vulnerabilities={AUDIT_RESULT.vulnerabilities} />
                </div>
            </div>
        </div>
    );
}