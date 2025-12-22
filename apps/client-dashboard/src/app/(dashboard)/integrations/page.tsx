"use client";

import { useState } from "react";
import { Search, CheckCircle2 } from "lucide-react";

// Données fictives basées sur la capture
const integrations = [
  { id: 1, name: "AWS", category: "Cloud provider", status: "connected", logo: "AWS" },
  { id: 2, name: "Azure", category: "Cloud provider", status: "connected", logo: "AZ" },
  { id: 3, name: "GitHub", category: "Version control", status: "connected", logo: "GH" },
  { id: 4, name: "Auth0", category: "Access", status: "available", logo: "A0" },
  { id: 5, name: "Google Workspace", category: "Identity", status: "available", logo: "GW" },
  { id: 6, name: "Slack", category: "Communication", status: "available", logo: "SL" },
];

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState<"connected" | "available">("available");

  // Filtrer les intégrations selon l'onglet
  const filteredIntegrations = integrations.filter((item) => item.status === activeTab);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Integrations</h1>
        <p className="text-slate-500 mt-2">
          Connectez vos outils pour automatiser la collecte de preuves.
        </p>
      </div>

      {/* Onglets */}
      <div className="border-b border-gray-200 mb-6 flex gap-8">
        <button
          onClick={() => setActiveTab("connected")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "connected"
              ? "border-[#502aec] text-[#502aec]"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Connected ({integrations.filter(i => i.status === 'connected').length})
        </button>
        <button
          onClick={() => setActiveTab("available")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "available"
              ? "border-[#502aec] text-[#502aec]"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Available ({integrations.filter(i => i.status === 'available').length})
        </button>
      </div>

      {/* Barre de recherche et Filtres */}
      <div className="flex gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search integrations..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#502aec]/20 focus:border-[#502aec]"
          />
        </div>
        {/* Vous pouvez ajouter des boutons de filtre ici comme sur la capture */}
      </div>

      {/* Grille de cartes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((tool) => (
          <div key={tool.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              {/* Logo simulé */}
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-slate-600">
                {tool.logo}
              </div>
              {tool.status === 'connected' && (
                <span className="bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 size={12} /> Connected
                </span>
              )}
            </div>
            
            <h3 className="font-bold text-slate-900 text-lg">{tool.name}</h3>
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mt-2">
              {tool.category}
            </span>

            <div className="mt-6">
              {tool.status === 'connected' ? (
                 <button className="w-full py-2 border border-gray-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-gray-50">
                   Manage
                 </button>
              ) : (
                <button className="w-full py-2 bg-[#502aec] text-white rounded-lg text-sm font-medium hover:bg-[#3b1c85]">
                  Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}