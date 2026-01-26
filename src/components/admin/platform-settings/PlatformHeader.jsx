"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function PlatformHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure workspace defaults, localization, and appearance.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50">
           Discard
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2 shadow-sm">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </Button>
      </div>
    </div>
  );
}
