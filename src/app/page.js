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

export default function Dashboard() {
  return (
    <div className="px-8 py-6">
      <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-sm text-gray-600">
                          Total Employees
                        </span>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        1.298
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-gray-500">Last Week</span>
                        <span className="text-green-600 font-medium flex items-center gap-1">
                          <ArrowUp className="w-4 h-4" />
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
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <DoorOpen className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-sm text-gray-600">
                          Leave Requests
                        </span>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        123
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-gray-500">Last Week</span>
                        <span className="text-red-600 font-medium flex items-center gap-1">
                          <ArrowDown className="w-4 h-4" />
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
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Star className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-sm text-gray-600">
                          Average KPI
                        </span>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        8.8/10
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-gray-500">Last Week</span>
                        <span className="text-green-600 font-medium flex items-center gap-1">
                          <ArrowUp className="w-4 h-4" />
                          +0.8%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-3 gap-6">
              {/* Left Column - Attendance Overview */}
              <div className="col-span-2 space-y-6">
                {/* Attendance Overview */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Attendance Overview</CardTitle>
                      <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                        See Detail
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <div className="text-3xl font-bold text-green-600 mb-1">
                            89.2%
                          </div>
                          <div className="text-sm text-gray-600 mb-1">
                            Attendance Rate
                          </div>
                          <div className="text-xs text-green-600">+2.8%</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-gray-900 mb-1">
                            1261/1.298
                          </div>
                          <div className="text-sm text-gray-600 mb-1">
                            Today's Attendance
                          </div>
                          <div className="text-xs text-green-600">+1.2%</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-purple-600 rounded"></div>
                            <span className="text-sm text-gray-600">
                              On-Time 86%
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-purple-400 rounded"></div>
                            <span className="text-sm text-gray-600">
                              Late 12%
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-purple-200 rounded"></div>
                            <span className="text-sm text-gray-600">
                              Absent 2%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Attendance Heatmap */}
                      <div>
                        <div className="flex items-end gap-2 h-32">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                            (day, dayIndex) => {
                              // Generate consistent pattern for each day
                              const patterns = [
                                [1, 1, 1, 1, 0.8, 0.6, 0.4, 0.2], // Mon
                                [1, 1, 1, 0.9, 0.7, 0.5, 0.3, 0.1], // Tue
                                [1, 1, 0.9, 0.8, 0.6, 0.4, 0.2, 0], // Wed
                                [1, 1, 1, 0.9, 0.7, 0.5, 0.3, 0.1], // Thu
                                [1, 1, 1, 1, 0.8, 0.6, 0.4, 0.2], // Fri
                                [0.5, 0.3, 0.2, 0.1, 0, 0, 0, 0], // Sat
                                [0.3, 0.2, 0.1, 0, 0, 0, 0, 0], // Sun
                              ];
                              const dayPattern = patterns[dayIndex];
                              
                              return (
                                <div
                                  key={day}
                                  className="flex-1 flex flex-col items-center gap-1"
                                >
                                  <div className="w-full flex flex-col gap-0.5">
                                    {dayPattern.map((intensity, hourIndex) => (
                                      <div
                                        key={hourIndex}
                                        className={`h-3 rounded ${
                                          intensity > 0.7
                                            ? "bg-purple-600"
                                            : intensity > 0.4
                                            ? "bg-purple-400"
                                            : intensity > 0
                                            ? "bg-purple-200"
                                            : "bg-gray-100"
                                        }`}
                                      ></div>
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-500 mt-2">
                                    {day}
                                  </span>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Section */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Activity</CardTitle>
                      <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                        See Detail
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Filters */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
                            <option>Last 7 Days</option>
                          </select>
                          <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-white">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">
                              1 Jan - 7 Jan
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg">
                              Attendance
                            </button>
                            <button className="px-4 py-2 text-gray-600 text-sm rounded-lg hover:bg-gray-100">
                              Leave Request
                            </button>
                            <button className="px-4 py-2 text-gray-600 text-sm rounded-lg hover:bg-gray-100">
                              Finance
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
                            <span>Filter</span>
                          </button>
                          <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
                            <span>Sort By</span>
                            <ChevronUp className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Table Headers */}
                      <div className="border-t border-gray-200 pt-4">
                        <div className="grid grid-cols-7 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
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

              {/* Right Column */}
              <div className="space-y-6">
                {/* Your Next Agenda */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Next Agenda</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Video className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            Monthly Evaluation
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Today, 08:30 AM - 10:30 AM
                          </p>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex -space-x-2">
                              {Array.from({ length: 4 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="w-6 h-6 rounded-full bg-purple-400 border-2 border-white"
                                ></div>
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">
                              38 Participants
                            </span>
                          </div>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                            Join Meeting Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Schedule */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Schedule
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Day Selector */}
                      <div className="grid grid-cols-7 gap-1">
                        {[1, 2, 3, 4, 5, 6, 7].map((day, index) => (
                          <div
                            key={day}
                            className="flex flex-col items-center gap-1"
                          >
                            <button
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                                day === 3
                                  ? "bg-purple-600 text-white"
                                  : "text-gray-600 hover:bg-gray-100"
                              }`}
                            >
                              {day}
                            </button>
                            <span className="text-xs text-gray-500">
                              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"][
                                index
                              ]}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Schedule Items */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <div className="flex-1">
                            <div className="font-medium text-sm text-gray-900">
                              Team Stand-Up Meeting
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              <Video className="w-3 h-3" />
                              Online 08:30 AM
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>

                        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <div className="flex-1">
                            <div className="font-medium text-sm text-gray-900">
                              Client Presentation
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              <Monitor className="w-3 h-3" />
                              Conference Room 11:00 AM
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>

                        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <div className="flex-1">
                            <div className="font-medium text-sm text-gray-900">
                              Training Session: Workplace...
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              <Video className="w-3 h-3" />
                              Online 01:30 PM
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
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
