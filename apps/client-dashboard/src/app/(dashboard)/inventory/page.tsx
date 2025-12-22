"use client";

import { useState } from "react";
import { 
  Search, Filter, Download, Package, 
  Server, Database, Cloud, Globe, 
  MoreHorizontal, CheckCircle2, XCircle 
} from "lucide-react";

// Données simulées de l'inventaire Cloud
const inventoryData = [
  {
    id: "i-0f9a8b7c6d5e4f3a2",
    name: "prod-web-server-01",
    type: "EC2 Instance",
    category: "Compute",
    source: "AWS (us-east-1)",
    owner: "Billy Carr",
    status: "Monitored",
    tags: ["Production", "Web"]
  },
  {
    id: "db-prod-primary",
    name: "production-primary-db",
    type: "RDS Instance",
    category: "Database",
    source: "AWS (us-east-1)",
    owner: "Madison Carter",
    status: "Monitored",
    tags: ["Production", "PII Data"]
  },
  {
    id: "s3-audit-logs",
    name: "audit-flash-logs-archive",
    type: "S3 Bucket",
    category: "Storage",
    source: "AWS (us-west-2)",
    owner: "DevOps Team",
    status: "Monitored",
    tags: ["Logs", "Retention"]
  },
  {
    id: "lb-app-internal",
    name: "internal-tools-lb",
    type: "Load Balancer",
    category: "Network",
    source: "AWS (us-east-1)",
    owner: "Unassigned",
    status: "Ignored", // Pas dans le scope
    tags: ["Internal", "Staging"]
  },
  {
    id: "gcp-bigquery-analytics",
    name: "user-analytics-warehouse",
    type: "BigQuery Dataset",
    category: "Database",
    source: "GCP",
    owner: "Data Team",
    status: "Monitored",
    tags: ["Analytics"]
  }
];

// Helper pour l'icône selon le type
const getAssetIcon = (category: string) => {
    switch(category) {
        case 'Compute': return <Server size={18} />;
        case 'Database': return <Database size={18} />;
        case 'Network': return <Globe size={18} />;
        case 'Storage': return <Cloud size={18} />;
        default: return <Package size={18} />;
    }
};

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredData = activeTab === "All" 
    ? inventoryData 
    : inventoryData.filter(item => item.category === activeTab);

  return (
    <div className="space-y-6 pb-20">
      
      {/* --- 1. HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-[#1a1f36]">Inventory</h1>
           <p className="text-gray-500 mt-1">
             Real-time inventory of your cloud infrastructure and assets.
           </p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700 shadow-sm transition-colors">
                <Download size={16} />
                Export CSV
            </button>
        </div>
      </div>

      {/* --- 2. STATS & TABS --- */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-1 flex overflow-x-auto">
         {['All', 'Compute', 'Database', 'Storage', 'Network'].map((tab) => (
             <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[100px] py-2.5 text-sm font-medium rounded-lg transition-all ${
                    activeTab === tab 
                    ? "bg-gray-100 text-[#1a1f36] font-bold shadow-sm" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
             >
                 {tab}
             </button>
         ))}
      </div>

      {/* --- 3. FILTRES --- */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex gap-3 w-full p-2">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search resources (name, id, tag)..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#502aec]/20 focus:border-[#502aec]"
                />
            </div>
            <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors flex items-center gap-2">
                <Filter size={14}/> Filter
            </button>
        </div>
      </div>

      {/* --- 4. TABLEAU --- */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <tr>
                    <th className="px-6 py-4">Resource Name</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Source</th>
                    <th className="px-6 py-4">Owner</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 w-10"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
                {filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                        
                        {/* Name + Tags */}
                        <td className="px-6 py-4 max-w-xs">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 text-gray-400">
                                    {getAssetIcon(item.category)}
                                </div>
                                <div>
                                    <div className="font-bold text-[#1a1f36]">{item.name}</div>
                                    <div className="text-xs text-gray-400 font-mono mt-0.5">{item.id}</div>
                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                        {item.tags.map(tag => (
                                            <span key={tag} className="inline-flex px-1.5 py-0.5 rounded bg-gray-100 border border-gray-200 text-[10px] text-gray-600">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </td>

                        {/* Type */}
                        <td className="px-6 py-4">
                            <span className="text-gray-700 font-medium">{item.type}</span>
                        </td>

                        {/* Source */}
                        <td className="px-6 py-4 text-gray-500 text-xs">
                            {item.source}
                        </td>

                        {/* Owner */}
                        <td className="px-6 py-4">
                             {item.owner === 'Unassigned' ? (
                                 <span className="text-gray-400 italic">Unassigned</span>
                             ) : (
                                 <span className="text-gray-700">{item.owner}</span>
                             )}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                             {item.status === 'Monitored' ? (
                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                                    <CheckCircle2 size={12}/> Monitored
                                </span>
                             ) : (
                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-bold border border-gray-200">
                                    <XCircle size={12}/> Ignored
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
        
        {/* Empty State */}
        {filteredData.length === 0 && (
            <div className="p-12 text-center text-gray-500">
                <Package size={32} className="mx-auto mb-3 text-gray-300"/>
                <p>No resources found for {activeTab}.</p>
            </div>
        )}
      </div>
    </div>
  );
}