"use client";

import React from "react";
import ReportsHeader from "@/components/admin/reports/ReportsHeader";
import ReportsStats from "@/components/admin/reports/ReportsStats";
import RevenueChart from "@/components/admin/reports/RevenueChart";
import TaskDistributionChart from "@/components/admin/reports/TaskDistributionChart";
import { subDays, format } from "date-fns";
import { useGetReportsDashboardQuery } from "@/api/admin/reports/reportsApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function Reports() {
  const [date, setDate] = React.useState({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const from = date?.from ? format(date.from, "yyyy-MM-dd") : undefined;
  const to = date?.to ? format(date.to, "yyyy-MM-dd") : undefined;

  const { data } = useGetReportsDashboardQuery({ from, to });

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 py-4 sm:px-8 sm:py-8 min-h-screen text-white">
      <div className="max-w-[1600px] w-full mx-auto space-y-4 sm:space-y-6">
        <ReportsHeader date={date} setDate={setDate} />
        <ReportsStats dashboard={data} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <RevenueChart dashboard={data} />
          <TaskDistributionChart dashboard={data} />
        </div>
      </div>
    </div>
    </AppLayout>
    </PrivateRoute>
  );
}
