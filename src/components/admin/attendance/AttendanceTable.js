"use client";

import React from "react";
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
import { MoreHorizontal } from "lucide-react";

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
    "On Time": "bg-green-100 text-green-700 hover:bg-green-200",
    "Late": "bg-orange-100 text-orange-700 hover:bg-orange-200",
    "Absent": "bg-red-100 text-red-700 hover:bg-red-200",
  };
  return <Badge className={`${styles[status]} font-medium border-0 shadow-none`}>{status}</Badge>;
};

export default function AttendanceTable() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[300px]">Employee</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Work Hours</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialData.map((row) => (
            <TableRow key={row.id} className="hover:bg-gray-50/50 cursor-pointer">
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="w-9 h-9 border border-gray-100">
                    <AvatarImage src={row.avatar} />
                    <AvatarFallback>{row.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">{row.name}</div>
                    <div className="text-xs text-gray-500">{row.role}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-gray-600 font-medium">{row.checkIn}</TableCell>
              <TableCell className="text-gray-600 font-medium">{row.checkOut}</TableCell>
              <TableCell className="text-gray-600 font-medium">{row.workHours}</TableCell>
              <TableCell>
                <StatusBadge status={row.status} />
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
