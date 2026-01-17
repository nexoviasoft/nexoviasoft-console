"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Receipt, UserPlus, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const templates = [
  {
      id: "invoice-cloud",
      title: "Cloud Computing Invoice",
      description: "Cloud services billing",
      icon: Receipt,
      type: "invoice",
      category: "Finance"
  },
  {
      id: "invoice-web",
      title: "Web Dev Invoice",
      description: "Development billing",
      icon: Receipt,
      type: "invoice",
      category: "Finance"
  },
  {
      id: "invoice-design",
      title: "Design Invoice",
      description: "Creative services",
      icon: Receipt,
      type: "invoice",
      category: "Creative"
  },
  {
      id: "offer-letter",
      title: "Job Offer Letter",
      description: "Formal job offer",
      icon: UserPlus,
      type: "letter",
      category: "HR"
  },
  {
      id: "appointment-letter",
      title: "Appointment Letter",
      description: "Employment confirmation",
      icon: FileCheck,
      type: "letter",
      category: "HR"
  }
];

export default function TemplateSelector({ onSelect, onCancel }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleNext = () => {
      if (selectedId) {
          const template = templates.find(t => t.id === selectedId);
          onSelect(template.type, template.id);
      }
  };

  return (
    <div className="flex flex-col h-full"> 
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
            <h3 className="text-xl font-bold text-white">Choose template</h3>
            <span className="text-sm text-white/50 font-medium">1/3</span>
        </div>
        <p className="text-white/70">Select a template to start organizing your content.</p>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2">
        {templates.map((template) => {
          const isSelected = selectedId === template.id;
          return (
            <div 
              key={template.id}
              onClick={() => setSelectedId(template.id)}
              className={`group cursor-pointer flex items-center gap-5 p-4 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-[#EFFC76] bg-[#EFFC76]/10 shadow-[0_0_24px_rgba(239,252,118,0.45)]'
                  : 'border-white/10 hover:border-[#EFFC76]/60 hover:bg-white/5'
              }`}
            >
              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-[#EFFC76]/20 text-[#EFFC76]'
                    : 'bg-black/40 text-white/60 group-hover:bg-white/10 group-hover:text-white'
                }`}
              >
                <template.icon className="w-8 h-8" />
              </div>

              <div className="flex-1 min-w-0">
                <h4
                  className={`text-lg font-bold mb-1 ${
                    isSelected ? 'text-[#EFFC76]' : 'text-white'
                  }`}
                >
                  {template.title}
                </h4>
                <p className="text-white/70 leading-snug">{template.description}</p>
              </div>

              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? 'border-[#EFFC76] bg-[#EFFC76]' : 'border-white/40'
                }`}
              >
                {isSelected && <div className="w-2 h-2 bg-black rounded-full" />}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-end gap-3 pt-4 border-t border-white/15">
        <Button 
            variant="ghost" 
            onClick={onCancel}
            className="hover:bg-white/10 text-white/70 rounded-lg px-6"
        >
            Cancel
        </Button>
        <Button 
            onClick={handleNext}
            disabled={!selectedId}
            className={`px-8 rounded-lg glass-button transition-all ${
              !selectedId
                ? 'bg-white/10 text-white/40 cursor-not-allowed'
                : 'bg-[#EFFC76] hover:bg-[#e0ef5f] text-black'
            }`}
        >
            Next
        </Button>
      </div>
    </div>
  );
}
