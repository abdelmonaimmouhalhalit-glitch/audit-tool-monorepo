// apps/client-dashboard/src/app/layout.tsx

import './global.css';

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