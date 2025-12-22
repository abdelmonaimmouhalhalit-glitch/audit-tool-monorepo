"use client";

import { useState } from "react";
import { 
  Search, Plus, Download, Filter, 
  MoreHorizontal, Laptop, Shield, FileCheck, 
  UserCheck, AlertCircle, CheckCircle2, User 
} from "lucide-react";

// Données simulées des employés
const peopleData = [
  {
    id: 1,
    name: "Billy Carr",
    email: "billy@auditflash.com",
    role: "Admin",
    agentStatus: "installed", // installed | missing
    backgroundCheck: "verified", // verified | pending | not-required
    securityTraining: "completed", // completed | overdue | not-started
    policyAcceptance: "signed", // signed | pending
    avatarColor: "bg-blue-100 text-blue-700"
  },
  {
    id: 2,
    name: "Madison Carter",
    email: "madison@auditflash.com",
    role: "Editor",
    agentStatus: "installed",
    backgroundCheck: "verified",
    securityTraining: "completed",
    policyAcceptance: "signed",
    avatarColor: "bg-purple-100 text-purple-700"
  },
  {
    id: 3,
    name: "Frances Bishop",
    email: "frances@auditflash.com",
    role: "Employee",
    agentStatus: "missing",
    backgroundCheck: "pending",
    securityTraining: "overdue",
    policyAcceptance: "pending",
    avatarColor: "bg-green-100 text-green-700"
  },
  {
    id: 4,
    name: "Jordan Lee",
    email: "jordan@auditflash.com",
    role: "Contractor",
    agentStatus: "not-required",
    backgroundCheck: "not-required",
    securityTraining: "completed",
    policyAcceptance: "signed",
    avatarColor: "bg-yellow-100 text-yellow-700"
  }
];

export default function PeoplePage() {
  const [activeTab, setActiveTab] = useState("Active employees");

  // Fonction utilitaire pour afficher les badges de statut
  const renderStatusBadge = (status: string, type: 'agent' | 'check' | 'training' | 'policy') => {
    if (status === 'installed' || status === 'verified' || status === 'completed' || status === 'signed') {
      return <CheckCircle2 size={18} className="text-green-500" />;
    }
    if (status === 'missing' || status === 'overdue') {
      return <AlertCircle size={18} className="text-red-500" />;
    }
    if (status === 'pending') {
      return <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>; // Cercle vide
    }
    return <span className="text-xs text-gray-400 font-medium">—</span>; // Not required
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* --- 1. HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-[#1a1f36]">People</h1>
           <p className="text-gray-500 mt-1">
             Track security tasks for employees and contractors.
           </p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700 shadow-sm transition-colors">
                <Download size={16} />
                Export CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#502aec] text-white rounded-lg text-sm font-semibold hover:bg-[#3b1c85] shadow-sm transition-colors">
                <Plus size={16} />
                Add person
            </button>
        </div>
      </div>

      {/* --- 2. TABS & FILTRES --- */}
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-center bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
        
        {/* Onglets */}
        <div className="flex gap-2 p-1">
            {['Active employees', 'Contractors', 'Former employees'].map((tab) => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                        activeTab === tab 
                        ? 'bg-gray-100 text-[#1a1f36]' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Recherche et Filtre */}
        <div className="flex gap-3 w-full xl:w-auto p-2">
            <div className="relative flex-1 xl:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search people..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#502aec]/20 focus:border-[#502aec]"
                />
            </div>
            <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors flex items-center gap-2">
                <Filter size={14}/> Filter
            </button>
        </div>
      </div>

      {/* --- 3. TABLEAU DES EMPLOYES --- */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4 text-center" title="Vanta Agent Installed">
                        <Laptop className="mx-auto mb-1 text-gray-400" size={18}/> Agent
                    </th>
                    <th className="px-6 py-4 text-center" title="Background Check">
                         <UserCheck className="mx-auto mb-1 text-gray-400" size={18}/> Bg Check
                    </th>
                    <th className="px-6 py-4 text-center" title="Security Training">
                        <Shield className="mx-auto mb-1 text-gray-400" size={18}/> Training
                    </th>
                    <th className="px-6 py-4 text-center" title="Policy Acceptance">
                        <FileCheck className="mx-auto mb-1 text-gray-400" size={18}/> Policies
                    </th>
                    <th className="px-6 py-4 w-10"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
                {peopleData.map((person) => (
                    <tr key={person.id} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                        
                        {/* Colonne Nom + Email */}
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-full ${person.avatarColor} flex items-center justify-center text-xs font-bold`}>
                                    {person.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-[#1a1f36]">{person.name}</div>
                                    <div className="text-gray-500 text-xs">{person.email}</div>
                                </div>
                            </div>
                        </td>

                        {/* Colonnes Statuts (Centrées) */}
                        <td className="px-6 py-4 text-center">
                            <div className="flex flex-col items-center">
                                {renderStatusBadge(person.agentStatus, 'agent')}
                                {person.agentStatus === 'missing' && <span className="text-[10px] text-red-500 font-medium mt-1">Missing</span>}
                            </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                            <div className="flex flex-col items-center">
                                {renderStatusBadge(person.backgroundCheck, 'check')}
                            </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                            <div className="flex flex-col items-center">
                                {renderStatusBadge(person.securityTraining, 'training')}
                                {person.securityTraining === 'overdue' && <span className="text-[10px] text-red-500 font-medium mt-1">Overdue</span>}
                            </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                            <div className="flex flex-col items-center">
                                {renderStatusBadge(person.policyAcceptance, 'policy')}
                            </div>
                        </td>

                        {/* Menu */}
                        <td className="px-6 py-4 text-right text-gray-300">
                             <MoreHorizontal size={18} className="group-hover:text-gray-600" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        {/* Pagination simple en bas */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-between items-center">
            <span className="text-xs text-gray-500">Showing 1-4 of 4 people</span>
            <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded bg-white text-xs font-medium text-gray-400 cursor-not-allowed">Previous</button>
                <button className="px-3 py-1 border border-gray-300 rounded bg-white text-xs font-medium text-gray-600 hover:bg-gray-50">Next</button>
            </div>
        </div>
      </div>
    </div>
  );
}