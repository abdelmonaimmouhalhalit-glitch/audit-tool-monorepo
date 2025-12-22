"use client";

import Link from "next/link";
import { 
  ShieldCheck, Globe, Activity, CreditCard, Lock, 
  ChevronRight, AlertCircle, CalendarClock 
} from "lucide-react";

// --- Données simulées basées sur votre capture d'écran ---
const frameworks = [
  { 
    name: "SOC 2", 
    icon: ShieldCheck, 
    progress: 16, 
    completed: 14, 
    total: 87,
    color: "text-blue-700" 
  },
  { 
    name: "ISO 27001:2022", 
    icon: Globe, 
    progress: 16, 
    completed: 20, 
    total: 123,
    color: "text-blue-800"
  },
  { 
    name: "HIPAA", 
    icon: Activity, 
    progress: 8, 
    completed: 6, 
    total: 73,
    color: "text-indigo-600"
  },
  { 
    name: "GDPR", 
    icon: Globe, // Utilisation du Globe pour l'Europe
    progress: 16, 
    completed: 12, 
    total: 77,
    color: "text-blue-600"
  },
  { 
    name: "PCI DSS - SAQ D, SP and ROC Prep", 
    icon: CreditCard, 
    progress: 17, 
    completed: 59, 
    total: 352,
    color: "text-blue-700"
  },
  { 
    name: "US Data Privacy", 
    icon: Lock, 
    progress: 3, 
    completed: 3, 
    total: 92,
    color: "text-purple-700"
  },
];

const overdueItems = [
  { text: "2 employees with security tasks", href: "#" },
  { text: "1 policy needs renewal", href: "#" },
  { text: "14 vendors need updates", href: "#" },
];

const dueSoonItems = [
  { text: "1 instance with vulnerabilities", href: "#" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      
      {/* --- Colonne Principale (Gauche) --- */}
      <div className="flex-1 min-w-0"> 
        
        {/* Header de la page */}
        <h1 className="text-3xl font-bold text-[#1a1f36] mb-6">Home</h1>
        
        {/* Filtre Framework */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-sm font-medium text-gray-500">Filter by</span>
          <button className="px-3 py-1 bg-white border border-gray-200 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            Framework
          </button>
        </div>

        <h2 className="text-xl font-bold text-[#1a1f36] mb-4">Compliance progress</h2>

        {/* Grille des Cartes Framework */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {frameworks.map((fw) => (
            <Link 
              href={`/frameworks/${fw.name.toLowerCase().replace(/[:\s]+/g, '-')}`} 
              key={fw.name} 
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group"
            >
              
              {/* En-tête de la carte */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3 pr-4">
                  <fw.icon size={20} className={fw.color} />
                  <h3 className="font-bold text-[#1a1f36] text-lg truncate leading-tight">
                    {fw.name}
                  </h3>
                </div>
                {/* Flèche qui s'assombrit au survol */}
                <ChevronRight size={20} className="text-gray-300 group-hover:text-gray-600 flex-shrink-0" />
              </div>

              {/* Pourcentage (Gros chiffre) */}
              <div className="text-4xl font-bold text-[#1a1f36] mb-3">
                {fw.progress}%
              </div>

              {/* Barre de progression */}
              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                <div 
                  className="bg-[#10b981] h-1.5 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${fw.progress}%` }}
                ></div>
              </div>

              {/* Stats en bas de carte */}
              <div className="flex justify-between text-xs font-semibold text-gray-500">
                <span>{fw.completed} controls complete</span>
                <span>{fw.total} total</span>
              </div>

            </Link>
          ))}
        </div>
      </div>


      {/* --- Colonne Latérale (Droite - Alertes) --- */}
      <div className="w-full xl:w-80 flex-shrink-0">
        
        {/* Espace vide pour aligner visuellement avec le titre Home si nécessaire */}
        <div className="h-[4.5rem] hidden xl:block"></div> 

        {/* Filtre Priority */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm font-medium text-gray-500">Filter by</span>
          <button className="px-3 py-1 bg-white border border-gray-200 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            Priority
          </button>
        </div>

        {/* Section: Items overdue (Rouge) */}
        <div className="mb-8">
          <h3 className="flex items-center gap-2 text-xs font-bold text-[#dc2626] mb-3 uppercase tracking-wider">
            <AlertCircle size={14} className="fill-current text-[#dc2626]" /> 
            Items overdue
          </h3>
          <div className="space-y-3">
            {overdueItems.map((item, i) => (
              <Link href={item.href} key={i} className="block bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:border-gray-300 hover:shadow-md transition-all group">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#1a1f36] leading-snug">{item.text}</span>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-600" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section: Items due soon (Orange) */}
        <div>
          <h3 className="flex items-center gap-2 text-xs font-bold text-[#ea580c] mb-3 uppercase tracking-wider">
             <CalendarClock size={14} className="text-[#ea580c]" /> 
             Items due soon
          </h3>
          <div className="space-y-3">
            {dueSoonItems.map((item, i) => (
              <Link href={item.href} key={i} className="block bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:border-gray-300 hover:shadow-md transition-all group">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#1a1f36] leading-snug">{item.text}</span>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-600" />
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}