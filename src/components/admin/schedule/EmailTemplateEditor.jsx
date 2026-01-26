"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Eye, 
  RotateCcw, 
  Save, 
  Sparkles,
  Copy,
  Check
} from "lucide-react";
import { toast } from "sonner";
import {
  getDefaultMeetingTemplate,
  replaceTemplateVariables,
  validateTemplate,
  getSavedTemplate,
  saveTemplate,
  TEMPLATE_VARIABLES
} from "@/lib/emailTemplates";

export default function EmailTemplateEditor({ meetingData, onTemplateChange }) {
  const [template, setTemplate] = useState(getSavedTemplate());
  const [showPreview, setShowPreview] = useState(false);
  const [copiedVariable, setCopiedVariable] = useState(null);

  // Update parent component when template changes
  useEffect(() => {
    if (onTemplateChange) {
      onTemplateChange(template);
    }
  }, [template, onTemplateChange]);

  // Handle subject change
  const handleSubjectChange = (e) => {
    setTemplate(prev => ({ ...prev, subject: e.target.value }));
  };

  // Handle body change
  const handleBodyChange = (e) => {
    setTemplate(prev => ({ ...prev, body: e.target.value }));
  };

  // Insert variable at cursor position
  const insertVariable = (variable) => {
    const textarea = document.getElementById('email-body');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = template.body;
    const before = text.substring(0, start);
    const after = text.substring(end);
    
    setTemplate(prev => ({
      ...prev,
      body: before + variable + after
    }));

    // Set cursor position after inserted variable
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + variable.length, start + variable.length);
    }, 0);
  };

  // Copy variable to clipboard
  const copyVariable = async (variable) => {
    try {
      await navigator.clipboard.writeText(variable);
      setCopiedVariable(variable);
      setTimeout(() => setCopiedVariable(null), 2000);
      toast.success("Variable copied!");
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  // Reset to default template
  const handleReset = () => {
    const defaultTemplate = getDefaultMeetingTemplate();
    setTemplate(defaultTemplate);
    toast.success("Template reset to default");
  };

  // Save template
  const handleSave = () => {
    const validation = validateTemplate(template);
    if (!validation.isValid) {
      toast.error(validation.message);
      return;
    }
    
    if (saveTemplate(template)) {
      toast.success("Template saved successfully!");
    } else {
      toast.error("Failed to save template");
    }
  };

  // Generate preview with sample data
  const getPreviewData = () => {
    return {
      meetingTopic: meetingData?.topic || "Sprint Planning - Q1 2026",
      description: meetingData?.description || "Discuss goals, priorities, and deliverables for Q1 sprint",
      dateTime: meetingData?.dateTime || "January 28, 2026 at 2:00 PM",
      duration: meetingData?.duration || 60,
      meetingLink: meetingData?.meetingLink || "https://squadlog.com/meetings/m-2026-01-28-001",
      organizerName: meetingData?.organizerName || "John Doe",
      attendeeName: "Jane Smith" // Sample attendee name
    };
  };

  const previewSubject = replaceTemplateVariables(template.subject, getPreviewData());
  const previewBody = replaceTemplateVariables(template.body, getPreviewData());

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-[#EFFC76]" />
          <h3 className="text-lg font-bold text-white">Email Template</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="glass-button border border-white/20 bg-white/5 text-white hover:bg-white/10"
          >
            <Eye className="w-3.5 h-3.5 mr-1.5" />
            {showPreview ? "Hide" : "Show"} Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="glass-button border border-white/20 bg-white/5 text-white hover:bg-white/10"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Reset
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black font-semibold"
          >
            <Save className="w-3.5 h-3.5 mr-1.5" />
            Save
          </Button>
        </div>
      </div>

      {/* Template Variables */}
      <div className="glass-panel rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-[#EFFC76]" />
          <h4 className="text-sm font-semibold text-white">Available Variables</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {TEMPLATE_VARIABLES.map((item) => (
            <button
              key={item.variable}
              onClick={() => insertVariable(item.variable)}
              onDoubleClick={() => copyVariable(item.variable)}
              className="group relative px-2 py-1.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 hover:border-[#EFFC76]/50 transition-all duration-200 text-left"
              title={`${item.description}\nClick to insert, double-click to copy`}
            >
              <div className="flex items-center justify-between gap-1">
                <code className="text-xs text-[#EFFC76] font-mono">
                  {item.variable}
                </code>
                {copiedVariable === item.variable ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
              <p className="text-[10px] text-white/50 mt-0.5 truncate">
                {item.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Subject Line */}
      <div className="space-y-2">
        <Label htmlFor="email-subject" className="text-white/90 font-medium">
          Subject Line
        </Label>
        <Input
          id="email-subject"
          value={template.subject}
          onChange={handleSubjectChange}
          placeholder="Enter email subject..."
          className="bg-black/40 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
        />
      </div>

      {/* Email Body */}
      <div className="space-y-2">
        <Label htmlFor="email-body" className="text-white/90 font-medium">
          Email Body
        </Label>
        <Textarea
          id="email-body"
          value={template.body}
          onChange={handleBodyChange}
          placeholder="Enter email body... Use variables like {{meetingTopic}}"
          rows={12}
          className="bg-black/40 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76] font-mono text-sm"
        />
      </div>

      {/* Preview */}
      {showPreview && (
        <div className="glass-panel rounded-xl p-4 space-y-3 border-2 border-[#EFFC76]/30">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-[#EFFC76]" />
            <h4 className="text-sm font-semibold text-white">Email Preview</h4>
            <span className="text-xs text-white/50">(with sample data)</span>
          </div>
          
          {/* Preview Subject */}
          <div>
            <p className="text-xs text-white/50 mb-1">Subject:</p>
            <p className="text-sm font-semibold text-white bg-black/40 rounded-lg px-3 py-2 border border-white/10">
              {previewSubject}
            </p>
          </div>

          {/* Preview Body */}
          <div>
            <p className="text-xs text-white/50 mb-1">Body:</p>
            <div className="bg-black/40 rounded-lg px-4 py-3 border border-white/10">
              <pre className="text-sm text-white/90 whitespace-pre-wrap font-sans">
                {previewBody}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
