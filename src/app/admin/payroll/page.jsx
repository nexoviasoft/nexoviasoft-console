"use client";

import React from "react";
import PayrollHeader from "@/components/admin/payroll/PayrollHeader";
import PayrollStats from "@/components/admin/payroll/PayrollStats";
import PayrollTable from "@/components/admin/payroll/PayrollTable";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function Payroll() {
  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 py-4 sm:px-8 sm:py-8 min-h-screen text-white">
      <div className="max-w-[1600px] w-full mx-auto space-y-4 sm:space-y-6">
        <PayrollHeader />
        <PayrollStats />
        <PayrollTable />
      </div>
    </div>
    </AppLayout>
    </PrivateRoute>
  );
}
