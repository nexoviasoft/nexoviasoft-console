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
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Filter,
  ArrowUpRight,
  Hash,
  User,
  Briefcase,
  DollarSign,
  Activity,
  BarChart2,
  Users,
  Settings,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetOrdersQuery } from "@/api/admin/orders/orderApi";

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const StatusBadge = ({ status }) => {
  const styles = {
    Completed: "bg-emerald-500/15 text-emerald-200 border-emerald-400/60",
    "In Progress": "bg-[#EFFC76]/10 text-[#EFFC76] border-[#EFFC76]/60",
    Review: "bg-sky-500/15 text-sky-200 border-sky-400/60",
    Pending: "bg-amber-500/15 text-amber-200 border-amber-400/60",
  };
  const base = "font-medium shadow-none px-2.5 py-0.5 border rounded-full";
  return (
    <Badge
      className={`${base} ${styles[status] || "bg-white/10 text-white/70 border-white/20"}`}
    >
      {status}
    </Badge>
  );
};

export default function OrderTable({ onViewDetails }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const { data: ordersData, isLoading, error } = useGetOrdersQuery();

  const filteredOrders = useMemo(() => {
    if (!ordersData) return [];

    return ordersData.filter((order) => {
      const clientName = order.client?.name || '';
      const orderId = order.orderId || '';
      const service = order.service || '';

      const matchesSearch =
        clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [ordersData, searchTerm, statusFilter]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="glass-card rounded-xl border-white/20 overflow-hidden p-8">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-[#EFFC76]" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="glass-card rounded-xl border-white/20 overflow-hidden p-8">
          <div className="flex items-center justify-center h-64 text-red-400">
            Failed to load orders
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-xl border-white/20">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            placeholder="Search orders, clients, or services..."
            className="pl-9 bg-black/40 border-white/20 text-white placeholder:text-white/40 focus:bg-black/60 focus:border-[#EFFC76] focus-visible:ring-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 border-white/30 text-white/80 bg-black/40 hover:bg-white/10 hover:border-[#EFFC76]/60 hover:text-[#EFFC76]"
              >
                <Filter className="w-4 h-4" />
                <span>Filter: {statusFilter}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["All", "Pending", "In Progress", "Review", "Completed"].map(
                (status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className="cursor-pointer"
                  >
                    {status}
                  </DropdownMenuItem>
                ),
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="glass-card rounded-xl border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#EFFC76]/10">
              <TableRow className="hover:bg-transparent border-white/10">
                <TableHead className="w-[100px] text-xs font-semibold text-[#EFFC76]">
                  <div className="flex items-center gap-2">
                    <Hash className="w-3.5 h-3.5" />
                    Order ID
                  </div>
                </TableHead>
                <TableHead className="min-w-[200px] text-xs font-semibold text-[#EFFC76]">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    Client
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-[#EFFC76]">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5" />
                    Service
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-[#EFFC76]">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5" />
                    Amount
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-[#EFFC76]">
                  <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5" />
                    Status
                  </div>
                </TableHead>
                <TableHead className="w-[150px] text-xs font-semibold text-[#EFFC76]">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-3.5 h-3.5" />
                    Progress
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-[#EFFC76]">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5" />
                    Assigned To
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-[#EFFC76] text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Settings className="w-3.5 h-3.5" />
                    Action
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="group hover:bg-[#EFFC76]/5 transition-colors border-white/10"
                  >
                    <TableCell className="font-medium text-white/60 text-xs">
                      {order.orderId}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 border border-white/20 bg-black/40">
                          <AvatarImage src={order.client?.photo} />
                          <AvatarFallback className="bg-[#EFFC76]/10 text-[#EFFC76] text-xs">
                            {order.client?.name?.charAt(0) || 'C'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-white text-sm">
                            {order.client?.name || 'Unknown Client'}
                          </div>
                          <div className="text-xs text-white/50">
                            {order.client?.email || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-white/80 font-medium text-sm">
                      {order.service}
                    </TableCell>
                    <TableCell className="font-semibold text-[#EFFC76]">
                      {formatCurrency(order.amount)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs text-white/60">
                          <span>{order.progress || 0}%</span>
                        </div>
                        <Progress
                          value={order.progress || 0}
                          className="h-1.5 bg-white/10"
                          indicatorClassName={
                            order.status === "Completed"
                              ? "bg-emerald-400"
                              : "bg-[#EFFC76]"
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        {(order.assignedTo || []).map((initials, i) => (
                          <Avatar
                            key={i}
                            className="w-6 h-6 border-2 border-black/60 ring-1 ring-[#EFFC76]/40"
                          >
                            <AvatarFallback className="text-[10px] bg-[#EFFC76]/10 text-[#EFFC76] font-medium">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {(!order.assignedTo || order.assignedTo.length === 0) && (
                          <span className="text-xs text-white/50 italic">
                            Unassigned
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onViewDetails(order)}
                        className="h-8 gap-1.5 text-xs font-medium text-[#EFFC76] border border-[#EFFC76]/60 bg-[#EFFC76]/10 hover:bg-[#EFFC76]/20 hover:text-black hover:border-[#EFFC76] glass-button"
                      >
                        View Details
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-white/60"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Search className="w-6 h-6 text-white/30" />
                      <p>No orders found matching your criteria.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
