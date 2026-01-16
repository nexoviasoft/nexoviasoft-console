"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Monitor, LayoutGrid, Type } from "lucide-react";

export default function AppearanceSettings() {
  return (
    <Card className="shadow-sm border-gray-100">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Eye className="w-5 h-5 text-gray-500" />
          Appearance & UI
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-700">
               <Monitor className="w-4 h-4" /> Theme Preference
            </Label>
            <Select defaultValue="light">
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light Mode</SelectItem>
                <SelectItem value="dark">Dark Mode</SelectItem>
                <SelectItem value="system">System Default</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">Controls the color scheme of the console.</p>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-700">
               <LayoutGrid className="w-4 h-4" /> Information Density
            </Label>
            <Select defaultValue="comfortable">
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select Density" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comfortable">Comfortable (Recommended)</SelectItem>
                <SelectItem value="compact">Compact (High density)</SelectItem>
                <SelectItem value="spacious">Spacious</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-700">
               <Type className="w-4 h-4" /> Font Size
            </Label>
            <Select defaultValue="medium">
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (12px)</SelectItem>
                <SelectItem value="medium">Medium (14px)</SelectItem>
                <SelectItem value="large">Large (16px)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-700">
               Navigation Style
            </Label>
             <Select defaultValue="sidebar">
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sidebar">Vertical Sidebar</SelectItem>
                <SelectItem value="topbar">Horizontal Topbar</SelectItem>
                <SelectItem value="collapsed">Collapsed Sidebar</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
