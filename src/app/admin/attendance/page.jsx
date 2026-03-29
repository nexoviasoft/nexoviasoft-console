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
import { useAuth } from "@/contexts/AuthContext";
export default function Attendance() {
  const { user, userRole } = useAuth();
  const role = (userRole || "").toLowerCase();
  const isStaff = role === "admin" || role === "manager";

  const { data: myAttendanceResp, isLoading: isLoadingMyAttendance } = 
    useGetMyAttendanceQuery(undefined, { skip: isStaff });
  const { data: allAttendanceResp, isLoading: isLoadingAllAttendance } = 
    useGetAllAttendanceQuery(undefined, { skip: !isStaff });

  const { data: myStatsResp, isLoading: isLoadingMyStats } = 
    useGetMyAttendanceStatsQuery(undefined, { skip: isStaff });
  const { data: allStatsResp, isLoading: isLoadingAllStats } = 
    useGetAttendanceStatsQuery(undefined, { skip: !isStaff });

  const attendanceResp = isStaff ? allAttendanceResp : myAttendanceResp;
  const statsResp = isStaff ? allStatsResp : myStatsResp;
  const isLoadingAttendance = isStaff ? isLoadingAllAttendance : isLoadingMyAttendance;
  const isLoadingStats = isStaff ? isLoadingAllStats : isLoadingMyStats;

  const rows =
    attendanceResp?.data
      ?.filter((a) => isStaff || !user?.id || Number(a.teamId) === Number(user.id))
      .map((a) => ({
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
