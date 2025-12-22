"use client";

import { 
  Search, Download, Filter, Laptop, 
  CheckCircle2, AlertTriangle, Monitor, 
  Apple, ShieldAlert, MoreHorizontal 
} from "lucide-react";

// Données simulées des ordinateurs
const computersData = [
  {
    id: "C-01",
    name: "Billy's MacBook Pro",
    os: "macOS 14.2.1",
    osType: "mac",
    owner: "Billy Carr",
    agentStatus: "installed",
    encryption: "encrypted",
    serial: "FVFX...",
    lastCheck: "2 hours ago"
  },
  {
    id: "C-02",
    name: "Madison's ThinkPad",
    os: "Windows 11 Pro",
    osType: "windows",
    owner: "Madison Carter",
    agentStatus: "installed",
    encryption: "encrypted",
    serial: "PF2X...",
    lastCheck: "5 hours ago"
  },
  {
    id: "C-03",
    name: "Eng-Laptop-04",
    os: "macOS 13.5",
    osType: "mac",
    owner: "Unassigned",
    agentStatus: "missing",
    encryption: "unencrypted",
    serial: "C02...",
    lastCheck: "14 days ago"
  },
  {
    id: "C-04",
    name: "Frances's Air",
    os: "macOS 14.0",
    osType: "mac",
    owner: "Frances Bishop",
    agentStatus: "installed",
    encryption: "encrypted",
    serial: "FVFC...",
    lastCheck: "1 day ago"
  }
];

export default function ComputersPage() {
  return (
    <div className="space-y-6 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-[#1a1f36]">Computers</h1>
           <p className="text-gray-500 mt-1">
             Monitor device security, encryption status, and agent health.
           </p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700 shadow-sm transition-colors">
                <Download size={16} />
                Export CSV
            </button>
        </div>
      </div>

      {/* DASHBOARD STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                <CheckCircle2 size={24}/>
             </div>
             <div>
                <div className="text-2xl font-bold text-[#1a1f36]">3</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Secure Devices</div>
             </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600">
                <ShieldAlert size={24}/>
             </div>
             <div>
                <div className="text-2xl font-bold text-[#1a1f36]">1</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Unencrypted</div>
             </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                <Laptop size={24}/>
             </div>
             <div>
                <div className="text-2xl font-bold text-[#1a1f36]">4</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Inventory</div>
             </div>
          </div>
      </div>

      {/* FILTRES */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex gap-3 w-full p-2">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search computers or serials..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#502aec]/20 focus:border-[#502aec]"
                />
            </div>
            <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors flex items-center gap-2">
                <Filter size={14}/> Filter
            </button>
        </div>
      </div>

      {/* TABLEAU */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <tr>
                    <th className="px-6 py-4">Device Name</th>
                    <th className="px-6 py-4">Owner</th>
                    <th className="px-6 py-4">OS Version</th>
                    <th className="px-6 py-4">Agent Status</th>
                    <th className="px-6 py-4">Encryption</th>
                    <th className="px-6 py-4">Last Seen</th>
                    <th className="px-6 py-4 w-10"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
                {computersData.map((pc) => (
                    <tr key={pc.id} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                        
                        {/* Name + Icon */}
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="text-gray-400">
                                    {pc.osType === 'mac' ? <Apple size={18}/> : <Monitor size={18}/>}
                                </div>
                                <div>
                                    <div className="font-bold text-[#1a1f36]">{pc.name}</div>
                                    <div className="text-xs text-gray-400 font-mono">{pc.serial}</div>
                                </div>
                            </div>
                        </td>

                        {/* Owner */}
                        <td className="px-6 py-4">
                            {pc.owner === 'Unassigned' ? (
                                <span className="text-gray-400 italic">Unassigned</span>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[10px] flex items-center justify-center font-bold">
                                        {pc.owner.charAt(0)}
                                    </div>
                                    <span className="text-gray-700">{pc.owner}</span>
                                </div>
                            )}
                        </td>

                        {/* OS */}
                        <td className="px-6 py-4 text-gray-600">
                            {pc.os}
                        </td>

                        {/* Agent Status */}
                        <td className="px-6 py-4">
                            {pc.agentStatus === 'installed' ? (
                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded border border-green-100 bg-green-50 text-green-700 text-xs font-bold">
                                    <CheckCircle2 size={12}/> Installed
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded border border-red-100 bg-red-50 text-red-700 text-xs font-bold">
                                    <AlertTriangle size={12}/> Missing
                                </span>
                            )}
                        </td>

                        {/* Encryption */}
                        <td className="px-6 py-4">
                             {pc.encryption === 'encrypted' ? (
                                <span className="inline-flex items-center gap-1.5 text-green-600 text-xs font-bold">
                                    <CheckCircle2 size={14}/> Encrypted
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 text-red-600 text-xs font-bold">
                                    <ShieldAlert size={14}/> Not Encrypted
                                </span>
                            )}
                        </td>

                        {/* Last Seen */}
                        <td className="px-6 py-4 text-gray-500 text-xs">
                            {pc.lastCheck}
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