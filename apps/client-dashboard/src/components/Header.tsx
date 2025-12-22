export function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <h2 className="text-lg font-semibold text-slate-700">Tableau de bord</h2>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition">
        + Nouvel Audit
      </button>
    </header>
  );
}