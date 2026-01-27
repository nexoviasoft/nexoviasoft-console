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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AttendanceChart from "@/components/admin/dashboard/AttendanceChart";
import FinanceChart from "@/components/admin/dashboard/FinanceChart";
import { useEffect } from "react";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function Dashboard() {
  const [period, setPeriod] = useState("Weekly");
  const [financePeriod, setFinancePeriod] = useState("Yearly");
  const [currentTime, setCurrentTime] = useState(new Date());

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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="bg-[#121212] border border-white/10 hover:border-[#EFFC76]/50 transition-colors group">
            <CardContent className="md:p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className=" text-sm  md:font-medium text-white/60">
                    Total Customers
                  </span>
                </div>
                <div className="p-2 bg-white/5 rounded-full group-hover:bg-[#EFFC76]/20 transition-colors">
                  <Users className="w-5 h-5 text-white/60 group-hover:text-[#EFFC76] transition-colors" />
                </div>
              </div>
              <div className="space-y-2 mb-2">
                <div className=" text-xl md:text-3xl font-bold text-white">
                  21,978
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <ArrowUp className="w-3 h-3 text-xs" /> 15%
                </span>
                <span className="text-white/40 md:text-xs text-[10px]">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border border-white/10 hover:border-[#EFFC76]/50 transition-colors group">
            <CardContent className="md:p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-sm font-medium text-white/60">
                    Active Customers
                  </span>
                </div>
                <div className="p-2 bg-white/5 rounded-full group-hover:bg-[#EFFC76]/20 transition-colors">
                  <UserCheck className="w-5 h-5 text-white/60 group-hover:text-[#EFFC76] transition-colors" />
                </div>
              </div>
              <div className="space-y-2 mb-2">
                <div className="text-xl md:text-3xl font-bold text-white">
                  10,369
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-rose-400 font-medium flex items-center gap-1">
                  <ArrowDown className="w-3 h-3" /> 9%
                </span>
                <span className="text-white/40 md:text-xs text-[10px]">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border border-white/10 hover:border-[#EFFC76]/50 transition-colors group">
            <CardContent className="md:p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-sm font-medium text-white/60">
                    Profit Total
                  </span>
                </div>
                <div className="p-2 bg-white/5 rounded-full group-hover:bg-[#EFFC76]/20 transition-colors">
                  <DollarSign className="w-5 h-5 text-white/60 group-hover:text-[#EFFC76] transition-colors" />
                </div>
              </div>
              <div className="space-y-2 mb-2">
                <div className="ttext-xl md:text-3xl font-bold text-white">
                  $64,981.97
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

          <Card className="bg-[#121212] border border-white/10 hover:border-[#EFFC76]/50 transition-colors group">
            <CardContent className="md:p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-sm font-medium text-white/60">
                    Expense Total
                  </span>
                </div>
                <div className="p-2 bg-white/5 rounded-full group-hover:bg-[#EFFC76]/20 transition-colors">
                  <CreditCard className="w-5 h-5 text-white/60 group-hover:text-[#EFFC76] transition-colors" />
                </div>
              </div>
              <div className="space-y-2 mb-2">
                <div className="text-xl md:text-3xl font-bold text-white">
                  $18,158.21
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-rose-400 font-medium flex items-center gap-1">
                  <ArrowDown className="w-3 h-3" /> 2%
                </span>
                <span className="text-white/40 md:text-xs text-[10px]">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <ClipboardList className="w-5 h-5 text-[#EFFC76]" />
                      Attendance Overview
                    </CardTitle>
                    <div className="text-xs text-white/50 mt-1 flex gap-2 pl-7">
                      <span>{formattedDate}</span>
                      <span className="text-[#EFFC76]">{formattedTime}</span>
                    </div>
                  </div>
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="px-3 py-1.5 bg-[#EFFC76]/10 border border-[#EFFC76]/20 rounded-lg text-xs font-medium text-[#EFFC76] focus:outline-none focus:ring-1 focus:ring-[#EFFC76]"
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
                      <div className="text-xl md:text-3xl font-bold text-[#EFFC76] mb-1">
                        89.2%
                      </div>
                      <div className=" text-[13px] md:text-sm text-white/70 mb-1">
                        Attendance Rate
                      </div>
                      <div className="text-xs text-[#EFFC76]">+2.8%</div>
                    </div>
                    <div>
                      <div className=" text-xl md:text-3xl font-bold text-white mb-1">
                        1261/1.298
                      </div>
                      <div className="text-[13px] md:text-sm text-white/70 mb-1">
                        Today&apos;s Attendance
                      </div>
                      <div className="text-xs text-[#EFFC76]">+1.2%</div>
                    </div>

                    <div className=" flex gap-2 items-center col-span-4 md:space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#EFFC76] rounded"></div>
                        <span className="text-[12px] md:text-sm text-white/70">
                          On-Time 86%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#EFFC76]/70 rounded"></div>
                        <span className="text-[12px] md:text-sm text-white/70">
                          Late 12%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#EFFC76]/40 rounded"></div>
                        <span className="text-[12px] md:text-sm text-white/70">
                          Absent 2%
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
                    <Activity className="w-5 h-5 text-[#EFFC76]" />
                    Activity
                  </CardTitle>
                  <div className=" block md:hidden">
                    <div className="flex  items-center gap-2  ">
                      <button className="px-3 py-2 border border-white/20 rounded-lg text-sm hover:bg-white/10 flex items-center gap-2 text-white/80">
                        <span>Filter</span>
                      </button>
                      <button className="px-3 py-2 border border-white/20 rounded-lg text-sm hover:bg-white/10 flex items-center gap-2 text-white/80">
                        <span>Sort By</span>
                        <ChevronUp className="w-4 h-4 text-[#EFFC76]" />
                      </button>
                    </div>
                  </div>

                  <button className="text-sm font-medium text-[#EFFC76] hover:text-[#e0ef5f]">
                    See Detail
                  </button>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 overflow-x-auto pb-2 sm:pb-0">
                      <div className=" grid  grid-cols-2 items-center gap-5 md:gap-2 ">
                        <select className="px-3 py-2 border border-[#EFFC76]/20 rounded-lg text-sm bg-[#EFFC76]/10 text-[#EFFC76] w-full sm:w-auto focus:outline-none focus:ring-1 focus:ring-[#EFFC76]">
                          <option className="bg-[#121212] text-white">
                            Last 7 Days
                          </option>
                        </select>
                        <div className="flex items-center gap-2 px-3 py-2 border border-white/20 rounded-lg bg-white/5 whitespace-nowrap">
                          <Calendar className="w-4 h-4 text-[#EFFC76]" />
                          <span className="text-sm text-white/80">
                            1 Jan - 7 Jan
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto">
                        <button className="px-4 py-2 bg-[#EFFC76] text-black text-sm rounded-lg whitespace-nowrap">
                          Attendance
                        </button>
                        <button className="px-4 py-2 text-white/70 text-sm rounded-lg hover:bg-white/10 whitespace-nowrap">
                          Leave Request
                        </button>
                        <button className="px-4 py-2 text-white/70 text-sm rounded-lg hover:bg-white/10 whitespace-nowrap">
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
                          <ChevronUp className="w-4 h-4 text-[#EFFC76]" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4 overflow-x-auto">
                    <div className="grid grid-cols-7 gap-4 text-xs font-medium text-white/60 uppercase tracking-wider pb-3 min-w-[800px]">
                      <div>ID Employee</div>
                      <div>Name</div>
                      <div>Department</div>
                      <div>Check-In Time</div>
                      <div>Check-Out Time</div>
                      <div>Log Hours</div>
                      <div>Status</div>
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
                  <CalendarClock className="w-5 h-5 text-[#EFFC76]" />
                  Your Next Agenda
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-[#EFFC76]/10 rounded-xl">
                      <Video className="w-5 h-5 text-[#EFFC76]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">
                        Monthly Evaluation
                      </h3>
                      <p className="text-sm text-white/70 mb-2">
                        Today, 08:30 AM - 10:30 AM
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex -space-x-2">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full bg-[#EFFC76] border-2 border-white"
                            ></div>
                          ))}
                        </div>
                        <span className="text-xs text-white/60">
                          38 Participants
                        </span>
                      </div>
                      <Button className="w-full bg-[#EFFC76] hover:bg-[#e0ef5f] text-black">
                        Join Meeting Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Calendar className="w-5 h-5 text-[#EFFC76]" />
                    Schedule
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-1">
                    {[1, 2, 3, 4, 5, 6, 7].map((day, index) => (
                      <div
                        key={day}
                        className="flex flex-col items-center gap-1"
                      >
                        <button
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                            day === 3
                              ? "bg-[#EFFC76] text-black"
                              : "text-white/70 hover:bg-white/10"
                          }`}
                        >
                          {day}
                        </button>
                        <span className="text-xs text-white/50">
                          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"][index]}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg cursor-pointer">
                      <div className="flex-1">
                        <div className="font-medium text-sm text-white">
                          Team Stand-Up Meeting
                        </div>
                        <div className="text-xs text-white/60 flex items-center gap-1 mt-1">
                          <Video className="w-3 h-3 text-[#EFFC76]" />
                          Online 08:30 AM
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#EFFC76]" />
                    </div>

                    <div className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg cursor-pointer">
                      <div className="flex-1">
                        <div className="font-medium text-sm text-white">
                          Client Presentation
                        </div>
                        <div className="text-xs text-white/60 flex items-center gap-1 mt-1">
                          <Monitor className="w-3 h-3 text-[#EFFC76]" />
                          Conference Room 11:00 AM
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#EFFC76]" />
                    </div>

                    <div className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg cursor-pointer">
                      <div className="flex-1">
                        <div className="font-medium text-sm text-white">
                          Training Session: Workplace...
                        </div>
                        <div className="text-xs text-white/60 flex items-center gap-1 mt-1">
                          <Video className="w-3 h-3 text-[#EFFC76]" />
                          Online 01:30 PM
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#EFFC76]" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Finance Section */}
        <Card className="bg-[#121212] border border-white/10">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
              <div className="w-full">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-[#EFFC76]" />
                    Finance Report
                  </h3>

                  <select
                    value={financePeriod}
                    onChange={(e) => setFinancePeriod(e.target.value)}
                    className="px-3 py-1.5 bg-[#EFFC76]/10 border border-[#EFFC76]/20 rounded-lg text-xs font-medium text-[#EFFC76] focus:outline-none focus:ring-1 focus:ring-[#EFFC76]"
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

                <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                  <div>
                    <div className="text-sm text-white/50 mb-1">Weekly</div>
                    <div className="flex items-center gap-3">
                      <span className=" text-xl md:text-3xl font-bold text-white">
                        $24,291
                      </span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                        +25.0%
                      </span>
                    </div>
                    <div className="text-xs text-white/40 mt-1">
                      Compared to $1,340 last week
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-white/50 mb-1">Monthly</div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl md:text-3xl font-bold text-white">
                        $48,903
                      </span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                        +1.9%
                      </span>
                    </div>
                    <div className="text-xs text-white/40 mt-1">
                      Compared to $5,441 last month
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-white/50 mb-1">Yearly</div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl md:text-3xl font-bold text-white">
                        $198,134
                      </span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                        +22%
                      </span>
                    </div>
                    <div className="text-xs text-white/40 mt-1">
                      Compared to $76,330 last year
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FinanceChart period={financePeriod} />
          </CardContent>
        </Card>
      </div>
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}
