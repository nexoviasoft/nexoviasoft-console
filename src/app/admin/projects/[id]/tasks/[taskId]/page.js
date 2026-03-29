"use client";

import React, { useState, use, useEffect } from "react";
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
  Briefcase,
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
import { useGetTaskByIdQuery, useUpdateTaskMutation } from "@/api/admin/projects/tasksApi";
import { useCreateTaskCommentMutation } from "@/api/admin/projects/taskCommentsApi";
import { useGetOurTeamQuery } from "@/api/admin/our-team/ourTeamApi";
import { useGetDepartmentsQuery } from "@/api/landing/department/departmentApi";
import { toast } from "sonner";
import AppLayout from "@/components/layout/AppLayout";
import { useAuth } from "@/contexts/AuthContext";

const priorities = [
  { value: "high", label: "High", color: "text-red-400 bg-red-400/10" },
  { value: "medium", label: "Medium", color: "text-orange-400 bg-orange-400/10" },
  { value: "low", label: "Low", color: "text-green-400 bg-green-400/10" },
];

export default function TaskDetailsPage({ params }) {
  const router = useRouter();
  const { id: projectId, taskId } = use(params);
  const { data: taskResponse, isLoading, error } = useGetTaskByIdQuery(Number(taskId));
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [createTaskComment, { isLoading: isCreatingComment }] = useCreateTaskCommentMutation();
  const { user } = useAuth();
  const currentUserName = user ? `${user.firstName} ${user.lastName}` : "Unknown User";

  // Fetch team members and departments
  const { data: teamMembersResponse } = useGetOurTeamQuery();
  const { data: departmentsResponse } = useGetDepartmentsQuery();

  // Extract data from API responses
  const task = Array.isArray(taskResponse)
    ? taskResponse[0]
    : (taskResponse?.data || taskResponse);

  const teamMembers = Array.isArray(teamMembersResponse)
    ? teamMembersResponse
    : (teamMembersResponse?.data || []);

  const departments = Array.isArray(departmentsResponse)
    ? departmentsResponse
    : (departmentsResponse?.data || []);

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [localTitle, setLocalTitle] = useState("");
  const [localDescription, setLocalDescription] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [replyTo, setReplyTo] = useState(null); // { id, author }

  // Update local state when task data changes
  useEffect(() => {
    if (task) {
      setLocalTitle(task.title || "");
      setLocalDescription(task.description || task.desc || "");
      if (task?.comments && Array.isArray(task.comments)) {
        setComments(task.comments);
      }
      // Set selected department based on team name
      if (task.team && departments.length > 0) {
        const dept = departments.find(d => d.name === task.team);
        if (dept) setSelectedDepartmentId(String(dept.id));
      }
    }
  }, [task, departments]);

  // Create assignees list from team members (format: initials)
  const availableMembers = React.useMemo(() => {
    let filtered = teamMembers;
    if (selectedDepartmentId) {
      filtered = teamMembers.filter(m => m.departmentId === Number(selectedDepartmentId));
    }
    return filtered.map((member) => {
      const initials = (member.firstName?.[0] || '') + (member.lastName?.[0] || '') || 'TM';
      return {
        id: member.id,
        initials,
        name: `${member.firstName} ${member.lastName}`,
        fullName: `${member.firstName} ${member.lastName}`,
      };
    });
  }, [teamMembers, selectedDepartmentId]);

  // Create teams list from departments (department names)
  const teamsList = React.useMemo(() => {
    return departments.map((dept) => dept.name);
  }, [departments]);

  // Get current assignees as initials array
  const currentAssignees = React.useMemo(() => {
    if (!task?.assignees || !Array.isArray(task.assignees)) return [];
    return task.assignees;
  }, [task]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white p-4 md:p-8 flex items-center justify-center">
        <div className="text-white/60">Loading task...</div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="min-h-screen bg-black text-white p-4 md:p-8 flex items-center justify-center">
        <div className="text-red-400">Failed to load task</div>
      </div>
    );
  }

  const handlePriorityChange = async (value) => {
    try {
      await updateTask({
        id: Number(taskId),
        priority: value,
        projectId: Number(projectId),
      }).unwrap();
      toast.success("Priority updated");
    } catch (error) {
      console.error("Failed to update priority:", error);
      toast.error("Failed to update priority");
    }
  };

  const handleStatusChange = async (status) => {
    try {
      await updateTask({
        id: Number(taskId),
        status,
        projectId: Number(projectId),
      }).unwrap();
      toast.success("Status updated");
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const result = await createTaskComment({
        taskId: Number(taskId),
        author: currentUserName,
        content: newComment.trim(),
        parentId: replyTo?.id || null,
      }).unwrap();

      setComments(prev => [...prev, result]);
      setNewComment("");
      setReplyTo(null);
      toast.success("Comment added");
    } catch (error) {
      console.error("Failed to add comment:", error);
      toast.error("Failed to add comment");
    }
  };

  const handleToggleAssignee = async (initials) => {
    const isAssigned = currentAssignees.includes(initials);
    const newAssignees = isAssigned
      ? currentAssignees.filter(a => a !== initials)
      : [...currentAssignees, initials];

    try {
      await updateTask({
        id: Number(taskId),
        assignees: newAssignees,
        projectId: Number(projectId),
      }).unwrap();
      toast.success(isAssigned ? "Assignee removed" : "Assignee added");
    } catch (error) {
      console.error("Failed to update assignees:", error);
      toast.error("Failed to update assignees");
    }
  };

  const currentPriority = priorities.find(p => p.value === task.priority) || priorities[2];

  return (

    <AppLayout>
      <div className="min-h-screen bg-black text-white p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header content */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-white/70 hover:text-[#F58220] hover:bg-white/5"
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
                  value={localTitle}
                  onChange={(e) => setLocalTitle(e.target.value)}
                  onBlur={async (e) => {
                    if (e.target.value !== task.title) {
                      try {
                        await updateTask({
                          id: Number(taskId),
                          title: e.target.value,
                          projectId: Number(projectId),
                        }).unwrap();
                      } catch (error) {
                        console.error("Failed to update title:", error);
                        setLocalTitle(task.title || "");
                      }
                    }
                  }}
                  className="text-3xl font-bold bg-transparent border-none p-0 h-auto focus-visible:ring-0 placeholder:text-white/20"
                  placeholder="Task Title"
                  disabled={isUpdating}
                />
                <div className="space-y-2">
                  <label className="text-sm text-white/50 font-medium ml-1">Description</label>
                  <Textarea
                    value={localDescription}
                    onChange={(e) => setLocalDescription(e.target.value)}
                    onBlur={async (e) => {
                      if (e.target.value !== (task.description || task.desc)) {
                        try {
                          await updateTask({
                            id: Number(taskId),
                            description: e.target.value,
                            projectId: Number(projectId),
                          }).unwrap();
                        } catch (error) {
                          console.error("Failed to update description:", error);
                          setLocalDescription(task.description || task.desc || "");
                        }
                      }
                    }}
                    className="bg-white/5 border-white/10 min-h-[150px] resize-none focus-visible:ring-[#F58220]/50"
                    placeholder="Add a more detailed description..."
                    disabled={isUpdating}
                  />
                </div>
              </div>

              {/* Comments */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-lg font-semibold border-b border-white/10 pb-2">
                  <MessageSquare className="w-5 h-5 text-[#F58220]" />
                  <h3>Comments</h3>
                  <span className="text-sm text-white/50 bg-white/10 px-2 py-0.5 rounded-full">{comments.length}</span>
                </div>

                <div className="space-y-4">
                  {comments.length === 0 ? (
                    <p className="text-sm text-white/50">No comments yet. Start the discussion.</p>
                  ) : (
                    comments.map((comment) => {
                      const authorName = comment.author || "Unknown";
                      const initials = authorName.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
                      return (
                        <div key={comment.id} className="flex gap-4 group">
                          <Avatar className="w-8 h-8 border border-white/20">
                            <AvatarFallback className="bg-[#F58220]/10 text-[#F58220] text-xs">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">{authorName}</span>
                              {comment.createdAt && (
                                <span className="text-xs text-white/40">
                                  {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            {comment.parentId && (
                              <div className="text-[10px] text-[#F58220] flex items-center gap-1 mb-1">
                                <MessageSquare className="w-2.5 h-2.5" />
                                <span>In reply to {comments.find(c => c.id === comment.parentId)?.author || 'deleted comment'}</span>
                              </div>
                            )}
                            <p className="text-sm text-white/80 bg-white/5 p-3 rounded-lg rounded-tl-none border border-white/5">
                              {comment.content || comment.text}
                            </p>
                            <button 
                              onClick={() => {
                                setReplyTo({ id: comment.id, author: authorName });
                                document.getElementById('comment-textarea')?.focus();
                              }}
                              className="text-[10px] text-white/40 hover:text-[#F58220] transition-colors mt-1 ml-1"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="flex gap-3 items-start relative pt-4">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-white/10 text-white/50">{(user?.firstName?.[0] || 'U') + (user?.lastName?.[0] || 'U')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 gap-2 flex flex-col">
                    {replyTo && (
                      <div className="flex items-center justify-between bg-[#F58220]/10 border border-[#F58220]/20 px-3 py-1.5 rounded-t-lg -mb-2 text-xs">
                        <span className="text-white/70">Replying to <span className="text-[#F58220] font-semibold">{replyTo.author}</span></span>
                        <button onClick={() => setReplyTo(null)} className="text-white/40 hover:text-white">✕</button>
                      </div>
                    )}
                    <Textarea
                      id="comment-textarea"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder={replyTo ? `Write a reply...` : "Write a comment..."}
                      className={`min-h-[80px] bg-white/5 border-white/10 focus-visible:ring-[#F58220]/50 ${replyTo ? 'rounded-t-none border-t-0' : ''}`}
                    />
                    <div className="flex justify-end">
                      <Button
                        onClick={handleAddComment}
                        className="bg-[#F58220] text-black hover:bg-[#dce865]"
                        size="sm"
                        disabled={!newComment.trim() || isCreatingComment}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {isCreatingComment ? "Adding..." : "Comment"}
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
                      value={task.status || "todo"}
                      onValueChange={handleStatusChange}
                      disabled={isUpdating}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 focus:ring-[#F58220]/50">
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
                    <Select value={task.priority || "medium"} onValueChange={handlePriorityChange} disabled={isUpdating}>
                      <SelectTrigger className="bg-white/5 border-white/10 focus:ring-[#F58220]/50">
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

                  {/* Team */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-white/60 mb-1">
                      <Briefcase className="w-4 h-4" />
                      <span>Team</span>
                    </div>
                    <Select
                      value={task.team}
                      onValueChange={async (value) => {
                        try {
                          await updateTask({
                            id: Number(taskId),
                            team: value,
                            projectId: Number(projectId),
                          }).unwrap();
                          
                          // Update department ID for filtering
                          const dept = departments.find(d => d.name === value);
                          if (dept) setSelectedDepartmentId(String(dept.id));
                          
                          toast.success("Team updated");
                        } catch (error) {
                          console.error("Failed to update team:", error);
                          toast.error("Failed to update team");
                        }
                      }}
                      disabled={isUpdating}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 focus:ring-[#F58220]/50">
                        <SelectValue placeholder="Select Team" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                        {teamsList.map((team) => (
                          <SelectItem key={team} value={team}>
                            {team}
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
                      {currentAssignees.map((assigneeInitials) => {
                        const member = availableMembers.find(m => m.initials === assigneeInitials);
                        return (
                          <div key={assigneeInitials} className="flex items-center gap-1.5 bg-white/10 pr-2 pl-1 py-1 rounded-full border border-white/10">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-[10px] bg-[#F58220]/20 text-[#F58220]">
                                {assigneeInitials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs" title={member?.fullName}>{assigneeInitials}</span>
                            <button
                              onClick={() => handleToggleAssignee(assigneeInitials)}
                              className="hover:text-red-400"
                              disabled={isUpdating}
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}
                      <Select
                        onValueChange={handleToggleAssignee}
                        disabled={isUpdating}
                      >
                        <SelectTrigger className="w-6 h-6 rounded-full p-0 bg-transparent border-dashed border-white/30 hover:border-[#F58220] text-white/50 hover:text-[#F58220] flex items-center justify-center">
                          <Plus className="w-4 h-4" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                          {availableMembers
                            .filter(m => !currentAssignees.includes(m.initials))
                            .map(member => (
                              <SelectItem key={member.id} value={member.initials} title={member.fullName}>
                                {member.initials} - {member.name}
                              </SelectItem>
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
                    <Input
                      type="date"
                      value={task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ""}
                      onChange={async (e) => {
                        try {
                          await updateTask({
                            id: Number(taskId),
                            dueDate: e.target.value,
                            projectId: Number(projectId),
                          }).unwrap();
                          toast.success("Due date updated");
                        } catch (error) {
                          console.error("Failed to update due date:", error);
                          toast.error("Failed to update due date");
                        }
                      }}
                      className="bg-white/5 border-white/10 text-white [color-scheme:dark]"
                      disabled={isUpdating}
                    />
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

    </AppLayout>
  );
}
