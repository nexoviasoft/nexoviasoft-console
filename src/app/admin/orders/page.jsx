"use client";
import React, { useState } from "react";
import OrderStats from "@/components/admin/orders/OrderStats";
import OrderTable from "@/components/admin/orders/OrderTable";
import OrderDetailsSheet from "@/components/admin/orders/OrderDetailsSheet";
import CreateOrderDialog from "@/components/admin/orders/CreateOrderDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleOrderCreated = () => {
    // Order table will automatically refetch due to cache invalidation
    setIsCreateDialogOpen(false);
  };

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 py-4 md:px-8 md:py-6 flex flex-col min-h-screen text-white">
      <div className="max-w-[1600px] w-full mx-auto space-y-6 md:space-y-8">
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
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button"
          >
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

        <CreateOrderDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onOrderCreated={handleOrderCreated}
        />
      </div>
    </div>
    </AppLayout>
    </PrivateRoute>
  );
}
