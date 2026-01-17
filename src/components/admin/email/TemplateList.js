"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, FileText, AlertTriangle, Star, UserPlus, PartyPopper, Rocket, Search, ChevronLeft, ChevronRight } from "lucide-react";

const templates = [
  {
    id: "meeting-reminder",
    title: "Meeting Reminder",
    icon: Calendar,
    category: "Scheduling",
    subject: "Reminder: Team Sync at [Time]",
    body: `Hi Team,

This is a friendly reminder about our upcoming meeting:

📅 Date: [Date]
⏰ Time: [Time]
📍 Location: [Meeting Room/Link]

Agenda:
- [Topic 1]
- [Topic 2]
- [Topic 3]

Please come prepared with your updates.

Best regards,
[Your Name]`
  },
  {
    id: "project-update",
    title: "Project Update",
    icon: FileText,
    category: "Updates",
    subject: "Weekly Status Report - [Project Name]",
    body: `Hello Team,

Here's the weekly status update for [Project Name]:

✅ Completed This Week:
- [Task 1]
- [Task 2]

🚧 In Progress:
- [Task 3]
- [Task 4]

⚠️ Blockers:
- [Issue if any]

📊 Overall Progress: [X]%

Next week's focus: [Goals]

Thanks,
[Your Name]`
  },
  {
    id: "server-alert",
    title: "Server Alert",
    icon: AlertTriangle,
    category: "Critical",
    subject: "🚨 URGENT: Server Downtime Detected",
    body: `URGENT ALERT

We have detected an issue with our server infrastructure:

🔴 Status: [Service Name] is currently DOWN
⏱️ Started: [Time]
🎯 Impact: [Affected Services]
👥 Users Affected: [Number/All]

Our team is actively investigating and working on a resolution.

Current Actions:
- [Action 1]
- [Action 2]

We will provide updates every [X] minutes.

Incident Response Team
[Your Name]`
  },
  {
    id: "performance-review",
    title: "Performance Review",
    icon: Star,
    category: "HR",
    subject: "Upcoming Performance Review - [Employee Name]",
    body: `Dear [Employee Name],

This is to inform you that your performance review is scheduled:

📅 Date: [Date]
⏰ Time: [Time]
👤 Reviewer: [Manager Name]
📍 Location: [Room/Virtual Link]

Please prepare:
- Self-assessment form
- Key achievements from the past quarter
- Goals for next quarter
- Any questions or concerns

Looking forward to our discussion.

Best regards,
[Manager Name]
HR Department`
  },
  {
    id: "welcome-new-hire",
    title: "Welcome New Hire",
    icon: UserPlus,
    category: "Onboarding",
    subject: "Welcome to the team, [Name]! 🎉",
    body: `Dear [Name],

Welcome to [Company Name]! We're thrilled to have you join our team as [Position].

🎯 Your First Day:
📅 Date: [Start Date]
⏰ Time: [Time]
📍 Report to: [Location/Person]

What to Expect:
- Office tour and workspace setup
- IT equipment and access provisioning
- Team introductions
- Orientation session

What to Bring:
- Valid ID
- Signed offer letter
- [Other documents]

Your buddy: [Buddy Name] will help you get settled in.

We're excited to have you on board!

Best regards,
[HR Manager]`
  },
  {
    id: "holiday-announcement",
    title: "Holiday Announcement",
    icon: PartyPopper,
    category: "Announcements",
    subject: "Office Closure: [Holiday] Schedule",
    body: `Dear Team,

This is to inform you about our upcoming holiday schedule:

🎉 Holiday: [Holiday Name]
📅 Office Closed: [Date Range]
🔄 Resuming: [Date]

Important Notes:
- All pending tasks should be completed by [Date]
- Emergency contact: [Name] at [Phone/Email]
- Out-of-office messages should be set up
- Client deliverables: [Special instructions]

For urgent matters during the holiday:
📞 Emergency Hotline: [Number]
📧 Emergency Email: [Email]

Enjoy your time off!

Best regards,
[Management]`
  },
  {
    id: "deploy-successful",
    title: "Deployment Success",
    icon: Rocket,
    category: "DevOps",
    subject: "✅ Deployment Notification: Release [Version] Live",
    body: `Hi Team,

Great news! We've successfully deployed Release [Version] to production.

🚀 Deployment Details:
- Version: [Version Number]
- Environment: Production
- Deployed at: [Timestamp]
- Deployed by: [Name]

✨ What's New:
- [Feature 1]
- [Feature 2]
- [Bug Fix 1]

📊 Deployment Stats:
- Duration: [X] minutes
- Status: ✅ Successful
- Rollback Plan: Ready if needed

🔍 Monitoring:
- All systems operational
- Performance metrics: Normal
- Error rates: Within threshold

Please monitor your areas and report any issues immediately.

DevOps Team
[Your Name]`
  }
];

const ITEMS_PER_PAGE = 3;

export default function TemplateList({ onSelectTemplate }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter templates based on search
  const filteredTemplates = templates.filter(template =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTemplates = filteredTemplates.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="space-y-4">
      {/* Header with Search */}
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-gray-900">Email Templates</h3>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 glass-card border-white/20"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="space-y-3">
        {paginatedTemplates.length > 0 ? (
          paginatedTemplates.map((template) => (
            <Card 
              key={template.id}
              className="glass-card cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all duration-200 border-l-4 border-l-purple-500 group"
              onClick={() => onSelectTemplate(template)}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl group-hover:from-purple-200 group-hover:to-purple-100 transition-colors">
                    <template.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {template.title}
                      </h4>
                      <Badge variant="secondary" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                        {template.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-1">{template.subject}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 glass-card rounded-xl">
            <p className="text-gray-500">No templates found matching "{searchQuery}"</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredTemplates.length)} of {filteredTemplates.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="glass-button"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium text-gray-700 px-3">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="glass-button"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
