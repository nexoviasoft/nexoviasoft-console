"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Receipt,
  UserPlus,
  FileCheck,
  CheckCircle2,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const templates = [
  {
    id: "invoice-cloud",
    title: "Cloud Computing Invoice",
    description: "Professional billing for cloud services & infrastructure.",
    icon: Receipt,
    type: "invoice",
    category: "Finance",
  },
  {
    id: "invoice-web",
    title: "Web Dev Invoice",
    description: "Standard invoice for development & design projects.",
    icon: Receipt,
    type: "invoice",
    category: "Finance",
  },
  {
    id: "invoice-design",
    title: "Design Invoice",
    description: "Clean invoice template for creative deliverables.",
    icon: Receipt,
    type: "invoice",
    category: "Creative",
  },
  {
    id: "offer-letter",
    title: "Job Offer Letter",
    description: "Formal offer letter with role details and compensation.",
    icon: UserPlus,
    type: "letter",
    category: "HR",
  },
  {
    id: "appointment-letter",
    title: "Appointment Letter",
    description: "Official employment confirmation document.",
    icon: FileCheck,
    type: "letter",
    category: "HR",
  },
];

export default function TemplateSelector({ onSelect, onCancel }) {
  const [selectedId, setSelectedId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTemplateClick = async (templateId) => {
    if (isProcessing) return; // Prevent multiple clicks
    
    setSelectedId(templateId);
    setIsProcessing(true);
    
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      // Automatically proceed with selection
      try {
        await onSelect(template.type, template.id);
        // Note: isProcessing will be reset when modal closes, but we keep it here for safety
      } catch (error) {
        console.error("Error selecting template:", error);
        setIsProcessing(false);
        setSelectedId(null);
      }
    }
  };

  const handleNext = () => {
    if (selectedId && !isProcessing) {
      const template = templates.find((t) => t.id === selectedId);
      if (template) {
        handleTemplateClick(selectedId);
      }
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden"> 
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/5">
        <div>
          <h3 className="text-xl font-semibold text-white tracking-tight">
            Choose Template
          </h3>
          <p className="text-sm text-white/60 mt-1">
            Select a professionally designed template to get started.
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="rounded-full text-[#EFFC76] hover:text-white hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Templates List */}
      <div className="flex-1 overflow-y-auto p-6 bg-transparent">
        <div className="grid grid-cols-2 gap-4">
          {templates.map((template) => {
            const isSelected = selectedId === template.id;
            return (
              <button
                key={template.id}
                onClick={() => handleTemplateClick(template.id)}
                disabled={isProcessing}
                className={cn(
                  "group relative flex flex-col items-start text-left p-5 rounded-lg border transition-all duration-200 outline-none",
                  isSelected
                    ? "bg-[#EFFC76]/10 border-[#EFFC76] shadow-[0_0_15px_rgba(239,252,118,0.1)]"
                    : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10",
                  isProcessing && "opacity-50 cursor-wait",
                )}
              >
                {/* Icon Box */}
                <div className="flex items-center justify-between w-full mb-4">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-md flex items-center justify-center transition-colors",
                      isSelected
                        ? "bg-[#EFFC76] text-black"
                        : "bg-white/10 text-white/70 group-hover:text-white",
                    )}
                  >
                    <template.icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <div className="text-[#EFFC76]">
                      {isProcessing ? (
                        <div className="w-5 h-5 border-2 border-[#EFFC76] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 fill-current" />
                      )}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h4
                      className={cn(
                        "text-sm font-semibold transition-colors",
                        isSelected ? "text-[#EFFC76]" : "text-white",
                      )}
                    >
                      {template.title}
                    </h4>
                    {template.category && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] h-5 px-1.5 font-normal bg-white/10 text-white/60 border-none"
                      >
                        {template.category}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed line-clamp-2 text-left">
                    {template.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <Sparkles className="w-3 h-3 text-[#EFFC76]" />
          <span>Smart templates</span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-white/20 text-white bg-white/10 glass-button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedId || isProcessing}
            className={cn(
              "px-6 transition-all duration-200",
              selectedId && !isProcessing
                ? "bg-[#EFFC76] hover:bg-[#dbe665] text-black shadow-lg shadow-[#EFFC76]/20"
                : "bg-white/10 text-white/30 cursor-not-allowed",
            )}
          >
            {isProcessing ? "Loading..." : "Use Template"}
          </Button>
        </div>
      </div>
    </div>
  );
}
