"use client";

import React, { useState, useMemo } from "react";
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
import { Search, MoreHorizontal, CheckCircle2, XCircle, Clock, FileText, User, Calendar, Activity } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { useGetLeavesQuery, useApproveLeaveMutation, useRejectLeaveMutation } from "@/api/admin/leave/leaveApi";
import { useAuth } from "@/contexts/AuthContext";

export default function LeaveRequestTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: leavesData, isLoading, error, refetch } = useGetLeavesQuery();
  const [approveLeave] = useApproveLeaveMutation();
  const [rejectLeave] = useRejectLeaveMutation();
  const { userRole } = useAuth();
  
  const isAdmin = userRole === 'admin';

  // Format leave data for display
  const requests = useMemo(() => {
    if (!leavesData) return [];
    
    return leavesData.map((leave) => {
      const startDate = new Date(leave.startDate);
      const endDate = new Date(leave.endDate);
      const appliedOn = leave.appliedOn ? new Date(leave.appliedOn) : new Date(leave.createdAt);
      
      // Format duration
      const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        });
      };
      
      const duration = startDate.getTime() === endDate.getTime()
        ? formatDate(startDate)
        : `${formatDate(startDate)} - ${formatDate(endDate)}`;

      return {
        id: leave.id,
        employee: {
          name: `${leave.team?.firstName || ''} ${leave.team?.lastName || ''}`.trim(),
          role: leave.team?.position || leave.team?.role || 'Employee',
          avatar: leave.team?.profileImage || `/avatars/0${(leave.id % 9) + 1}.png`,
        },
        type: leave.type,
        duration: duration,
        days: leave.days,
        reason: leave.reason || '',
        status: leave.status,
        appliedOn: formatDate(appliedOn),
      };
    });
  }, [leavesData]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      if (newStatus === "approved") {
        await approveLeave(id).unwrap();
        toast.success("Leave request approved successfully. Email notification sent.");
      } else if (newStatus === "rejected") {
        await rejectLeave({ id }).unwrap();
        toast.success("Leave request rejected successfully. Email notification sent.");
      }
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || `Failed to ${newStatus} leave request`);
    }
  };

  const filteredRequests = requests.filter(req => 
    req.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <Card className="border-none glass-card">
        <CardContent className="p-6">
          <div className="text-center text-white/60">Loading leave requests...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-none glass-card">
        <CardContent className="p-6">
          <div className="text-center text-red-400">Error loading leave requests. Please try again.</div>
        </CardContent>
      </Card>
    );
  }

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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#EFFC76]" />
              {isAdmin ? 'All Leave Requests' : 'My Leave Requests'}
            </CardTitle>
            <CardDescription className="text-white/70">
              {isAdmin ? 'Manage and review all team leave applications' : 'View and track your leave applications'}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 w-full md:w-64 bg-white/5 border-none rounded-lg px-3 py-1 shadow-sm focus-within:ring-1 focus-within:ring-[#EFFC76] transition-all">
            <Search className="w-4 h-4 text-white/40" />
            <Input
              type="text"
              placeholder="Search requests..."
              className="border-0 bg-transparent shadow-none focus-visible:ring-0 px-0 h-8 text-sm text-white placeholder:text-white/40 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-[#1A1A1A] rounded-xl sm:rounded-2xl overflow-hidden overflow-x-auto border border-white/5">
          <Table className="min-w-[800px]">
            <TableHeader className="bg-[#1A1A1A]">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#EFFC76]" />
                    Employee
                  </div>
                </TableHead>
                <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#EFFC76]" />
                    Leave Type
                  </div>
                </TableHead>
                <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#EFFC76]" />
                    Duration
                  </div>
                </TableHead>
                <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#EFFC76]" />
                    Days
                  </div>
                </TableHead>
                <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#EFFC76]" />
                    Status
                  </div>
                </TableHead>
                <TableHead className="text-right text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((req) => (
                <TableRow key={req.id} className="hover:bg-white/5 transition-colors border-white/5 group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-white/10 bg-black/40">
                        <AvatarImage src={req.employee.avatar} />
                        <AvatarFallback className="bg-[#EFFC76]/20 text-[#EFFC76] font-medium">
                          {req.employee.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-white group-hover:text-[#EFFC76] transition-colors">{req.employee.name}</div>
                        <div className="text-xs text-white/60 group-hover:text-[#EFFC76]/70 transition-colors">{req.employee.role}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-white/90 group-hover:text-[#EFFC76] transition-colors">{req.type}</span>
                      <span className="text-xs text-white/60 group-hover:text-[#EFFC76]/70 transition-colors">{req.reason}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-white/70 text-sm group-hover:text-[#EFFC76] transition-colors">
                      <Clock className="w-3.5 h-3.5 text-white/40 group-hover:text-[#EFFC76] transition-colors" />
                      {req.duration}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-white group-hover:text-[#EFFC76] transition-colors">{req.days} days</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(req.status)}</TableCell>
                  <TableCell className="text-right">
                    {isAdmin ? (
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
                        <DropdownMenuContent align="end" className="w-[160px] glass-card border-[#EFFC76]/20 bg-black/90 text-white">
                          {req.status === "pending" && (
                            <>
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
                            </>
                          )}
                          {req.status !== "pending" && (
                            <DropdownMenuItem disabled className="text-white/40 cursor-not-allowed">
                              {req.status === "approved" ? "Already Approved" : "Already Rejected"}
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <span className="text-xs text-white/60">
                        {req.status === "pending" ? "Pending Review" : req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </span>
                    )}
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
