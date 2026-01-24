"use client";

import React from "react";
import { Search, Filter, Plus, Users } from "lucide-react";
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
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-[#EFFC76]/10 border border-[#EFFC76]/20">
          <Users className="w-5 h-5 text-[#EFFC76]" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Employee Directory</h1>
          <p className="text-xs md:text-sm text-white/60">
            Manage your team members and their account permissions here.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input 
            placeholder="Search employees..." 
            className="pl-9 bg-black/40 border border-white/20 text-white placeholder:text-white/50 focus-visible:ring-[#EFFC76]" 
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3 w-full sm:w-auto sm:flex sm:items-center sm:gap-3">
          <Select onValueChange={onFilterChange}>
            <SelectTrigger className="w-full sm:w-[180px] bg-black/40 border border-white/20 text-white focus:ring-[#EFFC76]">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent className="glass-card border-[#EFFC76]/20 bg-black/90 text-white">
              <SelectItem value="all" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer">All Departments</SelectItem>
              <SelectItem value="Design" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer">Design</SelectItem>
              <SelectItem value="Engineering" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer">Engineering</SelectItem>
              <SelectItem value="Marketing" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer">Marketing</SelectItem>
              <SelectItem value="Product" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer">Product</SelectItem>
              <SelectItem value="HR" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer">HR</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black gap-2 glass-button w-full sm:w-auto"
            onClick={onAddEmployee}
          >
            <Plus className="w-4 h-4 text-black" />
            <span>Add Employee</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
