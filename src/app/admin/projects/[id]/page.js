"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import ProjectDetails from "@/components/admin/projects/ProjectDetails";

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

export default function ProjectBoardPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id;

  const project = projects.find(
    (p) => String(p.id) === String(projectId)
  );

  if (!project) {
    return (
      <div className="bg-gray-50 px-8 py-6 min-h-screen flex items-center justify-center">
        <div className="space-y-4 text-center">
          <p className="text-gray-600 text-sm">Project not found.</p>
          <Button
            variant="outline"
            onClick={() => router.push("/admin/projects")}
          >
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 px-8 py-6 min-h-screen">
      <div className="max-w-[1400px] w-full mx-auto">
        <ProjectDetails
          project={project}
          onBack={() => router.push("/admin/projects")}
        />
      </div>
    </div>
  );
}

