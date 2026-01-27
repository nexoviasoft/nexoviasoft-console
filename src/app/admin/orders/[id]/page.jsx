"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, DollarSign, User, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import OrderChat from "@/components/admin/orders/OrderChat";
import { useGetOrderByIdQuery } from "@/api/admin/orders/orderApi";

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

const getStatusBadgeClasses = (status) => {
  if (status === "Completed") {
    return "bg-emerald-500/15 text-emerald-200 border border-emerald-400/60";
  }
  if (status === "In Progress") {
    return "bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/60";
  }
  if (status === "Review") {
    return "bg-sky-500/15 text-sky-200 border border-sky-400/60";
  }
  if (status === "Pending") {
    return "bg-amber-500/15 text-amber-200 border border-amber-400/60";
  }
  return "bg-white/10 text-white/70 border border-white/20";
};

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id;

  const { data: order, isLoading, error } = useGetOrderByIdQuery(orderId);

  if (isLoading) {
    return (
      <div className="px-8 py-6 flex flex-col min-h-screen text-white">
        <div className="max-w-[1600px] w-full mx-auto flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-[#EFFC76]" />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="px-8 py-6 flex flex-col min-h-screen text-white">
        <div className="max-w-[1600px] w-full mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/admin/orders")}
            className="text-white/70 hover:text-[#EFFC76] hover:bg-white/5 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2 text-[#EFFC76]" />
            Back to Orders
          </Button>
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            Order not found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-6 flex flex-col min-h-screen text-white">
      <div className="max-w-[1600px] w-full mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/admin/orders")}
              className="text-white/70 hover:text-[#EFFC76] hover:bg-white/5"
            >
              <ArrowLeft className="w-4 h-4 mr-2 text-[#EFFC76]" />
              Back to Orders
            </Button>
            <div className="h-6 w-px bg-white/20" />
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{order.service || 'N/A'}</h1>
                <Badge className={`text-xs font-medium ${getStatusBadgeClasses(order.status)}`}>
                  {order.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span>Order</span>
                <span className="font-mono px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-xs">
                  {order.orderId || order.id}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-xl p-6 border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border border-white/20 bg-black/40">
                    <AvatarImage src={order.client?.photo} />
                    <AvatarFallback className="bg-[#EFFC76]/10 text-[#EFFC76]">
                      {order.client?.name?.charAt(0) || 'C'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-white/60">Client</p>
                    <p className="text-lg font-semibold text-white">{order.client?.name || 'Unknown Client'}</p>
                    <p className="text-xs text-white/60">{order.client?.email || 'N/A'}</p>
                  </div>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-sm text-white/60">Amount</p>
                  <p className="text-2xl font-bold text-[#EFFC76]">
                    {order.amount ? formatCurrency(order.amount) : '$0.00'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-white/60 mb-2">
                    <Calendar className="w-4 h-4 text-[#EFFC76]" />
                    <span className="text-xs uppercase tracking-wider font-semibold">
                      Ordered
                    </span>
                  </div>
                  <p className="text-base font-semibold text-white">
                    {order.date ? formatDate(order.date) : 'N/A'}
                  </p>
                  <p className="text-xs text-white/60">Expected delivery: Feb 20, 2024</p>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-white/60 mb-2">
                    <DollarSign className="w-4 h-4 text-[#EFFC76]" />
                    <span className="text-xs uppercase tracking-wider font-semibold">
                      Billing
                    </span>
                  </div>
                  <p className="text-base font-semibold text-white">Paid in full</p>
                  <p className="text-xs text-emerald-300">Invoice sent to client</p>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-white/60 mb-2">
                    <User className="w-4 h-4 text-[#EFFC76]" />
                    <span className="text-xs uppercase tracking-wider font-semibold">
                      Assigned
                    </span>
                  </div>
                  <p className="text-base font-semibold text-white">
                    {(order.assignedTo && order.assignedTo.length > 0) ? order.assignedTo.join(", ") : "Unassigned"}
                  </p>
                  <p className="text-xs text-white/60">Delivery team</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6 border-white/20">
              <h2 className="text-lg font-semibold mb-4 text-white">
                Client Communication
              </h2>
              <div className="h-[400px]">
                <OrderChat order={order} />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-xl p-6 border-white/20">
              <h2 className="text-lg font-semibold mb-4 text-white">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-white/60 mb-1">Order ID</p>
                  <p className="font-medium text-white/90">{order.orderId || order.id}</p>
                </div>
                <div>
                  <p className="text-white/60 mb-1">Service</p>
                  <p className="font-medium text-white/90">{order.service || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-white/60 mb-1">Status</p>
                  <Badge className={`text-xs font-medium ${getStatusBadgeClasses(order.status)}`}>
                    {order.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-white/60 mb-1">Progress</p>
                  <p className="font-medium text-white/90">{order.progress || 0}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

