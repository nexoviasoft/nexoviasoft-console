"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase,
  Edit,
  MoreVertical,
  Save
} from "lucide-react";
import { toast } from "sonner";

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
  const initialEmployee = getEmployee(params.id);
  const [employee, setEmployee] = useState(initialEmployee);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState(employee);

  const handleEditClick = () => {
    setEditForm(employee);
    setIsEditDialogOpen(true);
  };

  const handleSaveChanges = () => {
    setEmployee(editForm);
    setIsEditDialogOpen(false);
    toast.success("Profile updated successfully!");
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

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
              <Button variant="outline" size="sm" onClick={handleEditClick}>
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

      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl glass-panel">
          <DialogHeader>
            <DialogTitle>Edit Employee Profile</DialogTitle>
            <DialogDescription>
              Update employee information and save changes.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            {/* Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Role */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">Role</Label>
              <Input
                id="role"
                value={editForm.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Department */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">Department</Label>
              <Select value={editForm.department} onValueChange={(value) => handleInputChange('department', value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                type="email"
                value={editForm.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Phone */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Phone</Label>
              <Input
                id="phone"
                value={editForm.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">Location</Label>
              <Input
                id="location"
                value={editForm.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Manager */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="manager" className="text-right">Manager</Label>
              <Input
                id="manager"
                value={editForm.manager}
                onChange={(e) => handleInputChange('manager', e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Status */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status</Label>
              <Select value={editForm.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bio */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="bio" className="text-right pt-2">Bio</Label>
              <Textarea
                id="bio"
                value={editForm.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="col-span-3 min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges} className="bg-purple-600 hover:bg-purple-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
