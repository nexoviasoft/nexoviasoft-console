"use client";

import React from "react";
import BroadcastHeader from "@/components/admin/broadcast/BroadcastHeader";
import BroadcastStats from "@/components/admin/broadcast/BroadcastStats";
import BroadcastFeed from "@/components/admin/broadcast/BroadcastFeed";

export default function Broadcast() {
  return (
    <div className="px-4 py-4 sm:px-8 sm:py-8 min-h-screen text-white">
      <div className="max-w-[1000px] w-full mx-auto space-y-4 sm:space-y-6">
        <BroadcastHeader />
        <BroadcastStats />
        <BroadcastFeed />
      </div>
    </div>
  );
}
