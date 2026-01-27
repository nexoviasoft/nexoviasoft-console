"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, RefreshCw, Loader2, Users, UserPlus, ChevronsUpDown, X } from "lucide-react";
import { toast } from "sonner";
import { useSendEmailMutation } from "@/api/admin/email-alert/emailAlertApi";
import { useGetOurTeamQuery } from "@/api/admin/our-team/ourTeamApi";
import { useGetClientsQuery } from "@/api/landing/client/clientApi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

export default function EmailComposer({ selectedTemplate }) {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    body: ""
  });
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [sendEmail, { isLoading: isSending }] = useSendEmailMutation();
  const { data: teamData, isLoading: isLoadingTeam } = useGetOurTeamQuery();
  const { data: clientsData, isLoading: isLoadingClients } = useGetClientsQuery();

  const teamMembers = teamData?.data || teamData || [];
  const clients = clientsData?.data || clientsData || [];

  // Filter based on search query - show both team and clients
  const filteredTeamMembers = teamMembers.filter((member) => {
    const search = searchQuery.toLowerCase();
    const fullName = `${member.firstName || ''} ${member.lastName || ''}`.toLowerCase();
    return (
      fullName.includes(search) ||
      member.email?.toLowerCase().includes(search) ||
      member.position?.toLowerCase().includes(search)
    );
  });

  const filteredClients = clients.filter((client) => {
    const search = searchQuery.toLowerCase();
    return (
      client.name?.toLowerCase().includes(search) ||
      client.email?.toLowerCase().includes(search) ||
      client.companyName?.toLowerCase().includes(search) ||
      client.designation?.toLowerCase().includes(search)
    );
  });

  // Update email field when recipients change
  useEffect(() => {
    if (selectedRecipients.length > 0) {
      const emails = selectedRecipients.map(r => r.email).join(", ");
      setEmailData(prev => ({ ...prev, to: emails }));
    } else if (selectedRecipients.length === 0 && emailData.to === "") {
      // Keep email field empty if no recipients
    }
  }, [selectedRecipients]);

  const handleSelectRecipient = (recipient) => {
    // Check if already selected
    const isAlreadySelected = selectedRecipients.some(r => r.email === recipient.email);
    if (!isAlreadySelected) {
      setSelectedRecipients([...selectedRecipients, recipient]);
      setSearchQuery("");
      // Keep popover open for multiple selections
    }
  };

  const handleRemoveRecipient = (email) => {
    setSelectedRecipients(selectedRecipients.filter(r => r.email !== email));
  };

  useEffect(() => {
    if (selectedTemplate) {
      setEmailData({
        to: emailData.to, // Keep current recipients
        subject: selectedTemplate.subject || "",
        body: selectedTemplate.body || ""
      });
    }
  }, [selectedTemplate]);

  const handleSend = async () => {
    if (!emailData.to || !emailData.subject || !emailData.body) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const result = await sendEmail({
        to: emailData.to,
        subject: emailData.subject,
        body: emailData.body,
      }).unwrap();

      if (result.success) {
        toast.success(result.message || `Email sent successfully to ${emailData.to}!`);
        // Reset form
        setEmailData({ to: "", subject: "", body: "" });
      } else {
        toast.error(result.message || "Failed to send email");
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "Failed to send email. Please try again.");
    }
  };

  const handleReset = () => {
    if (selectedTemplate) {
      setEmailData({
        to: emailData.to,
        subject: selectedTemplate.subject || "",
        body: selectedTemplate.body || ""
      });
      toast.info("Template reset to original");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <span>Compose Email</span>
          {selectedTemplate && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleReset}
              className="gap-2 bg-[#EFFC76] hover:bg-[#EFFC76]/80 text-black font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Reset Template
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-white/80">To</Label>
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 gap-2 bg-[#EFFC76]/10 hover:bg-[#EFFC76]/20 text-[#EFFC76] border-[#EFFC76]/40"
                >
                  <Users className="w-4 h-4" />
                  Select Recipients
                  <ChevronsUpDown className="w-3 h-3 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0 glass-panel border-white/20" align="start">
                <Command className="bg-transparent">
                  <CommandInput
                    placeholder="Search team members or clients..."
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    className="text-white placeholder:text-white/40"
                  />
                  <CommandList>
                    <CommandEmpty>
                      {isLoadingTeam || isLoadingClients ? "Loading..." : "No recipients found."}
                    </CommandEmpty>
                    
                    {/* Team Members Section */}
                    {filteredTeamMembers.length > 0 && (
                      <CommandGroup>
                        <div className="px-2 py-1.5 text-xs font-medium text-white/70 flex items-center gap-2">
                          <Users className="w-3 h-3" />
                          Team Members ({filteredTeamMembers.length})
                        </div>
                        {filteredTeamMembers.map((member) => {
                          const fullName = `${member.firstName || ''} ${member.lastName || ''}`.trim();
                          const isSelected = selectedRecipients.some(r => r.email === member.email);
                          return (
                            <CommandItem
                              key={`team-${member.id}`}
                              onSelect={() => handleSelectRecipient({
                                name: fullName,
                                email: member.email,
                                type: "team"
                              })}
                              className={`cursor-pointer ${isSelected ? "opacity-50" : ""}`}
                              disabled={isSelected}
                            >
                              <Users className="w-4 h-4 mr-2 text-[#EFFC76]" />
                              <div className="flex flex-col">
                                <span className="text-white">{fullName}</span>
                                <span className="text-xs text-white/60">{member.email}</span>
                                {member.position && (
                                  <span className="text-xs text-white/50">{member.position}</span>
                                )}
                              </div>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    )}

                    {/* Clients Section */}
                    {filteredClients.length > 0 && (
                      <CommandGroup>
                        <div className="px-2 py-1.5 text-xs font-medium text-white/70 flex items-center gap-2">
                          <UserPlus className="w-3 h-3" />
                          Clients ({filteredClients.length})
                        </div>
                        {filteredClients.map((client) => {
                          const isSelected = selectedRecipients.some(r => r.email === client.email);
                          return (
                            <CommandItem
                              key={`client-${client.id}`}
                              onSelect={() => handleSelectRecipient({
                                name: client.name,
                                email: client.email,
                                type: "client"
                              })}
                              className={`cursor-pointer ${isSelected ? "opacity-50" : ""}`}
                              disabled={isSelected}
                            >
                              <UserPlus className="w-4 h-4 mr-2 text-[#EFFC76]" />
                              <div className="flex flex-col">
                                <span className="text-white">{client.name}</span>
                                <span className="text-xs text-white/60">{client.email}</span>
                                {client.companyName && (
                                  <span className="text-xs text-white/50">{client.companyName}</span>
                                )}
                              </div>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Selected Recipients */}
          {selectedRecipients.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">Selected Recipients ({selectedRecipients.length})</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedRecipients([]);
                    setEmailData(prev => ({ ...prev, to: "" }));
                  }}
                  className="h-6 text-xs text-white/60 hover:text-white"
                >
                  Clear All
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 p-2 bg-white/5 rounded-md border border-white/10">
                {selectedRecipients.map((recipient) => (
                  <Badge
                    key={recipient.email}
                    variant="secondary"
                    className="bg-[#EFFC76]/20 text-[#EFFC76] border-[#EFFC76]/40 pr-1"
                  >
                    {recipient.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveRecipient(recipient.email)}
                      className="ml-2 hover:bg-[#EFFC76]/30 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Input 
            placeholder="teammate@company.com (comma-separated for multiple)"
            value={emailData.to}
            onChange={(e) => {
              setEmailData({...emailData, to: e.target.value});
              // Clear selected recipients if manually edited or cleared
              const expectedEmails = selectedRecipients.map(r => r.email).join(", ");
              if (e.target.value !== expectedEmails || e.target.value === "") {
                setSelectedRecipients([]);
              }
            }}
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white/80">Subject</Label>
          <Input 
            placeholder="Email subject"
            value={emailData.subject}
            onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white/80">Message</Label>
          <Textarea 
            placeholder="Email body..."
            value={emailData.body}
            onChange={(e) => setEmailData({...emailData, body: e.target.value})}
            rows={12}
            className="font-mono text-sm bg-white/5 border-white/20 text-white placeholder:text-white/40"
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button 
            variant="outline"
            onClick={() => setEmailData({ to: "", subject: "", body: "" })}
            className="glass-button border-white/10 text-black "
          >
            Clear
          </Button>
          <Button 
            onClick={handleSend}
            disabled={isSending}
            className="bg-[#EFFC76] hover:bg-[#dbe665] text-black gap-2 shadow-lg shadow-[#EFFC76]/20 disabled:opacity-50"
          >
            {isSending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Email
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
