// apps/client-dashboard/src/app/(dashboard)/audit/[id]/page.tsx
export default function AuditDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Détail de l'audit <span style={{ color: '#9ca3af' }}>#{params.id}</span></h2>
      <p style={{ color: 'var(--color-text-secondary)' }}>Vue détaillée de chaque point de contrôle technique et son lien avec NIS 2/RGPD.</p>
    </div>
  );
}