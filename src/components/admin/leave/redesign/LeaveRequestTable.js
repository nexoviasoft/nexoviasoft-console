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
import { Input } from "@/components/ui/input";
import { Search, MoreHorizontal, CheckCircle2, XCircle, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

// Mock Data
const leaveData = [
    {
      id: 1,
      employee: { name: "John Smith", role: "Senior Developer", avatar: "/avatars/01.png" },
      type: "Sick Leave",
      duration: "Jan 20 - Jan 22, 2026",
      days: 3,
      reason: "Recovering from flu",
      status: "pending",
      appliedOn: "Jan 18, 2026"
    },
    {
      id: 2,
      employee: { name: "Sarah Connors", role: "UX Designer", avatar: "/avatars/02.png" },
      type: "Casual Leave",
      duration: "Feb 10 - Feb 15, 2026",
      days: 5,
      reason: "Family trip",
      status: "approved",
      appliedOn: "Jan 15, 2026"
    },
    {
      id: 3,
      employee: { name: "Michael Chen", role: "Frontend Dev", avatar: "/avatars/03.png" },
      type: "Sick Leave",
      duration: "Jan 25, 2026",
      days: 1,
      reason: "Personal appointment",
      status: "pending",
      appliedOn: "Jan 24, 2026"
    },
     {
      id: 4,
      employee: { name: "Emma Wilson", role: "Product Manager", avatar: "/avatars/04.png" },
      type: "Earned Leave",
      duration: "Mar 01 - Mar 05, 2026",
      days: 5,
      reason: "Vacation",
      status: "rejected",
      appliedOn: "Jan 10, 2026"
    },
    {
        id: 5,
        employee: { name: "David Miller", role: "QA Engineer", avatar: "/avatars/05.png" },
        type: "Sick Leave",
        duration: "Jan 28, 2026",
        days: 1,
        reason: "Medical Checkup",
        status: "pending",
        appliedOn: "Jan 26, 2026"
    },
  ];


export default function LeaveRequestTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState(leaveData);

  const handleStatusChange = (id, newStatus) => {
      setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
      toast.success(`Leave request marked as ${newStatus}`);
  };

  const filteredRequests = requests.filter(req => 
    req.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-200">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500/15 text-red-600 hover:bg-red-500/25 border-red-200">Rejected</Badge>;
      default:
        return <Badge className="bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 border-amber-200">Pending</Badge>;
    }
  };

  return (
    <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Leave Requests</CardTitle>
                <CardDescription>Manage and review team leave applications</CardDescription>
            </div>
            <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                type="text"
                placeholder="Search requests..."
                className="pl-9 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border bg-white overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((req) => (
                <TableRow key={req.id} className="hover:bg-gray-50/50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                        <AvatarImage src={req.employee.avatar} />
                        <AvatarFallback className="bg-purple-100 text-purple-700 font-medium">
                            {req.employee.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">{req.employee.name}</div>
                        <div className="text-xs text-gray-500">{req.employee.role}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                     <div className="flex flex-col">
                        <span className="font-medium text-gray-700">{req.type}</span>
                        <span className="text-xs text-gray-400">{req.reason}</span>
                     </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {req.duration}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-900">{req.days} days</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(req.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4 text-gray-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem onClick={() => handleStatusChange(req.id, "approved")} className="text-emerald-600 focus:text-emerald-700 focus:bg-emerald-50 cursor-pointer">
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(req.id, "rejected")} className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer">
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredRequests.length === 0 && (
                  <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                          No requests found matching your search.
                      </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
