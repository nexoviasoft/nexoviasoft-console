"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, AlertTriangle, Star, UserPlus, PartyPopper, Rocket } from "lucide-react";

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

export default function TemplateList({ onSelectTemplate }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Email Templates</h3>
      {templates.map((template) => (
        <Card 
          key={template.id}
          className="cursor-pointer hover:bg-gray-50 transition-colors border-l-4 border-l-purple-500"
          onClick={() => onSelectTemplate(template)}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <template.icon className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm text-gray-900">{template.title}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 truncate">{template.subject}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
