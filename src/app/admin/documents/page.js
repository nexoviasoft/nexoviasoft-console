"use client";

import React, { useState } from "react";
import DocumentsHeader from "@/components/admin/documents/DocumentsHeader";
import TemplateGallery from "@/components/admin/documents/TemplateGallery";
import InvoiceBuilder from "@/components/admin/documents/InvoiceBuilder";
import LetterBuilder from "@/components/admin/documents/LetterBuilder";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DocumentsPage() {
  const [currentView, setCurrentView] = useState(null); // null, "invoice", "letter"
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);

  const handleSelectTemplate = (type, templateId) => {
    setSelectedTemplate(templateId);
    setCurrentView(type);
    setIsTemplateOpen(false);
  };

  const handleCloseEditor = () => {
    setCurrentView(null);
    setSelectedTemplate(null);
  };

  const isEditing = currentView === "invoice" || currentView === "letter";

  return (
    <div className="bg-gray-50 px-8 py-8 min-h-screen">
      <div className="max-w-[1600px] w-full mx-auto flex flex-col gap-6">
        <DocumentsHeader />

        <div className="flex-1">
          {!isEditing && (
            <div className="border border-dashed border-gray-200 rounded-xl bg-white/60 flex flex-col items-center justify-center py-16 px-6 text-center">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Start with a template
              </h2>
              <p className="text-sm text-gray-500 mb-6 max-w-md">
                Select a template to open the immersive editor for invoices and letters.
              </p>
              <Button
                onClick={() => setIsTemplateOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-5"
              >
                Select Template
              </Button>
            </div>
          )}

          {currentView === "invoice" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Invoice editor
                  </h2>
                  <p className="text-sm text-gray-500">
                    Customize the selected invoice template in an immersive view.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsTemplateOpen(true)}
                  >
                    Switch Template
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCloseEditor}
                  >
                    Close
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <InvoiceBuilder
                  template={selectedTemplate}
                  onBack={handleCloseEditor}
                />
              </div>
            </div>
          )}

          {currentView === "letter" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Letter editor
                  </h2>
                  <p className="text-sm text-gray-500">
                    Edit your letter content in a focused, full-width experience.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsTemplateOpen(true)}
                  >
                    Switch Template
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCloseEditor}
                  >
                    Close
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <LetterBuilder
                  template={selectedTemplate}
                  onBack={handleCloseEditor}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isTemplateOpen} onOpenChange={setIsTemplateOpen}>
        <DialogContent className="max-w-5xl bg-white/80 backdrop-blur-2xl border border-white/60 shadow-2xl">
          <DialogHeader className="mb-2">
            <DialogTitle>Choose a template</DialogTitle>
            <DialogDescription>
              Explore invoice and letter templates, then pick one to open in the
              editor.
            </DialogDescription>
          </DialogHeader>

          <TemplateGallery onSelect={handleSelectTemplate} viewMode="grid" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
