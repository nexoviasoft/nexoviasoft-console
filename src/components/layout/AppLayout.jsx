"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import CosmicBackground from "@/components/CosmicBackgroundConsole/CosmicBackground";

export default function AppLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative flex h-screen overflow-hidden">
      <CosmicBackground />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-glass">
          {children}
        </main>
      </div>
    </div>
  );
}
