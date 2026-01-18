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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AttendanceChart from "@/components/admin/dashboard/AttendanceChart";
import FinanceChart from "@/components/admin/dashboard/FinanceChart";

export default function Dashboard() {
  const [period, setPeriod] = useState("Weekly");
  return (
    <div className="px-8 py-6 text-white">
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-6">

          <Card className="bg-[#121212] border border-white/10 hover:border-[#EFFC76]/50 transition-colors group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                   <span className="text-sm font-medium text-white/60">Total Employees</span>
                </div>
                <div className="p-2 bg-white/5 rounded-full group-hover:bg-[#EFFC76]/20 transition-colors">
                  <Users className="w-5 h-5 text-white/60 group-hover:text-[#EFFC76] transition-colors" />
                </div>
              </div>
              <div className="space-y-2 mb-2">
                <div className="text-3xl font-bold text-white">1,298</div>
              </div>
               <div className="flex items-center gap-2 text-xs">
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" /> 15%
                  </span>
                  <span className="text-white/40">from last month</span>
               </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border border-white/10 hover:border-[#EFFC76]/50 transition-colors group">
             <CardContent className="p-6">
               <div className="flex justify-between items-start mb-2">
                <div>
                   <span className="text-sm font-medium text-white/60">Leave Requests</span>
                </div>
                <div className="p-2 bg-white/5 rounded-full group-hover:bg-[#EFFC76]/20 transition-colors">
                  <DoorOpen className="w-5 h-5 text-white/60 group-hover:text-[#EFFC76] transition-colors" />
                </div>
              </div>
              <div className="space-y-2 mb-2">
                <div className="text-3xl font-bold text-white">123</div>
              </div>
               <div className="flex items-center gap-2 text-xs">
                  <span className="text-rose-400 font-medium flex items-center gap-1">
                    <ArrowDown className="w-3 h-3" /> 9%
                  </span>
                  <span className="text-white/40">from last month</span>
               </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border border-white/10 hover:border-[#EFFC76]/50 transition-colors group">
            <CardContent className="p-6">
               <div className="flex justify-between items-start mb-2">
                <div>
                   <span className="text-sm font-medium text-white/60">Average KPI</span>
                </div>
                <div className="p-2 bg-white/5 rounded-full group-hover:bg-[#EFFC76]/20 transition-colors">
                  <Star className="w-5 h-5 text-white/60 group-hover:text-[#EFFC76] transition-colors" />
                </div>
              </div>
              <div className="space-y-2 mb-2">
                <div className="text-3xl font-bold text-white">8.8/10</div>
              </div>
               <div className="flex items-center gap-2 text-xs">
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" /> 7.2%
                  </span>
                  <span className="text-white/40">from last month</span>
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    Attendance Overview
                  </CardTitle>
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
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <div className="text-3xl font-bold text-[#EFFC76] mb-1">
                        89.2%
                      </div>
                      <div className="text-sm text-white/70 mb-1">
                        Attendance Rate
                      </div>
                      <div className="text-xs text-[#EFFC76]">+2.8%</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">
                        1261/1.298
                      </div>
                      <div className="text-sm text-white/70 mb-1">
                        Today&apos;s Attendance
                      </div>
                      <div className="text-xs text-[#EFFC76]">+1.2%</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#EFFC76] rounded"></div>
                        <span className="text-sm text-white/70">
                          On-Time 86%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#EFFC76]/70 rounded"></div>
                        <span className="text-sm text-white/70">Late 12%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#EFFC76]/40 rounded"></div>
                        <span className="text-sm text-white/70">Absent 2%</span>
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
                  <CardTitle className="text-white">Activity</CardTitle>
                  <button className="text-sm font-medium text-[#EFFC76] hover:text-[#e0ef5f]">
                    See Detail
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <select className="px-3 py-2 border border-white/20 rounded-lg text-sm bg-white/5 text-white">
                        <option>Last 7 Days</option>
                      </select>
                      <div className="flex items-center gap-2 px-3 py-2 border border-white/20 rounded-lg bg-white/5">
                        <Calendar className="w-4 h-4 text-[#EFFC76]" />
                        <span className="text-sm text-white/80">
                          1 Jan - 7 Jan
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="px-4 py-2 bg-[#EFFC76] text-black text-sm rounded-lg">
                          Attendance
                        </button>
                        <button className="px-4 py-2 text-white/70 text-sm rounded-lg hover:bg-white/10">
                          Leave Request
                        </button>
                        <button className="px-4 py-2 text-white/70 text-sm rounded-lg hover:bg-white/10">
                          Finance
                        </button>
                      </div>
                    </div>
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

                  <div className="border-t border-white/10 pt-4">
                    <div className="grid grid-cols-7 gap-4 text-xs font-medium text-white/60 uppercase tracking-wider pb-3">
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
                <CardTitle className="text-white">Your Next Agenda</CardTitle>
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
                  <h3 className="text-xl font-semibold text-white">Finance Report</h3>
                  <button className="text-white/40 hover:text-white">
                    <div className="flex gap-1">
                        <div className="w-1 h-1 bg-current rounded-full"></div>
                        <div className="w-1 h-1 bg-current rounded-full"></div>
                        <div className="w-1 h-1 bg-current rounded-full"></div>
                    </div>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div>
                    <div className="text-sm text-white/50 mb-1">Weekly</div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-white">$24,291</span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">+25.0%</span>
                    </div>
                    <div className="text-xs text-white/40 mt-1">Compared to $1,340 last week</div>
                  </div>
                  
                   <div>
                    <div className="text-sm text-white/50 mb-1">Monthly</div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-white">$48,903</span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">+1.9%</span>
                    </div>
                    <div className="text-xs text-white/40 mt-1">Compared to $5,441 last month</div>
                  </div>

                   <div>
                    <div className="text-sm text-white/50 mb-1">Yearly</div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-white">$198,134</span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">+22%</span>
                    </div>
                    <div className="text-xs text-white/40 mt-1">Compared to $76,330 last year</div>
                  </div>
                </div>
              </div>
            </div>
            <FinanceChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
