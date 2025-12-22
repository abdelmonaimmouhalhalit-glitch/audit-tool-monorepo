#!/bin/bash

# Définition du chemin de base
APP_DIR="apps/client-dashboard"

echo "🚀 Début de la restructuration de $APP_DIR (sans Tailwind CSS)..."

# 1. Nettoyage préventif
if [ -d "$APP_DIR/src/app" ]; then
    echo "🧹 Nettoyage de l'ancien dossier src/app..."
    rm -rf "$APP_DIR/src/app"
fi

# Suppression de la config Tailwind
rm -f "$APP_DIR/tailwind.config.js"

# 2. Création de l'arborescence de dossiers
echo "📂 Création des dossiers..."
mkdir -p "$APP_DIR/public"
mkdir -p "$APP_DIR/src/app/(auth)/login"
mkdir -p "$APP_DIR/src/app/(dashboard)/audit/[id]"
mkdir -p "$APP_DIR/src/app/(dashboard)/reports"
mkdir -p "$APP_DIR/src/app/(dashboard)/settings"
mkdir -p "$APP_DIR/src/app/api"
mkdir -p "$APP_DIR/src/components/audit"
mkdir -p "$APP_DIR/src/components/layout"
mkdir -p "$APP_DIR/src/components/shared"
mkdir -p "$APP_DIR/src/hooks"
mkdir -p "$APP_DIR/src/lib"

# 3. Génération des Utilitaires (src/lib)

# src/lib/utils.ts (Simplified)
cat <<EOF_UTILS > "$APP_DIR/src/lib/utils.ts"
// Helper simplifié - plus besoin de clsx/tailwind-merge
export function cn(...inputs: (string | undefined)[]) {
  return inputs.filter(Boolean).join(' ');
}
EOF_UTILS

# src/lib/api-client.ts
cat <<EOF_API_CLIENT > "$APP_DIR/src/lib/api-client.ts"
import axios from 'axios';

// Instance de base pour les appels API vers NestJS
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token si besoin
apiClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});
EOF_API_CLIENT

# src/hooks/useAuth.ts
cat <<EOF_HOOKS_AUTH > "$APP_DIR/src/hooks/useAuth.ts"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Vérification simplifiée pour le MVP
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return { isAuthenticated, login, logout };
}
EOF_HOOKS_AUTH

# src/hooks/useAudit.ts
cat <<EOF_HOOKS_AUDIT > "$APP_DIR/src/hooks/useAudit.ts"
import { useState } from 'react';
import { apiClient } from '@/lib/api-client';

