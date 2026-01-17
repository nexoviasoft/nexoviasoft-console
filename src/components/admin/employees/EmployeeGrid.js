"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  
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
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredEmployees.map((employee) => (
              <tr 
                key={employee.id} 
                className="hover:bg-gray-50/50 transition-colors"
              >
                {/* Employee Info */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={employee.avatar} alt={employee.name} />
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">{employee.name}</div>
                      <div className="text-sm text-gray-500">{employee.email}</div>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{employee.role}</div>
                </td>

                {/* Department */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                    {employee.department}
                  </span>
                </td>

                {/* Contact */}
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <a 
                      href={`mailto:${employee.email}`}
                      className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span className="text-xs">{employee.email}</span>
                    </a>
                    <a 
                      href={`tel:${employee.phone}`}
                      className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span className="text-xs">{employee.phone}</span>
                    </a>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/admin/employees/${employee.id}`)}
                    className="hover:bg-purple-50 hover:text-purple-600"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Profile
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
