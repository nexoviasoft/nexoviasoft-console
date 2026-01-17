"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Receipt, UserPlus, FileCheck, Check, Sparkles } from "lucide-react";
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
      gradient: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50"
  },
  {
      id: "invoice-web",
      title: "Web Dev Invoice",
      description: "Standard invoice for development & design projects.",
      icon: Receipt,
      type: "invoice",
      category: "Finance",
      gradient: "from-purple-500 to-pink-500",
      bg: "bg-purple-50"
  },
  {
      id: "invoice-design",
      title: "Design Invoice",
      description: "Clean invoice template for creative deliverables.",
      icon: Receipt,
      type: "invoice",
      category: "Creative",
      gradient: "from-orange-500 to-amber-500",
      bg: "bg-orange-50"
  },
  {
      id: "offer-letter",
      title: "Job Offer Letter",
      description: "Formal offer letter with role details and compensation.",
      icon: UserPlus,
      type: "letter",
      category: "HR",
      gradient: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-50"
  },
  {
      id: "appointment-letter",
      title: "Appointment Letter",
      description: "Official employment confirmation document.",
      icon: FileCheck,
      type: "letter",
      category: "HR",
      gradient: "from-indigo-500 to-violet-500",
      bg: "bg-indigo-50"
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
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
              Choose Template
            </h3>
            <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full font-semibold">Step 1 of 3</span>
        </div>
        <p className="text-gray-500 text-sm">Select a professionally designed template to get started.</p>
      </div>

      {/* Templates List */}
      <div className="space-y-3 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {templates.map((template) => {
          const isSelected = selectedId === template.id;
          return (
            <div 
              key={template.id}
              onClick={() => setSelectedId(template.id)}
              className={cn(
                "group relative cursor-pointer flex items-center gap-5 p-4 rounded-xl border transition-all duration-300",
                isSelected 
                  ? "border-purple-500 bg-purple-50/50 shadow-md shadow-purple-500/10 scale-[1.01]" 
                  : "border-gray-100 bg-white hover:border-purple-200 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-0.5"
              )}
            >
              {/* Icon Box */}
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-all duration-500 group-hover:scale-110",
                isSelected ? `bg-gradient-to-br ${template.gradient} text-white` : `${template.bg} text-gray-500 group-hover:text-gray-700`
              )}>
                {isSelected ? <template.icon className="w-7 h-7" /> : <template.icon className="w-7 h-7" />}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={cn("text-base font-bold transition-colors", isSelected ? "text-gray-900" : "text-gray-700 group-hover:text-gray-900")}>
                    {template.title}
                  </h4>
                  {template.category && (
                    <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-normal opacity-0 group-hover:opacity-100 transition-opacity">
                      {template.category}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500 leading-snug group-hover:text-gray-600 transition-colors">
                  {template.description}
                </p>
              </div>

              {/* Selection Checkbox */}
              <div className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                isSelected 
                  ? "border-purple-600 bg-purple-600 shadow-sm scale-110" 
                  : "border-gray-200 group-hover:border-purple-300"
              )}>
                  {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
              </div>
              
              {/* Subtle Highlight Glow */}
              {isSelected && (
                <div className="absolute inset-0 rounded-xl bg-purple-500/5 pointer-events-none animate-pulse" />
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>AI-Powered Suggestions enabled</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
              variant="outline" 
              onClick={onCancel}
              className="hover:bg-gray-50 text-gray-600 border-gray-200"
          >
              Cancel
          </Button>
          <Button 
              onClick={handleNext}
              disabled={!selectedId}
              className={cn(
                "px-8 transition-all duration-300 shadow-lg",
                selectedId 
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:-translate-y-0.5" 
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
          >
              Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
