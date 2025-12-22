import Sidebar from '../../components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Conteneur principal avec le fond gris clair de Vanta
    <div className="flex min-h-screen bg-[#f7f9fc]">
      
      {/* La Sidebar est fixée à gauche */}
      <div className="fixed inset-y-0 left-0 z-50 w-64">
        <Sidebar />
      </div>

      {/* Le contenu principal est décalé vers la droite (pl-64) pour ne pas passer sous la sidebar */}
      <main className="flex-1 pl-64">
        <div className="p-8 max-w-7xl mx-auto">
            {children}
        </div>
      </main>

    </div>
  );
}