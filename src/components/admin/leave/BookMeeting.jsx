"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Monitor } from "lucide-react";

export default function BookMeeting() {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Book 1 on 1</h3>
          <Monitor className="text-[#EFFC76] w-5 h-5" />
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white/80">
              Colleagues<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <Input 
                placeholder='Find people with "@"' 
                className="pl-9 bg-black/40 border border-white/20 text-white placeholder:text-white/50 focus-visible:ring-[#EFFC76]"
              />
            </div>
          </div>

          <Button className="w-full bg-[#EFFC76] hover:bg-[#e0ef5f] text-black mt-4 glass-button">
            Book a Meeting
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
