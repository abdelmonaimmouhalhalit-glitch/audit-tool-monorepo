"use client";

import { useState } from "react";
import { 
  Search, Plus, Filter, FileCheck, 
  Calendar, CheckCircle2, Clock, 
  ArrowRight, MoreHorizontal, Users 
} from "lucide-react";

// Données simulées des campagnes de révision
const reviewsData = [
  {
    id: 1,
    name: "Q4 2024 Critical Infrastructure Review",
    systems: ["AWS", "Google Cloud"],
    reviewer: "Billy Carr",
    progress: 12,
    total: 45,
    dueDate: "Dec 31, 2024",
    status: "In Progress",
    statusType: "active"
  },
  {
    id: 2,
    name: "H2 2024 GitHub Access Review",
    systems: ["GitHub"],
    reviewer: "Madison Carter",
    progress: 88,
    total: 88,
    dueDate: "Dec 15, 2024",
    status: "Completed",
    statusType: "completed"
  },
  {
    id: 3,
    name: "Q3 2024 Employee Offboarding Audit",
    systems: ["Google Workspace", "Slack", "Notion"],
    reviewer: "HR Team",
    progress: 120,
    total: 120,
    dueDate: "Sep 30, 2024",
    status: "Completed",
    statusType: "completed"
  },
  {
    id: 4,
    name: "Q1 2025 Admin Privileges Review",
    systems: ["All Systems"],
    reviewer: "Unassigned",
    progress: 0,
    total: 15,
    dueDate: "Mar 31, 2025",
    status: "Draft",
    statusType: "draft"
  }
];

export default function AccessReviewsPage() {
  const [activeTab, setActiveTab] = useState("Open");

  // Filtrage simple pour l'exemple
  const filteredReviews = reviewsData.filter(review => {
    if (activeTab === "Open") return review.statusType === "active" || review.statusType === "draft";
    if (activeTab === "Completed") return review.statusType === "completed";
    return true;
  });

  return (
    <div className="space-y-6 pb-20">
      
      {/* --- 1. HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-[#1a1f36]">Access Reviews</h1>
           <p className="text-gray-500 mt-1">
             Conduct periodic reviews of user access to ensure least privilege.
           </p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-[#502aec] text-white rounded-lg text-sm font-semibold hover:bg-[#3b1c85] shadow-sm transition-colors">
                <Plus size={16} />
                New Access Review
            </button>
        </div>
      </div>

      {/* --- 2. TABS & METRICS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Navigation Tabs */}
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-xl shadow-sm p-1 flex items-center gap-1">
             {['Open', 'Completed', 'All'].map((tab) => (
                 <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                        activeTab === tab 
                        ? "bg-gray-100 text-[#1a1f36] shadow-sm" 
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                 >
                     {tab}
                 </button>
             ))}
          </div>

          {/* Quick Stat */}
          <div className="bg-[#1a1f36] text-white rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider font-bold">Upcoming</div>
                  <div className="text-xl font-bold">3 Reviews</div>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Calendar size={20} />
              </div>
          </div>
      </div>

      {/* --- 3. FILTRES --- */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex gap-3 w-full p-2">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search reviews..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#502aec]/20 focus:border-[#502aec]"
                />
            </div>
            <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors flex items-center gap-2">
                <Filter size={14}/> Filter
            </button>
        </div>
      </div>

      {/* --- 4. LISTE DES REVIEWS --- */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
                <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        
                        {/* Info Principale */}
                        <div className="flex items-start gap-4 flex-1">
                            <div className={`mt-1 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                review.statusType === 'completed' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                            }`}>
                                <FileCheck size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[#1a1f36] group-hover:text-[#502aec] transition-colors">
                                    {review.name}
                                </h3>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {review.systems.map((sys, idx) => (
                                        <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded border border-gray-200 font-medium">
                                            {sys}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Barre de Progression */}
                        <div className="w-full md:w-64">
                            <div className="flex justify-between text-xs mb-1.5">
                                <span className="font-medium text-gray-700">Progress</span>
                                <span className="text-gray-500">{review.progress} / {review.total} users</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div 
                                    className={`h-2 rounded-full transition-all duration-500 ${
                                        review.progress === review.total ? 'bg-green-500' : 'bg-[#502aec]'
                                    }`} 
                                    style={{ width: `${(review.progress / review.total) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Meta Data & Status */}
                        <div className="flex items-center gap-8 md:w-auto w-full justify-between md:justify-end">
                            <div className="text-right hidden md:block">
                                <div className="text-xs text-gray-500">Due Date</div>
                                <div className="text-sm font-bold text-[#1a1f36] flex items-center gap-1">
                                    <Clock size={14} className="text-gray-400"/> {review.dueDate}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {review.statusType === 'completed' ? (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                                        <CheckCircle2 size={14}/> Completed
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                                        <Users size={14}/> {review.status}
                                    </span>
                                )}
                                
                                <div className="p-2 text-gray-300 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                                    <ArrowRight size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <div className="text-center py-12 bg-white border border-gray-200 rounded-xl border-dashed">
                <div className="mx-auto w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-3">
                    <FileCheck size={24} />
                </div>
                <h3 className="text-sm font-bold text-gray-900">No reviews found</h3>
                <p className="text-sm text-gray-500 mt-1">Try changing the filters or create a new review.</p>
            </div>
        )}
      </div>
    </div>
  );
}