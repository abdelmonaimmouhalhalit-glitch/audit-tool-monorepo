import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold tracking-wider">AUDIT TOOL</h1>
        <span className="text-xs text-slate-400">Dashboard Admin</span>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {/* Exemple de liens de navigation */}
        <Link href="/" className="block p-3 rounded hover:bg-slate-800 transition-colors text-slate-200 hover:text-white">
          📊 Vue d'ensemble
        </Link>
        <Link href="/audits" className="block p-3 rounded hover:bg-slate-800 transition-colors text-slate-200 hover:text-white">
          🛡️ Mes Audits
        </Link>
        <Link href="/settings" className="block p-3 rounded hover:bg-slate-800 transition-colors text-slate-200 hover:text-white">
          ⚙️ Configuration
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">H</div>
          <div className="text-sm">
            <p className="font-medium">Hibo Admin</p>
            <p className="text-xs text-slate-400">hibo@admin.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}