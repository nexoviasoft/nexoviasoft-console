"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Receipt, UserPlus, FileCheck, CheckCircle2, Sparkles, X } from "lucide-react";
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
    <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-100"> 
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
         <div>
            <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
              Choose Template
            </h3>
            <p className="text-sm text-gray-500 mt-1">Select a professionally designed template to get started.</p>
         </div>
         <Button variant="ghost" size="icon" onClick={onCancel} className="rounded-full text-gray-400 hover:text-gray-900">
            <X className="w-4 h-4" />
         </Button>
      </div>

      {/* Templates List */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => {
          const isSelected = selectedId === template.id;
          return (
            <button 
              key={template.id}
              onClick={() => setSelectedId(template.id)}
              className={cn(
                "group relative flex flex-col items-start text-left p-5 rounded-lg border transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-900",
                isSelected 
                  ? "bg-white border-gray-900 shadow-sm ring-1 ring-gray-900" 
                  : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
              )}
            >
              {/* Icon Box */}
              <div className="flex items-center justify-between w-full mb-4">
                  <div className={cn(
                    "w-8 h-8 rounded-md flex items-center justify-center transition-colors",
                    isSelected ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                  )}>
                    <template.icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                     <div className="text-gray-900">
                       <CheckCircle2 className="w-5 h-5 fill-current text-white" />
                     </div>
                  )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 w-full">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h4 className={cn("text-sm font-semibold transition-colors", isSelected ? "text-gray-900" : "text-gray-900")}>
                    {template.title}
                  </h4>
                  {template.category && (
                    <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-normal bg-gray-100 text-gray-500">
                      {template.category}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 text-left">
                  {template.description}
                </p>
              </div>
            </button>
          );
        })}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Sparkles className="w-3 h-3 text-gray-400" />
          <span>Smart templates</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
              variant="outline" 
              onClick={onCancel}
              className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
              Cancel
          </Button>
          <Button 
              onClick={handleNext}
              disabled={!selectedId}
              className={cn(
                "px-6 transition-all duration-200",
                selectedId 
                  ? "bg-gray-900 hover:bg-black text-white shadow-sm" 
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
          >
              Use Template
          </Button>
        </div>
      </div>
    </div>
  );
}
