"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, ShieldCheck, Activity, FileText, 
  Book, Lock, Users, Layers, Settings,
  AlertTriangle, Laptop, ListTodo, Key, 
  FileCheck, Package, Bug, Building, UserCog
} from "lucide-react";

// Configuration complète de la navigation Vanta
const navigation = [
  {
    category: "OVERVIEW",
    items: [
      // CORRECTION: Pointe vers /overview pour afficher le dashboard interne
      { name: "Home", href: "/home", icon: Home }, 
      { name: "Controls", href: "/controls", icon: ShieldCheck },
      { name: "Monitors", href: "/monitors", icon: Activity },
    ]
  },
  {
    category: "DOCUMENT",
    items: [
      { name: "Documents", href: "/documents", icon: FileText },
      { name: "Policies", href: "/policies", icon: Book },
      { name: "Risk management", href: "/risks", icon: AlertTriangle }, 
    ]
  },
  {
    category: "REPORT",
    items: [
      { name: "Frameworks", href: "/frameworks/soc2", icon: Layers },
      { name: "Trust Report", href: "/reports", icon: Lock },
    ]
  },
  {
    category: "MANAGE",
    items: [
      { name: "People", href: "/people", icon: Users },
      // Liste complète basée sur vos captures d'écran
      { name: "Groups", href: "/groups", icon: UserCog }, 
      { name: "Computers", href: "/computers", icon: Laptop }, 
      { name: "Checklists", href: "/checklists", icon: ListTodo }, 
      { name: "Access", href: "/access", icon: Key }, 
      { name: "Access reviews", href: "/access-reviews", icon: FileCheck }, 
      { name: "Inventory", href: "/inventory", icon: Package }, 
      { name: "Vulnerabilities", href: "/vulnerabilities", icon: Bug }, 
      { name: "Vendors", href: "/vendors", icon: Building }, 
      { name: "Integrations", href: "/integrations", icon: Layers },
      { name: "Settings", href: "/settings", icon: Settings },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-full bg-[#1a1f36] text-white border-r border-[#2d334a] w-64 flex-shrink-0">
      
      {/* Logo */}
      <div className="flex items-center h-16 px-6 bg-[#1a1f36]">
        <span className="text-xl font-bold tracking-tight">Toly</span>
      </div>

      {/* Widget : Progression (Get Started) */}
      <div className="px-4 py-2 mb-2">
         <div className="bg-[#2d334a]/50 rounded-lg p-3 border border-[#2d334a]">
            <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-semibold text-gray-200">Get started</span>
                <span className="text-gray-400">16 of 17</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                <div className="bg-[#10b981] h-1.5 rounded-full" style={{ width: "94%" }}></div>
            </div>
            <p className="text-[10px] text-gray-400 mt-1 truncate">
               Next: Connect AWS production
            </p>
         </div>
      </div>

      {/* Navigation Complète */}
      <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-8 scrollbar-thin scrollbar-thumb-gray-700">
        {navigation.map((group) => (
          <div key={group.category}>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {group.category}
            </h3>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                // Gestion de l'état actif (Violet Vanta)
                // Active si l'URL est exacte OU si c'est une sous-section (sauf pour Overview qui est la racine)
                const isActive = pathname === item.href || (item.href !== '/overview' && pathname?.startsWith(item.href));
                
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all ${
                        isActive 
                          ? "bg-[#502aec] text-white" 
                          : "text-gray-300 hover:bg-[#2d334a] hover:text-white"
                      }`}
                    >
                      <item.icon 
                        size={18} 
                        className={`flex-shrink-0 transition-colors ${
                            isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                        }`}
                      />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        {/* Espace vide en bas pour le scroll */}
        <div className="h-10"></div>
      </nav>

      {/* Profil utilisateur */}
      <div className="p-4 border-t border-[#2d334a]">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold text-white ring-2 ring-[#2d334a]">
                UD
            </div>
            <div className="text-sm overflow-hidden">
                <p className="font-medium text-white truncate">Utilisateur Demo</p>
                <p className="text-xs text-gray-400">Admin</p>
            </div>
        </div>
      </div>
    </aside>
  );
}