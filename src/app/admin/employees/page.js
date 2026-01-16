"use client";

import React, { useState } from "react";
import DirectoryHeader from "@/components/admin/employees/DirectoryHeader";
import EmployeeGrid from "@/components/admin/employees/EmployeeGrid";

export default function Employees() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  return (
    <div className="bg-gray-50 px-8 py-8">
      <div className="max-w-[1600px] w-full mx-auto">
        <DirectoryHeader 
          onSearch={setSearchQuery} 
          onFilterChange={setDepartmentFilter}
        />
        <EmployeeGrid 
          searchQuery={searchQuery}
          departmentFilter={departmentFilter}
        />
      </div>
    </div>
  );
}
