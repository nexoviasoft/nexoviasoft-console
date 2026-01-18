"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, Receipt, UserPlus, FileCheck, ArrowRight, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const templates = [
    {
        category: "Finance",
        items: [
            {
                id: "invoice-cloud",
                title: "Cloud Computing Invoice",
                description: "Invoice template for cloud services, AWS/Azure billing.",
                icon: Receipt, // Using Receipt instead of FileText for invoices
                type: "invoice",
                tags: ["Finance", "Tech"]
            },
            {
                id: "invoice-web",
                title: "Web Development Invoice",
                description: "Standard billing for frontend/backend development projects.",
                icon: Receipt,
                type: "invoice",
                tags: ["Finance", "Dev"]
            },
            {
                id: "invoice-design",
                title: "Graphic/UI Design Invoice",
                description: "Creative services invoice with revision tracking options.",
                icon: Receipt,
                type: "invoice",
                tags: ["Creative", "Design"]
            }
        ]
    },
    {
        category: "Human Resources",
        items: [
            {
                id: "offer-letter",
                title: "Job Offer Letter",
                description: "Formal job offer document with role, salary, and benefits.",
                icon: UserPlus,
                type: "letter",
                tags: ["Recruitment", "Official"]
            },
            {
                id: "appointment-letter",
                title: "Appointment Letter",
                description: "Confirmation of employment and role commencement.",
                icon: FileCheck,
                type: "letter",
                tags: ["HR", "Onboarding"]
            }
        ]
    }
];

export default function TemplateGallery({ onSelect, viewMode = "grid" }) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredSections = templates
    .map((section) => {
      const items = section.items.filter((item) => {
        if (!normalizedQuery) return true;

        const haystack = `${item.title} ${item.description} ${item.tags.join(" ")}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      });

      return { ...section, items };
    })
    .filter((section) => section.items.length > 0);

  const sectionsToRender = filteredSections.length > 0 ? filteredSections : [];

  const renderGridItems = (items) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card
          key={item.id}
          className="group hover:shadow-lg transition-all border-gray-200 cursor-pointer bg-white/80 hover:bg-white"
          onClick={() => onSelect(item.type, item.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                <item.icon className="w-6 h-6 text-purple-600" />
              </div>
              <Badge variant="secondary" className="text-xs font-normal">
                {item.tags[0]}
              </Badge>
            </div>
            <CardTitle className="text-lg">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="line-clamp-2">
              {item.description}
            </CardDescription>
          </CardContent>
          <CardFooter className="pt-0 text-purple-600 text-sm font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Use Template <ArrowRight className="w-4 h-4" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  const renderListItems = (items) => (
    <div className="space-y-3">
      {items.map((item) => (
        <Card
          key={item.id}
          className="group hover:shadow-md transition-all border-gray-200 cursor-pointer bg-white/80 hover:bg-white"
          onClick={() => onSelect(item.type, item.id)}
        >
          <CardContent className="flex items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                <item.icon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-base mb-1">{item.title}</CardTitle>
                <CardDescription className="text-sm">
                  {item.description}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-xs font-normal">
                {item.tags[0]}
              </Badge>
              <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Select a template</h2>
          <p className="text-sm text-white/70">
            Browse invoice and letter templates to start your document.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search templates..."
            className="pl-9 bg-black/40 border border-white/20 text-white placeholder:text-white/50 focus-visible:ring-[#EFFC76]"
          />
        </div>
      </div>

      {sectionsToRender.length === 0 && (
        <div className="text-center text-sm text-white/70 py-8">
          No templates found for <span className="font-medium text-white">"{searchQuery}"</span>.
        </div>
      )}

      {sectionsToRender.map((section, idx) => (
        <div key={idx} className="space-y-4">
          <h3 className="text-sm font-semibold text-white/70 flex items-center gap-2">
            {section.category === "Finance" ? (
              <Receipt className="w-4 h-4 text-white/60" />
            ) : (
              <UserPlus className="w-4 h-4 text-white/60" />
            )}
            {section.category} patterns
          </h3>
          {viewMode === "grid"
            ? renderGridItems(section.items)
            : renderListItems(section.items)}
        </div>
      ))}
    </div>
  );
}
