"use client";

import React from "react";
import HelpHeader from "@/components/admin/help-center/HelpHeader";
import HelpCategories from "@/components/admin/help-center/HelpCategories";
import FAQSection from "@/components/admin/help-center/FAQSection";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function HelpCenter() {
  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-8 py-8">
      <div className="max-w-[1600px] w-full mx-auto">
        <HelpHeader />
        <HelpCategories />
        <FAQSection />
      </div>
    </div>
    </AppLayout>
    </PrivateRoute>
  );
}
