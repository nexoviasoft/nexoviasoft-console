"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Printer, Mail, Send } from "lucide-react";
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
import { Users, Building2 } from "lucide-react";

export default function LetterBuilder({ template, onBack, documentId }) {
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
  
  const [data, setData] = useState({
    candidateName: "",
    role: "",
    startDate: new Date().toISOString().split("T")[0],
    salary: "",
    manager: "",
    customMessage: ""
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
      if (doc.data && doc.type === 'letter') {
        setData({
          candidateName: doc.data.candidateName || doc.clientName || "",
          role: doc.data.role || "",
          startDate: doc.data.startDate || new Date().toISOString().split("T")[0],
          salary: doc.data.salary || "",
          manager: doc.data.manager || "",
          customMessage: doc.data.customMessage || "",
        });
      }
    }
  }, [documentId, documentData]);

  const updateField = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  const getLetterTitle = () => {
      if (template === 'offer-letter') return "JOB OFFER LETTER";
      if (template === 'appointment-letter') return "LETTER OF APPOINTMENT";
      return "OFFICIAL LETTER";
  };

  const handleSaveDraft = async () => {
    try {
      const documentData = {
        type: 'letter',
        template: template,
        data: data,
        clientName: data.candidateName,
        documentNumber: `${template}-${new Date().getTime()}`,
        status: 'draft',
      };

      if (documentId) {
        await updateDocument({ id: documentId, ...documentData }).unwrap();
        toast.success("Draft updated successfully!");
      } else {
        await createDocument(documentData).unwrap();
        toast.success("Draft saved successfully!");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save draft");
    }
  };

  const handleSendEmail = async () => {
    const recipientEmail = emailData.recipientEmail;
    const recipientName = emailData.recipientName || data.candidateName || 'Recipient';
    
    if (!recipientEmail) {
      toast.error("Please select a recipient or enter an email address");
      return;
    }

    try {
      // First save the document if not saved
      let docId = documentId;
      if (!docId) {
        const documentData = {
          type: 'letter',
          template: template,
          data: data,
          clientName: data.candidateName,
          documentNumber: `${template}-${new Date().getTime()}`,
          status: 'draft',
        };
        const result = await createDocument(documentData).unwrap();
        docId = result?.data?.id;
        if (!docId) {
          toast.error("Failed to save document. Please try again.");
          return;
        }
      }

      await sendDocumentByEmail({
        id: docId,
        recipientEmail: recipientEmail,
        subject: emailData.subject || getLetterTitle(),
        message: emailData.message || `Dear ${recipientName},\n\nPlease find attached the official letter.\n\nBest regards,\nSquadLog Team`,
      }).unwrap();

      toast.success("Letter sent successfully!");
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
      toast.error(error?.data?.message || "Failed to send letter");
    }
  };

  useEffect(() => {
    if (data.candidateName) {
      setEmailData(prev => ({
        ...prev,
        subject: prev.subject || getLetterTitle(),
      }));
    }
  }, [data.candidateName, template]);

  // Reset email data when dialog opens
  useEffect(() => {
    if (isEmailDialogOpen) {
      const defaultSubject = template === 'offer-letter' ? "JOB OFFER LETTER" 
        : template === 'appointment-letter' ? "LETTER OF APPOINTMENT" 
        : "OFFICIAL LETTER";
      
      setEmailData(prev => ({
        ...prev,
        selectedUserType: prev.selectedUserType || "",
        selectedUserId: prev.selectedUserId || "",
        recipientEmail: prev.recipientEmail || "",
        recipientName: prev.recipientName || "",
        subject: prev.subject || defaultSubject,
        message: prev.message || "",
      }));
    }
  }, [isEmailDialogOpen, template]);

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
            className="glass-button border-white/30 text-white hover:bg-white/10"
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
                <CardTitle className="text-white flex items-center gap-2">
                  Letter Details
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-white/80">Candidate Name</Label>
                    <Input
                      placeholder="John Doe"
                      value={data.candidateName}
                      onChange={(e) => updateField('candidateName', e.target.value)}
                      className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-white/80">Role / Designation</Label>
                        <Input
                          placeholder="Senior Developer"
                          value={data.role}
                          onChange={(e) => updateField('role', e.target.value)}
                          className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-white/80">Start Date</Label>
                        <Input
                          type="date"
                          value={data.startDate}
                          onChange={(e) => updateField('startDate', e.target.value)}
                          className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label className="text-white/80">Annual CTC / Salary</Label>
                    <Input
                      placeholder="$120,000"
                      value={data.salary}
                      onChange={(e) => updateField('salary', e.target.value)}
                      className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-white/80">Reporting Manager</Label>
                    <Input
                      placeholder="Manager Name"
                      value={data.manager}
                      onChange={(e) => updateField('manager', e.target.value)}
                      className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                    />
                </div>
           </CardContent>
        </Card>

        {/* Live Preview */}
        <div className="glass-card border-white/20 rounded-lg p-6 md:p-12 min-h-[500px] md:min-h-[600px] text-sm text-white print:shadow-none print:border-none print:w-full print:absolute print:top-0 print:left-0 print:z-50 w-full mx-auto print:mx-0 font-serif leading-relaxed overflow-x-auto">
            
            <div className="min-w-[600px] md:min-w-0">
                {/* Header */}
                <div className="text-center mb-8 border-b border-white/20 pb-6">
                    <div className="text-2xl font-bold text-[#EFFC76] tracking-widest mb-2">SQUADLOG INC.</div>
                    <div className="text-xs text-white/60 tracking-wide">
                        123 Tech Park • San Francisco, CA • www.squadlog.com
                    </div>
                </div>

                <div className="mb-8">
                    <div className="font-bold text-white">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    <br/>
                    <div className="text-white/80">To,</div>
                    <div className="font-bold text-white">{data.candidateName || "[Candidate Name]"}</div>
                    <div className="text-white/80">[Address Line 1]</div>
                    <div className="text-white/80">[City, State, Zip]</div>
                </div>

                <div className="text-center font-bold underline mb-8 uppercase tracking-wider text-base text-[#EFFC76]">
                    {getLetterTitle()}
                </div>

                <div className="space-y-4 text-justify text-white/90">
                    <p>Dear <strong className="text-white">{data.candidateName || "[Candidate Name]"}</strong>,</p>

                    {template === 'offer-letter' && (
                        <>
                            <p>
                                We are pleased to extend an offer for you to join <strong className="text-white">SquadLog Inc.</strong> in the position of <strong className="text-white">{data.role || "[Role]"}</strong>. 
                                We were impressed with your skills and experience and believe you will be a valuable asset to our team.
                            </p>
                            <p>
                                Your starting annual salary will be <strong className="text-white">{data.salary || "[Salary]"}</strong>, along with our standard benefits package. 
                                You will be reporting to <strong className="text-white">{data.manager || "[Manager Name]"}</strong>.
                            </p>
                        </>
                    )}

                    {template === 'appointment-letter' && (
                        <>
                            <p>
                                Further to our recent discussions and your acceptance of our offer, we are delighted to confirm your appointment as <strong className="text-white">{data.role || "[Role]"}</strong> at <strong className="text-white">SquadLog Inc.</strong>, effective from <strong className="text-white">{data.startDate}</strong>.
                            </p>
                            <p>
                                Your annual compensation package is fixed at <strong className="text-white">{data.salary || "[Salary]"}</strong>. 
                                The terms and conditions of your employment are outlined in the attached Employee Handbook.
                            </p>
                        </>
                    )}

                    <p>
                        We look forward to welcoming you to the SquadLog family. Please sign and return a copy of this letter to acknowledge your acceptance.
                    </p>
                </div>

                <div className="mt-16">
                    <div className="grid grid-cols-2 gap-12">
                        <div>
                            <div className="border-t border-white/20 w-3/4 pt-2 font-bold text-white">Authorized Signatory</div>
                            <div className="text-white/80">SquadLog Inc.</div>
                        </div>
                        <div>
                            <div className="border-t border-white/20 w-3/4 pt-2 font-bold text-white">Employee Signature</div>
                            <div className="text-white/80">Date: _________________</div>
                        </div>
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
              Send Letter by Email
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Send this letter to the recipient via email
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
                        recipientName: client.name || "",
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
                  placeholder="recipient@example.com"
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
                placeholder="Letter Subject"
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
