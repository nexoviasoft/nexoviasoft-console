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
          <h3 className="text-lg font-semibold text-gray-900">Book 1 on 1</h3>
          <Monitor className="text-blue-500 w-5 h-5" />
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Colleagues<span className="text-red-500">*</span></label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder='Find people with "@"' 
                className="pl-9 bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">
            Book a Meeting
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
