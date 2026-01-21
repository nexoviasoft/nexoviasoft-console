"use client";

import React, { useState } from "react";
import OrderStats from "@/components/admin/orders/OrderStats";
import OrderTable from "@/components/admin/orders/OrderTable";
import OrderDetailsSheet from "@/components/admin/orders/OrderDetailsSheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  return (
    <div className="px-8 py-6 flex flex-col min-h-screen text-white">
      <div className="max-w-[1600px] w-full mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Order Management
            </h1>
            <p className="text-sm text-white/60 mt-1">
              Manage client orders, track project delivery, and keep
              communication in one place.
            </p>
          </div>
          <Button className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button">
            <Plus className="w-4 h-4 mr-2" />
            Create New Order
          </Button>
        </div>

        <OrderStats />

        <OrderTable onViewDetails={handleViewDetails} />

        <OrderDetailsSheet
          order={selectedOrder}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        />
      </div>
    </div>
  );
}
