"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react"; // <--- Importation des hooks React
import { 
  CheckCircle, AlertCircle, FileText, ArrowRight, 
  MoreHorizontal, Search, Filter, ChevronDown, 
  Calendar, Clock, Shield 
} from "lucide-react";

export default function FrameworkPage() {
  const params = useParams();
  const rawId = typeof params.frameworkId === 'string' ? params.frameworkId : "soc2";

  // --- ÉTAT (STATE) POUR LES DONNÉES RÉELLES ---
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // --- CHARGEMENT DES DONNÉES DEPUIS L'API ---
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/frameworks/${rawId}`);
        if (!response.ok) throw new Error("Erreur réseau");
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Erreur de chargement:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [rawId]);

  // --- GESTION DU CHARGEMENT ---
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center space-x-2">
        <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce delay-75"></div>
        <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce delay-150"></div>
      </div>
    );
  }

  // Si pas de données ou erreur
  if (!data) return <div className="p-10 text-red-500">Impossible de charger le framework.</div>;

  const frameworkName = data.framework; // Vient de l'API (ex: "SOC 2 Type II")

  return (
    <div className="space-y-8 pb-10">
      
      {/* --- 1. HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              <span className="hover:underline cursor-pointer">Frameworks</span> 
              <span>/</span> 
              <span>{frameworkName}</span>
           </div>
           <h1 className="text-3xl font-bold text-[#1a1f36]">{frameworkName}</h1>
        </div>
        
        <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700 transition-colors shadow-sm">
                Edit system description
            </button>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700 transition-colors shadow-sm">
                + Add custom control
            </button>
             <button className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700 transition-colors shadow-sm">
                More <ChevronDown className="inline w-4 h-4 ml-1"/>
            </button>
        </div>
      </div>

      {/* --- 2. STATS CARDS (DYNAMIQUES) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Carte Gauche : Progression Globale */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-[#1a1f36]">Controls</h3>
                <button className="text-xs font-semibold border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50 transition-colors">
                    View analytics
                </button>
            </div>
            
            <div className="flex items-end gap-3 mb-3">
                {/* SCORE RÉEL */}
                <span className="text-4xl font-extrabold text-[#1a1f36]">{data.progress}%</span>
            </div>

            {/* Barre de progression principale */}
            <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${data.progress === 100 ? 'bg-emerald-500' : 'bg-[#502aec]'}`} 
                    style={{ width: `${data.progress}%` }}
                ></div>
            </div>
            
            <div className="flex justify-between text-sm font-medium text-gray-500 mb-8">
                <span>{data.passedControls} completed</span>
                <span>{data.totalControls} total</span>
            </div>

            {/* Sous-statistiques (Calculées automatiquement) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-100 pt-6">
                
                {/* Tests Techniques */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-600 flex items-center gap-2">
                            Technical Tests <ArrowRight size={12} className="-rotate-45 text-gray-400"/>
                        </span>
                        <span className="font-bold text-gray-900">{data.passedControls}/{data.totalControls}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                         <div 
                            className="bg-[#10b981] h-1.5 rounded-full transition-all duration-1000" 
                            style={{ width: `${data.progress}%` }}
                         ></div>
                    </div>
                </div>

                {/* Documents (Statique pour l'instant car pas encore géré par le worker) */}
                <div className="space-y-2 opacity-50">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-600 flex items-center gap-2">
                             Documents <ArrowRight size={12} className="-rotate-45 text-gray-400"/>
                        </span>
                        <span className="font-bold text-gray-900">--/--</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                         <div className="bg-gray-300 h-1.5 rounded-full" style={{ width: "0%" }}></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Carte Droite : Audit Timeline (Statique pour l'UI) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
             <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg text-[#1a1f36]">Audit timeline</h3>
                    <span className="bg-orange-50 text-[#c2410c] border border-orange-100 text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#f97316] rounded-full"></span> 
                        In audit
                    </span>
                </div>
                <div className="flex gap-2">
                    <button className="text-xs font-semibold border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50 transition-colors">View as auditor</button>
                </div>
            </div>
            
            <div className="text-sm text-gray-600 font-medium mb-10 flex items-center gap-1">
                Now until <span className="text-[#1a1f36] font-bold">July 26</span>
                <AlertCircle size={14} className="text-gray-400 ml-1 cursor-help"/>
            </div>

            <div className="relative mt-auto px-2">
                <div className="absolute top-[5px] left-0 w-full h-0.5 bg-gray-200"></div>
                <div className="absolute top-[5px] left-0 w-[35%] h-0.5 bg-[#f97316]"></div>
                
                <div className="relative flex justify-between text-xs font-medium text-gray-400">
                    <div className="flex flex-col items-center gap-3 -ml-2">
                        <div className="w-3 h-3 bg-[#f97316] rounded-full ring-4 ring-white z-10"></div>
                        <span className="text-[#1a1f36] font-bold">Now</span>
                    </div>
                     <div className="flex flex-col items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-[#f97316] rounded-full ring-2 ring-white z-10"></div>
                        <span>May</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                         <div className="w-2.5 h-2.5 bg-white border-2 border-[#f97316] rounded-full ring-2 ring-white z-10"></div>
                        <span className="text-[#1a1f36] font-bold">Jul</span>
                    </div>
                    {['Sep', 'Nov', 'Jan'].map((month) => (
                        <div key={month} className="flex flex-col items-center gap-3">
                            <div className="w-2 h-2 bg-gray-300 rounded-full ring-2 ring-white z-10"></div>
                            <span>{month}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* --- 3. BARRE DE FILTRES --- */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex gap-3 w-full sm:w-auto">
             <div className="relative flex-1 sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search controls" 
                    className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#502aec]/20 focus:border-[#502aec] shadow-sm"
                />
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">Filter by</span>
                <button className="px-3 py-2 bg-white border border-gray-200 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
                    Status
                </button>
            </div>
        </div>
      </div>

      {/* --- 4. LISTE DES CONTROLES (DYNAMIQUE) --- */}
      <div className="space-y-8">
        
        {data.groups.map((group: any) => (
            <ControlGroup 
                key={group.id}
                id={group.id}
                title={group.title}
                controls={group.controls}
            />
        ))}

        {data.groups.length === 0 && (
            <div className="p-8 text-center bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500">Aucun contrôle mappé pour ce framework.</p>
            </div>
        )}

      </div>
    </div>
  );
}

// --- SOUS-COMPOSANT REUTILISABLE (Reste identique à ton design) ---
function ControlGroup({ id, title, controls }: { id: string, title: string, controls: any[] }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-[#fbfbfc]">
                <h3 className="font-bold text-lg mb-1 text-[#1a1f36]">{id}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{title}</p>
            </div>

            <table className="w-full text-left text-sm">
                <thead className="bg-white text-gray-500 font-bold text-xs uppercase tracking-wider border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 w-10">
                             <input type="checkbox" className="rounded border-gray-300 text-[#502aec] focus:ring-[#502aec]"/>
                        </th>
                        <th className="px-6 py-4">Control</th>
                        <th className="px-6 py-4">Evidence Status</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Owner</th>
                        <th className="px-6 py-4">Standard Code</th>
                        <th className="px-6 py-4 w-10"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {controls.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50/80 transition-colors group">
                            <td className="px-6 py-4">
                                <input type="checkbox" className="rounded border-gray-300 text-[#502aec] focus:ring-[#502aec]"/>
                            </td>
                            <td className="px-6 py-4 font-semibold text-[#1a1f36] w-[35%]">
                                {row.name}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${row.isGreen ? 'border-[#10b981]' : 'border-gray-300'}`}>
                                        {row.isGreen && <div className="w-2 h-2 bg-[#10b981] rounded-full"></div>}
                                    </div>
                                    <span className={`font-medium ${row.statusColor}`}>{row.status}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{row.category}</td>
                            <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                                {row.owner !== "Unassigned" && (
                                     <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-[10px] flex items-center justify-center font-bold">
                                        {row.owner.charAt(0)}
                                     </div>
                                )}
                                <span className={row.owner === "Unassigned" ? "text-gray-400 italic" : ""}>{row.owner}</span>
                            </td>
                            <td className="px-6 py-4 text-gray-400 text-xs max-w-[150px] truncate" title={row.code}>
                                {row.code}
                            </td>
                            <td className="px-6 py-4 text-gray-300 text-right">
                                <button className="p-1 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreHorizontal size={18}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}