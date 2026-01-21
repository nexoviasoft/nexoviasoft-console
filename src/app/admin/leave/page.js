"use client";

import React from "react";
import LeaveBalanceCards from "@/components/admin/leave/redesign/LeaveBalanceCards";
import LeaveRequestTable from "@/components/admin/leave/redesign/LeaveRequestTable";
import WhoIsAway from "@/components/admin/leave/redesign/WhoIsAway";
import ApplyLeaveModal from "@/components/admin/leave/redesign/ApplyLeaveModal";

export default function LeaveManagement() {
  return (
    <div className="bg-gray-50/50 min-h-screen px-8 py-8">
      <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Leave Management</h1>
                <p className="text-gray-500 mt-1">Track balances, manage requests, and plan your time off.</p>
              </div>
              <div className="flex items-center gap-3">
                  <ApplyLeaveModal />
              </div>
            </div>

            {/* Stats Cards */}
            <LeaveBalanceCards />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Left Column: Requests Table (Occupies 3/4) */}
              <div className="xl:col-span-3 space-y-6">
                <LeaveRequestTable />
              </div>

              {/* Right Column: Widgets (Occupies 1/4) */}
              <div className="xl:col-span-1 space-y-6">
                <WhoIsAway />
                
                {/* Optional: Add more widgets here like "Upcoming Holidays" or "Calender Mini View" */}
                {/* <div className="p-6 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl text-white shadow-lg">
                    <h3 className="font-semibold mb-2">Did you know?</h3>
                    <p className="text-sm text-purple-100 opacity-80">You have 3 unused Casual Leaves expiring next month. Plan a short trip!</p>
                </div> */}
              </div>
            </div>

      </div>
    </div>
  );
}
