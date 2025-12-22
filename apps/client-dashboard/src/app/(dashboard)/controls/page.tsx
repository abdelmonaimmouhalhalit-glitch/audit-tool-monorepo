"use client";

import { useState } from "react";
import { 
  Search, Filter, Download, ChevronRight, 
  CheckCircle2, AlertCircle, Shield, Server, 
  Users, Lock, FileText 
} from "lucide-react";

// Données simulées pour la vue globale des contrôles
const controlsData = [
  {
    category: "Access Control",
    icon: Lock,
    stats: { total: 24, passing: 20, failing: 4 },
    items: [
      { id: "AC-01", name: "Multi-factor authentication enabled", status: "passing", owner: "Billy Carr", frameworks: ["SOC 2", "ISO 27001"] },
      { id: "AC-02", name: "Access revocation for terminated employees", status: "failing", owner: "HR Team", frameworks: ["SOC 2"] },
      { id: "AC-03", name: "Quarterly access reviews", status: "passing", owner: "Madison Carter", frameworks: ["SOC 2", "HIPAA"] },
    ]
  },
  {
    category: "Endpoint Security",
    icon: Server,
    stats: { total: 12, passing: 12, failing: 0 },
    items: [
      { id: "ES-01", name: "Antivirus software installed", status: "passing", owner: "Billy Carr", frameworks: ["SOC 2", "ISO 27001"] },
      { id: "ES-02", name: "Disk encryption enabled", status: "passing", owner: "Billy Carr", frameworks: ["SOC 2"] },
    ]
  },
  {
    category: "Human Resources",
    icon: Users,
    stats: { total: 8, passing: 6, failing: 2 },
    items: [
      { id: "HR-01", name: "Background checks performed", status: "failing", owner: "HR Team", frameworks: ["SOC 2"] },
      { id: "HR-02", name: "Security awareness training", status: "passing", owner: "HR Team", frameworks: ["SOC 2", "ISO 27001"] },
    ]
  }
];

export default function ControlsPage() {
  const [expanded, setExpanded] = useState<string | null>("Access Control");

  const toggleExpand = (category: string) => {
    setExpanded(expanded === category ? null : category);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-[#1a1f36]">Controls</h1>
           <p className="text-gray-500 mt-1">Monitor and manage your security controls across all frameworks.</p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700 shadow-sm transition-colors">
                <Download size={16} />
                Export CSV
            </button>
        </div>
      </div>

      {/* FILTRES & RECHERCHE */}
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-center">
        <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
                type="text" 
                placeholder="Search controls..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#502aec]/20 focus:border-[#502aec] shadow-sm"
            />
        </div>
        <div className="flex gap-2">
            {['Status', 'Owner', 'Framework'].map((filter) => (
                <button key={filter} className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors flex items-center gap-2">
                    {filter} <Filter size={14} className="text-gray-400"/>
                </button>
            ))}
        </div>
      </div>

      {/* LISTE DES CONTROLES */}
      <div className="space-y-4">
        {controlsData.map((group) => (
            <div key={group.category} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                
                {/* En-tête de Groupe */}
                <div 
                    onClick={() => toggleExpand(group.category)}
                    className={`p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${expanded === group.category ? 'bg-gray-50/50 border-b border-gray-100' : ''}`}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                            <group.icon size={20} />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-[#1a1f36]">{group.category}</h3>
                            <div className="flex items-center gap-3 text-xs font-medium mt-0.5">
                                <span className="text-green-600 flex items-center gap-1"><CheckCircle2 size={12}/> {group.stats.passing} Passing</span>
                                {group.stats.failing > 0 && (
                                    <span className="text-red-600 flex items-center gap-1"><AlertCircle size={12}/> {group.stats.failing} Failing</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <ChevronRight size={20} className={`text-gray-400 transition-transform ${expanded === group.category ? 'rotate-90' : ''}`} />
                </div>

                {/* Détail des contrôles */}
                {expanded === group.category && (
                    <div className="divide-y divide-gray-100">
                        {group.items.map((item) => (
                            <div key={item.id} className="p-4 pl-[72px] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors group">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{item.id}</span>
                                        <h4 className="text-sm font-bold text-[#1a1f36]">{item.name}</h4>
                                    </div>
                                    <div className="flex gap-2">
                                        {item.frameworks.map(fw => (
                                            <span key={fw} className="text-[10px] border border-gray-200 text-gray-500 px-1.5 rounded bg-white">
                                                {fw}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 text-sm">
                                    <div className="w-32 text-gray-600 flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-[10px] font-bold">
                                            {item.owner.charAt(0)}
                                        </div>
                                        {item.owner}
                                    </div>
                                    <div className="w-24 flex justify-end">
                                        {item.status === 'passing' ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                                                Passing
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-100">
                                                Failing
                                            </span>
                                        )}
                                    </div>
                                    <button className="text-gray-400 hover:text-[#502aec] font-medium text-xs border border-gray-200 px-3 py-1.5 rounded hover:bg-white transition-colors">
                                        Manage
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        ))}
      </div>
    </div>
  );
}