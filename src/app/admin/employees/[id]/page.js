"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase,
  Edit,
  MoreVertical
} from "lucide-react";

// Mock employee data - in real app, fetch based on params.id
const getEmployee = (id) => {
  const employees = {
    "1": {
      id: 1,
      name: "Dipa Inhouse",
      role: "Visual Designer",
      department: "Design",
      avatar: "/avatars/01.png",
      email: "dipa@squadlog.com",
      phone: "+1 234 567 890",
      location: "New York, USA",
      joinDate: "January 15, 2023",
      employeeId: "EMP-001",
      manager: "Sarah Johnson",
      status: "Active",
      bio: "Passionate visual designer with 5+ years of experience in creating stunning user interfaces and brand identities.",
      skills: ["UI Design", "Figma", "Adobe XD", "Illustration", "Branding"],
      projects: ["Website Redesign", "Mobile App UI", "Brand Guidelines"]
    },
    "2": {
      id: 2,
      name: "Jane Cooper",
      role: "Product Manager",
      department: "Product",
      avatar: "/avatars/02.png",
      email: "jane@squadlog.com",
      phone: "+1 234 567 891",
      location: "San Francisco, USA",
      joinDate: "March 10, 2022",
      employeeId: "EMP-002",
      manager: "Mike Chen",
      status: "Active",
      bio: "Strategic product manager focused on delivering user-centric solutions.",
      skills: ["Product Strategy", "Agile", "User Research", "Data Analysis"],
      projects: ["API Integration", "Mobile App Development"]
    }
  };
  return employees[id] || employees["1"];
};

export default function EmployeeProfilePage({ params }) {
  const router = useRouter();
  const employee = getEmployee(params.id);

  return (
    <div className="bg-gray-50 px-8 py-6 min-h-screen">
      <div className="max-w-[1200px] w-full mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/admin/employees')}
            className="hover:bg-white/50 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Employees
          </Button>
        </div>

        {/* Profile Card */}
        <div className="glass-card rounded-xl p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24 ring-4 ring-purple-100">
                <AvatarImage src={employee.avatar} alt={employee.name} />
                <AvatarFallback className="bg-purple-100 text-purple-600 text-2xl">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{employee.name}</h1>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    {employee.status}
                  </Badge>
                </div>
                <p className="text-lg text-gray-600 mb-1">{employee.role}</p>
                <p className="text-sm text-gray-500">Employee ID: {employee.employeeId}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-700 leading-relaxed mb-6 max-w-3xl">
            {employee.bio}
          </p>

          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-lg">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Mail className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <a href={`mailto:${employee.email}`} className="text-sm font-medium text-gray-900 hover:text-purple-600">
                  {employee.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-lg">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Phone className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Phone</p>
                <a href={`tel:${employee.phone}`} className="text-sm font-medium text-gray-900 hover:text-purple-600">
                  {employee.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-lg">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Location</p>
                <p className="text-sm font-medium text-gray-900">{employee.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-lg">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Join Date</p>
                <p className="text-sm font-medium text-gray-900">{employee.joinDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Department & Manager */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Organization</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Department</p>
                <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                  {employee.department}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Reports To</p>
                <p className="text-sm font-medium text-gray-900">{employee.manager}</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {employee.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Active Projects</h2>
            <div className="space-y-2">
              {employee.projects.map((project, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50/50 rounded-lg">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{project}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
