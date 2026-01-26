"use client";

import React from "react";
import PlatformHeader from "@/components/admin/platform-settings/PlatformHeader";
import RegionalSettings from "@/components/admin/platform-settings/RegionalSettings";
import AppearanceSettings from "@/components/admin/platform-settings/AppearanceSettings";

export default function PlatformSettings() {
  return (
    <div className="bg-gray-50 px-8 py-8">
      <div className="max-w-[1000px] w-full mx-auto">
        <PlatformHeader />
        <RegionalSettings />
        <AppearanceSettings />
      </div>
    </div>
  );
}
