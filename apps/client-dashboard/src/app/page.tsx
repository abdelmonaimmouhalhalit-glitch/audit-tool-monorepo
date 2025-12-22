// apps/client-dashboard/src/app/page.tsx
import Link from 'next/link';
// Pas d'import de styles.module.css car on utilise des styles globaux/en ligne

export default function LandingPage() {
  return (
    <div 
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-background-light)',
        textAlign: 'center',
        padding: '16px',
      }}
    >
      <h1 
        style={{
          fontSize: '3rem',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: '0.5rem',
        }}
      >
        Toly <span style={{ color: 'var(--color-primary)' }}>NIS 2</span>
      </h1>
      
      <p 
        style={{
          fontSize: '1.25rem',
          color: 'var(--color-text-secondary)',
          marginBottom: '2rem',
          maxWidth: '48rem',
        }}
      >
        Sécurisez votre environnement Cloud en moins de 5 minutes.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link 
          href="/login" 
          className="link-button primary-button" // Classes définies dans global.css
        >
          Se connecter
        </Link>
        <Link 
          href="/dashboard" 
          className="link-button secondary-button" // Classes définies dans global.css
        >
          Accès Démo
        </Link>
      </div>
    </div>
  );
}