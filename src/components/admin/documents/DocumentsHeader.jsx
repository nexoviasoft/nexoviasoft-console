"use client";

import React from "react";
import { Bell, FileStack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DocumentsHeader() {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileStack className="w-6 h-6 text-[#EFFC76]" />
            Document Generator
          </h1>
          <p className="text-sm text-white/60">Create official documents, invoices, and letters.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative glass-button text-white/70 hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-black"></span>
          </Button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-white/15">
            <div className="text-right hidden md:block">
              <div className="text-sm font-semibold text-white">Sourav</div>
              <div className="text-xs text-white/60">Admin</div>
            </div>
            <Avatar className="ring-2 ring-[#EFFC76]/40">
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback className="bg-[#EFFC76]/20 text-[#EFFC76]">S</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
}
