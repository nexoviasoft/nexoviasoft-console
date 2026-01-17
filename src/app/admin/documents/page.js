"use client";

import React, { useState } from "react";
import DocumentsHeader from "@/components/admin/documents/DocumentsHeader";
import TemplateSelector from "@/components/admin/documents/TemplateSelector";
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
    <div className="px-8 py-8 min-h-screen flex flex-col text-white">
      <div className="max-w-[1600px] w-full mx-auto flex flex-col gap-6">
        <DocumentsHeader />

        <div className="flex-1">
          {!isEditing && (
            <div className="glass-card border-dashed border-white/30 flex flex-col items-center justify-center py-16 px-6 text-center">
              <h2 className="text-lg font-semibold text-white mb-2">
                Start with a template
              </h2>
              <p className="text-sm text-white/70 mb-6 max-w-md">
                Select a template to open the immersive editor for invoices and letters.
              </p>
              <Button
                onClick={() => setIsTemplateOpen(true)}
                className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black px-5 glass-button"
              >
                Select Template
              </Button>
            </div>
          )}

          {currentView === "invoice" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Invoice editor
                  </h2>
                  <p className="text-sm text-white/70">
                    Customize the selected invoice template in an immersive view.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsTemplateOpen(true)}
                    className="glass-button border-white/30 text-white"
                  >
                    Switch Template
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCloseEditor}
                    className="text-white/80 hover:bg-white/10"
                  >
                    Close
                  </Button>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
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
                  <h2 className="text-lg font-semibold text-white">
                    Letter editor
                  </h2>
                  <p className="text-sm text-white/70">
                    Edit your letter content in a focused, full-width experience.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsTemplateOpen(true)}
                    className="glass-button border-white/30 text-white"
                  >
                    Switch Template
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCloseEditor}
                    className="text-white/80 hover:bg-white/10"
                  >
                    Close
                  </Button>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
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
        <DialogContent className="max-w-3xl glass-panel border-white/20 p-8">
          <TemplateSelector 
            onSelect={handleSelectTemplate} 
            onCancel={() => setIsTemplateOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
