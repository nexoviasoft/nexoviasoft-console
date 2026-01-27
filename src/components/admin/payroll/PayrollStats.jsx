"use client";

import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, PieChart, CheckCircle2, AlertCircle } from "lucide-react";
import { useGetPayrollStatsQuery } from "@/api/payrollApi";

export default function PayrollStats() {
  const { data: statsData, isLoading } = useGetPayrollStatsQuery();

  const currency = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [],
  );

  const totalCost = statsData?.totalCost ?? 0;
  const avgSalary = statsData?.avgSalary ?? 0;
  const pendingCount = statsData?.pendingCount ?? 0;
  const paidCount = statsData?.paidCount ?? 0;
  const pendingAmount = statsData?.pendingAmount ?? 0;

  const stats = [
    {
      label: "Total Cost",
      value: isLoading ? "—" : currency.format(totalCost),
      subtext: "Net pay total",
      icon: DollarSign,
      trend: "neutral",
    },
    {
      label: "Avg. Salary",
      value: isLoading ? "—" : currency.format(avgSalary),
      subtext: "Average net pay",
      icon: PieChart,
      trend: "neutral",
    },
    {
      label: "Pending",
      value: isLoading ? "—" : String(pendingCount),
      subtext: isLoading ? "—" : `${currency.format(pendingAmount)} remaining`,
      icon: AlertCircle,
      trend: "neutral",
    },
    {
      label: "Paid",
      value: isLoading ? "—" : String(paidCount),
      subtext: "Marked as paid",
      icon: CheckCircle2,
      trend: "neutral",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-white/20">
          <CardContent className="p-4 sm:px-6 sm:py-5 flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 rounded-xl bg-[#EFFC76]/15 border border-[#EFFC76]/40 shrink-0">
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#EFFC76]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-white/70 truncate">{stat.label}</p>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-none mt-1 truncate">
                {stat.value}
              </h3>
              <p className="text-[10px] sm:text-xs text-white/60 mt-1 truncate">
                {stat.subtext}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
