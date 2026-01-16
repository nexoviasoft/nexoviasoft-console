"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function EmailHeader({ onConfigureClick }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Email Alerts</h1>
        <p className="text-gray-500">Send notifications to your team using SMTP</p>
      </div>
      
      <Button 
        onClick={onConfigureClick}
        variant="outline"
        className="gap-2"
      >
        <Settings className="w-4 h-4" />
        Configure SMTP
      </Button>
    </div>
  );
}
