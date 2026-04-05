"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateOrderMutation } from "@/api/admin/orders/orderApi";
import { useGetClientsQuery } from "@/api/landing/client/clientApi";
import { useGetCategoriesQuery } from "@/api/landing/category/categoryApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function UpdateOrderDialog({ open, onOpenChange, order }) {
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();
  const { data: clientsData, isLoading: isLoadingClients } = useGetClientsQuery();
  const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategoriesQuery();

  const clients = clientsData?.data || clientsData || [];
  const categories = categoriesData?.data || categoriesData || [];

  const [formData, setFormData] = useState({
    clientId: "",
    categoryId: "",
    service: "",
    amount: "",
    status: "Pending",
    progress: 0,
    assignedTo: [],
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (open && order) {
      setFormData({
        clientId: order.clientId ? String(order.clientId) : (order.client?.id ? String(order.client.id) : ""),
        categoryId: order.categoryId ? String(order.categoryId) : (order.category?.id ? String(order.category.id) : ""),
        service: order.service || "",
        amount: order.amount ? String(order.amount) : "0",
        status: order.status || "Pending",
        progress: order.progress || 0,
        assignedTo: order.assignedTo || [],
        date: order.date ? new Date(order.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      });
    }
  }, [open, order]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.clientId) {
      toast.error("Please select a client");
      return;
    }
    if (!formData.service.trim()) {
      toast.error("Please enter a service name");
      return;
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      const orderData = {
        id: order.id,
        clientId: parseInt(formData.clientId),
        categoryId: formData.categoryId ? parseInt(formData.categoryId) : undefined,
        service: formData.service.trim(),
        amount: parseFloat(formData.amount),
        status: formData.status,
        progress: parseInt(formData.progress) || 0,
        assignedTo: formData.assignedTo,
        date: formData.date,
      };

      await updateOrder(orderData).unwrap();
      toast.success("Order updated successfully!");
      onOpenChange(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update order");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] w-[95vw] sm:w-full max-h-[85vh] overflow-y-auto bg-[#0A0A0A] border-white/20 text-white shadow-2xl p-3 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-white">Update Order</DialogTitle>
          <DialogDescription className="text-white/70">
            Edit order details for {order?.orderId || "this order"}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Client Selection */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="clientId" className="text-right text-white">
                Client <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3">
                {isLoadingClients ? (
                  <div className="flex items-center gap-2 text-white/60">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading clients...
                  </div>
                ) : (
                  <Select
                    value={formData.clientId}
                    onValueChange={(value) => handleInputChange("clientId", value)}
                  >
                    <SelectTrigger className="bg-black/40 border-white/20 text-white focus:ring-[#F58220]">
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0A0A0A] border-white/20 text-white">
                      {clients.map((client) => (
                        <SelectItem
                          key={client.id}
                          value={client.id.toString()}
                          className="focus:bg-[#F58220]/20 focus:text-[#F58220]"
                        >
                          {client.name} {client.companyName && `(${client.companyName})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            {/* Category Selection */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoryId" className="text-right text-white">
                Category
              </Label>
              <div className="col-span-3">
                {isLoadingCategories ? (
                  <div className="flex items-center gap-2 text-white/60">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading categories...
                  </div>
                ) : (
                  <Select
                    value={formData.categoryId || undefined}
                    onValueChange={(value) => handleInputChange("categoryId", value === "none" ? "" : value)}
                  >
                    <SelectTrigger className="bg-black/40 border-white/20 text-white focus:ring-[#F58220]">
                      <SelectValue placeholder="Select a category (optional)" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0A0A0A] border-white/20 text-white">
                      <SelectItem
                        value="none"
                        className="focus:bg-[#F58220]/20 focus:text-[#F58220]"
                      >
                        None
                      </SelectItem>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                          className="focus:bg-[#F58220]/20 focus:text-[#F58220]"
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            {/* Service Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="service" className="text-right text-white">
                Service <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3">
                <Input
                  id="service"
                  value={formData.service}
                  onChange={(e) => handleInputChange("service", e.target.value)}
                  className="bg-black/40 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#F58220]"
                  placeholder="e.g., Web Development, Mobile App Design"
                  required
                />
              </div>
            </div>

            {/* Amount */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right text-white">
                Amount <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3">
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className="bg-black/40 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#F58220]"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            {/* Status */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right text-white">
                Status
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger className="bg-black/40 border-white/20 text-white focus:ring-[#F58220]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A0A0A] border-white/20 text-white">
                    <SelectItem
                      value="Pending"
                      className="focus:bg-[#F58220]/20 focus:text-[#F58220]"
                    >
                      Pending
                    </SelectItem>
                    <SelectItem
                      value="In Progress"
                      className="focus:bg-[#F58220]/20 focus:text-[#F58220]"
                    >
                      In Progress
                    </SelectItem>
                    <SelectItem
                      value="Review"
                      className="focus:bg-[#F58220]/20 focus:text-[#F58220]"
                    >
                      Review
                    </SelectItem>
                    <SelectItem
                      value="Completed"
                      className="focus:bg-[#F58220]/20 focus:text-[#F58220]"
                    >
                      Completed
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Progress */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="progress" className="text-right text-white">
                Progress
              </Label>
              <div className="col-span-3">
                <Input
                  id="progress"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) => handleInputChange("progress", e.target.value)}
                  className="bg-black/40 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#F58220]"
                  placeholder="0"
                />
                <p className="text-xs text-white/50 mt-1">Progress percentage (0-100)</p>
              </div>
            </div>

            {/* Date */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right text-white">
                Order Date
              </Label>
              <div className="col-span-3">
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="bg-black/40 border-white/20 text-white focus-visible:ring-[#F58220]"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              className="bg-[#F58220] hover:bg-[#d91d79] text-black font-semibold"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Order"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
