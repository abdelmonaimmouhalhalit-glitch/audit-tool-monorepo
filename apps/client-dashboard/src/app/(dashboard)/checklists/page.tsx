"use client";

import { useState } from "react";
import { 
  Search, Plus, Filter, ListTodo, 
  CheckSquare, UserPlus, UserMinus, MoreHorizontal 
} from "lucide-react";

// Données simulées des checklists
const checklistsData = [
  {
    id: 1,
    name: "Standard US Employee Onboarding",
    type: "Onboarding",
    assignedTo: "All Employees (US)",
    tasks: 12,
    completion: "84%",
    status: "active"
  },
  {
    id: 2,
    name: "Engineering Onboarding",
    type: "Onboarding",
    assignedTo: "Engineering Group",
    tasks: 4,
    completion: "92%",
    status: "active"
  },
  {
    id: 3,
    name: "Contractor Onboarding",
    type: "Onboarding",
    assignedTo: "Contractors",
    tasks: 5,
    completion: "60%",
    status: "active"
  },
  {
    id: 4,
    name: "Standard Offboarding",
    type: "Offboarding",
    assignedTo: "All Employees",
    tasks: 8,
    completion: "100%",
    status: "active"
  }
];

export default function ChecklistsPage() {
  const [activeTab, setActiveTab] = useState("Onboarding");

  return (
    <div className="space-y-6 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-[#1a1f36]">Checklists</h1>
           <p className="text-gray-500 mt-1">
             Manage onboarding and offboarding tasks for compliance.
           </p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-[#502aec] text-white rounded-lg text-sm font-semibold hover:bg-[#3b1c85] shadow-sm transition-colors">
                <Plus size={16} />
                Create Checklist
            </button>
        </div>
      </div>

      {/* ONGLETS (Tabs) */}
      <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {['Onboarding', 'Offboarding'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
                  ${activeTab === tab
                    ? 'border-[#502aec] text-[#502aec]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab === 'Onboarding' ? <UserPlus size={16}/> : <UserMinus size={16}/>}
                {tab}
              </button>
            ))}
          </nav>
      </div>

      {/* FILTRES */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex gap-3 w-full p-2">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search checklists..." 
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
                    <th className="px-6 py-4">Checklist Name</th>
                    <th className="px-6 py-4">Assigned Group</th>
                    <th className="px-6 py-4">Tasks</th>
                    <th className="px-6 py-4">Completion Rate</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 w-10"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
                {checklistsData
                  .filter(c => c.type === activeTab)
                  .map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                        
                        {/* Name */}
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                                    <ListTodo size={16} />
                                </div>
                                <div className="font-bold text-[#1a1f36]">{item.name}</div>
                            </div>
                        </td>

                        {/* Assigned Group */}
                        <td className="px-6 py-4 text-gray-600 font-medium">
                            {item.assignedTo}
                        </td>

                        {/* Tasks */}
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 text-gray-600">
                                <CheckSquare size={14} />
                                {item.tasks} tasks
                            </div>
                        </td>

                        {/* Completion */}
                        <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <div className="flex-1 w-24 bg-gray-100 rounded-full h-1.5">
                                    <div 
                                        className="h-1.5 rounded-full bg-[#502aec]" 
                                        style={{ width: item.completion }}
                                    ></div>
                                </div>
                                <span className="text-xs font-bold text-gray-600 w-8 text-right">
                                    {item.completion}
                                </span>
                            </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded border border-green-200 bg-green-50 text-green-700 text-xs font-bold">
                                Active
                            </span>
                        </td>

                        {/* Menu */}
                        <td className="px-6 py-4 text-right text-gray-300">
                             <MoreHorizontal size={18} className="group-hover:text-gray-600" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        
        {/* Empty State si pas de données */}
        {checklistsData.filter(c => c.type === activeTab).length === 0 && (
            <div className="p-12 text-center text-gray-500">
                <p>No checklists found for {activeTab}.</p>
            </div>
        )}
      </div>
    </div>
  );
}