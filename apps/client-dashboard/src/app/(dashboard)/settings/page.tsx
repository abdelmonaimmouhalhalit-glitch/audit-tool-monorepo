"use client";

import { useState } from "react";
import { Save, Building, User, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");

  return (
    <div className="max-w-4xl mx-auto pb-20">
      
      <h1 className="text-3xl font-bold text-[#1a1f36] mb-8">Settings</h1>

      {/* Onglets de navigation */}
      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
          {['General', 'Admins', 'Notifications', 'Billing', 'API Keys'].map((tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab
                    ? 'border-[#502aec] text-[#502aec]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
                {tab}
            </button>
          ))}
      </div>

      {/* Contenu - Formulaire General */}
      <div className="space-y-8">
        
        {/* Company Profile */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1a1f36] mb-1 flex items-center gap-2">
                <Building size={18} className="text-gray-400"/> Company Profile
            </h2>
            <p className="text-sm text-gray-500 mb-6">Your company details as they appear in reports.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">Company Name</label>
                    <input type="text" defaultValue="Audit Flash Inc." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#502aec]/20 focus:border-[#502aec]"/>
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">Website</label>
                    <input type="text" defaultValue="https://auditflash.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#502aec]/20 focus:border-[#502aec]"/>
                </div>
                <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-bold text-gray-700">Description</label>
                    <textarea defaultValue="Audit Flash provides cloud security automation..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#502aec]/20 focus:border-[#502aec] min-h-[80px]"/>
                </div>
            </div>
        </div>

        {/* Compliance Contacts */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
             <h2 className="text-lg font-bold text-[#1a1f36] mb-1 flex items-center gap-2">
                <Shield size={18} className="text-gray-400"/> Compliance Contacts
            </h2>
            <p className="text-sm text-gray-500 mb-6">Who should auditors contact regarding compliance?</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">Primary Contact</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                        <option>Billy Carr (billy@auditflash.com)</option>
                        <option>Madison Carter</option>
                    </select>
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">Technical Contact</label>
                     <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                        <option>Madison Carter (madison@auditflash.com)</option>
                        <option>Billy Carr</option>
                    </select>
                </div>
            </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-[#1a1f36] text-white rounded-lg text-sm font-bold hover:bg-[#2d334a] shadow-sm transition-colors">
                <Save size={16} />
                Save Changes
            </button>
        </div>

      </div>
    </div>
  );
}