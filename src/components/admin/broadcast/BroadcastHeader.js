"use client";

import React from "react";
import { Plus, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BroadcastHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Radio className="w-5 h-5 text-[#EFFC76]" />
          Broadcast
        </h1>
        <p className="text-sm text-white/70 mt-1">
          Send company-wide announcements and track engagement.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="glass-button bg-white/5 border border-white/20 text-white/80 hover:bg-white/10"
        >
          Drafts (2)
        </Button>
        <Button className="bg-white hover:bg-white/90 text-black gap-2 glass-button">
          <Plus className="w-4 h-4" />
          <span>New Announcement</span>
        </Button>
      </div>
    </div>
  );
}
