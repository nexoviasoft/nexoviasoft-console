"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import CosmicBackground from "@/components/CosmicBackgroundConsole/CosmicBackground";

export default function AppLayout({ children }) {
  return (
    <div className="relative flex h-screen overflow-hidden">
      <CosmicBackground />
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-glass">
          {children}
        </main>
      </div>
    </div>
  );
}
