"use client";

import { useState } from "react";
import { 
  Search, Plus, Download, ChevronDown, ChevronRight, 
  FileText, Filter, MoreHorizontal, CheckCircle2 
} from "lucide-react";

// --- 1. Données initiales (Statiques au départ) ---
const INITIAL_GROUPS = [
  {
    category: "Human Resources",
    progress: "2 / 38 OK",
    subSections: [
      {
        title: "Account Access",
        needsCount: 8,
        isOpen: true, // Celui-ci démarre ouvert
        items: [
          {
            name: "Keys and Cards stored securely",
            badges: ["MVSP"],
            owner: "Unassigned",
            status: "Needs document",
            statusType: "todo" 
          },
          {
            name: "Log data protected from modification or deletion",
            badges: ["NIST CSF"],
            owner: "Billy Carr",
            status: "Needs document",
            statusType: "todo"
          },
          {
            name: "Maintenance tooling and technology is secured",
            badges: ["NIST CSF"],
            owner: "Billy Carr",
            status: "Needs document",
            statusType: "todo"
          },
          {
            name: "Non-privileged user lists generated",
            badges: ["MVSP", "+2"],
            owner: "Billy Carr",
            status: "Needs document",
            statusType: "todo"
          },
          {
            name: "Permissions are informed by risk level",
            badges: ["NIST CSF"],
            owner: "Billy Carr",
            status: "Needs document",
            statusType: "todo"
          },
          {
            name: "Secure identity provider or SSO used wherever possible",
            badges: ["MVSP"],
            owner: "Unassigned",
            status: "Needs document",
            statusType: "todo"
          }
        ]
      },
      {
        title: "People",
        needsCount: 6,
        isOpen: false, // Fermé au démarrage
        items: [
             // Données fictives pour tester l'ouverture
             { name: "Background checks policy", badges: ["SOC 2"], owner: "HR", status: "Needs document", statusType: "todo" }
        ]
      },
      {
        title: "Employees",
        needsCount: 16,
        isOpen: false,
        items: []
      }
    ]
  },
  {
    category: "Information Technology",
    progress: "1 / 43 OK",
    subSections: [
      { title: "IT", needsCount: 19, isOpen: false, items: [] },
      { title: "Computers", needsCount: 7, isOpen: false, items: [] }
    ]
  }
];

export default function DocumentsPage() {
  // --- 2. État pour gérer l'ouverture/fermeture ---
  const [groups, setGroups] = useState(INITIAL_GROUPS);

  // --- 3. Fonction pour basculer (Toggle) une section ---
  const toggleSection = (groupIndex: number, subSectionIndex: number) => {
    setGroups(prevGroups => {
      // On crée une copie propre de l'état pour ne pas le muter directement
      const newGroups = [...prevGroups];
      const newGroup = { ...newGroups[groupIndex] };
      const newSubSections = [...newGroup.subSections];
      const newSubSection = { ...newSubSections[subSectionIndex] };

      // On inverse la valeur (true -> false, false -> true)
      newSubSection.isOpen = !newSubSection.isOpen;

      // On remet tout dans la structure
      newSubSections[subSectionIndex] = newSubSection;
      newGroup.subSections = newSubSections;
      newGroups[groupIndex] = newGroup;

      return newGroups;
    });
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-[#1a1f36]">Documents</h1>
        
        <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700 shadow-sm transition-colors">
                <Download size={16} />
                Export all
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#502aec] text-white rounded-lg text-sm font-semibold hover:bg-[#3b1c85] shadow-sm transition-colors">
                <Plus size={16} />
                Add document
            </button>
        </div>
      </div>

      {/* FILTRES */}
      <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
        <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
                type="text" 
                placeholder="Search all documents" 
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#502aec]/20 focus:border-[#502aec] shadow-sm"
            />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-500 mr-1">Filter by</span>
            {['Status', 'Category', 'Frequency', 'Framework', 'Priority', 'Owner'].map((filter) => (
                <button key={filter} className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
                    {filter}
                </button>
            ))}
        </div>
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="space-y-8">
        {groups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-4">
                
                {/* En-tête de Catégorie */}
                <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                    <h2 className="text-xl font-bold text-[#1a1f36]">{group.category}</h2>
                    <div className="flex items-center gap-2 text-sm border border-gray-200 rounded-full px-3 py-1 bg-white shadow-sm text-gray-600 font-medium">
                        {group.progress.includes("OK") ? (
                             <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                        ) : null}
                        {group.progress}
                    </div>
                </div>

                {/* Sous-sections (Accordéons) */}
                <div className="space-y-3">
                    {group.subSections.map((sub, subIdx) => (
                        <div key={subIdx} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-200">
                            
                            {/* --- ZONE CLIQUABLE POUR OUVRIR/FERMER --- */}
                            <div 
                                onClick={() => toggleSection(groupIdx, subIdx)} // L'action se passe ici
                                className={`px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors select-none ${sub.isOpen ? 'border-b border-gray-100 bg-gray-50/50' : ''}`}
                            >
                                <div className="flex items-center gap-3">
                                    {/* L'icône change selon l'état */}
                                    {sub.isOpen ? <ChevronDown size={18} className="text-gray-500"/> : <ChevronRight size={18} className="text-gray-500"/>}
                                    <span className="font-bold text-[#1a1f36] text-sm">{sub.title}</span>
                                </div>
                                <div className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-full border border-gray-200">
                                    ● {sub.needsCount} Need documents
                                </div>
                            </div>

                            {/* --- LISTE DES ITEMS (Affichée seulement si isOpen est true) --- */}
                            {sub.isOpen && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                                    {/* En-têtes */}
                                    <div className="grid grid-cols-12 gap-4 px-6 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/30">
                                        <div className="col-span-6">Document Name (#)</div>
                                        <div className="col-span-3">Owner</div>
                                        <div className="col-span-3 text-right">Status</div>
                                    </div>

                                    {/* Lignes */}
                                    <div className="divide-y divide-gray-100">
                                        {sub.items.length > 0 ? (
                                            sub.items.map((item, itemIdx) => (
                                                <div key={itemIdx} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors group">
                                                    
                                                    {/* Nom + Badges */}
                                                    <div className="col-span-6 flex items-start gap-3">
                                                        <input type="checkbox" className="mt-1 rounded border-gray-300 text-[#502aec] focus:ring-[#502aec] cursor-pointer" />
                                                        <div>
                                                            <div className="text-sm font-medium text-[#1a1f36] mb-1">{item.name}</div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {item.badges.map(badge => (
                                                                    <span key={badge} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                                                        {badge}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Owner */}
                                                    <div className="col-span-3 text-sm text-gray-500">
                                                        {item.owner}
                                                    </div>

                                                    {/* Status */}
                                                    <div className="col-span-3 flex justify-end">
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                                            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                                            {item.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            // Message si la section est vide
                                            <div className="px-6 py-8 text-center text-sm text-gray-500 italic">
                                                Aucun document pour cette section.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}