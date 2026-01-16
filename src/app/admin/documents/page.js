"use client";

import React, { useState } from "react";
import DocumentsHeader from "@/components/admin/documents/DocumentsHeader";
import TemplateGallery from "@/components/admin/documents/TemplateGallery";
import InvoiceBuilder from "@/components/admin/documents/InvoiceBuilder";
import LetterBuilder from "@/components/admin/documents/LetterBuilder";

export default function DocumentsPage() {
  const [currentView, setCurrentView] = useState('gallery'); // gallery, invoice, letter
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelectTemplate = (type, templateId) => {
    setSelectedTemplate(templateId);
    setCurrentView(type);
  };

  const handleBack = () => {
    setCurrentView('gallery');
    setSelectedTemplate(null);
  };

  return (
    <div className="bg-gray-50 px-8 py-8">
      <DocumentsHeader />
      
      <div className="max-w-6xl mx-auto">
        {currentView === 'gallery' && (
          <TemplateGallery onSelect={handleSelectTemplate} />
        )}

        {currentView === 'invoice' && (
          <InvoiceBuilder 
            template={selectedTemplate} 
            onBack={handleBack} 
          />
        )}

        {currentView === 'letter' && (
          <LetterBuilder 
            template={selectedTemplate} 
            onBack={handleBack} 
          />
        )}
      </div>
    </div>
  );
}
