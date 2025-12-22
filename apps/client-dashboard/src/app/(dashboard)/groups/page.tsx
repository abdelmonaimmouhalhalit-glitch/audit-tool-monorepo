"use client";

import { useState } from "react";
import { 
  Search, Plus, Filter, MoreHorizontal, 
  Users, CheckCircle2, RefreshCw, Layers 
} from "lucide-react";

// Données simulées des groupes
const groupsData = [
  {
    id: 1,
    name: "Engineering",
    source: "Google Workspace",
    description: "All engineering staff with access to production.",
    members: 12,
    inScope: true,
    checklistProgress: "92%",
    status: "healthy"
  },
  {
    id: 2,
    name: "Admins",
    source: "Google Workspace",
    description: "Global administrators with full access.",
    members: 3,
    inScope: true,
    checklistProgress: "100%",
    status: "healthy"
  },
  {
    id: 3,
    name: "Contractors",
    source: "Manual",
    description: "External vendors and temporary staff.",
    members: 5,
    inScope: true,
    checklistProgress: "60%",
    status: "attention" // healthy | attention
  },
  {
    id: 4,
    name: "Sales",
    source: "Google Workspace",
    description: "Sales team members.",
    members: 8,
    inScope: false, // Pas dans le scope de l'audit
    checklistProgress: "—",
    status: "healthy"
  },
  {
    id: 5,
    name: "Everyone",
    source: "Google Workspace",
    description: "All active employees.",
    members: 24,
    inScope: true,
    checklistProgress: "88%",
    status: "healthy"
  }
];

export default function GroupsPage() {
  return (
    <div className="space-y-6 pb-20">
      
      {/* --- 1. HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-[#1a1f36]">Groups</h1>
           <p className="text-gray-500 mt-1">
             Manage employee groups and define audit scope.
           </p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700 shadow-sm transition-colors">
                <RefreshCw size={16} />
                Sync groups
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#502aec] text-white rounded-lg text-sm font-semibold hover:bg-[#3b1c85] shadow-sm transition-colors">
                <Plus size={16} />
                Create group
            </button>
        </div>
      </div>

      {/* --- 2. FILTRES --- */}
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-center bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex gap-3 w-full p-2">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search groups..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#502aec]/20 focus:border-[#502aec]"
                />
            </div>
            <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors flex items-center gap-2">
                <Filter size={14}/> Filter
            </button>
        </div>
      </div>

      {/* --- 3. TABLEAU --- */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <tr>
                    <th className="px-6 py-4">Group Name</th>
                    <th className="px-6 py-4">Members</th>
                    <th className="px-6 py-4">Source</th>
                    <th className="px-6 py-4">Audit Scope</th>
                    <th className="px-6 py-4">Onboarding Progress</th>
                    <th className="px-6 py-4 w-10"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
                {groupsData.map((group) => (
                    <tr key={group.id} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                        
                        {/* Name & Description */}
                        <td className="px-6 py-4 max-w-xs">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                                    <Users size={16} />
                                </div>
                                <div>
                                    <div className="font-bold text-[#1a1f36]">{group.name}</div>
                                    <div className="text-xs text-gray-500 truncate">{group.description}</div>
                                </div>
                            </div>
                        </td>

                        {/* Members */}
                        <td className="px-6 py-4">
                            <span className="font-medium text-gray-700">{group.members} users</span>
                        </td>

                        {/* Source */}
                        <td className="px-6 py-4">
                             {group.source === 'Manual' ? (
                                 <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-gray-200 bg-gray-50 text-gray-600 text-xs">
                                     Manual
                                 </span>
                             ) : (
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-blue-100 bg-blue-50 text-blue-700 text-xs font-medium">
                                    <Layers size={12}/> {group.source}
                                </span>
                             )}
                        </td>

                        {/* Scope (Badge important dans Vanta) */}
                        <td className="px-6 py-4">
                            {group.inScope ? (
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded border border-green-100">
                                    <CheckCircle2 size={12}/> In Scope
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-200">
                                    Out of Scope
                                </span>
                            )}
                        </td>

                        {/* Progress */}
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex-1 w-24 bg-gray-100 rounded-full h-1.5">
                                    {group.checklistProgress !== "—" && (
                                        <div 
                                            className={`h-1.5 rounded-full ${group.status === 'attention' ? 'bg-orange-400' : 'bg-green-500'}`} 
                                            style={{ width: group.checklistProgress }}
                                        ></div>
                                    )}
                                </div>
                                <span className="text-xs font-medium text-gray-600 w-8 text-right">
                                    {group.checklistProgress}
                                </span>
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
      </div>
    </div>
  );
}