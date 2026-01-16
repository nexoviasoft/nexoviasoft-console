"use client";

import React from "react";
import HelpHeader from "@/components/admin/help-center/HelpHeader";
import HelpCategories from "@/components/admin/help-center/HelpCategories";
import FAQSection from "@/components/admin/help-center/FAQSection";

export default function HelpCenter() {
  return (
    <div className="bg-gray-50 px-8 py-8">
      <div className="max-w-[1200px] w-full mx-auto">
        <HelpHeader />
        <HelpCategories />
        <FAQSection />
      </div>
    </div>
  );
}
