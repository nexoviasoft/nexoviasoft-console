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
  MoreHorizontal,
  Eye,
  Trash2,
  Edit,
} from "lucide-react";
import dynamic from "next/dynamic";
const UpdateOrderDialog = dynamic(() => import("./UpdateOrderDialog"), { ssr: false });
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  useGetOrdersQuery,
  useDeleteOrderMutation 
} from "@/api/admin/orders/orderApi";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

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
    "In Progress": "bg-[#F58220]/10 text-[#F58220] border-[#F58220]/60",
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
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [orderToEdit, setOrderToEdit] = useState(null);

  const { data: ordersData, isLoading, error, refetch } = useGetOrdersQuery();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

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

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
  };

  const confirmDeleteOrder = async () => {
    if (!orderToDelete) return;
    try {
      await deleteOrder(orderToDelete.id).unwrap();
      toast.success("Order deleted successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete order");
    } finally {
      setOrderToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="glass-card rounded-xl border-white/20 overflow-hidden p-8">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-[#F58220]" />
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
    <div className="space-y-4 text-white">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-xl border-white/20 text-white">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            placeholder="Search orders, clients, or services..."
            className="pl-9 bg-black/40 border-white/20 text-white placeholder:text-white/40 focus:bg-black/60 focus:border-[#F58220] focus-visible:ring-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 border-white/30 text-white/80 bg-black/40 hover:bg-white/10 hover:border-[#F58220]/60 hover:text-[#F58220]"
              >
                <Filter className="w-4 h-4" />
                <span>Filter: {statusFilter}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#1A1A1A] border-white/10 text-white">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              {["All", "Pending", "In Progress", "Review", "Completed"].map(
                (status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white"
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
            <TableHeader className="bg-[#F58220]/10">
              <TableRow className="hover:bg-transparent border-white/10">
                <TableHead className="w-[100px] text-xs font-semibold text-[#F58220]">
                  <div className="flex items-center gap-2">
                    <Hash className="w-3.5 h-3.5" />
                    Order ID
                  </div>
                </TableHead>
                <TableHead className="min-w-[200px] text-xs font-semibold text-[#F58220]">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    Client
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-[#F58220]">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5" />
                    Service
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-[#F58220]">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5" />
                    Amount
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-[#F58220]">
                  <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5" />
                    Status
                  </div>
                </TableHead>
                <TableHead className="w-[150px] text-xs font-semibold text-[#F58220]">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-3.5 h-3.5" />
                    Progress
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-[#F58220]">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5" />
                    Assigned To
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-[#F58220] text-right">
                  <div className="flex items-center justify-end gap-2 pr-4">
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
                    className="group hover:bg-[#F58220]/5 transition-colors border-white/10"
                  >
                    <TableCell className="font-medium text-white/60 text-xs">
                      {order.orderId}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 border border-white/20 bg-black/40">
                          <AvatarImage src={order.client?.photo} />
                          <AvatarFallback className="bg-[#F58220]/10 text-[#F58220] text-xs">
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
                    <TableCell className="font-semibold text-[#F58220]">
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
                              : "bg-[#F58220]"
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        {(order.assignedTo || []).map((initials, i) => (
                          <Avatar
                            key={i}
                            className="w-6 h-6 border-2 border-black/60 ring-1 ring-[#F58220]/40"
                          >
                            <AvatarFallback className="text-[10px] bg-[#F58220]/10 text-[#F58220] font-medium">
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white/40 hover:text-[#F58220] hover:bg-white/5"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#1A1A1A] border-white/10 text-white">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-white/10" />
                          <DropdownMenuItem
                            onClick={() => onViewDetails(order)}
                            className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setOrderToEdit(order)}
                            className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Order
                          </DropdownMenuItem>
                          {isAdmin && (
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(order)}
                              className="cursor-pointer text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-400"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Order
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
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

      <UpdateOrderDialog 
        open={!!orderToEdit}
        onOpenChange={(open) => !open && setOrderToEdit(null)}
        order={orderToEdit}
      />

      {/* Delete Confirmation Modal */}
      <AlertDialog
        open={!!orderToDelete}
        onOpenChange={(open) => !open && setOrderToDelete(null)}
      >
        <AlertDialogContent className="bg-[#1A1A1A] border-white/20 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this order?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              Order ID: <span className="text-white font-medium">{orderToDelete?.orderId}</span>
              <br />
              Client: <span className="text-white font-medium">{orderToDelete?.client?.name}</span>
              <br />
              This action cannot be undone. This will permanently delete the order and all related tracking and messages.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              disabled={isDeleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteOrder}
              className="bg-red-600 hover:bg-red-700 text-white border-none"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
