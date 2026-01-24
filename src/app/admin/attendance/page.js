"use client";
import React from "react";
import AttendanceHeader from "@/components/admin/attendance/AttendanceHeader";
import AttendanceStats from "@/components/admin/attendance/AttendanceStats";
import AttendanceTable from "@/components/admin/attendance/AttendanceTable";
import BiometricClockIn from "@/components/admin/attendance/BiometricClockIn";

export default function Attendance() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8 text-white">
      <div className="max-w-[1600px] w-full mx-auto space-y-6">
        <AttendanceHeader />
        <BiometricClockIn />
        <AttendanceStats />
        <AttendanceTable />
      </div>
    </div>
  );
}
