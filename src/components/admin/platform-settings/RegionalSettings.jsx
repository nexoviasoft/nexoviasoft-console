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
import { Globe, Clock, Banknote, Calendar } from "lucide-react";

export default function RegionalSettings() {
  return (
    <Card className="shadow-sm border-gray-100 mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Globe className="w-5 h-5 text-gray-500" />
          Regional & Localization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-700">
               Language
            </Label>
            <Select defaultValue="en">
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English (US)</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="jp">Japanese</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">System language for all users.</p>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-700">
               <Clock className="w-4 h-4" /> Timezone
            </Label>
            <Select defaultValue="utc">
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select Timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                <SelectItem value="cet">CET (Central European Time)</SelectItem>
                <SelectItem value="ist">IST (Indian Standard Time)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-700">
               <Calendar className="w-4 h-4" /> Date Format
            </Label>
            <Select defaultValue="mdy">
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mdy">MM/DD/YYYY (12/31/2026)</SelectItem>
                <SelectItem value="dmy">DD/MM/YYYY (31/12/2026)</SelectItem>
                <SelectItem value="ymd">YYYY-MM-DD (2026-12-31)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-700">
               <Banknote className="w-4 h-4" /> Currency
            </Label>
            <Select defaultValue="usd">
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD ($)</SelectItem>
                <SelectItem value="eur">EUR (€)</SelectItem>
                <SelectItem value="gbp">GBP (£)</SelectItem>
                <SelectItem value="jpy">JPY (¥)</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