export function useAudit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startAudit = async (tenantId: string) => {
    setLoading(true);
    setError(null);
    try {
      // Simulation d'appel
      // const res = await apiClient.post('/audits', { tenantId });
      // return res.data;
      await new Promise(r => setTimeout(r, 2000)); // Fake delay
      return { id: 'audit-123', status: 'PENDING' };
    } catch (err) {
      setError('Erreur lors du lancement de l audit');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { startAudit, loading, error };
}
EOF_HOOKS_AUDIT

# src/components/audit/ScoreGauge.tsx
cat <<EOF_SCORE_GAUGE > "$APP_DIR/src/components/audit/ScoreGauge.tsx"
import React from 'react';

interface ScoreGaugeProps {
  score: number;
}

export function ScoreGauge({ score }: ScoreGaugeProps) {
  // Utilisation de classes simples ou de styles en ligne
  const scoreClass = score > 80 ? 'score-high' : score > 50 ? 'score-medium' : 'score-low';

  return (
    <div className="score-gauge">
      <div className="score-content">
        <span className={\`score-value \${scoreClass}\`}>{score}</span>
        <span className="score-max">/ 100</span>
      </div>
      <style jsx>{\`
        .score-gauge {
          position: relative;
          width: 128px;
          height: 128px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 4px solid var(--color-light-gray);
        }
        .score-content {
          text-align: center;
        }
        .score-value {
          font-size: 2rem;
          font-weight: bold;
          display: block;
        }
        .score-max {
          display: block;
          font-size: 0.75rem;
          color: var(--color-text-secondary);
        }
        .score-high { color: var(--color-success); }
        .score-medium { color: var(--color-warning); }
        .score-low { color: var(--color-danger); }
      \`}</style>
    </div>
  );
}
EOF_SCORE_GAUGE

# src/components/audit/VulnerabilityList.tsx
cat <<EOF_VULN_LIST > "$APP_DIR/src/components/audit/VulnerabilityList.tsx"
import React from 'react';

export function VulnerabilityList() {
  const vulns = [
    { id: 1, severity: 'HIGH', title: 'MFA non activé pour les Admins', ref: 'NIS2-ART21' },
    { id: 2, severity: 'MEDIUM', title: 'Partage externe Anonyme actif', ref: 'RGPD-ART32' },
  ];

  const getSeverityClass = (severity: string) => {
    if (severity === 'HIGH') return 'severity-high';
    if (severity === 'MEDIUM') return 'severity-medium';
    return 'severity-low';
  };

  return (
    <div className="vulnerability-list-container">
      {vulns.map((v) => (
        <div key={v.id} className="vulnerability-item">
          <div>
            <h4 className="item-title">{v.title}</h4>
            <span className="item-ref">{v.ref}</span>
          </div>
          <span className={\`item-badge \${getSeverityClass(v.severity)}\`}>
            {v.severity}
          </span>
        </div>
      ))}
      <style jsx>{\`
        .vulnerability-list-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .vulnerability-item {
          padding: 16px;
          background-color: white;
          border: 1px solid var(--color-border);
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .item-title { font-weight: 500; color: var(--color-text-primary); }
        .item-ref { font-size: 0.75rem; color: var(--color-text-secondary); }
        .item-badge {
          padding: 4px 8px;
          font-size: 0.75rem;
          font-weight: bold;
          border-radius: 9999px; /* rounded-full */
        }
        .severity-high { background-color: var(--color-danger-light); color: var(--color-danger); }
        .severity-medium { background-color: var(--color-warning-light); color: var(--color-warning); }
      \`}</style>
    </div>
  );
}
EOF_VULN_LIST

# src/app/globals.css (Contient les variables CSS de base)
cat <<EOF_GLOBAL_CSS > "$APP_DIR/src/app/globals.css"
/* Reset CSS de base */
body { margin: 0; font-family: Arial, sans-serif; background-color: #f3f4f6; }
h1, h2, h3, p { margin: 0; }

/* Variables de Couleurs basées sur le rapport stratégique (Microsoft/Azure) */
:root {
  --color-primary: #0078D4; /* Bleu Principal */
  --color-secondary: #2B3137;
  --color-success: #107C10;
  --color-warning: #D83B01;
  --color-danger: #A80000;

  --color-danger-light: #fbe6e6;
  --color-warning-light: #fef3e9;
  
  --color-background-light: #ffffff;
  --color-background-gray: #f9fafb;
  --color-border: #e5e7eb;
  
  --color-text-primary: #1f2937;
  --color-text-secondary: #6b7280;
}

/* Styles globaux pour le wrapper */
.app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.link-button {
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.2s;
    text-align: center;
}
.primary-button {
    background-color: var(--color-primary);
    color: white;
    border: none;
}
.primary-button:hover {
    background-color: #005bb5;
}
.secondary-button {
    background-color: white;
    color: var(--color-text-primary);
    border: 1px solid var(--color-border);
}
.secondary-button:hover {
    background-color: var(--color-background-gray);
}
EOF_GLOBAL_CSS

# src/app/layout.tsx (ROOT)
cat <<EOF_ROOT_LAYOUT > "$APP_DIR/src/app/layout.tsx"
import './globals.css';

export const metadata = {
  title: 'FlashAudit - Conformité NIS 2 & RGPD',
  description: 'Audit de sécurité Cloud en 5 minutes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
EOF_ROOT_LAYOUT

# src/app/page.tsx (LANDING)
cat <<EOF_LANDING_PAGE > "$APP_DIR/src/app/page.tsx"
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <h1 className="landing-title">
        Audit Flash <span style={{ color: 'var(--color-primary)' }}>NIS 2</span>
      </h1>
      <p className="landing-subtitle">
        Sécurisez votre environnement Cloud Microsoft 365 et Google Workspace en moins de 5 minutes.
        Sans agent. Sans configuration complexe.
      </p>
      <div className="landing-actions">
        <Link 
          href="/login" 
          className="link-button primary-button"
        >
          Se connecter
        </Link>
        <Link 
          href="/dashboard" 
          className="link-button secondary-button"
        >
          Accès Démo
        </Link>
      </div>
      <style jsx>{\`
        .landing-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: var(--color-background-light);
          text-align: center;
          padding: 16px;
        }
        .landing-title {
          font-size: 3rem;
          font-weight: 700;
          color: var(--color-text-primary);
          margin-bottom: 0.5rem;
        }
        .landing-subtitle {
          font-size: 1.25rem;
          color: var(--color-text-secondary);
          margin-bottom: 2rem;
          max-width: 48rem;
        }
        .landing-actions {
          display: flex;
          gap: 1rem;
        }
      \`}</style>
    </div>
  );
}
EOF_LANDING_PAGE

# src/app/(auth)/auth.module.css
cat <<EOF_AUTH_CSS > "$APP_DIR/src/app/(auth)/auth.module.css"
.authContainer {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9fafb; /* Lighter gray background */
}
.authBox {
    max-width: 448px;
    width: 100%;
    padding: 32px;
    background-color: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
}
.logoTitle {
    text-align: center;
    font-size: 1.875rem;
    font-weight: 800;
    color: var(--color-text-primary);
    margin-bottom: 24px;
}
.loginButton {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 16px;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    background-color: white;
    color: var(--color-text-primary);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.15s;
}
.loginButton:hover {
    background-color: #f3f4f6;
}
.icon {
    height: 1.25rem;
    width: 1.25rem;
    margin-right: 8px;
}
EOF_AUTH_CSS

# src/app/(auth)/layout.tsx
cat <<EOF_AUTH_LAYOUT > "$APP_DIR/src/app/(auth)/layout.tsx"
import styles from './auth.module.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <div className={styles.logoTitle}>FlashAudit</div>
        {children}
      </div>
    </div>
  );
}
EOF_AUTH_LAYOUT

# src/app/(auth)/login/page.tsx
cat <<EOF_LOGIN_PAGE > "$APP_DIR/src/app/(auth)/login/page.tsx"
'use client';
import Link from 'next/link';
import styles from '../auth.module.css';

export default function LoginPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3 style={{ textAlign: 'center', fontSize: '1.125rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>
        Connexion à votre espace
      </h3>
      
      <button className={styles.loginButton}>
        <img src="https://www.svgrepo.com/show/475661/microsoft.svg" alt="Microsoft" className={styles.icon} />
        Continuer avec Microsoft
      </button>

      <button className={styles.loginButton}>
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className={styles.icon} />
        Continuer avec Google
      </button>

      <div style={{ textAlign: 'center', fontSize: '0.875rem', marginTop: '1rem' }}>
        <Link href="/" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
EOF_LOGIN_PAGE

# src/app/(dashboard)/dashboard.module.css
cat <<EOF_DASHBOARD_CSS > "$APP_DIR/src/app/(dashboard)/dashboard.module.css"
.pageWrapper {
    display: flex;
    min-height: 100vh;
    background-color: #f3f4f6;
}
.sidebar {
    width: 256px;
    background-color: white;
    border-right: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
}
.sidebarHeader {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--color-border);
    font-size: 1.25rem;
    font-weight: bold;
    color: var(--color-primary);
}
.navLink {
    display: block;
    padding: 10px 16px;
    color: var(--color-text-secondary);
    text-decoration: none;
    font-weight: 500;
    border-radius: 6px;
    transition: background-color 0.15s;
}
.navLink:hover {
    background-color: #f0f8ff; /* Light blue hover */
    color: var(--color-primary);
}

.mainContent {
    flex-grow: 1;
    overflow-y: auto;
}
.header {
    height: 64px;
    background-color: white;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    position: sticky;
    top: 0;
    z-index: 10;
}
.headerTitle {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text-primary);
}
.avatar {
    height: 32px;
    width: 32px;
    border-radius: 50%;
    background-color: var(--color-primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
}
.pagePadded {
    padding: 32px;
}
.cardGrid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}
.card {
    background-color: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border: 1px solid var(--color-border);
}
.card-col-2 {
    grid-column: span 2 / span 2;
}
.cardTitle {
    color: var(--color-text-secondary);
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 1rem;
}
.buttonFull {
    width: 100%;
    margin-top: 1rem;
    padding: 8px;
    background-color: var(--color-primary);
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
}
.buttonFull:hover {
    background-color: #005bb5;
}
EOF_DASHBOARD_CSS

# src/app/(dashboard)/layout.tsx
cat <<EOF_DASHBOARD_LAYOUT > "$APP_DIR/src/app/(dashboard)/layout.tsx"
import Link from 'next/link';
import styles from './dashboard.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.pageWrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>FlashAudit</div>
        <nav style={{ flexGrow: 1, padding: '16px' }}>
          <Link href="/dashboard" className={styles.navLink}>Vue d'ensemble</Link>
          <Link href="/audit/new" className={styles.navLink}>Nouvel Audit</Link>
          <Link href="/reports" className={styles.navLink}>Rapports</Link>
          <Link href="/settings" className={styles.navLink}>Paramètres</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>Espace Client</h1>
          <div className={styles.avatar}>JD</div>
        </header>
        <div className={styles.pagePadded}>
          {children}
        </div>
      </main>
    </div>
  );
}
EOF_DASHBOARD_LAYOUT

# src/app/(dashboard)/page.tsx (DASHBOARD HOME)
cat <<EOF_DASHBOARD_HOME > "$APP_DIR/src/app/(dashboard)/page.tsx"
import { ScoreGauge } from '@/components/audit/ScoreGauge';
import { VulnerabilityList } from '@/components/audit/VulnerabilityList';
import Link from 'next/link';
import styles from './dashboard.module.css';

export default function DashboardHome() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Stats Cards */}
      <div className={styles.cardGrid}>
        <div className={styles.card} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 className={styles.cardTitle}>Score Global NIS 2</h3>
          <ScoreGauge score={65} />
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Dernier scan : il y a 2h</p>
          <button className={styles.buttonFull}>
            Lancer un audit Flash
          </button>
        </div>

        <div className={`${styles.card} ${styles['card-col-2']}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Vulnérabilités Critiques</h3>
            <Link href="/reports" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Voir tout</Link>
          </div>
          <VulnerabilityList />
        </div>
      </div>

    </div>
  );
}
EOF_DASHBOARD_HOME

# src/app/(dashboard)/settings/page.tsx
cat <<EOF_SETTINGS_PAGE > "$APP_DIR/src/app/(dashboard)/settings/page.tsx"
export default function SettingsPage() {
  return (
    <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid var(--color-border)', maxWidth: '800px' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Connexions Cloud</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
             <div style={{ width: '40px', height: '40px', backgroundColor: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', fontWeight: 700 }}>M</div>
             <div>
               <p style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>Microsoft 365</p>
               <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Tenant ID: 8829...ae12</p>
             </div>
          </div>
          <button style={{ color: 'var(--color-danger)', fontSize: '0.875rem', cursor: 'pointer', border: 'none', background: 'none' }}>Déconnecter</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid var(--color-border)', borderRadius: '8px', opacity: 0.5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
             <div style={{ width: '40px', height: '40px', backgroundColor: '#d1fae5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', fontWeight: 700 }}>G</div>
             <div>
               <p style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>Google Workspace</p>
               <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Non connecté</p>
             </div>
          </div>
          <button style={{ color: 'var(--color-primary)', fontSize: '0.875rem', cursor: 'pointer', border: 'none', background: 'none' }}>Connecter</button>
        </div>
      </div>
    </div>
  );
}
EOF_SETTINGS_PAGE

# src/app/(dashboard)/reports/page.tsx
cat <<EOF_REPORTS_PAGE > "$APP_DIR/src/app/(dashboard)/reports/page.tsx"
export default function ReportsPage() {
  return (
    <div>
       <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>Mes Rapports d'Audit</h2>
       <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
         <table style={{ minWidth: '100%', borderCollapse: 'collapse' }}>
           <thead style={{ backgroundColor: '#f9fafb' }}>
             <tr>
               <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Date</th>
               <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Score</th>
               <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Statut</th>
               <th style={{ padding: '12px 24px', textAlign: 'right', fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Action</th>
             </tr>
           </thead>
           <tbody style={{ backgroundColor: 'white' }}>
             <tr>
               <td style={{ padding: '16px 24px', fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>06 Dec 2025</td>
               <td style={{ padding: '16px 24px', fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-warning)' }}>65/100</td>
               <td style={{ padding: '16px 24px' }}><span style={{ padding: '4px 8px', fontSize: '0.75rem', backgroundColor: '#d1fae5', color: '#10b981', borderRadius: '9999px' }}>Terminé</span></td>
               <td style={{ padding: '16px 24px', textAlign: 'right', fontSize: '0.875rem', color: 'var(--color-primary)', cursor: 'pointer', textDecoration: 'underline' }}>Télécharger PDF</td>
             </tr>
           </tbody>
         </table>
       </div>
    </div>
  );
}
EOF_REPORTS_PAGE

# src/app/(dashboard)/audit/[id]/page.tsx
cat <<EOF_AUDIT_DETAIL > "$APP_DIR/src/app/(dashboard)/audit/[id]/page.tsx"
export default function AuditDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Détail de l'audit <span style={{ color: '#9ca3af' }}>#{params.id}</span></h2>
      <p style={{ color: 'var(--color-text-secondary)' }}>Ici s'affichera la liste complète des contrôles techniques et la remédiation.</p>
    </div>
  );
}
EOF_AUDIT_DETAIL

echo "✅ Structure générée et stylée avec CSS Modules et CSS Variables (globals.css)."
echo "   Le dossier de travail est maintenant propre pour le développement des fonctionnalités."

# Rappel des dépendances
echo "⚠️  NOTE IMPORTANTE : N'oubliez pas d'installer Axios si vous ne l'avez pas déjà fait pour l'API client :"
echo "   npm install axios"
