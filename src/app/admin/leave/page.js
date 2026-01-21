"use client";

import React from "react";
import LeaveBalanceCards from "@/components/admin/leave/redesign/LeaveBalanceCards";
import LeaveRequestTable from "@/components/admin/leave/redesign/LeaveRequestTable";
import WhoIsAway from "@/components/admin/leave/redesign/WhoIsAway";
import ApplyLeaveModal from "@/components/admin/leave/redesign/ApplyLeaveModal";

export default function LeaveManagement() {
  return (
    <div className="px-8 py-8 min-h-screen text-white">
      <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Leave Management
            </h1>
            <p className="text-sm text-white/70 mt-1">
              Track leave balances, approve requests, and keep your team&apos;s
              time off organized.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ApplyLeaveModal />
          </div>
        </div>

        <LeaveBalanceCards />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3 space-y-6">
            <LeaveRequestTable />
          </div>

          <div className="xl:col-span-1 space-y-6">
            <WhoIsAway />
          </div>
        </div>
      </div>
    </div>
  );
}
