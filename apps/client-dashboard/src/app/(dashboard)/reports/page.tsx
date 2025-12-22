// apps/client-dashboard/src/app/(dashboard)/reports/page.tsx
export default function ReportsPage() {
  return (
    <div>
       <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>Mes Rapports d'Audit</h2>
       <p style={{ color: 'var(--color-text-secondary)' }}>Tableau des rapports générés (PDF/SARIF).</p>
    </div>
  );
}