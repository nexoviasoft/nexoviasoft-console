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
import { Progress } from "@/components/ui/progress";
import { Search, Filter, MoreHorizontal, ArrowUpRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialOrders = [
  {
    id: "ORD-7821",
    client: { name: "Acme Corp", avatar: "/avatars/01.png", email: "contact@acme.com" },
    service: "Web Development",
    amount: "$12,500.00",
    status: "In Progress",
    progress: 65,
    assignedTo: ["SJ", "MC"],
    date: "Jan 15, 2024",
  },
  {
    id: "ORD-7822",
    client: { name: "Globex Inc", avatar: "/avatars/02.png", email: "info@globex.com" },
    service: "Mobile App Design",
    amount: "$8,200.00",
    status: "Review",
    progress: 90,
    assignedTo: ["DK"],
    date: "Jan 16, 2024",
  },
  {
    id: "ORD-7823",
    client: { name: "Soylent Corp", avatar: "/avatars/03.png", email: "support@soylent.com" },
    service: "SEO Optimization",
    amount: "$3,400.00",
    status: "Pending",
    progress: 0,
    assignedTo: [],
    date: "Jan 17, 2024",
  },
  {
    id: "ORD-7824",
    client: { name: "Umbrella Corp", avatar: "/avatars/04.png", email: "security@umbrella.com" },
    service: "Cloud Migration",
    amount: "$25,000.00",
    status: "Completed",
    progress: 100,
    assignedTo: ["ER", "LA", "JD"],
    date: "Jan 10, 2024",
  },
  {
    id: "ORD-7825",
    client: { name: "Stark Ind", avatar: "/avatars/05.png", email: "tony@stark.com" },
    service: "AI Integration",
    amount: "$45,000.00",
    status: "In Progress",
    progress: 35,
    assignedTo: ["SJ", "AM"],
    date: "Jan 18, 2024",
  },
];

const StatusBadge = ({ status }) => {
  const styles = {
    "Completed": "bg-green-100 text-green-700 hover:bg-green-200 border-green-200",
    "In Progress": "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200",
    "Review": "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200",
    "Pending": "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200",
  };
  return <Badge className={`${styles[status] || "bg-gray-100"} font-medium border shadow-none px-2.5 py-0.5`}>{status}</Badge>;
};

export default function OrderTable({ onViewDetails }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = initialOrders.filter((order) => {
    const matchesSearch = 
      order.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search orders, clients, or services..." 
            className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 border-gray-200 text-gray-700">
                <Filter className="w-4 h-4 text-gray-500" />
                <span>Filter: {statusFilter}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["All", "Pending", "In Progress", "Review", "Completed"].map((status) => (
                <DropdownMenuItem 
                  key={status} 
                  onClick={() => setStatusFilter(status)}
                  className="cursor-pointer"
                >
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead className="min-w-[200px]">Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[150px]">Progress</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id} className="group hover:bg-gray-50/50 transition-colors">
                  <TableCell className="font-medium text-gray-500 text-xs">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 border border-gray-100 bg-white">
                        <AvatarImage src={order.client.avatar} />
                        <AvatarFallback className="bg-purple-50 text-purple-600 text-xs">
                          {order.client.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{order.client.name}</div>
                        <div className="text-xs text-gray-500">{order.client.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700 font-medium text-sm">{order.service}</TableCell>
                  <TableCell className="font-semibold text-gray-900">{order.amount}</TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{order.progress}%</span>
                      </div>
                      <Progress value={order.progress} className="h-1.5 bg-gray-100" indicatorClassName={
                        order.status === "Completed" ? "bg-green-500" : "bg-purple-600"
                      } />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex -space-x-2">
                       {order.assignedTo.map((initials, i) => (
                         <Avatar key={i} className="w-6 h-6 border-2 border-white ring-1 ring-gray-100">
                           <AvatarFallback className="text-[10px] bg-gray-100 text-gray-600 font-medium">
                             {initials}
                           </AvatarFallback>
                         </Avatar>
                       ))}
                       {order.assignedTo.length === 0 && <span className="text-xs text-gray-400 italic">Unassigned</span>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => onViewDetails(order)}
                      className="h-8 gap-1.5 text-xs font-medium text-gray-700 border-gray-200 hover:text-purple-700 hover:border-purple-200 hover:bg-purple-50"
                    >
                      View Details
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Search className="w-6 h-6 text-gray-300" />
                    <p>No orders found matching your criteria.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
