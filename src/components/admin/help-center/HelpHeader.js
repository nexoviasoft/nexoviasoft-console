"use client";

import React from "react";
import { Search, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HelpHeader() {
  return (
    <div className="bg-purple-600 rounded-2xl p-8 mb-10 text-white shadow-lg relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
       <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

       <div className="relative z-10 max-w-2xl mx-auto text-center">
         <h1 className="text-3xl font-bold mb-4">How can we help you today?</h1>
         <p className="text-purple-100 mb-8 text-lg">
           Search for articles, browse topics, or contact support.
         </p>
         
         <div className="relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
           <Input 
             className="w-full pl-12 h-14 bg-white text-gray-900 border-0 shadow-md rounded-xl text-lg placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-purple-300"
             placeholder="Search for answers..."
           />
         </div>

         <div className="mt-6 flex items-center justify-center gap-2 text-sm text-purple-200">
            <span className="opacity-80">Popular searches:</span>
            <span className="bg-white/10 px-3 py-1 rounded-full cursor-pointer hover:bg-white/20 transition-colors">Reset Password</span>
            <span className="bg-white/10 px-3 py-1 rounded-full cursor-pointer hover:bg-white/20 transition-colors">Payroll</span>
            <span className="bg-white/10 px-3 py-1 rounded-full cursor-pointer hover:bg-white/20 transition-colors">Leave Policy</span>
         </div>
       </div>
    </div>
  );
}
