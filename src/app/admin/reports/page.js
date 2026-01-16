"use client";

import React from "react";
import ReportsHeader from "@/components/admin/reports/ReportsHeader";
import ReportsStats from "@/components/admin/reports/ReportsStats";
import RevenueChart from "@/components/admin/reports/RevenueChart";
import TaskDistributionChart from "@/components/admin/reports/TaskDistributionChart";

export default function Reports() {
  return (
    <div className="bg-gray-50 px-8 py-8">
      <div className="max-w-[1600px] w-full mx-auto">
        <ReportsHeader />
        <ReportsStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <RevenueChart />
           <TaskDistributionChart />
        </div>

      </div>
    </div>
  );
}
