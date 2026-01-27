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
import { LayoutTemplate, Receipt, FileText } from "lucide-react";
import { useCreateDocumentMutation } from "@/api/admin/documents/documentsApi";
import { toast } from "sonner";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function DocumentsPage() {
  const [currentView, setCurrentView] = useState(null); // null, "invoice", "letter"
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [documentId, setDocumentId] = useState(null);
  const [createDocument, { isLoading: isCreating }] = useCreateDocumentMutation();

  const handleSelectTemplate = async (type, templateId) => {
    try {
      // Create initial draft document when template is selected
      let initialData = {};
      let documentNumber = "";

      if (type === "invoice") {
        // Set default invoice data based on template
        let initialItem = { description: "General Service", quantity: 1, rate: 100 };
        if (templateId === 'invoice-cloud') {
          initialItem = { description: "Cloud Infrastructure Setup (AWS)", quantity: 1, rate: 1500 };
        } else if (templateId === 'invoice-web') {
          initialItem = { description: "Frontend Development - React.js", quantity: 40, rate: 50 };
        } else if (templateId === 'invoice-design') {
          initialItem = { description: "UI/UX Design - Landing Page", quantity: 1, rate: 800 };
        }
        initialData = {
          invoiceNumber: `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
          date: new Date().toISOString().split("T")[0],
          clientName: "",
          clientEmail: "",
          clientAddress: "",
          items: [initialItem],
        };
        documentNumber = initialData.invoiceNumber;
      } else if (type === "letter") {
        initialData = {
          candidateName: "",
          role: "",
          startDate: new Date().toISOString().split("T")[0],
          salary: "",
          manager: "",
          customMessage: "",
        };
        documentNumber = `${templateId}-${Date.now()}`;
      }

      // Build document data, only including fields with actual values
      const documentData = {
        type: type,
        template: templateId,
        data: initialData,
        documentNumber: documentNumber,
        status: 'draft',
      };

      // Only include client fields if they have non-empty values (avoid validation issues)
      if (type === "invoice") {
        if (initialData.clientName && initialData.clientName.trim() !== '') {
          documentData.clientName = initialData.clientName;
        }
        if (initialData.clientEmail && initialData.clientEmail.trim() !== '') {
          documentData.clientEmail = initialData.clientEmail;
        }
        if (initialData.clientAddress && initialData.clientAddress.trim() !== '') {
          documentData.clientAddress = initialData.clientAddress;
        }
      }

      console.log("Creating document with data:", JSON.stringify(documentData, null, 2));
      
      const result = await createDocument(documentData).unwrap();
      console.log("Document creation result:", result);
      
      const savedDocumentId = result?.data?.id;

      if (savedDocumentId) {
        setDocumentId(savedDocumentId);
        setSelectedTemplate(templateId);
        setCurrentView(type);
        setIsTemplateOpen(false);
        toast.success("Template selected and draft saved!");
      } else {
        throw new Error("Failed to create document - no ID returned");
      }
    } catch (error) {
      console.error("=== ERROR CREATING DOCUMENT ===");
      console.error("Full error object:", error);
      console.error("Error type:", typeof error);
      console.error("Error keys:", Object.keys(error || {}));
      console.error("Error data:", error?.data);
      console.error("Error status:", error?.status);
      console.error("Error message:", error?.message);
      console.error("Error stack:", error?.stack);
      
      // RTK Query error structure: error.data contains the server response
      let errorMessage = "Failed to create document. Please try again.";
      
      // Check for network errors first
      if (error?.status === 'FETCH_ERROR' || error?.error === 'FETCH_ERROR') {
        errorMessage = "Cannot connect to server. Please check if the backend is running.";
      } else if (error?.status === 'PARSING_ERROR') {
        errorMessage = "Server returned invalid response. Please check server logs.";
      } else if (error?.data) {
        // Server returned an error response
        if (typeof error.data === 'string') {
          errorMessage = error.data;
        } else if (error.data.message) {
          errorMessage = Array.isArray(error.data.message) 
            ? error.data.message.join(', ')
            : error.data.message;
        } else if (error.data.error) {
          errorMessage = typeof error.data.error === 'string' 
            ? error.data.error 
            : error.data.error.message || errorMessage;
        } else if (error.data.details) {
          errorMessage = `${errorMessage}: ${error.data.details}`;
        }
      } else if (error?.error) {
        errorMessage = typeof error.error === 'string' ? error.error : error.error?.message || errorMessage;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      
      // Log validation errors for debugging
      if (error?.data?.statusCode === 400 || error?.status === 400) {
        console.error("Validation error details:", JSON.stringify(error?.data, null, 2));
      }
    }
  };

  const handleCloseEditor = () => {
    setCurrentView(null);
    setSelectedTemplate(null);
    setDocumentId(null);
  };

  const isEditing = currentView === "invoice" || currentView === "letter";

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 py-4 md:px-8 md:py-8 min-h-screen flex flex-col text-white">
      <div className=" max-w-[1600px] w-full mx-auto flex flex-col gap-6">
        {!isEditing && <DocumentsHeader />}

        <div className="flex-1">
          {!isEditing && (
            <div className="glass-card border-dashed border-white/30 flex flex-col items-center justify-center py-8 md:py-16 px-6 text-center">
              <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <LayoutTemplate className="w-5 h-5 text-[#EFFC76]" />
                Start with a template
              </h2>
              <p className="text-sm text-white/70 mb-4 md:mb-6 max-w-md">
                Select a template to open the immersive editor for invoices and
                letters.
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
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-[#EFFC76]" />
                    Invoice editor
                  </h2>
                  <p className="text-sm text-white/70">
                    Customize the selected invoice template in an immersive
                    view.
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

              <div className="glass-card rounded-xl p-4 md:p-6">
                <InvoiceBuilder
                  template={selectedTemplate}
                  onBack={handleCloseEditor}
                  documentId={documentId}
                />
              </div>
            </div>
          )}

          {currentView === "letter" && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#EFFC76]" />
                    Letter editor
                  </h2>
                  <p className="text-sm text-white/70">
                    Edit your letter content in a focused, full-width
                    experience.
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

              <div className="glass-card rounded-xl p-4 md:p-6">
                <LetterBuilder
                  template={selectedTemplate}
                  onBack={handleCloseEditor}
                  documentId={documentId}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isTemplateOpen} onOpenChange={setIsTemplateOpen}>
        <DialogContent className="w-[95%] max-w-3xl max-h-[85vh] flex flex-col justify-center items-center glass-panel border-white/20 p-0 overflow-hidden rounded-xl">
          <div className="w-full h-full">
            <TemplateSelector
              onSelect={handleSelectTemplate}
              onCancel={() => setIsTemplateOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </AppLayout>
    </PrivateRoute>
  );
}
