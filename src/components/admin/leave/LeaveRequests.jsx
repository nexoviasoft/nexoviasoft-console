"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, X, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";


const initialRequests = [
  {
    id: 1,
    name: "John Smith",
    role: "Senior Developer",
    department: "Engineering",
    avatar: "/avatars/01.png",
    type: "Sick Leave",
    dates: "Jan 20 - Jan 22, 2026",
    days: "3 days",
    reason: "Recovering from flu",
    status: "pending"
  },
  {
    id: 2,
    name: "Sarah Connors",
    role: "UX Designer",
    department: "Design",
    avatar: "/avatars/02.png",
    type: "Vacation",
    dates: "Feb 10 - Feb 15, 2026",
    days: "5 days",
    reason: "Family trip",
    status: "pending"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Frontend Dev",
    department: "Engineering",
    avatar: "/avatars/03.png",
    type: "Personal",
    dates: "Jan 25, 2026",
    days: "1 day",
    reason: "Personal appointment",
    status: "pending"
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Product Manager",
    department: "Product",
    avatar: "/avatars/04.png",
    type: "Sick Leave",
    dates: "Jan 28 - Jan 29, 2026",
    days: "2 days",
    reason: "Migraine",
    status: "pending"
  },
  {
    id: 5,
    name: "David Kim",
    role: "QA Engineer",
    department: "Engineering",
    avatar: "/avatars/05.png",
    type: "Vacation",
    dates: "Mar 01 - Mar 10, 2026",
    days: "10 days",
    reason: "Visiting parents",
    status: "pending"
  },
  {
    id: 6,
    name: "Jessica Lee",
    role: "Marketing Specialist",
    department: "Marketing",
    avatar: "/avatars/06.png",
    type: "Sick Leave",
    dates: "Jan 22, 2026",
    days: "1 day",
    reason: "Feeling unwell",
    status: "pending"
  },
  {
    id: 7,
    name: "Robert Wilson",
    role: "Backend Dev",
    department: "Engineering",
    avatar: "/avatars/07.png",
    type: "Personal",
    dates: "Feb 05, 2026",
    days: "1 day",
    reason: "Bank work",
    status: "pending"
  },
  {
    id: 8,
    name: "Lisa Taylor",
    role: "HR Manager",
    department: "HR",
    avatar: "/avatars/08.png",
    type: "Vacation",
    dates: "Apr 05 - Apr 12, 2026",
    days: "7 days",
    reason: "Vacation",
    status: "pending"
  }
];

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LeaveRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [filterDept, setFilterDept] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Derive filtered list
  const filteredRequests = requests.filter(req => 
    filterDept === "all" || req.department === filterDept
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  const handleAction = (id, action) => {
    setRequests(prev => prev.map(req => {
      if (req.id === id) {
        return { ...req, status: action };
      }
      return req;
    }));
    toast.success(`Request ${action === 'approved' ? 'Approved' : 'Rejected'}`);
  };

  const handleFilterChange = (value) => {
      setFilterDept(value);
      setCurrentPage(1); // Reset to first page
  };

  if (requests.length === 0) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <CardTitle className="text-white">Pending Requests</CardTitle>
            <CardDescription className="text-white/70">
              Review and manage leave applications
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Select value={filterDept} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-[200px] bg-black/40 border border-white/20 text-white">
                <SelectValue placeholder="Filter Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="secondary" className="bg-[#EFFC76]/20 text-[#EFFC76] border border-[#EFFC76]/60">
              {filteredRequests.filter(r => r.status === "pending").length} Pending
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentItems.length > 0 ? (
            currentItems.map((request) => (
              <div
                key={request.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-white/15 rounded-lg bg-black/40"
              >
                <div className="flex items-start gap-4 mb-4 sm:mb-0">
                  <Avatar className="h-10 w-10 ring-2 ring-[#EFFC76]/40">
                    <AvatarImage src={request.avatar} />
                    <AvatarFallback className="bg-[#EFFC76]/20 text-[#EFFC76]">
                      {request.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-white">{request.name}</div>
                      <Badge className="text-[10px] h-5 px-1.5 bg-[#EFFC76]/20 text-[#EFFC76] border border-[#EFFC76]/60">
                        {request.department}
                      </Badge>
                    </div>
                    <div className="text-xs text-white/60 mb-1">{request.role}</div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-white/75">
                      <span className="font-medium bg-[#EFFC76]/20 text-[#EFFC76] px-2 py-0.5 rounded text-xs">
                        {request.type}
                      </span>
                      <span className="text-white/40">•</span>
                      <span>{request.dates}</span>
                      <span className="text-white/50">({request.days})</span>
                    </div>
                    <p className="text-sm text-white/70 mt-1">"{request.reason}"</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {request.status === "pending" ? (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 glass-button"
                        onClick={() => handleAction(request.id, "rejected")}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button"
                        onClick={() => handleAction(request.id, "approved")}
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                    </>
                  ) : (
                    <Badge
                      variant={request.status === "approved" ? "default" : "destructive"}
                      className={
                        request.status === "approved"
                          ? "bg-emerald-500 text-white border-emerald-400"
                          : "bg-red-600 text-white border-red-500"
                      }
                    >
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-white/70">No requests found.</div>
          )}
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
            <div className="text-sm text-white/60">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredRequests.length)} of{" "}
              {filteredRequests.length}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="glass-button border-white/30 text-white disabled:opacity-50"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="glass-button border-white/30 text-white disabled:opacity-50"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
