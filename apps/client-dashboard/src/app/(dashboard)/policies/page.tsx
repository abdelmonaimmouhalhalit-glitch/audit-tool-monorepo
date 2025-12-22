"use client";

import { useState } from "react";
import { 
  Search, Plus, Download, ChevronDown, Filter, 
  MoreHorizontal, FileText, CheckCircle2, Clock 
} from "lucide-react";

// --- Données simulées basées sur votre capture ---
const policies = [
  {
    id: 1,
    name: "Code of Conduct",
    standards: [{ name: "HIPAA", count: 4 }],
    status: "Not started",
    statusType: "neutral", // neutral | success | draft
    lastVersion: null,
    action: "Start"
  },
  {
    id: 2,
    name: "Information Security Policy (AUP)",
    standards: [{ name: "HIPAA", count: 6 }],
    status: "OK",
    statusType: "success",
    lastVersion: "Mar 8 2023 - 0 out of 0 accepted",
    action: "menu"
  },
  {
    id: 3,
    name: "Information Security Roles and Responsibilities",
    standards: [{ name: "GDPR", count: 7 }],
    status: "Draft",
    statusType: "draft",
    lastVersion: "—",
    action: "menu"
  },
  {
    id: 4,
    name: "Asset Management Policy",
    standards: [{ name: "HIPAA", count: 6 }],
    status: "OK",
    statusType: "success",
    lastVersion: "Mar 2 2023 - 0 out of 2 accepted",
    action: "menu"
  },
  {
    id: 5,
    name: "Access Control Policy",
    standards: [{ name: "GDPR", count: 8 }],
    status: "Draft",
    statusType: "draft",
    lastVersion: "Feb 28 2023 - 0 out of 0 accepted",
    action: "menu"
  },
  {
    id: 6,
    name: "Data Management Policy",
    standards: [{ name: "GDPR", count: 8 }],
    status: "OK",
    statusType: "success",
    lastVersion: "Feb 27 2023 - 0 out of 0 accepted",
    action: "menu"
  },
  {
    id: 7,
    name: "Operations Security Policy",
    standards: [{ name: "GDPR", count: 8 }],
    status: "Draft",
    statusType: "draft",
    lastVersion: "—",
    action: "menu"
  },
  {
    id: 8,
    name: "Human Resource Security Policy",
    standards: [{ name: "HIPAA", count: 7 }],
    status: "OK",
    statusType: "success",
    lastVersion: "Feb 21 2023 - 0 out of 0 accepted",
    action: "menu"
  }
];

export default function PoliciesPage() {
  return (
    <div className="space-y-6 pb-20">
      
      {/* --- 1. HEADER --- */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-[#1a1f36]">Policies</h1>
        
        <div className="flex flex-wrap gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700 shadow-sm transition-colors">
                <Plus size={16} />
                Add custom policy
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700 shadow-sm transition-colors">
                Edit SLAs
            </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700 shadow-sm transition-colors">
                Download language: <span className="text-[#1a1f36]">English</span> <ChevronDown size={14} />
            </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700 shadow-sm transition-colors">
                More <ChevronDown size={14} />
            </button>
        </div>
      </div>

      {/* --- 2. FILTRES --- */}
      <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
        
        {/* Recherche + Filtres Gauche */}
        <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
            <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search by name" 
                    className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#502aec]/20 focus:border-[#502aec] shadow-sm"
                />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-gray-500 mr-1">Filter by</span>
                {['Framework', 'Status', 'Type'].map((filter) => (
                    <button key={filter} className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
                        {filter}
                    </button>
                ))}
                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700 ml-2 cursor-pointer select-none">
                    <input type="checkbox" className="rounded border-gray-300 text-[#502aec] focus:ring-[#502aec]" />
                    Require my approval
                </label>
            </div>
        </div>

        {/* Sort by Droite */}
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Sort by</span>
             <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
                Recommendation <ChevronDown size={14} />
            </button>
        </div>
      </div>

      {/* --- 3. TABLEAU DES POLITIQUES --- */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-white border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <tr>
                    <th className="px-6 py-4 font-bold">Name</th>
                    <th className="px-6 py-4 font-bold">Standards</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold w-1/3">Last Approved Version</th>
                    <th className="px-6 py-4 w-10"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
                {policies.map((policy) => (
                    <tr key={policy.id} className="hover:bg-gray-50/80 transition-colors group">
                        
                        {/* Name */}
                        <td className="px-6 py-4">
                            <span className="font-semibold text-[#1a1f36]">{policy.name}</span>
                        </td>

                        {/* Standards (Badges) */}
                        <td className="px-6 py-4">
                            <div className="flex gap-2">
                                {policy.standards.map((std, i) => (
                                    <span key={i} className="inline-flex items-center px-2 py-0.5 rounded border border-gray-200 bg-white text-gray-500 text-xs font-medium">
                                        {std.name} <span className="ml-1 text-gray-400">+{std.count}</span>
                                    </span>
                                ))}
                            </div>
                        </td>

                        {/* Status (Pills) */}
                        <td className="px-6 py-4">
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold
                                ${policy.statusType === 'success' ? 'bg-green-50 border-green-100 text-green-700' : ''}
                                ${policy.statusType === 'neutral' ? 'bg-gray-50 border-gray-200 text-gray-500' : ''}
                                ${policy.statusType === 'draft' ? 'bg-gray-50 border-gray-200 text-gray-700' : ''}
                            `}>
                                {policy.statusType === 'success' && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
                                {policy.statusType !== 'success' && <div className="w-2 h-2 rounded-full bg-gray-300"></div>}
                                {policy.status}
                            </div>
                        </td>

                        {/* Last Version / Action */}
                        <td className="px-6 py-4 text-gray-500">
                             {policy.lastVersion ? (
                                 <span>{policy.lastVersion}</span>
                             ) : (
                                 <span className="text-gray-300">—</span>
                             )}
                        </td>

                        {/* Menu / Start Button */}
                        <td className="px-6 py-4 text-right">
                            {policy.action === 'Start' ? (
                                <button className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-sm">
                                    Start
                                </button>
                            ) : (
                                <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                                    <MoreHorizontal size={18} />
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

    </div>
  );
}