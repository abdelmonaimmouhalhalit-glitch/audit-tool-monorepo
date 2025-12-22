"use client";

import { 
  Search, Plus, Building, FileCheck, 
  AlertCircle, ArrowUpRight, MoreHorizontal, FileText 
} from "lucide-react";

// Données simulées des fournisseurs
const vendorsData = [
  {
    id: 1,
    name: "Amazon Web Services (AWS)",
    category: "Cloud Provider",
    riskLevel: "Critical",
    securityReview: "Approved",
    documents: ["SOC 2 Type II", "ISO 27001"],
    nextReview: "Nov 2025"
  },
  {
    id: 2,
    name: "Slack",
    category: "Communication",
    riskLevel: "Medium",
    securityReview: "Approved",
    documents: ["SOC 2 Type II"],
    nextReview: "Oct 2025"
  },
  {
    id: 3,
    name: "Unknown PDF Converter Tool",
    category: "Productivity",
    riskLevel: "High",
    securityReview: "Pending", // Risque ici !
    documents: [],
    nextReview: "Overdue"
  },
  {
    id: 4,
    name: "GitHub",
    category: "Development",
    riskLevel: "High",
    securityReview: "Approved",
    documents: ["SOC 2 Type II"],
    nextReview: "Dec 2025"
  }
];

// Helper pour les badges de risque
const getRiskBadge = (level: string) => {
    switch(level) {
        case 'Critical': return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'High': return 'bg-red-100 text-red-800 border-red-200';
        case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-200';
        case 'Low': return 'bg-green-100 text-green-800 border-green-200';
        default: return 'bg-gray-100 text-gray-800';
    }
}

export default function VendorsPage() {
  return (
    <div className="space-y-6 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-[#1a1f36]">Vendors</h1>
           <p className="text-gray-500 mt-1">
             Manage third-party risk and security reviews.
           </p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-[#502aec] text-white rounded-lg text-sm font-semibold hover:bg-[#3b1c85] shadow-sm transition-colors">
                <Plus size={16} />
                Add Vendor
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
                    placeholder="Search vendors..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#502aec]/20 focus:border-[#502aec]"
                />
            </div>
        </div>
      </div>

      {/* TABLEAU */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <tr>
                    <th className="px-6 py-4">Vendor Name</th>
                    <th className="px-6 py-4">Risk Level</th>
                    <th className="px-6 py-4">Security Review</th>
                    <th className="px-6 py-4">Compliance Docs</th>
                    <th className="px-6 py-4">Next Review</th>
                    <th className="px-6 py-4 w-10"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
                {vendorsData.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                        
                        {/* Name + Category */}
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                                    <Building size={18} />
                                </div>
                                <div>
                                    <div className="font-bold text-[#1a1f36] flex items-center gap-1">
                                        {vendor.name} 
                                        <ArrowUpRight size={12} className="text-gray-400"/>
                                    </div>
                                    <div className="text-xs text-gray-500">{vendor.category}</div>
                                </div>
                            </div>
                        </td>

                        {/* Risk Level */}
                        <td className="px-6 py-4">
                             <span className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-bold ${getRiskBadge(vendor.riskLevel)}`}>
                                {vendor.riskLevel}
                            </span>
                        </td>

                        {/* Security Review */}
                        <td className="px-6 py-4">
                            {vendor.securityReview === 'Approved' ? (
                                <div className="flex items-center gap-2 text-green-700 font-medium text-xs">
                                    <FileCheck size={16} /> Approved
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-orange-600 font-medium text-xs">
                                    <AlertCircle size={16} /> {vendor.securityReview}
                                </div>
                            )}
                        </td>

                        {/* Docs */}
                        <td className="px-6 py-4">
                            <div className="flex gap-1 flex-wrap">
                                {vendor.documents.length > 0 ? (
                                    vendor.documents.map((doc, idx) => (
                                        <span key={idx} className="inline-flex items-center gap-1 bg-white border border-gray-200 px-2 py-0.5 rounded text-[10px] text-gray-600">
                                            <FileText size={10}/> {doc}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-400 text-xs italic">No docs uploaded</span>
                                )}
                            </div>
                        </td>

                        {/* Next Review */}
                        <td className="px-6 py-4 text-xs">
                             {vendor.nextReview === 'Overdue' ? (
                                 <span className="text-red-600 font-bold">Overdue</span>
                             ) : (
                                 <span className="text-gray-500">{vendor.nextReview}</span>
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