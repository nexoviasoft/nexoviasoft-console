"use client";

import React from "react";
import { Plus, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BroadcastHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Broadcast</h1>
        <p className="text-sm text-gray-500 mt-1">
          Send company-wide announcements and track engagement.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50">
           Drafts (2)
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          <span>New Announcement</span>
        </Button>
      </div>
    </div>
  );
}
