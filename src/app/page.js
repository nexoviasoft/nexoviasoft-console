"use client";

import React from "react";
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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AttendanceChart from "@/components/admin/dashboard/AttendanceChart";

export default function Dashboard() {
  return (
    <div className="px-8 py-6 text-white">
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-[#EFFC76]/10 rounded-xl">
                      <Users className="w-5 h-5 text-[#EFFC76]" />
                    </div>
                    <span className="text-sm text-white/70">
                      Total Employees
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    1.298
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-white/60">Last Week</span>
                    <span className="font-medium flex items-center gap-1 text-emerald-400">
                      <ArrowUp className="w-4 h-4 text-[#EFFC76]" />
                      +2.8%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-[#EFFC76]/10 rounded-xl">
                      <DoorOpen className="w-5 h-5 text-[#EFFC76]" />
                    </div>
                    <span className="text-sm text-white/70">
                      Leave Requests
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">123</div>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-white/60">Last Week</span>
                    <span className="font-medium flex items-center gap-1 text-rose-400">
                      <ArrowDown className="w-4 h-4 text-[#EFFC76]" />
                      -0.5%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-[#EFFC76]/10 rounded-xl">
                      <Star className="w-5 h-5 text-[#EFFC76]" />
                    </div>
                    <span className="text-sm text-white/70">Average KPI</span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    8.8/10
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-white/60">Last Week</span>
                    <span className="font-medium flex items-center gap-1 text-emerald-400">
                      <ArrowUp className="w-4 h-4 text-[#EFFC76]" />
                      +0.8%
                    </span>
                  </div>
                </div>
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
                  <button className="text-sm font-medium text-[#EFFC76] hover:text-[#e0ef5f]">
                    See Detail
                  </button>
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
                    <AttendanceChart />
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
      </div>
    </div>
  );
}
