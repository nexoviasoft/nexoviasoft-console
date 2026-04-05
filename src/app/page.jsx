"use client";

import React, { useState } from "react";
import {
  Users,
  DoorOpen,
  Star,
  Video,
  Monitor,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ChevronUp,
  Calendar,
  ArrowRight,
  UserCheck,
  DollarSign,
  CreditCard,
  Activity,
  ClipboardList,
  CalendarClock,
  BarChart3,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const AttendanceChart = dynamic(() => import("@/components/admin/dashboard/AttendanceChart"), { ssr: false });
const FinanceChart = dynamic(() => import("@/components/admin/dashboard/FinanceChart"), { ssr: false });
import { useEffect } from "react";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";
import { useGetAttendanceStatsQuery } from "@/api/admin/attendance/attendanceApi";
import {
  useGetDashboardActivityQuery,
  useGetDashboardSummaryQuery,
} from "@/api/admin/dashboard/dashboardApi";

export default function Dashboard() {
  const { userRole } = useAuth();
  const isManagement = userRole === 'admin' || userRole?.toLowerCase() === 'manager';
  
  const [period, setPeriod] = useState("Weekly");
  const [financePeriod, setFinancePeriod] = useState("Yearly");
  const [activityTab, setActivityTab] = useState("Attendance");
  const [currentTime, setCurrentTime] = useState(new Date());
  const { data: attendanceStatsResp } = useGetAttendanceStatsQuery();
  const { data: dashboardResp } = useGetDashboardSummaryQuery();
  const { data: activityResp } = useGetDashboardActivityQuery(activityTab);

  const attendanceStats = attendanceStatsResp?.data;
  const dashboard = dashboardResp?.data;
  const activity = activityResp?.data;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 py-4 md:px-8 md:py-6 text-white">
      <div className="space-y-6">
        {isManagement && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          <Card className="bg-[#121212] border border-white/10 hover:border-[#F58220]/50 transition-colors group">
            <CardContent className="md:p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className=" text-sm  md:font-medium text-white/60">
                    Total Customers
                  </span>
                </div>
                <div className="p-2 bg-white/5 rounded-full group-hover:bg-[#F58220]/20 transition-colors">
                  <Users className="w-5 h-5 text-white/60 group-hover:text-[#F58220] transition-colors" />
                </div>
              </div>
              <div className="space-y-2 mb-2">
                <div className=" text-xl md:text-3xl font-bold text-white">
                  {dashboard?.customers?.total != null
                    ? dashboard.customers.total.toLocaleString?.() ??
                      dashboard.customers.total
                    : "0"}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <ArrowUp className="w-3 h-3 text-xs" /> --
                </span>
                <span className="text-white/40 md:text-xs text-[10px]">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border border-white/10 hover:border-[#F58220]/50 transition-colors group">
            <CardContent className="md:p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-sm font-medium text-white/60">
                    Active Customers
                  </span>
                </div>
                <div className="p-2 bg-white/5 rounded-full group-hover:bg-[#F58220]/20 transition-colors">
                  <UserCheck className="w-5 h-5 text-white/60 group-hover:text-[#F58220] transition-colors" />
                </div>
              </div>
              <div className="space-y-2 mb-2">
                <div className="text-xl md:text-3xl font-bold text-white">
                  {dashboard?.customers?.active != null
                    ? dashboard.customers.active.toLocaleString?.() ??
                      dashboard.customers.active
                    : "0"}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-rose-400 font-medium flex items-center gap-1">
                  <ArrowDown className="w-3 h-3" /> --
                </span>
                <span className="text-white/40 md:text-xs text-[10px]">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border border-white/10 hover:border-[#F58220]/50 transition-colors group">
            <CardContent className="md:p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-sm font-medium text-white/60">
                    Revenue Total
                  </span>
                </div>
                <div className="p-2 bg-white/5 rounded-full group-hover:bg-[#F58220]/20 transition-colors">
                  <Activity className="w-5 h-5 text-white/60 group-hover:text-[#F58220] transition-colors" />
                </div>
              </div>
              <div className="space-y-2 mb-2">
                <div className="text-xl md:text-3xl font-bold text-white">
                  {dashboard?.finance?.revenueTotal != null
                    ? `৳ ${Number(dashboard.finance.revenueTotal).toLocaleString(
                        undefined,
                        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                      )}`
                    : "৳ 0.00"}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" /> --
                </span>
                <span className="text-white/40 md:text-xs text-[10px]">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border border-white/10 hover:border-[#F58220]/50 transition-colors group">
            <CardContent className="md:p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-sm font-medium text-white/60">
                    Profit Total
                  </span>
                </div>
                <div className="p-2 bg-white/5 rounded-full group-hover:bg-[#F58220]/20 transition-colors">
                  <DollarSign className="w-5 h-5 text-white/60 group-hover:text-[#F58220] transition-colors" />
                </div>
              </div>
              <div className="space-y-2 mb-2">
                <div className="text-xl md:text-3xl font-bold text-white">
                  {dashboard?.finance?.profitTotal != null
                    ? (Number(dashboard.finance.profitTotal) < 0
                        ? `-৳ ${Math.abs(Number(dashboard.finance.profitTotal)).toLocaleString(
                            undefined,
                            { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                          )}`
                        : `৳ ${Number(dashboard.finance.profitTotal).toLocaleString(
                            undefined,
                            { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                          )}`)
                    : "৳ 0.00"}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" /> 7.2%
                </span>
                <span className="text-white/40 md:text-xs text-[10px]">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border border-white/10 hover:border-[#F58220]/50 transition-colors group">
            <CardContent className="md:p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-sm font-medium text-white/60">
                    Expense Total
                  </span>
                </div>
                <div className="p-2 bg-white/5 rounded-full group-hover:bg-[#F58220]/20 transition-colors">
                  <CreditCard className="w-5 h-5 text-white/60 group-hover:text-[#F58220] transition-colors" />
                </div>
              </div>
              <div className="space-y-2 mb-2">
                <div className="text-xl md:text-3xl font-bold text-white">
                  {dashboard?.finance?.expenseTotal != null
                    ? `৳ ${Number(dashboard.finance.expenseTotal).toLocaleString(
                        undefined,
                        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                      )}`
                    : "৳ 0.00"}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-rose-400 font-medium flex items-center gap-1">
                  <ArrowDown className="w-3 h-3" /> --
                </span>
                <span className="text-white/40 md:text-xs text-[10px]">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <ClipboardList className="w-5 h-5 text-[#F58220]" />
                      Attendance Overview
                    </CardTitle>
                    <div className="text-xs text-white/50 mt-1 flex gap-2 pl-7">
                      <span>{formattedDate}</span>
                      <span className="text-[#F58220]">{formattedTime}</span>
                    </div>
                  </div>
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="px-3 py-1.5 bg-[#F58220]/10 border border-[#F58220]/20 rounded-lg text-xs font-medium text-[#F58220] focus:outline-none focus:ring-1 focus:ring-[#F58220]"
                  >
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    <div>
                      <div className="text-xl md:text-3xl font-bold text-[#F58220] mb-1">
                        {attendanceStats
                          ? `${Number(attendanceStats.onTimePercentage).toFixed(1)}%`
                          : "0%"}
                      </div>
                      <div className=" text-[13px] md:text-sm text-white/70 mb-1">
                        Attendance Rate
                      </div>
                      <div className="text-xs text-[#F58220]">
                        {attendanceStats ? "+ Live" : "+2.8%"}
                      </div>
                    </div>
                    <div>
                      <div className=" text-xl md:text-3xl font-bold text-white mb-1">
                        {attendanceStats
                          ? `${attendanceStats.onTime + attendanceStats.late}/${
                              attendanceStats.total
                            }`
                          : "0/0"}
                      </div>
                      <div className="text-[13px] md:text-sm text-white/70 mb-1">
                        Today&apos;s Attendance
                      </div>
                      <div className="text-xs text-[#F58220]">+1.2%</div>
                    </div>

                    <div className=" flex gap-2 items-center col-span-4 md:space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#F58220] rounded"></div>
                        <span className="text-[12px] md:text-sm text-white/70">
                          On-Time{" "}
                          {attendanceStats
                            ? `${attendanceStats.onTimePercentage}%`
                            : "0%"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#F58220]/70 rounded"></div>
                        <span className="text-[12px] md:text-sm text-white/70">
                          Late{" "}
                          {attendanceStats
                            ? `${attendanceStats.latePercentage}%`
                            : "0%"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#F58220]/40 rounded"></div>
                        <span className="text-[12px] md:text-sm text-white/70">
                          Absent{" "}
                          {attendanceStats
                            ? `${attendanceStats.absentPercentage}%`
                            : "0%"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <AttendanceChart period={period} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#F58220]" />
                    Activity
                  </CardTitle>
                  <div className=" block md:hidden">
                    <div className="flex  items-center gap-2  ">
                      <button className="px-3 py-2 border border-white/20 rounded-lg text-sm hover:bg-white/10 flex items-center gap-2 text-white/80">
                        <span>Filter</span>
                      </button>
                      <button className="px-3 py-2 border border-white/20 rounded-lg text-sm hover:bg-white/10 flex items-center gap-2 text-white/80">
                        <span>Sort By</span>
                        <ChevronUp className="w-4 h-4 text-[#F58220]" />
                      </button>
                    </div>
                  </div>

                  <button className="text-sm font-medium text-[#F58220] hover:text-[#d91d79]">
                    See Detail
                  </button>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 overflow-x-auto pb-2 sm:pb-0">
                      <div className=" grid  grid-cols-2 items-center gap-5 md:gap-2 ">
                        <select className="px-3 py-2 border border-[#F58220]/20 rounded-lg text-sm bg-[#F58220]/10 text-[#F58220] w-full sm:w-auto focus:outline-none focus:ring-1 focus:ring-[#F58220]">
                          <option className="bg-[#121212] text-white">
                            Last 7 Days
                          </option>
                        </select>
                        <div className="flex items-center gap-2 px-3 py-2 border border-white/20 rounded-lg bg-white/5 whitespace-nowrap">
                          <Calendar className="w-4 h-4 text-[#F58220]" />
                          <span className="text-sm text-white/80">
                            1 Jan - 7 Jan
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto">
                        <button
                          onClick={() => setActivityTab("Attendance")}
                          className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap ${
                            activityTab === "Attendance"
                              ? "bg-[#F58220] text-black"
                              : "text-white/70 hover:bg-white/10"
                          }`}
                        >
                          Attendance
                        </button>
                        <button
                          onClick={() => setActivityTab("Leave")}
                          className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap ${
                            activityTab === "Leave"
                              ? "bg-[#F58220] text-black"
                              : "text-white/70 hover:bg-white/10"
                          }`}
                        >
                          Leave Request
                        </button>
                        <button
                          onClick={() => setActivityTab("Finance")}
                          className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap ${
                            activityTab === "Finance"
                              ? "bg-[#F58220] text-black"
                              : "text-white/70 hover:bg-white/10"
                          }`}
                        >
                          Finance
                        </button>
                      </div>
                    </div>

                    <div className="hidden md:block self-end xl:self-auto">
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-2 border border-white/20 rounded-lg text-sm hover:bg-white/10 flex items-center gap-2 text-white/80">
                          <span>Filter</span>
                        </button>
                        <button className="px-3 py-2 border border-white/20 rounded-lg text-sm hover:bg-white/10 flex items-center gap-2 text-white/80">
                          <span>Sort By</span>
                          <ChevronUp className="w-4 h-4 text-[#F58220]" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4 overflow-x-auto">
                    <div className="min-w-[800px] space-y-3">
                      <div className="grid grid-cols-7 gap-4 text-xs font-medium text-white/60 uppercase tracking-wider pb-1">
                        <div>ID Employee</div>
                        <div>Name</div>
                        <div>Role</div>
                        <div>Check-In Time</div>
                        <div>Check-Out Time</div>
                        <div>Log Hours</div>
                        <div>Status</div>
                      </div>
                      <div className="space-y-2">
                        {activity?.items?.length ? (
                          activity.items.map((row) => (
                            <div
                              key={row.id}
                              className="grid grid-cols-7 gap-4 text-xs items-center py-2 rounded-lg hover:bg-white/5 transition-colors"
                            >
                              <div className="text-white/70">
                                {row.team?.id ?? row.client?.id ?? row.id}
                              </div>
                              <div className="text-white font-medium truncate">
                                {activityTab === "Finance"
                                  ? row.client?.name || "Client"
                                  : row.team?.name || "Unknown"}
                              </div>
                              <div className="text-white/60 truncate">
                                {activityTab === "Finance"
                                  ? row.service || "-"
                                  : row.team?.role || "-"}
                              </div>
                              <div className="text-white/80">
                                {activityTab === "Leave"
                                  ? (row.startDate
                                      ? new Date(row.startDate).toLocaleDateString()
                                      : "-")
                                  : row.checkIn || "-"}
                              </div>
                              <div className="text-white/80">
                                {activityTab === "Leave"
                                  ? (row.endDate
                                      ? new Date(row.endDate).toLocaleDateString()
                                      : "-")
                                  : activityTab === "Finance"
                                  ? `$${Number(row.amount || 0).toLocaleString()}`
                                  : row.checkOut || "-"}
                              </div>
                              <div className="text-white/70">
                                {activityTab === "Leave"
                                  ? `${row.days ?? 0}d`
                                  : row.workHours || "-"}
                              </div>
                              <div>
                                <span
                                  className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                                    row.status === "On Time" ||
                                    row.status === "approved" ||
                                    row.status === "Approved" ||
                                    row.status === "Completed"
                                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30"
                                      : row.status === "Late" ||
                                        row.status === "pending" ||
                                        row.status === "Pending" ||
                                        row.status === "In Progress"
                                      ? "bg-orange-500/15 text-orange-300 border border-orange-400/30"
                                      : "bg-red-500/15 text-red-300 border border-red-400/30"
                                  }`}
                                >
                                  {row.status}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-xs text-white/60 py-2">
                            No activity found.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CalendarClock className="w-5 h-5 text-[#F58220]" />
                  Your Next Agenda
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboard?.nextAgenda ? (
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-[#F58220]/10 rounded-xl">
                        <Video className="w-5 h-5 text-[#F58220]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">
                          {dashboard.nextAgenda.topic || "Upcoming Meeting"}
                        </h3>
                        <p className="text-sm text-white/70 mb-2">
                          {dashboard.nextAgenda.dateTime
                            ? new Date(dashboard.nextAgenda.dateTime).toLocaleString()
                            : ""}
                        </p>
                        <Button
                          className="w-full bg-[#F58220] hover:bg-[#d91d79] text-black"
                          asChild={!!dashboard.nextAgenda.meetingLink}
                        >
                          {dashboard.nextAgenda.meetingLink ? (
                            <a
                              href={dashboard.nextAgenda.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Join Meeting Now
                            </a>
                          ) : (
                            <span>View Details</span>
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-white/60">
                      No upcoming meetings scheduled.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Calendar className="w-5 h-5 text-[#F58220]" />
                    Schedule
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3 pt-2">
                    {dashboard?.schedules?.length ? (
                      dashboard.schedules.slice(0, 3).map((s) => (
                        <div
                          key={s.id}
                          className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg cursor-pointer"
                        >
                          <div className="flex-1">
                            <div className="font-medium text-sm text-white">
                              {s.team?.name || "Team member"}
                            </div>
                            <div className="text-xs text-white/60 flex items-center gap-1 mt-1">
                              <Calendar className="w-3 h-3 text-[#F58220]" />
                              <span>
                                {s.weekStartDate
                                  ? new Date(s.weekStartDate).toLocaleDateString()
                                  : "-"}{" "}
                                -{" "}
                                {s.weekEndDate
                                  ? new Date(s.weekEndDate).toLocaleDateString()
                                  : "-"}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#F58220]" />
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-white/60">
                        No schedules available.
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Finance Section */}
        {isManagement && (
          <Card className="bg-[#121212] border border-white/10">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                      <BarChart3 className="w-6 h-6 text-[#F58220]" />
                      Finance Report
                    </h3>
  
                    <select
                      value={financePeriod}
                      onChange={(e) => setFinancePeriod(e.target.value)}
                      className="px-3 py-1.5 bg-[#F58220]/10 border border-[#F58220]/20 rounded-lg text-xs font-medium text-[#F58220] focus:outline-none focus:ring-1 focus:ring-[#F58220]"
                    >
                      <option value="Weekly" className="bg-[#121212] text-white">
                        Weekly
                      </option>
                      <option value="Monthly" className="bg-[#121212] text-white">
                        Monthly
                      </option>
                      <option
                        value="Quarterly"
                        className="bg-[#121212] text-white"
                      >
                        Quarterly
                      </option>
                      <option value="Yearly" className="bg-[#121212] text-white">
                        Yearly
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <FinanceChart period={financePeriod} />
            </CardContent>
          </Card>
        )}
      </div>
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}
