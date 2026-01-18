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
    if (status === "approved") {
      return (
        <Badge className="bg-emerald-500/15 text-emerald-200 border border-emerald-400/60">
          Approved
        </Badge>
      );
    }
    if (status === "rejected") {
      return (
        <Badge className="bg-rose-500/15 text-rose-200 border border-rose-400/60">
          Rejected
        </Badge>
      );
    }
    return (
      <Badge className="bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/60">
        Pending
      </Badge>
    );
  };

  return (
    <Card className="border-none glass-card">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-white">Leave Requests</CardTitle>
            <CardDescription className="text-white/70">
              Manage and review team leave applications
            </CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/40" />
            <Input
              type="text"
              placeholder="Search requests..."
              className="pl-9 bg-black/40 border-white/20 text-white placeholder:text-white/40 focus:bg-black/60 focus:border-[#EFFC76] focus-visible:ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-white/15 bg-black/40 overflow-hidden">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow>
                <TableHead className="text-xs font-semibold text-white/60">Employee</TableHead>
                <TableHead className="text-xs font-semibold text-white/60">Leave Type</TableHead>
                <TableHead className="text-xs font-semibold text-white/60">Duration</TableHead>
                <TableHead className="text-xs font-semibold text-white/60">Days</TableHead>
                <TableHead className="text-xs font-semibold text-white/60">Status</TableHead>
                <TableHead className="text-xs font-semibold text-white/60 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((req) => (
                <TableRow key={req.id} className="hover:bg-white/5 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-white/10 bg-black/40">
                        <AvatarImage src={req.employee.avatar} />
                        <AvatarFallback className="bg-[#EFFC76]/10 text-[#EFFC76] font-medium">
                          {req.employee.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-white">{req.employee.name}</div>
                        <div className="text-xs text-white/60">{req.employee.role}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-white/90">{req.type}</span>
                      <span className="text-xs text-white/60">{req.reason}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Clock className="w-3.5 h-3.5 text-white/40" />
                      {req.duration}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-white">{req.days} days</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(req.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-white/5 text-white/60 hover:text-[#EFFC76]"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(req.id, "approved")}
                          className="text-emerald-300 focus:text-emerald-200 focus:bg-emerald-500/20 cursor-pointer"
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(req.id, "rejected")}
                          className="text-rose-300 focus:text-rose-200 focus:bg-rose-500/20 cursor-pointer"
                        >
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
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-white/60"
                  >
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
