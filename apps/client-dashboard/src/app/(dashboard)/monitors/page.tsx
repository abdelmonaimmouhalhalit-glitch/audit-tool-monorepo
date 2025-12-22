"use client";

import { useState } from "react";
import { 
  Search, Filter, CheckCircle2, XCircle, 
  AlertTriangle, Play, Pause, MoreHorizontal,
  Server, Github, Lock, Laptop
} from "lucide-react";

// Données simulées pour les Moniteurs
const monitorsData = [
  {
    id: "MON-01",
    name: "Multi-factor authentication (MFA) is enabled for all users",
    description: "Verifies that all users in the identity provider have MFA enabled.",
    status: "passing", // passing | failing | disabled
    source: "Google Workspace",
    icon: Lock,
    lastRun: "15 minutes ago",
    failingCount: 0
  },
  {
    id: "MON-02",
    name: "Hard drive encryption is enabled on employee computers",
    description: "Checks if FileVault (Mac) or BitLocker (Windows) is active.",
    status: "failing",
    source: "Vanta Agent",
    icon: Laptop,
    lastRun: "1 hour ago",
    failingCount: 2 // 2 ordis non conformes
  },
  {
    id: "MON-03",
    name: "Database backups are encrypted at rest",
    description: "Ensures that RDS automated backups have encryption enabled.",
    status: "passing",
    source: "AWS",
    icon: Server,
    lastRun: "3 hours ago",
    failingCount: 0
  },
  {
    id: "MON-04",
    name: "Pull requests require at least one review",
    description: "Checks branch protection rules on default branches.",
    status: "passing",
    source: "GitHub",
    icon: Github,
    lastRun: "20 minutes ago",
    failingCount: 0
  },
  {
    id: "MON-05",
    name: "Root user account access usage",
    description: "Alerts if the AWS root account has been used recently.",
    status: "disabled",
    source: "AWS",
    icon: Server,
    lastRun: "Yesterday",
    failingCount: 0
  }
];

export default function MonitorsPage() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="space-y-6 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-[#1a1f36]">Monitors</h1>
           <p className="text-gray-500 mt-1">
             Automated tests running against your integrations to prove compliance.
           </p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700 shadow-sm transition-colors">
                Edit settings
            </button>
        </div>
      </div>

      {/* STATS RAPIDES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <CheckCircle2 size={20} />
              </div>
              <div>
                  <div className="text-2xl font-bold text-[#1a1f36]">92%</div>
                  <div className="text-xs font-semibold text-gray-500 uppercase">Passing rate</div>
              </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                  <XCircle size={20} />
              </div>
              <div>
                  <div className="text-2xl font-bold text-[#1a1f36]">3</div>
                  <div className="text-xs font-semibold text-gray-500 uppercase">Failing monitors</div>
              </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center">
                  <Play size={20} />
              </div>
              <div>
                  <div className="text-2xl font-bold text-[#1a1f36]">Active</div>
                  <div className="text-xs font-semibold text-gray-500 uppercase">Monitoring status</div>
              </div>
          </div>
      </div>

      {/* BARRE D'OUTILS */}
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex gap-6 overflow-x-auto w-full xl:w-auto">
            {['All', 'Passing', 'Failing', 'Disabled'].map((tab) => (
                <button 
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`text-sm font-medium border-b-2 pb-1 transition-colors whitespace-nowrap ${
                        filter === tab 
                        ? 'border-[#502aec] text-[#502aec]' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>

        <div className="flex gap-3 w-full xl:w-auto">
            <div className="relative flex-1 xl:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search monitors..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#502aec]/20 focus:border-[#502aec]"
                />
            </div>
            <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors flex items-center gap-2">
                <Filter size={14}/> Filter
            </button>
        </div>
      </div>

      {/* LISTE DES MONITEURS */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <tr>
                    <th className="px-6 py-4">Monitor Name</th>
                    <th className="px-6 py-4">Source</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Last Run</th>
                    <th className="px-6 py-4 w-10"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
                {monitorsData.map((mon) => (
                    <tr key={mon.id} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                        
                        {/* Name + Description */}
                        <td className="px-6 py-4 max-w-md">
                            <div className="flex items-start gap-3">
                                <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500`}>
                                    <mon.icon size={16} />
                                </div>
                                <div>
                                    <div className="font-bold text-[#1a1f36]">{mon.name}</div>
                                    <div className="text-gray-500 text-xs mt-0.5 line-clamp-1">{mon.description}</div>
                                </div>
                            </div>
                        </td>

                        {/* Source */}
                        <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded border border-gray-200 bg-white text-xs font-medium text-gray-700">
                                {mon.source}
                            </span>
                        </td>

                        {/* Status (Badge Vanta Style) */}
                        <td className="px-6 py-4">
                            {mon.status === 'passing' && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                                    <CheckCircle2 size={12} className="fill-current" />
                                    Test is passing
                                </span>
                            )}
                            {mon.status === 'failing' && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-100">
                                    <AlertTriangle size={12} className="fill-current" />
                                    Failing ({mon.failingCount})
                                </span>
                            )}
                            {mon.status === 'disabled' && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-bold border border-gray-200">
                                    <Pause size={12} className="fill-current" />
                                    Disabled
                                </span>
                            )}
                        </td>

                        {/* Last Run */}
                        <td className="px-6 py-4 text-gray-500 text-xs">
                            {mon.lastRun}
                        </td>

                        {/* Action Menu */}
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