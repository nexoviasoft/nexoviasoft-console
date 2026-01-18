"use client";

import React from "react";
import PayrollHeader from "@/components/admin/payroll/PayrollHeader";
import PayrollStats from "@/components/admin/payroll/PayrollStats";
import PayrollTable from "@/components/admin/payroll/PayrollTable";

export default function Payroll() {
  return (
    <div className="px-8 py-8 min-h-screen text-white">
      <div className="max-w-[1600px] w-full mx-auto space-y-6">
        <PayrollHeader />
        <PayrollStats />
        <PayrollTable />
      </div>
    </div>
  );
}
