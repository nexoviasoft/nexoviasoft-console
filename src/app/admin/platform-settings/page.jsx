"use client";

import React from "react";
import PlatformHeader from "@/components/admin/platform-settings/PlatformHeader";
import RegionalSettings from "@/components/admin/platform-settings/RegionalSettings";
import AppearanceSettings from "@/components/admin/platform-settings/AppearanceSettings";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function PlatformSettings() {
  return (
    <PrivateRoute>
      <AppLayout>
        <div className="bg-gray-50 px-8 py-8">
      <div className="max-w-[1000px] w-full mx-auto">
        <PlatformHeader />
        <RegionalSettings />
        <AppearanceSettings />
      </div>
    </div>
    </AppLayout>
    </PrivateRoute>
  );
}
