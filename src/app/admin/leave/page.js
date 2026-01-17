"use client";

import React from "react";
import LeaveStats from "@/components/admin/leave/LeaveStats";
import TimingsChart from "@/components/admin/leave/TimingsChart";
import TeamList from "@/components/admin/leave/TeamList";
import BookMeeting from "@/components/admin/leave/BookMeeting";
import LeaveRequests from "@/components/admin/leave/LeaveRequests";

export default function LeaveManagement() {
  return (
    <div className="px-8 py-6 flex flex-col min-h-screen text-white">
      <div className="max-w-[1600px] w-full mx-auto space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Good afternoon, Sourav!</h1>
          <p className="text-sm text-white/70">You have 2 leave request pending.</p>
        </div>

        {/* Pending Requests */}
        <LeaveRequests />

        {/* Top Row: Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
          <LeaveStats />
          <TimingsChart />
        </div>

        {/* Bottom Row: List and Meeting */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
          <div className="lg:col-span-2">
            <TeamList />
          </div>
          <div>
            <BookMeeting />
          </div>
        </div>
      </div>
    </div>
  );
}
