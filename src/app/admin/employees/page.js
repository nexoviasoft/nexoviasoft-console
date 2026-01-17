"use client";

import React, { useState } from "react";
import DirectoryHeader from "@/components/admin/employees/DirectoryHeader";
import EmployeeGrid from "@/components/admin/employees/EmployeeGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { UserPlus } from "lucide-react";
import { toast } from "sonner";

export default function Employees() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    department: "",
    email: "",
    phone: "",
    location: "",
    manager: "",
    bio: ""
  });

  const handleInputChange = (field, value) => {
    setNewEmployee(prev => ({ ...prev, [field]: value }));
  };

  const handleAddEmployee = () => {
    // Validation
    if (!newEmployee.name || !newEmployee.email || !newEmployee.department) {
      toast.error("Please fill in all required fields");
      return;
    }

    // In real app, this would make an API call
    console.log("Adding employee:", newEmployee);
    toast.success(`${newEmployee.name} has been added successfully!`);
    
    // Reset form and close dialog
    setNewEmployee({
      name: "",
      role: "",
      department: "",
      email: "",
      phone: "",
      location: "",
      manager: "",
      bio: ""
    });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="bg-gray-50 px-8 py-8">
      <div className="max-w-[1600px] w-full mx-auto">
        <DirectoryHeader 
          onSearch={setSearchQuery} 
          onFilterChange={setDepartmentFilter}
          onAddEmployee={() => setIsAddDialogOpen(true)}
        />
        <EmployeeGrid 
          searchQuery={searchQuery}
          departmentFilter={departmentFilter}
        />
      </div>

      {/* Add Employee Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl glass-panel">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-purple-600" />
              Add New Employee
            </DialogTitle>
            <DialogDescription>
              Fill in the employee information below. Fields marked with * are required.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            {/* Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="add-name" className="text-right">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="add-name"
                value={newEmployee.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="John Doe"
                className="col-span-3"
              />
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="add-email" className="text-right">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="add-email"
                type="email"
                value={newEmployee.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john.doe@squadlog.com"
                className="col-span-3"
              />
            </div>

            {/* Role */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="add-role" className="text-right">Role</Label>
              <Input
                id="add-role"
                value={newEmployee.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                placeholder="Software Engineer"
                className="col-span-3"
              />
            </div>

            {/* Department */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="add-department" className="text-right">
                Department <span className="text-red-500">*</span>
              </Label>
              <Select value={newEmployee.department} onValueChange={(value) => handleInputChange('department', value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Phone */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="add-phone" className="text-right">Phone</Label>
              <Input
                id="add-phone"
                value={newEmployee.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 234 567 890"
                className="col-span-3"
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="add-location" className="text-right">Location</Label>
              <Input
                id="add-location"
                value={newEmployee.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="New York, USA"
                className="col-span-3"
              />
            </div>

            {/* Manager */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="add-manager" className="text-right">Manager</Label>
              <Input
                id="add-manager"
                value={newEmployee.manager}
                onChange={(e) => handleInputChange('manager', e.target.value)}
                placeholder="Manager Name"
                className="col-span-3"
              />
            </div>

            {/* Bio */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="add-bio" className="text-right pt-2">Bio</Label>
              <Textarea
                id="add-bio"
                value={newEmployee.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Brief description about the employee..."
                className="col-span-3 min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEmployee} className="bg-purple-600 hover:bg-purple-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
