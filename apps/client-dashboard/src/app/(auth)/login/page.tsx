"use client";

import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      {/* Logo Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto h-12 w-12 bg-[#1a1f36] rounded-lg flex items-center justify-center text-white">
             <ShieldCheck size={28} />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-[#1a1f36]">
          Toly 
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Sécurisez votre conformité en continu.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-xl sm:px-10 border border-gray-200">
          
          {/* SSO Buttons */}
          <div className="space-y-3">
            <button className="w-full flex justify-center items-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
              Sign in with Google
            </button>
            <button className="w-full flex justify-center items-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
               <img src="https://www.svgrepo.com/show/448239/microsoft.svg" alt="Microsoft" className="h-5 w-5" />
              Sign in with Microsoft
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#502aec] focus:border-[#502aec] sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#502aec] focus:border-[#502aec] sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <Link href="/overview">
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#502aec] hover:bg-[#3b1c85] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#502aec] transition-colors"
                    >
                        Sign in
                    </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <p className="mt-6 text-center text-xs text-gray-500">
            &copy; 2025 Audit Flash Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}