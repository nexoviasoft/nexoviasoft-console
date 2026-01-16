"use client";

import React from "react";
import { Bell, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DocumentsHeader() {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Generator</h1>
          <p className="text-gray-500">Create official documents, invoices, and letters.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search templates..." 
              className="pl-9 bg-white border-gray-200"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
          </Button>
          
          <div className="flex items-center gap-3 pl-4 border-l">
            <div className="text-right hidden md:block">
              <div className="text-sm font-semibold text-gray-900">Sourav</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
            <Avatar>
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
}
