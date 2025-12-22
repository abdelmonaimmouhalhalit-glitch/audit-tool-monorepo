"use client";

import { useState } from "react";
import { 
  Shield, Eye, Share2, FileText, CheckCircle2, 
  Settings, Lock, Globe, Download, Users 
} from "lucide-react";

export default function ReportsPage() {
  const [isPublic, setIsPublic] = useState(true);
  const [requireNDA, setRequireNDA] = useState(true);

  return (
    <div className="space-y-8 pb-20">
      
      {/* --- 1. HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-bold text-[#1a1f36]">Trust Report</h1>
              <span className="bg-green-100 text-green-700 border border-green-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Live
              </span>
           </div>
           <p className="text-gray-500 text-sm">
             Manage your public security profile and share compliance documents.
           </p>
        </div>
        
        <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700 shadow-sm transition-colors">
                <Eye size={16} />
                View live page
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#502aec] text-white rounded-lg text-sm font-semibold hover:bg-[#3b1c85] shadow-sm transition-colors">
                <Share2 size={16} />
                Share report
            </button>
        </div>
      </div>

      {/* --- 2. STATS & STATUS --- */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 w-full">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 border border-green-100">
                <Shield size={24} />
            </div>
            <div>
                <h2 className="text-lg font-bold text-[#1a1f36]">Your Trust Report is active</h2>
                <p className="text-sm text-gray-500">
                    Accessible at <span className="text-[#502aec] font-medium hover:underline cursor-pointer">trust.auditflash.com</span>
                </p>
            </div>
        </div>
        
        {/* Métriques */}
        <div className="flex gap-8 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8 w-full md:w-auto justify-around md:justify-end">
             <div className="text-center md:text-right">
                <div className="text-2xl font-bold text-[#1a1f36]">128</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Page Views</div>
             </div>
             <div className="text-center md:text-right">
                <div className="text-2xl font-bold text-[#1a1f36]">12</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Access Requests</div>
             </div>
        </div>
      </div>

      {/* --- 3. CONTENU PRINCIPAL --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLONNE GAUCHE : Documents (2/3 largeur) */}
          <div className="lg:col-span-2 space-y-8">
              
              {/* Liste des documents partagés */}
              <div>
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-[#1a1f36] text-lg">Shared Documents</h3>
                      <button className="text-sm font-medium text-[#502aec] hover:underline">Manage documents</button>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm divide-y divide-gray-100">
                      {[
                          { name: "SOC 2 Type II Report", date: "Nov 2024", access: "Protected (NDA)", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
                          { name: "Penetration Test Summary", date: "Oct 2024", access: "Public", icon: Shield, color: "text-purple-600", bg: "bg-purple-50" },
                          { name: "ISO 27001 Certificate", date: "Jan 2024", access: "Public", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
                      ].map((doc, i) => (
                          <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                              <div className="flex items-center gap-4">
                                  <div className={`w-10 h-10 ${doc.bg} rounded-lg flex items-center justify-center ${doc.color} border border-black/5`}>
                                      <doc.icon size={20} />
                                  </div>
                                  <div>
                                      <h4 className="text-sm font-bold text-[#1a1f36]">{doc.name}</h4>
                                      <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span>PDF</span>
                                        <span>•</span>
                                        <span>Updated {doc.date}</span>
                                      </div>
                                  </div>
                              </div>
                              <div className="flex items-center gap-4">
                                  <span className={`text-xs font-bold px-2 py-1 rounded border ${
                                      doc.access.includes("Protected") 
                                      ? "bg-amber-50 text-amber-700 border-amber-200" 
                                      : "bg-gray-50 text-gray-600 border-gray-200"
                                  }`}>
                                      {doc.access}
                                  </span>
                                  <button className="p-2 text-gray-300 hover:text-[#502aec] transition-colors">
                                      <Download size={18} />
                                  </button>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Demandes d'accès récentes */}
               <div>
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-[#1a1f36] text-lg">Recent Access Requests</h3>
                      <button className="text-sm font-medium text-[#502aec] hover:underline">View all history</button>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                      <table className="w-full text-left text-sm">
                          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                              <tr>
                                  <th className="px-6 py-3">User</th>
                                  <th className="px-6 py-3">Company</th>
                                  <th className="px-6 py-3">Requested</th>
                                  <th className="px-6 py-3 text-right">Action</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                              {[
                                  { email: "john.doe@enterprise.com", name: "John Doe", company: "Big Enterprise Inc.", date: "2 hours ago" },
                                  { email: "sarah@startup.io", name: "Sarah Smith", company: "Tech IO", date: "5 hours ago" },
                              ].map((req, i) => (
                                  <tr key={i} className="hover:bg-gray-50/50">
                                      <td className="px-6 py-4">
                                          <div className="font-bold text-[#1a1f36]">{req.name}</div>
                                          <div className="text-xs text-gray-500">{req.email}</div>
                                      </td>
                                      <td className="px-6 py-4 text-gray-600 font-medium">{req.company}</td>
                                      <td className="px-6 py-4 text-gray-500 text-xs">{req.date}</td>
                                      <td className="px-6 py-4 text-right">
                                          <div className="flex justify-end gap-2">
                                            <button className="text-xs font-bold border border-gray-200 text-gray-600 px-3 py-1.5 rounded hover:bg-gray-50 transition-colors">
                                                Deny
                                            </button>
                                            <button className="text-xs font-bold bg-[#502aec] text-white px-3 py-1.5 rounded hover:bg-[#3b1c85] transition-colors shadow-sm">
                                                Approve
                                            </button>
                                          </div>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
               </div>
          </div>

          {/* COLONNE DROITE : Settings (1/3 largeur) */}
          <div className="space-y-6">
              
              {/* Carte de Configuration */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-[#1a1f36] mb-6 flex items-center gap-2">
                      <Settings size={18} className="text-gray-400"/> Configuration
                  </h3>
                  
                  <div className="space-y-6">
                      {/* Toggle Public */}
                      <div className="flex items-start gap-3">
                          <Globe size={18} className="text-gray-400 mt-0.5" />
                          <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                  <div className="text-sm font-bold text-[#1a1f36]">Public Access</div>
                                  <div 
                                    onClick={() => setIsPublic(!isPublic)}
                                    className={`relative inline-flex h-5 w-9 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${isPublic ? 'bg-[#502aec]' : 'bg-gray-200'}`}
                                  >
                                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out mt-1 ml-1 ${isPublic ? 'translate-x-4' : 'translate-x-0'}`} />
                                  </div>
                              </div>
                              <p className="text-xs text-gray-500 leading-relaxed">Allow anyone with the link to view your public profile.</p>
                          </div>
                      </div>
                      
                      <hr className="border-gray-100" />

                      {/* Toggle NDA */}
                      <div className="flex items-start gap-3">
                          <Lock size={18} className="text-gray-400 mt-0.5" />
                          <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                  <div className="text-sm font-bold text-[#1a1f36]">NDA Requirement</div>
                                  <div 
                                    onClick={() => setRequireNDA(!requireNDA)}
                                    className={`relative inline-flex h-5 w-9 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${requireNDA ? 'bg-[#502aec]' : 'bg-gray-200'}`}
                                  >
                                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out mt-1 ml-1 ${requireNDA ? 'translate-x-4' : 'translate-x-0'}`} />
                                  </div>
                              </div>
                              <p className="text-xs text-gray-500 leading-relaxed">Require visitors to sign a Non-Disclosure Agreement before viewing protected documents.</p>
                          </div>
                      </div>
                  </div>

                  <button className="w-full mt-8 text-sm font-bold border border-gray-200 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                      Advanced Settings
                  </button>
              </div>

              {/* Carte CRM / Ventes */}
              <div className="bg-[#1a1f36] rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Users size={100} />
                  </div>
                  <h3 className="font-bold mb-2 relative z-10">Accelerate Sales</h3>
                  <p className="text-xs text-gray-300 mb-6 leading-relaxed relative z-10">
                      Connect your CRM to automatically share your Trust Report with prospects and track their engagement.
                  </p>
                  <button className="w-full bg-white/10 hover:bg-white/20 text-white text-sm font-bold py-2 rounded-lg transition-colors border border-white/20 relative z-10">
                      Connect Salesforce / HubSpot
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
}