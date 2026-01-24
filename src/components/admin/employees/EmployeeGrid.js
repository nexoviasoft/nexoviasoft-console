"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Mail, Phone, Eye, MoreVertical, Edit, Trash2, User, Briefcase, Building2 } from "lucide-react";
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
          <thead className="bg-[#EFFC76]/10 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#EFFC76] uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Employee
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#EFFC76] uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Role
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#EFFC76] uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Department
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#EFFC76] uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Contact
                </div>
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-[#EFFC76] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filteredEmployees.map((employee) => (
              <tr 
                key={employee.id} 
                className="group hover:bg-[#EFFC76]/5 transition-colors border-b border-white/10 last:border-0"
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
                      <div className="font-semibold text-white">{employee.name}</div>
                      <div className="text-sm text-white/60">{employee.email}</div>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="px-6 py-4">
                  <div className="text-sm text-white/80">{employee.role}</div>
                </td>

                {/* Department */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EFFC76]/15 text-[#EFFC76] border border-[#EFFC76]/60">
                    {employee.department}
                  </span>
                </td>

                {/* Contact */}
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <a 
                      href={`mailto:${employee.email}`}
                      className="flex items-center gap-1.5 text-sm text-white/70 hover:text-[#EFFC76] transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span className="text-xs">{employee.email}</span>
                    </a>
                    <a 
                      href={`tel:${employee.phone}`}
                      className="flex items-center gap-1.5 text-sm text-white/70 hover:text-[#EFFC76] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span className="text-xs">{employee.phone}</span>
                    </a>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/admin/employees/${employee.id}`)}
                      className="glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:border-[#EFFC76]/70 hover:text-[#EFFC76]"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Profile
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:text-[#EFFC76] hover:bg-[#EFFC76]/10 data-[state=open]:text-[#EFFC76] data-[state=open]:bg-[#EFFC76]/10">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 glass-card border-[#EFFC76]/20 bg-black/90 text-white">
                        <DropdownMenuItem className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer" onClick={() => router.push(`/admin/employees/${employee.id}`)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer" onClick={() => window.location.href = `mailto:${employee.email}`}>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer" onClick={() => window.location.href = `tel:${employee.phone}`}>
                          <Phone className="mr-2 h-4 w-4" />
                          Call
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Employee
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove Employee
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
