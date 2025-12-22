"use client";

import { useState } from "react";
import { 
  Search, Plus, Download, Filter, 
  AlertTriangle, ArrowRight, MoreHorizontal, 
  TrendingDown, ShieldAlert 
} from "lucide-react";

// Données simulées du Registre des Risques
const risksData = [
  {
    id: "R-01",
    scenario: "Unauthorized access to production data",
    category: "Security",
    likelihood: "Low",
    impact: "High",
    inherentRisk: "High",
    treatment: "Mitigate",
    residualRisk: "Low",
    owner: "Billy Carr"
  },
  {
    id: "R-02",
    scenario: "Loss of customer data due to backup failure",
    category: "Availability",
    likelihood: "Low",
    impact: "High",
    inherentRisk: "High",
    treatment: "Mitigate",
    residualRisk: "Low",
    owner: "Madison Carter"
  },
  {
    id: "R-03",
    scenario: "Employee laptop theft or loss",
    category: "Asset Management",
    likelihood: "Medium",
    impact: "Medium",
    inherentRisk: "Medium",
    treatment: "Mitigate",
    residualRisk: "Low",
    owner: "HR Team"
  },
  {
    id: "R-04",
    scenario: "DDoS attack causing service outage",
    category: "Availability",
    likelihood: "Low",
    impact: "Medium",
    inherentRisk: "Medium",
    treatment: "Accept",
    residualRisk: "Medium",
    owner: "DevOps Lead"
  }
];

// Fonction pour la couleur des badges de risque
const getRiskColor = (level: string) => {
  switch (level) {
    case 'High': return 'bg-red-100 text-red-700 border-red-200';
    case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'Low': return 'bg-green-100 text-green-700 border-green-200';
    default: return 'bg-gray-100 text-gray-600';
  }
};

export default function RisksPage() {
  return (
    <div className="space-y-6 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-[#1a1f36]">Risk Management</h1>
           <p className="text-gray-500 mt-1">
             Identify, assess, and treat risks to your organization.
           </p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700 shadow-sm transition-colors">
                <Download size={16} />
                Export Register
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#502aec] text-white rounded-lg text-sm font-semibold hover:bg-[#3b1c85] shadow-sm transition-colors">
                <Plus size={16} />
                Add Risk
            </button>
        </div>
      </div>

      {/* DASHBOARD RAPIDE (Heatmap simplifiée) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
             <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-50 text-red-600 rounded-lg"><AlertTriangle size={20}/></div>
                <h3 className="font-bold text-[#1a1f36]">High Risks</h3>
             </div>
             <div className="text-3xl font-bold text-[#1a1f36]">2</div>
             <p className="text-xs text-gray-500 mt-1">Before mitigation (Inherent)</p>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
             <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg"><TrendingDown size={20}/></div>
                <h3 className="font-bold text-[#1a1f36]">Mitigated</h3>
             </div>
             <div className="text-3xl font-bold text-[#1a1f36]">92%</div>
             <p className="text-xs text-gray-500 mt-1">Risks treated effectively</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
             <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><ShieldAlert size={20}/></div>
                <h3 className="font-bold text-[#1a1f36]">Total Risks</h3>
             </div>
             <div className="text-3xl font-bold text-[#1a1f36]">24</div>
             <p className="text-xs text-gray-500 mt-1">Across 5 categories</p>
          </div>
      </div>

      {/* FILTRES */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
                type="text" 
                placeholder="Search risks..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#502aec]/20 focus:border-[#502aec] shadow-sm"
            />
        </div>
        <button className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors flex items-center gap-2">
            <Filter size={14}/> Filter
        </button>
      </div>

      {/* TABLEAU DES RISQUES */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <tr>
                    <th className="px-6 py-4">Risk Scenario</th>
                    <th className="px-6 py-4">Inherent Risk</th>
                    <th className="px-6 py-4">Treatment</th>
                    <th className="px-6 py-4">Residual Risk</th>
                    <th className="px-6 py-4">Owner</th>
                    <th className="px-6 py-4 w-10"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
                {risksData.map((risk) => (
                    <tr key={risk.id} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                        
                        {/* Scenario */}
                        <td className="px-6 py-4 max-w-xs">
                            <div className="font-bold text-[#1a1f36] line-clamp-2">{risk.scenario}</div>
                            <div className="text-xs text-gray-500 mt-1">{risk.category}</div>
                        </td>

                        {/* Inherent Risk */}
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded border text-xs font-bold ${getRiskColor(risk.inherentRisk)}`}>
                                {risk.inherentRisk}
                            </span>
                        </td>

                        {/* Treatment */}
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium border border-gray-200">
                                    {risk.treatment}
                                </span>
                                <ArrowRight size={14} className="text-gray-400"/>
                            </div>
                        </td>

                        {/* Residual Risk */}
                        <td className="px-6 py-4">
                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded border text-xs font-bold ${getRiskColor(risk.residualRisk)}`}>
                                {risk.residualRisk}
                            </span>
                        </td>

                        {/* Owner */}
                        <td className="px-6 py-4 text-gray-600">
                             {risk.owner}
                        </td>

                        {/* Menu */}
                        <td className="px-6 py-4 text-right text-gray-300">
                             <MoreHorizontal size={18} className="group-hover:text-gray-600" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}