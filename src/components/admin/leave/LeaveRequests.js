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
                <CardTitle>Pending Requests</CardTitle>
                <CardDescription>Review and manage leave applications</CardDescription>
            </div>
            <div className="flex items-center gap-3">
                 <Select value={filterDept} onValueChange={handleFilterChange}>
                    <SelectTrigger className="w-[180px]">
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
                <Badge variant="secondary">{filteredRequests.filter(r => r.status === 'pending').length} Pending</Badge>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentItems.length > 0 ? (
             currentItems.map((request) => (
            <div key={request.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg bg-gray-50/50">
              <div className="flex items-start gap-4 mb-4 sm:mb-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={request.avatar} />
                  <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                       <div className="font-semibold text-gray-900">{request.name}</div>
                       <Badge variant="outline" className="text-[10px] h-5 px-1.5">{request.department}</Badge>
                  </div>
                  <div className="text-xs text-gray-500 mb-1">{request.role}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded text-xs">{request.type}</span>
                    <span className="text-gray-400">•</span>
                    <span>{request.dates}</span>
                    <span className="text-gray-400">({request.days})</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">"{request.reason}"</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {request.status === 'pending' ? (
                  <>
                    <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleAction(request.id, 'rejected')}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                    <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleAction(request.id, 'approved')}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                  </>
                ) : (
                  <Badge variant={request.status === 'approved' ? "default" : "destructive"} className={request.status === 'approved' ? "bg-green-600" : ""}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </Badge>
                )}
              </div>
            </div>
          ))
          ) : (
              <div className="text-center py-8 text-gray-500">No requests found.</div>
          )}
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <div className="text-sm text-gray-500">
                    Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredRequests.length)} of {filteredRequests.length}
                </div>
                <div className="flex gap-2">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    >
                        Previous
                    </Button>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
