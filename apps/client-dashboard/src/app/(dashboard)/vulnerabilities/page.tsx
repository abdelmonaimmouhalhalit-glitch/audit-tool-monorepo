"use client";

import { useState } from "react";
import { 
  Search, Filter, Bug, AlertCircle, 
  Clock, CheckCircle2, MoreHorizontal 
} from "lucide-react";

// Données simulées des vulnérabilités
const vulnsData = [
  {
    id: "CVE-2024-1234",
    name: "Remote Code Execution in Log4j",
    severity: "Critical",
    asset: "production-web-server-01",
    source: "AWS Inspector",
    detected: "2 days ago",
    sla: "Due in 24 hours",
    slaStatus: "warning" // ok | warning | overdue
  },
  {
    id: "CVE-2023-5678",
    name: "Cross-site Scripting (XSS) in Login",
    severity: "High",
    asset: "client-dashboard-app",
    source: "GitHub Dependabot",
    detected: "5 days ago",
    sla: "Due in 10 days",
    slaStatus: "ok"
  },
  {
    id: "CVE-2023-9999",
    name: "Outdated SSH Protocol Version",
    severity: "Medium",
    asset: "bastion-host",
    source: "AWS Inspector",
    detected: "12 days ago",
    sla: "Due in 45 days",
    slaStatus: "ok"
  },
  {
    id: "CVE-2022-0001",
    name: "Information Disclosure in API",
    severity: "Low",
    asset: "staging-db",
    source: "Manual Pentest",
    detected: "20 days ago",
    sla: "No SLA",
    slaStatus: "ok"
  }
];

// Helper pour les couleurs de sévérité
const getSeverityBadge = (level: string) => {
    switch(level) {
        case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
        case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
        case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'Low': return 'bg-blue-100 text-blue-800 border-blue-200';
        default: return 'bg-gray-100 text-gray-800';
    }
}

export default function VulnerabilitiesPage() {
  return (
    <div className="space-y-6 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-[#1a1f36]">Vulnerabilities</h1>
           <p className="text-gray-500 mt-1">
             Manage security findings across your code and infrastructure.
           </p>
        </div>
        
        {/* Résumé rapide des SLA */}
        <div className="flex gap-4 text-sm font-medium">
            <div className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-full border border-red-100">
                <AlertCircle size={14}/> 1 Critical
            </div>
             <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-700 rounded-full border border-orange-100">
                <Clock size={14}/> 1 High
            </div>
        </div>
      </div>

      {/* FILTRES */}
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-center bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex gap-3 w-full p-2">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search by CVE or asset..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#502aec]/20 focus:border-[#502aec]"
                />
            </div>
            <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors flex items-center gap-2">
                <Filter size={14}/> Filter
            </button>
            <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
                Group by Asset
            </button>
        </div>
      </div>

      {/* TABLEAU */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <tr>
                    <th className="px-6 py-4">Vulnerability</th>
                    <th className="px-6 py-4">Severity</th>
                    <th className="px-6 py-4">Affected Asset</th>
                    <th className="px-6 py-4">Detected</th>
                    <th className="px-6 py-4">SLA Status</th>
                    <th className="px-6 py-4 w-10"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
                {vulnsData.map((vuln) => (
                    <tr key={vuln.id} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                        
                        {/* Name + CVE */}
                        <td className="px-6 py-4 max-w-sm">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 text-gray-400">
                                    <Bug size={16} />
                                </div>
                                <div>
                                    <div className="font-bold text-[#1a1f36]">{vuln.name}</div>
                                    <div className="text-xs text-gray-500 font-mono mt-0.5">{vuln.id}</div>
                                </div>
                            </div>
                        </td>

                        {/* Severity */}
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-bold ${getSeverityBadge(vuln.severity)}`}>
                                {vuln.severity}
                            </span>
                        </td>

                        {/* Asset */}
                        <td className="px-6 py-4">
                            <div className="font-medium text-gray-700">{vuln.asset}</div>
                            <div className="text-xs text-gray-400">{vuln.source}</div>
                        </td>

                        {/* Detected */}
                        <td className="px-6 py-4 text-gray-500 text-xs">
                            {vuln.detected}
                        </td>

                        {/* SLA */}
                        <td className="px-6 py-4">
                             {vuln.slaStatus === 'warning' ? (
                                <span className="inline-flex items-center gap-1.5 text-orange-600 text-xs font-bold">
                                    <Clock size={14}/> {vuln.sla}
                                </span>
                             ) : (
                                <span className="inline-flex items-center gap-1.5 text-gray-500 text-xs">
                                    <CheckCircle2 size={14} className="text-green-500"/> {vuln.sla}
                                </span>
                             )}
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