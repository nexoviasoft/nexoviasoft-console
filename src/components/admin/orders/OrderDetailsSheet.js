"use client";

import React, { useState } from "react";
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
import { Calendar, User, Mail, DollarSign } from "lucide-react";
import OrderChat from "./OrderChat";

export default function OrderDetailsSheet({ order, open, onOpenChange }) {
  const [status, setStatus] = useState(order?.status ?? "Pending");
  const [progress, setProgress] = useState([order?.progress ?? 0]);
  const [assigned, setAssigned] = useState(order?.assignedTo ?? []);

  if (!order) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl flex flex-col p-0 gap-0 glass-panel text-white">
        <div className="px-6 py-6 border-b border-white/10 bg-black/40">
          <div className="flex items-center justify-between mb-2">
            <Badge className="text-xs font-mono text-[#EFFC76] bg-[#EFFC76]/10 border border-[#EFFC76]/40">
              {order.id}
            </Badge>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[160px] h-8 text-xs font-medium border-white/20 bg-black/40 text-white/80">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Review">Review</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-2xl font-bold text-white">{order.service}</div>
          <div className="flex items-center gap-2 mt-1 text-sm text-white/70">
            <span>Ordered by</span>
            <span className="font-semibold text-white">
              {order.client.name}
            </span>
          </div>
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
                      {progress}%
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
                      {order.amount}
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
                    <p className="text-lg font-bold text-white">{order.date}</p>
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
                      <AvatarImage src={order.client.avatar} />
                      <AvatarFallback>
                        {order.client.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white">
                        {order.client.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-white/70">
                        <Mail className="w-3 h-3 text-[#EFFC76]" />
                        {order.client.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/70">
                        <User className="w-3 h-3 text-[#EFFC76]" />
                        ID: CL-992B
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="communication" className="h-[400px] mt-0">
                <OrderChat order={order} />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <SheetFooter className="px-6 py-4 border-t border-white/10 bg-black/60 sm:justify-between">
          <Button
            variant="outline"
            className="text-red-400 hover:bg-red-500/10 hover:text-red-300 border-red-500/40"
          >
            Cancel Order
          </Button>
          <div className="flex gap-3">
            <SheetClose asChild>
              <Button
                variant="ghost"
                className="text-white/80 hover:bg-white/10"
              >
                Close
              </Button>
            </SheetClose>
            <Button className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button">
              Save Changes
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
