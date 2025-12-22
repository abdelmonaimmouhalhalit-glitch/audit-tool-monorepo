// apps/client-dashboard/src/app/(dashboard)/layout.tsx

import Link from 'next/link';
import styles from './dashboard.module.css'; // Importe les styles

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
          <Link href="/audit/progress?jobId=new" className={styles.navLink}>Nouvel Audit</Link>
          <Link href="/reports" className={styles.navLink}>Rapports</Link>
          <Link href="/settings" className={styles.navLink}>Paramètres</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Header */}
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