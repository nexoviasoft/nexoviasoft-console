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

export default function DirectoryHeader({ onSearch, onFilterChange, onAddEmployee }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Employee Directory</h1>
        <p className="text-sm text-white/60 mt-1">
          Manage your team members and their account permissions here.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input 
            placeholder="Search employees..." 
            className="pl-9 bg-black/40 border border-white/20 text-white placeholder:text-white/50 focus-visible:ring-[#EFFC76]" 
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        
        <Select onValueChange={onFilterChange}>
          <SelectTrigger className="w-[180px] bg-black/40 border border-white/20 text-white">
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

        <Button 
          className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black gap-2 glass-button"
          onClick={onAddEmployee}
        >
          <Plus className="w-4 h-4 text-black" />
          <span className="hidden sm:inline">Add Employee</span>
        </Button>
      </div>
    </div>
  );
}
