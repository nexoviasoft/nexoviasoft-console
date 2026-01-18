"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, DollarSign, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import OrderChat from "@/components/admin/orders/OrderChat";

const orders = [
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

  const order = orders.find((o) => o.id === orderId) || orders[0];

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
                <h1 className="text-2xl font-bold text-white">{order.service}</h1>
                <Badge className={`text-xs font-medium ${getStatusBadgeClasses(order.status)}`}>
                  {order.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span>Order</span>
                <span className="font-mono px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-xs">
                  {order.id}
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
                    <AvatarImage src={order.client.avatar} />
                    <AvatarFallback className="bg-[#EFFC76]/10 text-[#EFFC76]">
                      {order.client.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-white/60">Client</p>
                    <p className="text-lg font-semibold text-white">{order.client.name}</p>
                    <p className="text-xs text-white/60">{order.client.email}</p>
                  </div>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-sm text-white/60">Amount</p>
                  <p className="text-2xl font-bold text-[#EFFC76]">{order.amount}</p>
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
                  <p className="text-base font-semibold text-white">{order.date}</p>
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
                    {order.assignedTo.length > 0 ? order.assignedTo.join(", ") : "Unassigned"}
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
                  <p className="font-medium text-white/90">{order.id}</p>
                </div>
                <div>
                  <p className="text-white/60 mb-1">Service</p>
                  <p className="font-medium text-white/90">{order.service}</p>
                </div>
                <div>
                  <p className="text-white/60 mb-1">Status</p>
                  <Badge className={`text-xs font-medium ${getStatusBadgeClasses(order.status)}`}>
                    {order.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-white/60 mb-1">Progress</p>
                  <p className="font-medium text-white/90">{order.progress}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

