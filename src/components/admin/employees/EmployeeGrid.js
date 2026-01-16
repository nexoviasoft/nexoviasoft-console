"use client";

import React from "react";
import EmployeeCard from "./EmployeeCard";

const initialEmployees = [
  {
    id: 1,
    name: "Dipa Inhouse",
    role: "Visual Designer",
    department: "Design",
    avatar: "/avatars/01.png",
    email: "dipa@squadlog.com",
    phone: "+1 234 567 890"
  },
  {
    id: 2,
    name: "Jane Cooper",
    role: "Product Manager",
    department: "Product",
    avatar: "/avatars/02.png",
    email: "jane@squadlog.com",
    phone: "+1 234 567 890"
  },
  {
    id: 3,
    name: "Floyd Miles",
    role: "Frontend Developer",
    department: "Engineering",
    avatar: "/avatars/03.png",
    email: "floyd@squadlog.com",
    phone: "+1 234 567 890"
  },
  {
    id: 4,
    name: "Theresa Webb",
    role: "Marketing Specialist",
    department: "Marketing",
    avatar: "/avatars/04.png",
    email: "theresa@squadlog.com",
    phone: "+1 234 567 890"
  },
  {
    id: 5,
    name: "Robert Fox",
    role: "Backend Developer",
    department: "Engineering",
    avatar: "/avatars/05.png",
    email: "robert@squadlog.com",
    phone: "+1 234 567 890"
  },
  {
    id: 6,
    name: "Cody Fisher",
    role: "HR Manager",
    department: "HR",
    avatar: "/avatars/06.png",
    email: "cody@squadlog.com",
    phone: "+1 234 567 890"
  },
];

export default function EmployeeGrid({ searchQuery, departmentFilter }) {
  const filteredEmployees = initialEmployees.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          employee.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || !departmentFilter || employee.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  if (filteredEmployees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-lg font-medium">No employees found</p>
        <p className="text-sm">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredEmployees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
}
