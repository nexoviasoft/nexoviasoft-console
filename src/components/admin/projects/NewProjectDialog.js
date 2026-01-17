"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const projectTemplates = [
  { id: "scrum", name: "Scrum", description: "Designed for teams using time-boxed sprints to deliver incremental value." },
  { id: "kanban", name: "Kanban", description: "Ideal for managing a continuous flow of work with work-in-progress (WIP) limits." },
  { id: "bug_tracking", name: "Bug Tracking", description: "Used to capture, track, prioritize, and resolve software defects." },
  { id: "project_management", name: "Project Management", description: "General-purpose template for managing business projects and tasks." },
  { id: "devops", name: "DevOps", description: "Supports software development, deployment, monitoring, and operations workflows." },
  { id: "itsm", name: "IT Service Management (ITSM)", description: "For managing incidents, service requests, problems, and service delivery." },
  { id: "marketing", name: "Marketing", description: "Campaign management, content calendars, and lead tracking." },
  { id: "design", name: "Design", description: "UX/UI projects, creative workflows, and digital asset management." },
  { id: "hr", name: "Human Resources (HR)", description: "Employee onboarding, recruitment pipelines, and internal HR processes." },
  { id: "sales", name: "Sales", description: "Sales pipelines, opportunity tracking, and deal management." },
  { id: "operations", name: "Operations", description: "Procurement, process management, compliance, and policy tracking." },
  { id: "task_tracking", name: "Task Tracking", description: "Simple task organization for individuals or teams." },
  { id: "event_planning", name: "Event Planning", description: "Managing event timelines, responsibilities, and logistics." },
  { id: "fdd", name: "Feature-Driven Development (FDD)", description: "Organizing work around feature delivery." },
  { id: "tdd", name: "Test-Driven Development (TDD)", description: "Supporting test-first development workflows." },
  { id: "custom", name: "Custom Templates", description: "User-defined templates with custom fields, workflows, and boards." }
];

export default function NewProjectDialog({ open, onOpenChange }) {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const selectedTemplateData = projectTemplates.find(t => t.id === selectedTemplate);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Start a new project board. Select a template and fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Template Selection */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="template" className="text-right pt-2">
              Template
            </Label>
            <div className="col-span-3 space-y-2">
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a project template" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {projectTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedTemplateData && (
                <p className="text-xs text-gray-500 leading-relaxed">
                  {selectedTemplateData.description}
                </p>
              )}
            </div>
          </div>

          {/* Project Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" placeholder="E.g., Website Redesign" className="col-span-3" />
          </div>

          {/* Description */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea 
              id="description" 
              placeholder="Project goals and scope..." 
              className="col-span-3 min-h-[80px]" 
            />
          </div>

          {/* Team */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="team" className="text-right">
              Team
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="design">Design Team</SelectItem>
                <SelectItem value="development">Development Team</SelectItem>
                <SelectItem value="marketing">Marketing Team</SelectItem>
                <SelectItem value="sales">Sales Team</SelectItem>
                <SelectItem value="operations">Operations Team</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Project Lead */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lead" className="text-right">
              Lead
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select project lead" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sojib">Sojib (You)</SelectItem>
                <SelectItem value="alex">Alex Johnson</SelectItem>
                <SelectItem value="maria">Maria Garcia</SelectItem>
                <SelectItem value="sarah">Sarah Williams</SelectItem>
                <SelectItem value="mike">Mike Chen</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" disabled={!selectedTemplate}>Create Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
