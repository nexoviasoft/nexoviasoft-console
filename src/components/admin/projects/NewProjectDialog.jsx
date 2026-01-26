"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const projectTemplates = [
  {
    id: "scrum",
    name: "Scrum",
    description:
      "Designed for teams using time-boxed sprints to deliver incremental value.",
  },
  {
    id: "kanban",
    name: "Kanban",
    description:
      "Ideal for managing a continuous flow of work with work-in-progress (WIP) limits.",
  },
  {
    id: "bug_tracking",
    name: "Bug Tracking",
    description:
      "Used to capture, track, prioritize, and resolve software defects.",
  },
  {
    id: "project_management",
    name: "Project Management",
    description:
      "General-purpose template for managing business projects and tasks.",
  },
  {
    id: "devops",
    name: "DevOps",
    description:
      "Supports software development, deployment, monitoring, and operations workflows.",
  },
  {
    id: "itsm",
    name: "IT Service Management (ITSM)",
    description:
      "For managing incidents, service requests, problems, and service delivery.",
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Campaign management, content calendars, and lead tracking.",
  },
  {
    id: "design",
    name: "Design",
    description:
      "UX/UI projects, creative workflows, and digital asset management.",
  },
  {
    id: "hr",
    name: "Human Resources (HR)",
    description:
      "Employee onboarding, recruitment pipelines, and internal HR processes.",
  },
  {
    id: "sales",
    name: "Sales",
    description: "Sales pipelines, opportunity tracking, and deal management.",
  },
  {
    id: "operations",
    name: "Operations",
    description:
      "Procurement, process management, compliance, and policy tracking.",
  },
  {
    id: "task_tracking",
    name: "Task Tracking",
    description: "Simple task organization for individuals or teams.",
  },
  {
    id: "event_planning",
    name: "Event Planning",
    description: "Managing event timelines, responsibilities, and logistics.",
  },
  {
    id: "fdd",
    name: "Feature-Driven Development (FDD)",
    description: "Organizing work around feature delivery.",
  },
  {
    id: "tdd",
    name: "Test-Driven Development (TDD)",
    description: "Supporting test-first development workflows.",
  },
  {
    id: "custom",
    name: "Custom Templates",
    description:
      "User-defined templates with custom fields, workflows, and boards.",
  },
];

export default function NewProjectDialog({ open, onOpenChange }) {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const selectedTemplateData = projectTemplates.find(
    (t) => t.id === selectedTemplate,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] w-[95vw] sm:w-full max-h-[75vh] overflow-y-auto bg-[#0A0A0A] border-white/20 text-white shadow-2xl p-3 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-white">Create New Project</DialogTitle>
          <DialogDescription className="text-white/70">
            Start a new project board. Select a template and fill in the details
            below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:gap-4 py-2 sm:py-4">
          {/* Template Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-2 sm:gap-4">
            <Label className="text-left sm:text-right sm:pt-2 text-white">
              Template
            </Label>
            <div className="col-span-1 sm:col-span-3">
              <div className="grid grid-cols-2 gap-2 max-h-[160px] sm:max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                {projectTemplates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? "bg-[#EFFC76]/10 border-[#EFFC76]"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <div className="font-medium text-sm text-white flex items-center justify-between">
                      {template.name}
                      {selectedTemplate === template.id && (
                        <div className="w-2 h-2 rounded-full bg-[#EFFC76]" />
                      )}
                    </div>
                    <div className="text-xs text-white/60 line-clamp-1 mt-1">
                      {template.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Project Name */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="name" className="text-left sm:text-right text-white">
              Name
            </Label>
            <Input
              id="name"
              placeholder="E.g., Website Redesign"
              className="col-span-1 sm:col-span-3 bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
            />
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-2 sm:gap-4">
            <Label htmlFor="description" className="text-left sm:text-right sm:pt-2 text-white">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Project goals and scope..."
              className="col-span-1 sm:col-span-3 min-h-[60px] sm:min-h-[80px] bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
            />
          </div>

          {/* Team */}
          <div className="grid grid-cols-2 sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="team" className="text-left sm:text-right text-white">
              Team
            </Label>
            <Select>
              <SelectTrigger className="col-span-3 sm:col-span-3 bg-black/40 border border-white/20 text-white">
                <SelectValue placeholder="Select a team" />
              </SelectTrigger>
              <SelectContent className="bg-[#1E1E2E] border-white/20 text-white">
                <SelectItem value="design">Design Team</SelectItem>
                <SelectItem value="development">Development Team</SelectItem>
                <SelectItem value="marketing">Marketing Team</SelectItem>
                <SelectItem value="sales">Sales Team</SelectItem>
                <SelectItem value="operations">Operations Team</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Project Lead */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="lead" className="text-left sm:text-right text-white">
              Lead
            </Label>
            <Select>
              <SelectTrigger className="col-span-1 sm:col-span-3 bg-black/40 border border-white/20 text-white">
                <SelectValue placeholder="Select project lead" />
              </SelectTrigger>
              <SelectContent className="bg-[#1E1E2E] border-white/20 text-white">
                <SelectItem value="sojib">Sojib (You)</SelectItem>
                <SelectItem value="alex">Alex Johnson</SelectItem>
                <SelectItem value="maria">Maria Garcia</SelectItem>
                <SelectItem value="sarah">Sarah Williams</SelectItem>
                <SelectItem value="mike">Mike Chen</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="border-t border-white/10 pt-4 mt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!selectedTemplate}
            className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button disabled:opacity-60"
          >
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
