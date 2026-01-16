"use client";

import React from "react";
import AttendanceHeader from "@/components/admin/attendance/AttendanceHeader";
import AttendanceStats from "@/components/admin/attendance/AttendanceStats";
import AttendanceTable from "@/components/admin/attendance/AttendanceTable";
import BiometricClockIn from "@/components/admin/attendance/BiometricClockIn";

export default function Attendance() {
  return (
    <div className="bg-gray-50 px-8 py-8">
      <div className="max-w-[1600px] w-full mx-auto">
        <AttendanceHeader />
        <BiometricClockIn />
        <AttendanceStats />
        <AttendanceTable />
      </div>
    </div>
  );
}
