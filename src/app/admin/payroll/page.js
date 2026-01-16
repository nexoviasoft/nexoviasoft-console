"use client";

import React from "react";
import PayrollHeader from "@/components/admin/payroll/PayrollHeader";
import PayrollStats from "@/components/admin/payroll/PayrollStats";
import PayrollTable from "@/components/admin/payroll/PayrollTable";

export default function Payroll() {
  return (
    <div className="bg-gray-50 px-8 py-8">
      <div className="max-w-[1600px] w-full mx-auto">
        <PayrollHeader />
        <PayrollStats />
        <PayrollTable />
      </div>
    </div>
  );
}
