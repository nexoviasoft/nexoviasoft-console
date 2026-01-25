"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  MoreVertical,
  Plus,
  Send,
  Tag,
  Trash2,
  User,
  Users,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Mock data to simulate fetching
const getTask = (id) => {
  return {
    id: id,
    title: "Design Homepage Mockup",
    desc: "Create initial design concepts and wireframes for the new homepage. Focus on modern aesthetics and user experience.",
    priority: "high",
    assignees: ["SJ", "MC"],
    status: "In Progress",
    dueDate: "2024-03-15",
    comments: [
      { id: 1, author: "Sarah Jones", text: "Make sure to include the new branding colors.", time: "2h ago", initials: "SJ" },
      { id: 2, author: "Mike Chen", text: "I'll start on the wireframes tomorrow.", time: "1h ago", initials: "MC" },
    ],
  };
};

const priorities = [
  { value: "high", label: "High", color: "text-red-400 bg-red-400/10" },
  { value: "medium", label: "Medium", color: "text-orange-400 bg-orange-400/10" },
  { value: "low", label: "Low", color: "text-green-400 bg-green-400/10" },
];

const assigneesList = ["SJ", "MC", "ER", "DK", "LA", "JD"];

export default function TaskDetailsPage({ params }) {
  const router = useRouter();
  const [task, setTask] = useState(getTask(params.taskId));
  const [newComment, setNewComment] = useState("");

  const handlePriorityChange = (value) => {
    setTask({ ...task, priority: value });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      author: "You",
      text: newComment,
      time: "Just now",
      initials: "YO",
    };
    setTask({ ...task, comments: [...task.comments, comment] });
    setNewComment("");
  };

  const handleToggleAssignee = (initials) => {
    if (task.assignees.includes(initials)) {
      setTask({ ...task, assignees: task.assignees.filter((a) => a !== initials) });
    } else {
      setTask({ ...task, assignees: [...task.assignees, initials] });
    }
  };

  const currentPriority = priorities.find(p => p.value === task.priority) || priorities[2];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header content */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-white/70 hover:text-[#EFFC76] hover:bg-white/5"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Board
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Title & Description */}
            <div className="space-y-4">
              <Input
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                className="text-3xl font-bold bg-transparent border-none p-0 h-auto focus-visible:ring-0 placeholder:text-white/20"
                placeholder="Task Title"
              />
              <div className="space-y-2">
                <label className="text-sm text-white/50 font-medium ml-1">Description</label>
                <Textarea
                  value={task.desc}
                  onChange={(e) => setTask({ ...task, desc: e.target.value })}
                  className="bg-white/5 border-white/10 min-h-[150px] resize-none focus-visible:ring-[#EFFC76]/50"
                  placeholder="Add a more detailed description..."
                />
              </div>
            </div>

            {/* Comments */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-lg font-semibold border-b border-white/10 pb-2">
                <MessageSquare className="w-5 h-5 text-[#EFFC76]" />
                <h3>Comments</h3>
                <span className="text-sm text-white/50 bg-white/10 px-2 py-0.5 rounded-full">{task.comments.length}</span>
              </div>

              <div className="space-y-4">
                {task.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4 group">
                    <Avatar className="w-8 h-8 border border-white/20">
                      <AvatarFallback className="bg-[#EFFC76]/10 text-[#EFFC76] text-xs">
                        {comment.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-white/40">{comment.time}</span>
                      </div>
                      <p className="text-sm text-white/80 bg-white/5 p-3 rounded-lg rounded-tl-none border border-white/5">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 items-start">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-white/10 text-white/50">YO</AvatarFallback>
                </Avatar>
                <div className="flex-1 gap-2 flex flex-col">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="min-h-[80px] bg-white/5 border-white/10 focus-visible:ring-[#EFFC76]/50"
                    />
                    <div className="flex justify-end">
                        <Button
                          onClick={handleAddComment}
                          className="bg-[#EFFC76] text-black hover:bg-[#dce865]"
                          size="sm"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Comment
                        </Button>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4 space-y-6">
                
                {/* Status */}
                <div className="space-y-2">
                   <div className="flex items-center gap-2 text-sm text-white/60 mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Status</span>
                   </div>
                   <Select 
                    value={task.status} 
                    onValueChange={(value) => setTask({ ...task, status: value })}
                   >
                    <SelectTrigger className="bg-white/5 border-white/10 focus:ring-[#EFFC76]/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                      {[
                        "To-Do", 
                        "In Progress", 
                        "Review", 
                        "Complete",
                        "Brief", // Example custom
                        "In Design" // Example custom
                      ].map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="bg-white/10" />

                {/* Priority */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-white/60 mb-1">
                    <Tag className="w-4 h-4" />
                    <span>Priority</span>
                  </div>
                  <Select value={task.priority} onValueChange={handlePriorityChange}>
                    <SelectTrigger className="bg-white/5 border-white/10 focus:ring-[#EFFC76]/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                      {priorities.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${p.color.split(' ')[0]}`} />
                            {p.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="bg-white/10" />

                {/* Assignees */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-white/60 mb-1">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Assignees</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {task.assignees.map((assignee) => (
                        <div key={assignee} className="flex items-center gap-1.5 bg-white/10 pr-2 pl-1 py-1 rounded-full border border-white/10">
                            <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-[10px] bg-[#EFFC76]/20 text-[#EFFC76]">
                                    {assignee}
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{assignee}</span>
                            <button onClick={() => handleToggleAssignee(assignee)} className="hover:text-red-400">
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                    <Select onValueChange={handleToggleAssignee}>
                        <SelectTrigger className="w-6 h-6 rounded-full p-0 bg-transparent border-dashed border-white/30 hover:border-[#EFFC76] text-white/50 hover:text-[#EFFC76] flex items-center justify-center">
                             <Plus className="w-4 h-4" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                             {assigneesList.filter(a => !task.assignees.includes(a)).map(a => (
                                 <SelectItem key={a} value={a}>{a}</SelectItem>
                             ))}
                        </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                {/* Due Date */}
                <div className="space-y-2">
                   <div className="flex items-center gap-2 text-sm text-white/60 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>Due Date</span>
                   </div>
                   <Button variant="outline" className="w-full justify-start text-left font-normal bg-white/5 border-white/10 hover:bg-white/10 hover:text-white">
                     <Clock className="mr-2 h-4 w-4 opacity-50" />
                     {task.dueDate}
                   </Button>
                </div>

              </CardContent>
            </Card>

             <div className="text-xs text-white/30 text-center">
                Task created on Jan 20, 2024
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
