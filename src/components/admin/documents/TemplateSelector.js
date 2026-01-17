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
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
            <h3 className="text-xl font-bold text-gray-900">Choose template</h3>
            <span className="text-sm text-gray-400 font-medium">1/3</span>
        </div>
        <p className="text-gray-500">Select a template to start organizing your content.</p>
      </div>

      {/* Templates List */}
      <div className="space-y-4 flex-1 overflow-y-auto pr-2">
        {templates.map((template) => {
          const isSelected = selectedId === template.id;
          return (
            <div 
              key={template.id}
              onClick={() => setSelectedId(template.id)}
              className={`group cursor-pointer flex items-center gap-5 p-4 rounded-xl border-2 transition-all duration-200 ${isSelected ? 'border-purple-600 bg-purple-50/10 shadow-sm ring-1 ring-purple-600/10' : 'border-gray-100 hover:border-purple-200 hover:bg-gray-50/50'}`}
            >
              {/* Icon Box */}
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500 group-hover:bg-purple-50 group-hover:text-purple-500'}`}>
                <template.icon className="w-8 h-8" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className={`text-lg font-bold mb-1 ${isSelected ? 'text-purple-900' : 'text-gray-900'}`}>{template.title}</h4>
                <p className="text-gray-500 leading-snug">{template.description}</p>
              </div>

              {/* Selection Indicator */}
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-purple-600 bg-purple-600' : 'border-gray-300'}`}>
                  {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="mt-8 flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <Button 
            variant="ghost" 
            onClick={onCancel}
            className="hover:bg-gray-100 text-gray-600 rounded-lg px-6"
        >
            Cancel
        </Button>
        <Button 
            onClick={handleNext}
            disabled={!selectedId}
            className={`px-8 rounded-lg shadow-lg shadow-purple-500/20 transition-all ${!selectedId ? 'bg-gray-200 text-gray-400' : 'bg-black hover:bg-gray-900 text-white'}`}
        >
            Next
        </Button>
      </div>
    </div>
  );
}
