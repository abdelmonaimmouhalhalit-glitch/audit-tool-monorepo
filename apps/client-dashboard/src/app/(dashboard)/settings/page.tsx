// apps/client-dashboard/src/app/(dashboard)/settings/page.tsx
export default function SettingsPage() {
  return (
    <div style={{ padding: '24px', backgroundColor: 'var(--color-background-light)', borderRadius: '12px', border: '1px solid var(--color-border)', maxWidth: '800px' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Connexions Cloud</h2>
      <p style={{ color: 'var(--color-text-secondary)' }}>Page de configuration des connexions M365 et Google Workspace.</p>
    </div>
  );
}