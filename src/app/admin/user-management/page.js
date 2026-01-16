"use client";

import React from "react";
import UserManagementHeader from "@/components/landing/user-management/UserManagementHeader";
import UserTable from "@/components/landing/user-management/UserTable";

export default function UserManagement() {
  return (
    <div className="bg-gray-50 px-8 py-8">
      <div className="max-w-[1600px] w-full mx-auto">
        <UserManagementHeader />
        <UserTable />
      </div>
    </div>
  );
}
