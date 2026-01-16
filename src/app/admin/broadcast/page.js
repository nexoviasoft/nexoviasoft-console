"use client";

import React from "react";
import BroadcastHeader from "@/components/admin/broadcast/BroadcastHeader";
import BroadcastStats from "@/components/admin/broadcast/BroadcastStats";
import BroadcastFeed from "@/components/admin/broadcast/BroadcastFeed";

export default function Broadcast() {
  return (
    <div className="bg-gray-50 px-8 py-8">
      <div className="max-w-[1000px] w-full mx-auto">
        <BroadcastHeader />
        <BroadcastStats />
        <BroadcastFeed />
      </div>
    </div>
  );
}
