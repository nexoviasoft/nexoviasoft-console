"use client";

import React from "react";
import { MoreHorizontal, MessageSquare, Paperclip, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const initialData = {
  backlog: [
    {
      id: "1",
      title: "Crypto - Project Brief Requirement",
      desc: "Please make a design according to the available brief",
      priority: "high",
      date: "May 1 - 3",
      comments: 2,
      assignees: ["/avatars/01.png"],
    },
    {
      id: "2",
      title: "Pricing Page Update",
      desc: "Customize the design with feedback",
      priority: "medium",
      date: "May 8 - 9",
      comments: 3,
      attachments: 1/3,
      assignees: ["/avatars/02.png"],
    },
  ],
  todo: [
    {
      id: "3",
      title: "Make Style Guide",
      priority: "high",
      image: "/images/style-guide-preview.jpg", // placeholder
      date: "May 5 - 6",
      comments: 5,
      assignees: ["/avatars/03.png", "/avatars/04.png"],
    },
    {
      id: "4",
      title: "Prototype",
      desc: "Make prototypes for all sections on the landing page",
      priority: "low",
      date: "May 5 - 6",
      comments: 2,
      attachments: 5,
      assignees: ["/avatars/01.png"],
    },
  ],
  inprogress: [
    {
      id: "5",
      title: "Illustration for Hero Section",
      desc: "Create illustrations with bright and detailed ornaments",
      priority: "medium",
      date: "May 3 - 4",
      checklist: "2/5",
      assignees: ["/avatars/02.png", "/avatars/03.png", "/avatars/01.png"],
    },
    {
      id: "6",
      title: "Create Icon for Benefit section",
      desc: "Create minimalist and bold icons for each section",
      priority: "high",
      date: "May 3 - 4",
      comments: 2,
      checklist: "3/5",
      assignees: ["/avatars/02.png", "/avatars/04.png"],
    },
    {
      id: "7",
      title: "Mockup for Mobile as well as for Laptop",
      desc: "use a mockup to make it look more realistic, use appropriate shapes",
      priority: "medium",
      date: "May 3 - 4",
      comments: 2,
      attachments: 5,
      assignees: ["/avatars/05.png"],
    },
  ],
  needsreview: [
    {
      id: "8",
      title: "Crypto Landingpage - Hero Section",
      desc: "Create a hero section using bright colors",
      priority: "low",
      date: "May 1 - 3",
      comments: 7,
      assignees: ["/avatars/01.png", "/avatars/04.png"],
    },
    {
      id: "9",
      title: "Crypto Landingpage - Testimonial Section",
      priority: "high",
      image: "/images/testimonial-preview.jpg",
      date: "May 1 - 3",
      checklist: "4/5",
      assignees: ["/avatars/02.png", "/avatars/03.png"],
    },
  ]
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    high: "bg-red-100 text-red-600 hover:bg-red-200",
    medium: "bg-orange-100 text-orange-600 hover:bg-orange-200",
    low: "bg-green-100 text-green-600 hover:bg-green-200",
  };
  
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles[priority] || styles.low}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
    </span>
  );
};

export default function KanbanBoard() {
  const columns = [
    { id: "backlog", title: "BACK_LOG", count: 2 },
    { id: "todo", title: "TO DO", count: 2 },
    { id: "inprogress", title: "IN PROGRESS", count: 3 },
    { id: "needsreview", title: "NEEDS REVIEW", count: 2 },
  ];

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 h-full items-start">
      {columns.map((col) => (
        <div key={col.id} className="w-80 shrink-0 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700 text-sm uppercase">{col.title}</span>
              <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">{col.count}</span>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {initialData[col.id].map((task) => (
            <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                   <h4 className="font-semibold text-gray-900 leading-tight">{task.title}</h4>
                </div>
                
                {task.desc && <p className="text-xs text-gray-500 line-clamp-2">{task.desc}</p>}
                
                {task.image && (
                   <div className="h-24 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg w-full mb-2"></div>
                )}
                
                <PriorityBadge priority={task.priority} />
                
                <div className="pt-2 flex items-center justify-between border-t border-gray-100 mt-2">
                   <div className="flex -space-x-2">
                     {task.assignees.map((src, i) => (
                       <Avatar key={i} className="w-6 h-6 border-2 border-white">
                         <AvatarImage src={src} />
                         <AvatarFallback>U{i}</AvatarFallback>
                       </Avatar>
                     ))}
                   </div>
                   
                   <div className="flex items-center gap-3 text-xs text-gray-400">
                     {task.date && <span>{task.date}</span>}
                     {task.comments && (
                       <div className="flex items-center gap-1">
                         <MessageSquare className="w-3 h-3" />
                         <span>{task.comments}</span>
                       </div>
                     )}
                     {(task.attachments || task.checklist) && (
                       <div className="flex items-center gap-1">
                         <Paperclip className="w-3 h-3" />
                         <span>{task.attachments || task.checklist}</span>
                       </div>
                     )}
                   </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <button className="flex items-center gap-2 text-gray-500 hover:text-purple-600 py-2 w-full justify-center border border-dashed border-gray-300 rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add Task</span>
          </button>
        </div>
      ))}
    </div>
  );
}
