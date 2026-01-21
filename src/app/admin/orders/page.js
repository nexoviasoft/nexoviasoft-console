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
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Order Management</h1>
            <p className="text-gray-500 mt-1">Manage client orders, track progress, and assign tasks.</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25 transition-all hover:scale-105 active:scale-95">
            <Plus className="w-4 h-4 mr-2" />
            Create New Order
          </Button>
        </div>

        {/* Stats */}
        <OrderStats />

        {/* Main Content */}
        <OrderTable onViewDetails={handleViewDetails} />

        {/* Order Details Panel */}
        <OrderDetailsSheet 
          order={selectedOrder} 
          open={isDetailsOpen} 
          onOpenChange={setIsDetailsOpen} 
        />
      </div>
    </div>
  );
}
