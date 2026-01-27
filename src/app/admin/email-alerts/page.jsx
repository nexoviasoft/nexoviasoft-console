"use client";

import React, { useState } from "react";
import EmailHeader from "@/components/admin/email/EmailHeader";
import SMTPConfig from "@/components/admin/email/SMTPConfig";
import TemplateList from "@/components/admin/email/TemplateList";
import EmailComposer from "@/components/admin/email/EmailComposer";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function EmailAlertsPage() {
  const [showConfig, setShowConfig] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <PrivateRoute>
      <AppLayout> 
        <div className=" px-4 md:px-8 py-8 min-h-screen flex flex-col text-white">
      <div className="max-w-[1600px] w-full mx-auto space-y-6">
        <EmailHeader onConfigureClick={() => setShowConfig(true)} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Templates Sidebar */}
          <div className="lg:col-span-1">
            <TemplateList onSelectTemplate={setSelectedTemplate} />
          </div>

          {/* Email Composer */}
          <div className="lg:col-span-2">
            <EmailComposer selectedTemplate={selectedTemplate} />
          </div>
        </div>
      </div>

      <SMTPConfig open={showConfig} onOpenChange={setShowConfig} />
    </div>
      </AppLayout>
    </PrivateRoute>
  );
}
