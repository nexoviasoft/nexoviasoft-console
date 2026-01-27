"use client";

import React from "react";
import { Plus, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateBroadcastDialog from "@/components/admin/broadcast/CreateBroadcastDialog";

export default function BroadcastHeader({ dashboard }) {
  const [open, setOpen] = React.useState(false);

  const draftsCount =
    dashboard?.draftsCount ??
    (Array.isArray(dashboard?.drafts) ? dashboard.drafts.length : 0);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-[#EFFC76]" />
            Broadcast
          </h1>
          <p className="text-xs sm:text-sm text-white/70 mt-1">
            Send company-wide announcements and track engagement.
          </p>
        </div>

        <div className="flex flex-row items-center gap-3">
          <Button
            variant="outline"
            className="glass-button bg-white/5 border border-white/20 text-[#EFFC76] hover:bg-white/10 h-9 sm:h-10 text-xs sm:text-sm"
          >
            Drafts ({draftsCount})
          </Button>
          <Button
            onClick={() => setOpen(true)}
            className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black gap-2 glass-button h-9 sm:h-10 text-xs sm:text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Announcement</span>
          </Button>
        </div>
      </div>

      <CreateBroadcastDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
