"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Printer, Download, Plus, Trash2, Mail, Send } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { useCreateDocumentMutation, useUpdateDocumentMutation, useSendDocumentByEmailMutation, useGetDocumentByIdQuery } from "@/api/admin/documents/documentsApi";
import { useGetOurTeamQuery } from "@/api/admin/our-team/ourTeamApi";
import { useGetClientsQuery } from "@/api/landing/client/clientApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Users, Building2 } from "lucide-react";

export default function InvoiceBuilder({ template, onBack, documentId }) {
  const [createDocument, { isLoading: isCreating }] = useCreateDocumentMutation();
  const [updateDocument, { isLoading: isUpdating }] = useUpdateDocumentMutation();
  const [sendDocumentByEmail, { isLoading: isSending }] = useSendDocumentByEmailMutation();
  const { data: documentData, isLoading: isLoadingDocument } = useGetDocumentByIdQuery(documentId, {
    skip: !documentId,
  });
  
  // Fetch team members and clients
  const { data: teamData } = useGetOurTeamQuery();
  const { data: clientsData } = useGetClientsQuery();
  
  const teamMembers = teamData?.data || teamData || [];
  const clients = clientsData?.data || clientsData || [];
  
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "INV-2026-001",
    date: new Date().toISOString().split("T")[0],
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    items: [],
  });
  
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [emailData, setEmailData] = useState({
    selectedUserType: "", // 'team' or 'client'
    selectedUserId: "",
    recipientEmail: "",
    recipientName: "",
    subject: "",
    message: "",
  });

  // Load document data if documentId is provided
  useEffect(() => {
    if (documentId && documentData?.data) {
      const doc = documentData.data;
      if (doc.data && doc.type === 'invoice') {
        setInvoiceData({
          invoiceNumber: doc.documentNumber || doc.data.invoiceNumber || "INV-2026-001",
          date: doc.data.date || new Date().toISOString().split("T")[0],
          clientName: doc.clientName || doc.data.clientName || "",
          clientEmail: doc.clientEmail || doc.data.clientEmail || "",
          clientAddress: doc.clientAddress || doc.data.clientAddress || "",
          items: doc.data.items || [],
        });
      }
    }
  }, [documentId, documentData]);

  // Pre-fill based on template (only if no documentId or document not loaded yet)
  useEffect(() => {
    if (!documentId || !documentData?.data) {
      let initialItem = { description: "General Service", quantity: 1, rate: 100 };
      
      if (template === 'invoice-cloud') {
          initialItem = { description: "Cloud Infrastructure Setup (AWS)", quantity: 1, rate: 1500 };
      } else if (template === 'invoice-web') {
          initialItem = { description: "Frontend Development - React.js", quantity: 40, rate: 50 };
      } else if (template === 'invoice-design') {
          initialItem = { description: "UI/UX Design - Landing Page", quantity: 1, rate: 800 };
      }

      setInvoiceData(prev => ({ ...prev, items: prev.items.length === 0 ? [initialItem] : prev.items }));
    }
  }, [template, documentId, documentData]);

  const updateField = (field, value) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }));
  };

  const addItem = () => {
    setInvoiceData(prev => ({
        ...prev,
        items: [...prev.items, { description: "", quantity: 1, rate: 0 }]
    }));
  };

  const removeItem = (index) => {
    setInvoiceData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index][field] = value;
    setInvoiceData(prev => ({ ...prev, items: newItems }));
  };

  const calculateTotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.rate)), 0);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveDraft = async () => {
    try {
      const documentData = {
        type: 'invoice',
        template: template,
        data: invoiceData,
        clientName: invoiceData.clientName,
        clientEmail: invoiceData.clientEmail,
        clientAddress: invoiceData.clientAddress,
        documentNumber: invoiceData.invoiceNumber,
        status: 'draft',
      };

      if (documentId) {
        await updateDocument({ id: documentId, ...documentData }).unwrap();
        toast.success("Draft updated successfully!");
      } else {
        const result = await createDocument(documentData).unwrap();
        toast.success("Draft saved successfully!");
        // Optionally update documentId if you want to track it
        if (result?.data?.id) {
          // You might want to pass this back to parent component
        }
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save draft");
    }
  };

  const handleSendEmail = async () => {
    if (!emailData.recipientEmail && !invoiceData.clientEmail) {
      toast.error("Please provide recipient email");
      return;
    }

    try {
      // First save the document if not saved
      let docId = documentId;
      if (!docId) {
        const documentData = {
          type: 'invoice',
          template: template,
          data: invoiceData,
          clientName: invoiceData.clientName,
          clientEmail: invoiceData.clientEmail,
          clientAddress: invoiceData.clientAddress,
          documentNumber: invoiceData.invoiceNumber,
          status: 'draft',
        };
        const result = await createDocument(documentData).unwrap();
        docId = result?.data?.id;
        if (!docId) {
          toast.error("Failed to save document. Please try again.");
          return;
        }
      }

      const recipientEmail = emailData.recipientEmail || invoiceData.clientEmail;
      const recipientName = emailData.recipientName || invoiceData.clientName || 'Valued Client';
      
      if (!recipientEmail) {
        toast.error("Please provide recipient email");
        return;
      }

      await sendDocumentByEmail({
        id: docId,
        recipientEmail: recipientEmail,
        subject: emailData.subject || `Invoice ${invoiceData.invoiceNumber}`,
        message: emailData.message || `Dear ${recipientName},\n\nPlease find attached your invoice.\n\nThank you for your business.`,
      }).unwrap();

      toast.success("Invoice sent successfully!");
      setIsEmailDialogOpen(false);
      setEmailData({ 
        selectedUserType: "", 
        selectedUserId: "", 
        recipientEmail: "", 
        recipientName: "",
        subject: "", 
        message: "" 
      });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to send invoice");
    }
  };

  useEffect(() => {
    // Auto-fill email if client email is set and no recipient is selected
    if (invoiceData.clientEmail && !emailData.selectedUserId) {
      setEmailData(prev => ({
        ...prev,
        recipientEmail: prev.recipientEmail || invoiceData.clientEmail,
        recipientName: prev.recipientName || invoiceData.clientName,
        subject: prev.subject || `Invoice ${invoiceData.invoiceNumber}`,
      }));
    }
  }, [invoiceData.clientEmail, invoiceData.clientName, invoiceData.invoiceNumber]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2 text-white/80 hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Gallery
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isCreating || isUpdating}
            className="glass-button bg-[#EFFC76] hover:bg-[#dbe665] text-black"
          >
            {isCreating || isUpdating ? "Saving..." : "Save Draft"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsEmailDialogOpen(true)}
            className="glass-button border-white/30 text-white hover:bg-white/10"
          >
            <Mail className="w-4 h-4 mr-2" /> Send by Email
          </Button>
          <Button
            onClick={handlePrint}
            className="bg-[#EFFC76] hover:bg-[#dbe665] text-black shadow-[0_0_15px_rgba(239,252,118,0.3)] transition-all duration-300"
          >
            <Printer className="w-4 h-4 mr-2" /> Print PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Form */}
        <Card className="no-print h-fit glass-card border-white/10">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-white/80">Invoice No.</Label>
                        <Input
                          value={invoiceData.invoiceNumber}
                          onChange={(e) => updateField('invoiceNumber', e.target.value)}
                          className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-white/80">Date</Label>
                        <Input
                          type="date"
                          value={invoiceData.date}
                          onChange={(e) => updateField('date', e.target.value)}
                          className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-white/80">Client Name</Label>
                    <Input
                      placeholder="Company or Person Name"
                      value={invoiceData.clientName}
                      onChange={(e) => updateField('clientName', e.target.value)}
                      className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-white/80">Client Address</Label>
                    <Input
                      placeholder="Billing Address"
                      value={invoiceData.clientAddress}
                      onChange={(e) => updateField('clientAddress', e.target.value)}
                      className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                    />
                </div>

                <Separator className="my-4" />
                
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <Label className="text-white/80">Line Items</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={addItem}
                          className="glass-button text-white/80 hover:text-white"
                        >
                          <Plus className="w-4 h-4 mr-1"/> Add Item
                        </Button>
                    </div>
                    {invoiceData.items.map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center bg-white/5 p-2 rounded-md sm:bg-transparent sm:p-0">
                             <Input 
                                className="flex-1 w-full bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]" 
                                placeholder="Description" 
                                value={item.description} 
                                onChange={(e) => updateItem(idx, 'description', e.target.value)} 
                             />
                             <div className="flex gap-2 w-full sm:w-auto">
                               <Input 
                                  className="w-full sm:w-20 bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]" 
                                  type="number" 
                                  placeholder="Qty" 
                                  value={item.quantity} 
                                  onChange={(e) => updateItem(idx, 'quantity', e.target.value)} 
                               />
                               <Input 
                                  className="w-full sm:w-24 bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]" 
                                  type="number" 
                                  placeholder="Rate" 
                                  value={item.rate} 
                                  onChange={(e) => updateItem(idx, 'rate', e.target.value)} 
                               />
                               <Button
                                 variant="ghost"
                                 size="icon"
                                 className="text-red-400 hover:text-red-300 hover:bg-red-500/10 shrink-0"
                                 onClick={() => removeItem(idx)}
                               >
                                  <Trash2 className="w-4 h-4" />
                               </Button>
                             </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        {/* Live Preview / Printable Area */}
        <div className="glass-card border-white/20 rounded-lg p-6 md:p-8 min-h-[500px] md:min-h-[600px] text-sm text-white print:shadow-none print:border-none print:w-full print:absolute print:top-0 print:left-0 print:z-50 w-full mx-auto print:mx-0 overflow-x-auto">
            <div className="min-w-[600px] md:min-w-0 flex flex-col h-full justify-between">
                <div>
                    {/* Header Section */}
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <h1 className="text-5xl font-bold mb-2 tracking-tight">INVOICE</h1>
                            <div className="text-white/70 text-lg">Invoice No: <span className="text-white font-semibold">#{invoiceData.invoiceNumber}</span></div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-xl text-[#EFFC76] tracking-wide mb-2">MD SAMSUDDOHA SOJIB</div>
                            <div className="text-white/60 text-xs leading-relaxed">
                                Full Stack Developer<br/>
                                www.fiverr.com<br/>
                                Rangpur City, Bangladesh
                            </div>
                            <Separator className="my-2 bg-white/20 ml-auto w-32" />
                        </div>
                    </div>

                    {/* Meta Info Section */}
                    <div className="grid grid-cols-2 gap-12 mb-8">
                        <div className="space-y-2 mt-4">
                            <div className="flex gap-12">
                                <span className="text-white/60 min-w-[80px]">Date</span>
                                <span className="font-medium">: {invoiceData.date}</span>
                            </div>
                            <div className="flex gap-12">
                                <span className="text-white/60 min-w-[80px]">Due Date</span>
                                <span className="font-medium">: {invoiceData.date}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-white mb-2">Bill To:</div>
                            <div className="font-bold text-lg mb-1">{invoiceData.clientName || "MMM Ventures Group B.V."}</div>
                            <div className="text-white/60 whitespace-pre-wrap text-sm leading-relaxed">
                                {invoiceData.clientAddress || "Randstad 22 46\n1316BZ ALMERE\nThe Netherlands"}
                            </div>
                        </div>
                    </div>

                    {/* Items Card Container */}
                    <div className="bg-[#1E1E2E]/80 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/5 shadow-xl print:bg-[#1E1E2E] print:break-inside-avoid">
                        {/* Table Header Pills */}
                        <div className="flex justify-between gap-4 mb-8">
                            <div className="flex-1">
                                <span className="bg-[#EFFC76] text-black px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider inline-block shadow-[0_0_15px_rgba(239,252,118,0.3)] w-full text-center md:text-left md:w-auto">Description</span>
                            </div>
                            <div className="w-24 text-center">
                                <span className="bg-[#EFFC76] text-black px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider inline-block shadow-[0_0_15px_rgba(239,252,118,0.3)] w-full">Qty</span>
                            </div>
                            <div className="w-32 text-center">
                                <span className="bg-[#EFFC76] text-black px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider inline-block shadow-[0_0_15px_rgba(239,252,118,0.3)] w-full">Price</span>
                            </div>
                            <div className="w-32 text-center">
                                <span className="bg-[#EFFC76] text-black px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider inline-block shadow-[0_0_15px_rgba(239,252,118,0.3)] w-full">Total</span>
                            </div>
                        </div>

                        {/* Items List */}
                        <div className="space-y-6 mb-8">
                            {invoiceData.items.map((item, i) => (
                                <div key={i} className="flex justify-between gap-4 items-center text-base py-2">
                                    <div className="flex-1 font-medium text-white/90 pl-4">{item.description || "—"}</div>
                                    <div className="w-24 text-center text-white/80">{item.quantity}</div>
                                    <div className="w-32 text-center text-white/80">${item.rate}</div>
                                    <div className="w-32 text-center font-bold text-white">
                                        ${(Number(item.quantity) * Number(item.rate)).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                            {invoiceData.items.length === 0 && (
                                <div className="text-center text-white/40 py-8 italic">No items added</div>
                            )}
                        </div>

                        <Separator className="bg-white/10 mb-8" />

                        {/* Totals Section */}
                        <div className="flex justify-end">
                            <div className="w-full max-w-sm space-y-4">
                                <div className="flex justify-between text-white/80 text-base">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-white text-lg">${calculateTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-white/80 text-base">
                                    <span>Sales Tax (free)</span>
                                    <span className="font-bold text-white text-lg">$0.00</span>
                                </div>
                                <Separator className="bg-white/10 my-2" />
                                <div className="flex justify-between items-center pt-2">
                                    <span className="font-medium text-lg">Grand Total</span>
                                    <span className="text-3xl font-bold text-[#EFFC76]">${calculateTotal().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-auto pt-4 items-end">
                    <div>
                        <span className="bg-[#EFFC76] text-black px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider inline-block mb-6 shadow-[0_0_15px_rgba(239,252,118,0.3)]">Payment Information</span>
                        <div className="space-y-3 text-sm text-white/80 pl-2">
                            <div className="flex gap-8">
                                <span className="min-w-[60px] font-medium text-white">Wise</span>
                                <span>: European Account</span>
                            </div>
                            <div className="flex gap-8">
                                <span className="min-w-[60px] font-medium text-white">IBAN</span>
                                <span>: BE54 9679 3485 0000</span>
                            </div>
                        </div>
                    </div>
                    <div className="md:text-left">
                        <div className="font-bold text-white mb-4 text-lg">Terms and Conditions:</div>
                        <ul className="text-sm text-white/70 space-y-2 list-disc pl-5">
                            <li>Payment constitutes acceptance.</li>
                            <li>Payment must be made within 7 days to avoid late fees.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Email Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="glass-panel border-white/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#EFFC76]" />
              Send Invoice by Email
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Send this invoice to the client via email
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="text-white/80">Select Recipient</Label>
              <Select
                value={emailData.selectedUserType}
                onValueChange={(value) => {
                  setEmailData(prev => ({ 
                    ...prev, 
                    selectedUserType: value,
                    selectedUserId: "",
                    recipientEmail: "",
                    recipientName: "",
                  }));
                }}
              >
                <SelectTrigger className="bg-black/40 border border-white/20 text-white focus:ring-[#EFFC76]">
                  <SelectValue placeholder="Choose from team or clients" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/20 text-white">
                  <SelectItem value="team">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Team Member</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="client">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      <span>Client</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="manual">
                    <span>Enter Email Manually</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {emailData.selectedUserType === "team" && (
              <div className="space-y-2">
                <Label className="text-white/80">Select Team Member</Label>
                <Select
                  value={emailData.selectedUserId}
                  onValueChange={(userId) => {
                    const member = teamMembers.find(m => (m.id || m._id) == userId);
                    if (member) {
                      setEmailData(prev => ({
                        ...prev,
                        selectedUserId: userId,
                        recipientEmail: member.email || "",
                        recipientName: `${member.firstName || ""} ${member.lastName || ""}`.trim(),
                      }));
                    }
                  }}
                >
                  <SelectTrigger className="bg-black/40 border border-white/20 text-white focus:ring-[#EFFC76]">
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/20 text-white max-h-[200px]">
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id || member._id} value={String(member.id || member._id)}>
                        <div className="flex flex-col">
                          <span>{`${member.firstName || ""} ${member.lastName || ""}`.trim() || member.employeeId}</span>
                          {member.email && (
                            <span className="text-xs text-white/60">{member.email}</span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {emailData.selectedUserType === "client" && (
              <div className="space-y-2">
                <Label className="text-white/80">Select Client</Label>
                <Select
                  value={emailData.selectedUserId}
                  onValueChange={(clientId) => {
                    const client = clients.find(c => (c.id || c._id) == clientId);
                    if (client) {
                      setEmailData(prev => ({
                        ...prev,
                        selectedUserId: clientId,
                        recipientEmail: client.email || "",
                        recipientName: client.name || client.companyName || "",
                      }));
                    }
                  }}
                >
                  <SelectTrigger className="bg-black/40 border border-white/20 text-white focus:ring-[#EFFC76]">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/20 text-white max-h-[200px]">
                    {clients.map((client) => (
                      <SelectItem key={client.id || client._id} value={String(client.id || client._id)}>
                        <div className="flex flex-col">
                          <span>{client.name || client.companyName || "Unnamed Client"}</span>
                          {client.email && (
                            <span className="text-xs text-white/60">{client.email}</span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {(emailData.selectedUserType === "manual" || !emailData.selectedUserType) && (
              <div className="space-y-2">
                <Label className="text-white/80">Recipient Email</Label>
                <Input
                  type="email"
                  placeholder="client@example.com"
                  value={emailData.recipientEmail}
                  onChange={(e) => setEmailData(prev => ({ ...prev, recipientEmail: e.target.value }))}
                  className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                />
              </div>
            )}

            {emailData.recipientEmail && (
              <div className="p-3 bg-[#EFFC76]/10 border border-[#EFFC76]/30 rounded-md">
                <div className="text-sm text-white/90">
                  <span className="font-semibold">To:</span> {emailData.recipientName || emailData.recipientEmail}
                </div>
                {emailData.recipientName && (
                  <div className="text-xs text-white/70 mt-1">{emailData.recipientEmail}</div>
                )}
              </div>
            )}
            <div className="space-y-2">
              <Label className="text-white/80">Subject</Label>
              <Input
                placeholder="Invoice Subject"
                value={emailData.subject}
                onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/80">Message</Label>
              <Textarea
                placeholder="Email message..."
                value={emailData.message}
                onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
              />
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => setIsEmailDialogOpen(false)}
                className="glass-button border-white/30 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendEmail}
                disabled={isSending}
                className="bg-[#EFFC76] hover:bg-[#dbe665] text-black"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSending ? "Sending..." : "Send Email"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
