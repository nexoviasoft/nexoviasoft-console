"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Calendar, User, Mail, DollarSign, Loader2 } from "lucide-react";
import OrderChat from "./OrderChat";
import { useMediaQuery } from "@/hooks/use-media-query";
import { 
  useGetOrderByIdQuery, 
  useUpdateOrderMutation,
  useCreateOrderTrackingMutation 
} from "@/api/admin/orders/orderApi";
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

export default function OrderDetailsSheet({ order, open, onOpenChange }) {
  const [status, setStatus] = useState(order?.status ?? "Pending");
  const [progress, setProgress] = useState([order?.progress ?? 0]);
  const [assigned, setAssigned] = useState(order?.assignedTo ?? []);
  const isDesktop = useMediaQuery("(min-width: 640px)");
  
  const { data: orderData, isLoading } = useGetOrderByIdQuery(order?.id, {
    skip: !order?.id || !open,
  });
  
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();
  const [createTracking] = useCreateOrderTrackingMutation();

  const currentOrder = orderData || order;
  const previousStatus = useRef(currentOrder?.status);
  const previousProgress = useRef(currentOrder?.progress || 0);

  useEffect(() => {
    if (currentOrder) {
      setStatus(currentOrder.status || "Pending");
      setProgress([currentOrder.progress || 0]);
      setAssigned(currentOrder.assignedTo || []);
      previousStatus.current = currentOrder.status;
      previousProgress.current = currentOrder.progress;
    }
  }, [currentOrder]);

  const handleSave = async () => {
    if (!currentOrder?.id) return;

    try {
      const statusChanged = status !== previousStatus.current;
      const progressChanged = progress[0] !== previousProgress.current;

      await updateOrder({
        id: currentOrder.id,
        status,
        progress: progress[0],
        assignedTo: assigned,
      }).unwrap();

      // Create tracking record if status or progress changed
      if (statusChanged || progressChanged) {
        try {
          await createTracking({
            orderId: currentOrder.id,
            status: statusChanged ? status : undefined,
            progress: progressChanged ? progress[0] : undefined,
            note: statusChanged 
              ? `Status changed to ${status}` 
              : progressChanged 
              ? `Progress updated to ${progress[0]}%`
              : undefined,
            createdByName: 'Team',
          }).unwrap();
        } catch (trackingError) {
          console.error('Failed to create tracking record:', trackingError);
        }
      }
      
      previousStatus.current = status;
      previousProgress.current = progress[0];
      
      toast.success("Order updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update order");
    }
  };

  if (!order && !orderData) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isDesktop ? "right" : "bottom"}
        className={`
          flex flex-col p-0 gap-0 glass-panel text-white border-white/10 shadow-2xl transition-all duration-300
          fixed z-50
          ${isDesktop 
            ? "top-5 right-5 h-[calc(100vh-2.5rem)] w-[500px] !max-w-none rounded-2xl border" 
            : "bottom-5 inset-x-0 mx-auto w-[calc(100vw-2.5rem)] h-[calc(100vh-2.5rem)] rounded-2xl border"
          }
        `}
      >
        <div className="px-6 py-6 border-b border-white/10 bg-black/40">
          {isLoading ? (
            <div className="flex items-center justify-center h-20">
              <Loader2 className="w-6 h-6 animate-spin text-[#EFFC76]" />
            </div>
          ) : (
            <>
              <div className="flex items-center mt-4 justify-between mb-2">
                <Badge className="text-xs font-mono text-[#EFFC76] bg-[#EFFC76]/10 border border-[#EFFC76]/40">
                  {currentOrder?.orderId || currentOrder?.id}
                </Badge>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-[140px] sm:w-[240px] h-8 text-xs font-medium border-[#EFFC76]/30 bg-[#EFFC76]/5 text-[#EFFC76] focus:ring-[#EFFC76]/50">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/95 border-[#EFFC76]/20 text-white backdrop-blur-xl">
                    <SelectItem value="Pending" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76]">Pending</SelectItem>
                    <SelectItem value="In Progress" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76]">In Progress</SelectItem>
                    <SelectItem value="Review" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76]">Review</SelectItem>
                    <SelectItem value="Completed" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76]">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-2xl font-bold text-white">{currentOrder?.service || 'N/A'}</div>
              <div className="flex items-center gap-2 mt-1 text-sm text-white/70">
                <span>Ordered by</span>
                <span className="font-semibold text-white">
                  {currentOrder?.client?.name || 'Unknown Client'}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="overview" className="w-full">
            <div className="px-6 border-b border-white/10 sticky top-0 bg-black/60 z-10 pt-2">
              <TabsList className="w-full justify-start h-10 bg-transparent p-0 gap-6">
                <TabsTrigger
                  value="overview"
                  className="
    rounded-none
    border-b-2 border-transparent
    px-4 pb-2 text-sm
    text-white/70
    data-[state=active]:bg-black
    data-[state=active]:text-[#EFFC76]
    data-[state=active]:border-b-[#EFFC76]
  "
                >
                  Overview & Tracking
                </TabsTrigger>

                <TabsTrigger
                  value="communication"
                  className="
    rounded-none
    border-b-2 border-transparent
    px-4 pb-2 text-sm
    text-white/70
    data-[state=active]:bg-black
    data-[state=active]:text-[#EFFC76]
    data-[state=active]:border-b-[#EFFC76]
  "
                >
                  Client Communication
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="overview" className="space-y-8 mt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold text-white/80">
                      Project Progress
                    </Label>
                    <span className="text-sm font-bold text-[#EFFC76]">
                      {progress[0]}%
                    </span>
                  </div>
                  <Slider
                    value={progress}
                    onValueChange={setProgress}
                    max={100}
                    step={1}
                    className="py-2"
                  />
                  <p className="text-xs text-white/50">
                    Update the slider to reflect real-time completion status for
                    the client.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-white/60 mb-2">
                      <DollarSign className="w-4 h-4 text-[#EFFC76]" />
                      <span className="text-xs uppercase tracking-wider font-semibold">
                        Value
                      </span>
                    </div>
                    <p className="text-lg font-bold text-white">
                      {currentOrder?.amount ? formatCurrency(currentOrder.amount) : '$0.00'}
                    </p>
                    <p className="text-xs text-emerald-300 font-medium">
                      Paid in full
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-white/60 mb-2">
                      <Calendar className="w-4 h-4 text-[#EFFC76]" />
                      <span className="text-xs uppercase tracking-wider font-semibold">
                        Ordered
                      </span>
                    </div>
                    <p className="text-lg font-bold text-white">
                      {currentOrder?.date ? formatDate(currentOrder.date) : 'N/A'}
                    </p>
                    <p className="text-xs text-white/60">Due: Feb 20, 2024</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-white/80">
                    Assigned Team
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {assigned.map((initials, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-white/20"
                      >
                        <Avatar className="w-5 h-5">
                          <AvatarFallback className="text-[9px] bg-[#EFFC76]/15 text-[#EFFC76]">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-white/80">
                          {initials}
                        </span>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 rounded-full p-0 border-dashed border-[#EFFC76]/60 text-[#EFFC76] hover:bg-[#EFFC76]/15"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <Label className="text-sm font-semibold text-white/80">
                    Client Details
                  </Label>
                  <div className="flex items-start gap-4 p-4 rounded-lg border border-white/15 bg-black/40">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={currentOrder?.client?.photo} />
                      <AvatarFallback>
                        {currentOrder?.client?.name?.charAt(0) || 'C'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white">
                        {currentOrder?.client?.name || 'Unknown Client'}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-white/70">
                        <Mail className="w-3 h-3 text-[#EFFC76]" />
                        {currentOrder?.client?.email || 'N/A'}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/70">
                        <User className="w-3 h-3 text-[#EFFC76]" />
                        ID: {currentOrder?.client?.id ? `CL-${currentOrder.client.id}` : 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="communication" className="h-[400px] mt-0">
                <OrderChat order={currentOrder} />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <SheetFooter className="px-6 py-4 border-t border-white/10 bg-black/60 flex flex-col sm:flex-row gap-3 sm:justify-between pb-safe">
          <Button
            variant="outline"
          className="w-full sm:w-auto text-white border-white/10
             bg-[#EFFC76]/10 hover:bg-[#EFFC76]/10 hover:text-[#EFFC76] hover:border-[#EFFC76]/30 transition-colors"
          >
            Cancel Order
          </Button>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <SheetClose asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto text-[#EFFC76] border-[#EFFC76]/30 bg-[#EFFC76]/5 hover:bg-[#EFFC76]/10 hover:text-[#EFFC76]"
              >
                Close
              </Button>
            </SheetClose>
            <Button 
              onClick={handleSave}
              disabled={isUpdating}
              className="w-full sm:w-auto bg-[#EFFC76] hover:bg-[#e0ef5f] text-black font-semibold shadow-[0_0_15px_rgba(239,252,118,0.25)] border-0"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
