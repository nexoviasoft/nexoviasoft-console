"use client";

import React from "react";
import ExpenseListTable from "@/components/admin/expense/ExpenseListTable";
import ExpenseRequestModal from "@/components/admin/expense/ExpenseRequestModal";
import { useAuth } from "@/contexts/AuthContext";
import { Wallet, Info, CreditCard } from "lucide-react";

const TakaIcon = ({ className }) => (
  <span className={`font-bold leading-none select-none flex items-center justify-center ${className}`}>৳</span>
);
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";
import { useGetDashboardSummaryQuery } from "@/api/admin/dashboard/dashboardApi";

export default function ExpenseManagement() {
  const { userRole } = useAuth();
  const isManagement = userRole === 'admin' || userRole?.toLowerCase() === 'manager';
  const { data: dashboardResp } = useGetDashboardSummaryQuery();
  const dashboard = dashboardResp?.data;

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 py-4 md:px-8 md:py-8 min-h-screen text-white">
          <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Wallet className="w-6 h-6 text-[#F58220]" />
                  Expense Management
                </h1>
                <p className="text-sm text-white/70 mt-1">
                  {isManagement 
                    ? "Review and approve expense requests from employees. Approved amounts are automatically deducted from main profit."
                    : "Submit and track your expense requests (Advance Salary, Loans, etc.)."
                  }
                </p>
              </div>
              <div className="flex items-center gap-3">
                <ExpenseRequestModal />
              </div>
            </div>

            {isManagement && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-4 animate-in slide-in-from-top duration-700">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                  <Info className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-500">Manager Information</h3>
                  <p className="text-sm text-white/70 mt-1">
                    Approving an expense will generate an invoice and subtract the amount from the company's net profit in the dashboard. Rejection will notify the requester immediately.
                  </p>
                </div>
              </div>
            )}

            {isManagement && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-700">
                <div className="bg-[#121212] border border-white/10 rounded-xl p-6 flex items-center justify-between hover:border-[#F58220]/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-white/60 mb-2">Total Net Profit</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      {dashboard?.finance?.profitTotal != null 
                        ? (Number(dashboard.finance.profitTotal) < 0 
                            ? `-৳ ${Math.abs(Number(dashboard.finance.profitTotal)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                            : `৳ ${Number(dashboard.finance.profitTotal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`)
                        : "৳ 0.00"}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <TakaIcon className="w-6 h-6 text-emerald-500 text-2xl" />
                  </div>
                </div>

                <div className="bg-[#121212] border border-white/10 rounded-xl p-6 flex items-center justify-between hover:border-[#F58220]/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-white/60 mb-2">Total Expense</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      {dashboard?.finance?.expenseTotal != null 
                        ? `৳ ${Number(dashboard.finance.expenseTotal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                        : "৳ 0.00"}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-rose-500" />
                  </div>
                </div>
              </div>
            )}


            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  {isManagement ? "All Expense Requests" : "My Expense Requests"}
                </h2>
              </div>
              <ExpenseListTable />
            </div>
          </div>
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}
