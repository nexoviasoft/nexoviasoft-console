"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Receipt, UserPlus, FileCheck, ArrowRight } from "lucide-react";
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

export default function TemplateGallery({ onSelect }) {
  return (
    <div className="space-y-8">
      {templates.map((section, idx) => (
        <div key={idx}>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                {section.category === "Finance" ? <Receipt className="w-5 h-5 text-gray-500" /> : <UserPlus className="w-5 h-5 text-gray-500" />}
                {section.category} Patterns
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item) => (
                    <Card key={item.id} className="group hover:shadow-lg transition-all border-gray-200 cursor-pointer" onClick={() => onSelect(item.type, item.id)}>
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
        </div>
      ))}
    </div>
  );
}
