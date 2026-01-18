"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function EmailComposer({ selectedTemplate }) {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    body: ""
  });

  useEffect(() => {
    if (selectedTemplate) {
      setEmailData({
        to: "",
        subject: selectedTemplate.subject,
        body: selectedTemplate.body
      });
    }
  }, [selectedTemplate]);

  const handleSend = () => {
    if (!emailData.to || !emailData.subject || !emailData.body) {
      toast.error("Please fill in all fields");
      return;
    }

    // Check if SMTP is configured
    const smtpConfig = localStorage.getItem("smtp_config");
    if (!smtpConfig) {
      toast.error("Please configure SMTP settings first");
      return;
    }

    // Simulate sending
    toast.success(`Email sent successfully to ${emailData.to}!`);
    
    // Reset form
    setEmailData({ to: "", subject: "", body: "" });
  };

  const handleReset = () => {
    if (selectedTemplate) {
      setEmailData({
        to: emailData.to,
        subject: selectedTemplate.subject,
        body: selectedTemplate.body
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
              className="gap-2 bg-white hover:bg-white/90 text-black"
            >
              <RefreshCw className="w-4 h-4" />
              Reset Template
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">To</Label>
          <Input 
            placeholder="teammate@company.com (comma-separated for multiple)"
            value={emailData.to}
            onChange={(e) => setEmailData({...emailData, to: e.target.value})}
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
            className="bg-white hover:bg-white/90 text-black"
          >
            Clear
          </Button>
          <Button 
            onClick={handleSend}
            className="bg-white hover:bg-white/90 text-black gap-2"
          >
            <Send className="w-4 h-4" />
            Send Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
