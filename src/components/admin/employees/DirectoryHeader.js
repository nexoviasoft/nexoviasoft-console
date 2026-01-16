"use client";

import React from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DirectoryHeader({ onSearch, onFilterChange }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Employee Directory</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your team members and their account permissions here.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search employees..." 
            className="pl-9 bg-white" 
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        
        <Select onValueChange={onFilterChange}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Product">Product</SelectItem>
            <SelectItem value="HR">HR</SelectItem>
          </SelectContent>
        </Select>

        <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Employee</span>
        </Button>
      </div>
    </div>
  );
}
