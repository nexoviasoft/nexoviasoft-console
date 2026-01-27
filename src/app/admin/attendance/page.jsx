"use client";
import React from "react";
import AttendanceHeader from "@/components/admin/attendance/AttendanceHeader";
import AttendanceStats from "@/components/admin/attendance/AttendanceStats";
import AttendanceTable from "@/components/admin/attendance/AttendanceTable";
import BiometricClockIn from "@/components/admin/attendance/BiometricClockIn";
import {
  useGetMyAttendanceQuery,
  useGetMyAttendanceStatsQuery,
} from "@/api/admin/attendance/attendanceApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function Attendance() {
  const { data: attendanceResp, isLoading: isLoadingAttendance } =
    useGetMyAttendanceQuery();
  const { data: statsResp, isLoading: isLoadingStats } =
    useGetMyAttendanceStatsQuery();

  const rows =
    attendanceResp?.data?.map((a) => ({
      id: a.id,
      name: a?.team?.name || "Unknown",
      role: a?.team?.role || "-",
      avatar: a?.team?.avatar || "",
      checkIn: a.checkIn || "-",
      checkOut: a.checkOut || "-",
      workHours: a.workHours || "-",
      status: a.status || "Absent",
      approved: a.approved || false,
      date: a.createdAt || null,
    })) || [];

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 py-6 md:px-8 md:py-8 text-white">
          <div className="max-w-[1600px] w-full mx-auto space-y-6">
            <AttendanceHeader />
            <BiometricClockIn />
            <AttendanceStats stats={statsResp?.data} />
            <AttendanceTable rows={isLoadingAttendance ? [] : rows} />
            {(isLoadingAttendance || isLoadingStats) && (
              <div className="text-sm text-white/60">
                Loading your attendance…
              </div>
            )}
          </div>
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}
