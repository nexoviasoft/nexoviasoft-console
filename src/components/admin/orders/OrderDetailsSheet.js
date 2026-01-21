"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
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
  SelectValue 
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Calendar, User, Mail, DollarSign, CheckCircle2 } from "lucide-react";
import OrderChat from "./OrderChat";

export default function OrderDetailsSheet({ order, open, onOpenChange }) {
  if (!order) return null;

  const [status, setStatus] = useState(order.status);
  const [progress, setProgress] = useState([order.progress]);
  const [assigned, setAssigned] = useState(order.assignedTo);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl flex flex-col p-0 gap-0 bg-white">
        {/* Header */}
        <div className="px-6 py-6 border-b border-gray-100 bg-gray-50/30">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-xs font-mono text-gray-500 bg-white">
              {order.id}
            </Badge>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[140px] h-8 text-xs font-medium border-gray-200 bg-white">
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
          <SheetTitle className="text-2xl font-bold text-gray-900">{order.service}</SheetTitle>
          <SheetDescription className="flex items-center gap-2 mt-1">
            Ordered by <span className="font-semibold text-gray-700">{order.client.name}</span>
          </SheetDescription>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="overview" className="w-full">
            <div className="px-6 border-b border-gray-100 sticky top-0 bg-white z-10 pt-2">
              <TabsList className="w-full justify-start h-10 bg-transparent p-0 gap-6">
                <TabsTrigger 
                  value="overview" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:text-purple-700 px-0 pb-2"
                >
                  Overview & Tracking
                </TabsTrigger>
                <TabsTrigger 
                  value="communication" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:text-purple-700 px-0 pb-2"
                >
                  Client Communication
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="overview" className="space-y-8 mt-0">
                {/* Progress Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold text-gray-700">Project Progress</Label>
                    <span className="text-sm font-bold text-purple-600">{progress}%</span>
                  </div>
                  <Slider 
                    value={progress} 
                    onValueChange={setProgress} 
                    max={100} 
                    step={1} 
                    className="py-2"
                  />
                  <p className="text-xs text-gray-400">
                    Update the slider to reflect real-time completion status for the client.
                  </p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider font-semibold">Value</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{order.amount}</p>
                    <p className="text-xs text-green-600 font-medium">Paid in full</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider font-semibold">Ordered</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{order.date}</p>
                    <p className="text-xs text-gray-500">Due: Feb 20, 2024</p>
                  </div>
                </div>

                {/* Team Assignment */}
                <div className="space-y-3">
                   <Label className="text-sm font-semibold text-gray-700">Assigned Team</Label>
                   <div className="flex flex-wrap gap-2">
                      {assigned.map((initials, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
                          <Avatar className="w-5 h-5">
                            <AvatarFallback className="text-[9px] bg-purple-100 text-purple-700">{initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-medium text-gray-700">{initials}</span>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="h-8 w-8 rounded-full p-0 border-dashed border-gray-300 text-gray-400 hover:text-purple-600 hover:border-purple-300">
                        +
                      </Button>
                   </div>
                </div>

                {/* Client Details */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <Label className="text-sm font-semibold text-gray-700">Client Details</Label>
                  <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 bg-white">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={order.client.avatar} />
                      <AvatarFallback>{order.client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-gray-900">{order.client.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Mail className="w-3 h-3" />
                        {order.client.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <User className="w-3 h-3" />
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

        {/* Footer */}
        <SheetFooter className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 sm:justify-between">
           <Button variant="outline" className="text-red-500 hover:bg-red-50 hover:text-red-600 border-red-100">Cancel Order</Button>
           <div className="flex gap-3">
             <SheetClose asChild>
               <Button variant="ghost">Close</Button>
             </SheetClose>
             <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20">
               Save Changes
             </Button>
           </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
