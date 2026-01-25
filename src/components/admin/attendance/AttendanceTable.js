"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AttendanceDetailsDialog from "./AttendanceDetailsDialog";
import AttendanceEditDialog from "./AttendanceEditDialog";

const initialData = [
  {
    id: 1,
    name: "Dipa Inhouse",
    role: "Visual Designer",
    avatar: "/avatars/01.png",
    checkIn: "08:58 AM",
    checkOut: "06:05 PM",
    workHours: "9h 5m",
    status: "On Time",
  },
  {
    id: 2,
    name: "Jane Cooper",
    role: "Product Manager",
    avatar: "/avatars/02.png",
    checkIn: "09:05 AM",
    checkOut: "06:15 PM",
    workHours: "8h 30m",
    status: "Late",
  },
  {
    id: 3,
    name: "Floyd Miles",
    role: "Frontend Developer",
    avatar: "/avatars/03.png",
    checkIn: "09:00 AM",
    checkOut: "06:00 PM",
    workHours: "9h 0m",
    status: "On Time",
  },
  {
    id: 4,
    name: "Theresa Webb",
    role: "Marketing",
    avatar: "/avatars/04.png",
    checkIn: "08:45 AM",
    checkOut: "05:50 PM",
    workHours: "9h 5m",
    status: "On Time",
  },
  {
    id: 5,
    name: "Robert Fox",
    role: "Backend Developer",
    avatar: "/avatars/05.png",
    checkIn: "-",
    checkOut: "-",
    workHours: "-",
    status: "Absent",
  },
];

const StatusBadge = ({ status }) => {
  const styles = {
    "On Time":
      "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40",
    Late: "bg-orange-500/20 text-orange-300 border border-orange-400/40",
    Absent: "bg-red-500/20 text-red-300 border border-red-400/40",
  };
  return (
    <Badge className={`${styles[status]} font-medium shadow-none`}>
      {status}
    </Badge>
  );
};

export default function AttendanceTable() {
  const [data, setData] = useState(initialData);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowDetails(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowEdit(true);
  };

  const handleSaveEdit = (updatedEmployee) => {
    setData(
      data.map((item) =>
        item.id === updatedEmployee.id ? updatedEmployee : item,
      ),
    );
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
      <AttendanceDetailsDialog 
        open={showDetails} 
        onOpenChange={setShowDetails} 
        employee={selectedEmployee} 
      />
      <AttendanceEditDialog 
        open={showEdit} 
        onOpenChange={setShowEdit} 
        employee={selectedEmployee} 
        onSave={handleSaveEdit}
      />
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#EFFC76]/10">
            <TableRow className="hover:bg-transparent border-white/10">
              <TableHead className="w-[300px] text-[#EFFC76] font-semibold">Employee</TableHead>
              <TableHead className="text-[#EFFC76] font-semibold">Check In</TableHead>
              <TableHead className="text-[#EFFC76] font-semibold">Check Out</TableHead>
              <TableHead className="text-[#EFFC76] font-semibold">Work Hours</TableHead>
              <TableHead className="text-[#EFFC76] font-semibold">Status</TableHead>
              <TableHead className="text-right text-[#EFFC76] font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-[#EFFC76]/5 cursor-pointer transition-colors border-white/10"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-9 h-9 border border-[#EFFC76]/20">
                      <AvatarImage src={row.avatar} />
                      <AvatarFallback className="bg-[#EFFC76]/10 text-[#EFFC76]">{row.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-white">{row.name}</div>
                      <div className="text-xs text-white/60">{row.role}</div>
                    </div>
                  </div>
                </TableCell>
              <TableCell className="text-white/80 font-medium">
                {row.checkIn}
              </TableCell>
              <TableCell className="text-white/80 font-medium">
                {row.checkOut}
              </TableCell>
              <TableCell className="text-white/80 font-medium">
                {row.workHours}
              </TableCell>
              <TableCell>
                <StatusBadge status={row.status} />
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white/50 hover:text-[#EFFC76] hover:bg-white/5"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-[#1A1A1A] border-white/10 text-white"
                  >
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem
                      className="hover:bg-white/10 cursor-pointer focus:bg-white/10 focus:text-white"
                      onClick={() => handleViewDetails(row)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="hover:bg-white/10 cursor-pointer focus:bg-white/10 focus:text-white"
                      onClick={() => handleEdit(row)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit Record</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="hover:bg-white/10 cursor-pointer text-red-400 focus:text-red-400 focus:bg-white/10"
                      onClick={() => handleDelete(row.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  );
}
