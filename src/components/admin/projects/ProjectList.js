"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, CheckCircle2 } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern UI/UX",
    status: "In Progress",
    progress: 65,
    team: [
      { name: "Sarah J", avatar: "SJ" },
      { name: "Mike C", avatar: "MC" },
      { name: "Emily R", avatar: "ER" }
    ],
    dueDate: "2026-02-15",
    tasksCompleted: 13,
    totalTasks: 20
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Native iOS and Android app for customer portal",
    status: "In Progress",
    progress: 40,
    team: [
      { name: "David K", avatar: "DK" },
      { name: "Lisa A", avatar: "LA" }
    ],
    dueDate: "2026-03-01",
    tasksCompleted: 8,
    totalTasks: 20
  },
  {
    id: 3,
    name: "API Integration",
    description: "Integrate third-party payment and analytics APIs",
    status: "Planning",
    progress: 15,
    team: [
      { name: "John D", avatar: "JD" },
      { name: "Anna M", avatar: "AM" }
    ],
    dueDate: "2026-02-28",
    tasksCompleted: 3,
    totalTasks: 20
  },
  {
    id: 4,
    name: "Database Migration",
    description: "Migrate from PostgreSQL to MongoDB for better scalability",
    status: "Completed",
    progress: 100,
    team: [
      { name: "Tom W", avatar: "TW" }
    ],
    dueDate: "2026-01-10",
    tasksCompleted: 15,
    totalTasks: 15
  }
];

export default function ProjectList({ onSelectProject }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700";
      case "In Progress": return "bg-blue-100 text-blue-700";
      case "Planning": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">All Projects</h2>
          <p className="text-gray-500">Select a project to view details and manage tasks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card 
            key={project.id}
            className="cursor-pointer hover:shadow-lg transition-all border-l-4 border-l-purple-500"
            onClick={() => onSelectProject(project)}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{project.tasksCompleted}/{project.totalTasks} tasks</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{project.dueDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t">
                <Users className="w-4 h-4 text-gray-400" />
                <div className="flex -space-x-2">
                  {project.team.map((member, idx) => (
                    <Avatar key={idx} className="h-8 w-8 border-2 border-white">
                      <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
