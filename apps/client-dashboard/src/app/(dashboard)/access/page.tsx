"use client";

import { 
  Search, Filter, Key, Shield, AlertTriangle, 
  CheckCircle2, Download, ExternalLink, MoreHorizontal 
} from "lucide-react";

// Données simulées des accès
const accessData = [
  {
    id: 1,
    user: "Billy Carr",
    role: "Admin",
    systems: [
      { name: "AWS", access: "Admin", mfa: true },
      { name: "GitHub", access: "Maintainer", mfa: true },
      { name: "Google Workspace", access: "Super Admin", mfa: true }
    ],
    status: "compliant"
  },
  {
    id: 2,
    user: "Madison Carter",
    role: "Engineer",
    systems: [
      { name: "AWS", access: "Read Only", mfa: true },
      { name: "GitHub", access: "Write", mfa: true },
      { name: "Jira", access: "User", mfa: true }
    ],
    status: "compliant"
  },
  {
    id: 3,
    user: "Frances Bishop",
    role: "Sales",
    systems: [
      { name: "Salesforce", access: "User", mfa: false }, // MFA Manquant !
      { name: "Google Workspace", access: "User", mfa: true }
    ],
    status: "risk"
  },
  {
    id: 4,
    user: "Service Account: CI/CD",
    role: "Bot",
    systems: [
      { name: "AWS", access: "Deployer", mfa: "n/a" },
      { name: "GitHub", access: "Read", mfa: "n/a" }
    ],
    status: "compliant"
  }
];

export default function AccessPage() {
  return (
    <div className="space-y-6 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-[#1a1f36]">Access</h1>
           <p className="text-gray-500 mt-1">
             Review user permissions and ensure MFA is enabled across all systems.
           </p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700 shadow-sm transition-colors">
                <Download size={16} />
                Export Access Matrix
            </button>
        </div>
      </div>

      {/* FILTRES */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex gap-3 w-full p-2">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search users or systems..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#502aec]/20 focus:border-[#502aec]"
                />
            </div>
            <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors flex items-center gap-2">
                <Filter size={14}/> Filter by System
            </button>
        </div>
      </div>

      {/* TABLEAU */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <tr>
                    <th className="px-6 py-4">User / Account</th>
                    <th className="px-6 py-4">Internal Role</th>
                    <th className="px-6 py-4">System Access & MFA</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 w-10"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
                {accessData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors group">
                        
                        {/* User */}
                        <td className="px-6 py-4 font-medium text-[#1a1f36]">
                            <div className="flex items-center gap-2">
                                {item.role === 'Bot' ? <Key size={16} className="text-gray-400"/> : <Shield size={16} className="text-gray-400"/>}
                                {item.user}
                            </div>
                        </td>

                        {/* Role */}
                        <td className="px-6 py-4 text-gray-600">
                            {item.role}
                        </td>

                        {/* Systems List */}
                        <td className="px-6 py-4">
                            <div className="flex flex-col gap-2">
                                {item.systems.map((sys, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-xs bg-gray-50 px-2 py-1 rounded border border-gray-100 max-w-xs">
                                        <span className="font-semibold text-gray-700">{sys.name}: {sys.access}</span>
                                        {sys.mfa === true && <span className="text-green-600 font-bold ml-2">MFA ON</span>}
                                        {sys.mfa === false && <span className="text-red-600 font-bold ml-2">MFA OFF</span>}
                                        {sys.mfa === "n/a" && <span className="text-gray-400 ml-2">Service</span>}
                                    </div>
                                ))}
                            </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                             {item.status === 'compliant' ? (
                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                                    <CheckCircle2 size={12}/> Compliant
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-100">
                                    <AlertTriangle size={12}/> Review Needed
                                </span>
                            )}
                        </td>

                        {/* Menu */}
                        <td className="px-6 py-4 text-right text-gray-300">
                             <MoreHorizontal size={18} className="group-hover:text-gray-600 cursor-pointer" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}