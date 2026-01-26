"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, AtSign } from "lucide-react";
import { toast } from "sonner";
import { useGetProjectCommentsQuery, useCreateProjectCommentMutation } from "@/api/admin/projects/projectCommentsApi";
import { useGetOurTeamQuery } from "@/api/admin/our-team/ourTeamApi";

// Helper function to get current user name (placeholder - replace with actual auth context)
const getCurrentUserName = () => {
  // TODO: Replace with actual auth context
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('userName') || localStorage.getItem('user');
    if (stored) {
      try {
        const user = typeof stored === 'string' ? JSON.parse(stored) : stored;
        return user.name || user.firstName + ' ' + user.lastName || 'Current User';
      } catch {
        return stored || 'Current User';
      }
    }
  }
  return 'Current User';
};

export default function ProjectComments({ projectId, applicationType }) {
  // Fetch comments from API
  const { data: commentsResponse, isLoading: isLoadingComments, refetch: refetchComments } = useGetProjectCommentsQuery(
    Number(projectId),
    { skip: !projectId }
  );
  
  // Fetch team members for mentions
  const { data: teamMembersResponse } = useGetOurTeamQuery();
  
  // Create comment mutation
  const [createProjectComment, { isLoading: isCreatingComment }] = useCreateProjectCommentMutation();
  
  // Extract data from API responses
  const apiComments = Array.isArray(commentsResponse) 
    ? commentsResponse 
    : (commentsResponse?.data || []);
  
  const teamMembers = Array.isArray(teamMembersResponse) 
    ? teamMembersResponse 
    : (teamMembersResponse?.data || []);
  
  // Transform API comments to component format
  const transformedComments = useMemo(() => {
    if (!apiComments || !Array.isArray(apiComments)) {
      return [];
    }
    
    return apiComments.map(comment => ({
      id: comment.id,
      author: comment.author || 'Unknown',
      content: comment.content || '',
      timestamp: comment.createdAt 
        ? new Date(comment.createdAt).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : new Date().toLocaleString(),
      mentions: comment.mentions || [],
      createdAt: comment.createdAt,
    }));
  }, [apiComments]);
  
  // Transform team members for mentions
  const employees = useMemo(() => {
    return teamMembers.map(member => {
      const firstName = member.firstName || '';
      const lastName = member.lastName || '';
      const fullName = `${firstName} ${lastName}`.trim();
      // Create username from first name and last initial
      const username = `${firstName.toLowerCase()}.${lastName?.[0]?.toLowerCase() || ''}`;
      
      return {
        id: member.id,
        name: fullName || 'Team Member',
        username: username || `member.${member.id}`,
      };
    });
  }, [teamMembers]);
  
  // Use a ref to track the previous transformedComments to avoid infinite loops
  const prevTransformedCommentsRef = useRef();
  const [comments, setComments] = useState(() => {
    prevTransformedCommentsRef.current = transformedComments;
    return transformedComments;
  });
  const [newComment, setNewComment] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  
  // Update comments when API data changes - only if actually different
  useEffect(() => {
    const commentsString = JSON.stringify(transformedComments);
    const prevCommentsString = JSON.stringify(prevTransformedCommentsRef.current);
    if (commentsString !== prevCommentsString) {
      prevTransformedCommentsRef.current = transformedComments;
      setComments(transformedComments);
    }
  }, [transformedComments]);

  const getThemeColor = (type) => {
    switch (type) {
      case "Web Application":
        return {
          text: "text-purple-300",
          bg: "bg-purple-500/10",
          border: "border-purple-500/20",
          hoverBorder: "hover:border-purple-500/50",
          badge: "bg-purple-500/15 text-purple-300 border-purple-400/30",
          avatarBg: "bg-purple-500/20",
          avatarText: "text-purple-300",
          button: "bg-purple-500 hover:bg-purple-600 text-white",
          mention: "text-purple-300",
        };
      case "Mobile Application":
        return {
          text: "text-orange-300",
          bg: "bg-orange-500/10",
          border: "border-orange-500/20",
          hoverBorder: "hover:border-orange-500/50",
          badge: "bg-orange-500/15 text-orange-300 border-orange-400/30",
          avatarBg: "bg-orange-500/20",
          avatarText: "text-orange-300",
          button: "bg-orange-500 hover:bg-orange-600 text-white",
          mention: "text-orange-300",
        };
      case "Backend Service":
        return {
          text: "text-blue-300",
          bg: "bg-blue-500/10",
          border: "border-blue-500/20",
          hoverBorder: "hover:border-blue-500/50",
          badge: "bg-blue-500/15 text-blue-300 border-blue-400/30",
          avatarBg: "bg-blue-500/20",
          avatarText: "text-blue-300",
          button: "bg-blue-500 hover:bg-blue-600 text-white",
          mention: "text-blue-300",
        };
      case "Database Layer":
        return {
          text: "text-emerald-300",
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/20",
          hoverBorder: "hover:border-emerald-500/50",
          badge: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
          avatarBg: "bg-emerald-500/20",
          avatarText: "text-emerald-300",
          button: "bg-emerald-500 hover:bg-emerald-600 text-white",
          mention: "text-emerald-300",
        };
      default:
        return {
          text: "text-[#EFFC76]",
          bg: "bg-[#EFFC76]/10",
          border: "border-[#EFFC76]/20",
          hoverBorder: "hover:border-[#EFFC76]/50",
          badge: "bg-[#EFFC76]/15 text-[#EFFC76] border-[#EFFC76]/30",
          avatarBg: "bg-[#EFFC76]/20",
          avatarText: "text-[#EFFC76]",
          button: "bg-[#EFFC76] hover:bg-[#e0ef5f] text-black",
          mention: "text-[#EFFC76]",
        };
    }
  };

  const theme = getThemeColor(applicationType);

  const handleCommentChange = (e) => {
    const value = e.target.value;
    const cursor = e.target.selectionStart;
    setNewComment(value);
    setCursorPosition(cursor);

    // Check if user is typing @mention
    const lastAtIndex = value.lastIndexOf("@", cursor - 1);
    if (lastAtIndex !== -1 && cursor > lastAtIndex) {
      const searchTerm = value.substring(lastAtIndex + 1, cursor);
      if (!searchTerm.includes(" ")) {
        setMentionSearch(searchTerm);
        setShowMentions(true);
      } else {
        setShowMentions(false);
      }
    } else {
      setShowMentions(false);
    }
  };

  const handleMentionSelect = (username) => {
    const lastAtIndex = newComment.lastIndexOf("@", cursorPosition - 1);
    const before = newComment.substring(0, lastAtIndex);
    const after = newComment.substring(cursorPosition);
    setNewComment(`${before}@${username} ${after}`);
    setShowMentions(false);
  };

  const handleSubmit = async () => {
    if (!newComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    
    if (!projectId) {
      toast.error("Project ID is required");
      return;
    }
    
    try {
      // Extract mentions from comment text
      const mentions =
        newComment.match(/@(\w+\.?\w+)/g)?.map((m) => m.substring(1)) || [];
      
      const commentData = {
        projectId: Number(projectId),
        author: getCurrentUserName(),
        content: newComment.trim(),
        mentions: mentions.length > 0 ? mentions : undefined,
      };
      
      const result = await createProjectComment(commentData).unwrap();
      
      // Optimistically add to local state
      const newCommentObj = {
        id: result.id,
        author: result.author || getCurrentUserName(),
        content: result.content || newComment.trim(),
        timestamp: result.createdAt 
          ? new Date(result.createdAt).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          : new Date().toLocaleString(),
        mentions: result.mentions || mentions,
        createdAt: result.createdAt,
      };
      
      setComments([...comments, newCommentObj]);
      setNewComment("");
      setShowMentions(false);
      
      // Refetch comments to get latest data
      if (refetchComments) {
        await refetchComments();
      }
      
      toast.success("Comment posted!");
    } catch (error) {
      console.error("Failed to create comment:", error);
      toast.error("Failed to post comment. Please try again.");
    }
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.username.toLowerCase().includes(mentionSearch.toLowerCase()) ||
      emp.name.toLowerCase().includes(mentionSearch.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <Card className={`border ${theme.border} ${theme.bg}`}>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder="Add a comment... Use @ to mention team members"
                value={newComment}
                onChange={handleCommentChange}
                rows={3}
                className="resize-none bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/20"
              />
              {showMentions && filteredEmployees.length > 0 && (
                <Card className="absolute z-10 w-64 mt-1 shadow-lg bg-gray-900 border-white/10 text-white">
                  <CardContent className="p-2">
                    {filteredEmployees.slice(0, 5).map((emp) => (
                      <div
                        key={emp.id}
                        className="flex items-center gap-2 p-2 hover:bg-white/10 rounded cursor-pointer"
                        onClick={() => handleMentionSelect(emp.username)}
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarFallback
                            className={`${theme.avatarBg} ${theme.avatarText} text-xs`}
                          >
                            {emp.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium text-white">
                            {emp.name}
                          </div>
                          <div className="text-xs text-white/50">
                            @{emp.username}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-white/50">
                <AtSign className="w-4 h-4" />
                <span>Use @ to mention team members</span>
              </div>
              <Button
                onClick={handleSubmit}
                className={`gap-2 ${theme.button}`}
                disabled={isCreatingComment || !newComment.trim()}
              >
                <Send className="w-4 h-4" />
                {isCreatingComment ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-white">
          Comments ({comments.length})
        </h3>
        
        {isLoadingComments ? (
          <div className="text-white/50 text-sm py-4">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="text-white/50 text-sm py-4">No comments yet. Be the first to comment!</div>
        ) : (
          comments.map((comment) => (
          <Card
            key={comment.id}
            className={`border ${theme.border} bg-black/40`}
          >
            <CardContent className="p-3 md:p-4">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarFallback
                    className={`${theme.avatarBg} ${theme.avatarText}`}
                  >
                    {comment.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-white">
                      {comment.author}
                    </span>
                    <span className="text-xs text-white/40">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-white/80 whitespace-pre-wrap">
                    {comment.content.split(/(@\w+\.?\w+)/g).map((part, idx) =>
                      part.startsWith("@") ? (
                        <span
                          key={idx}
                          className={`${theme.mention} font-medium`}
                        >
                          {part}
                        </span>
                      ) : (
                        <span key={idx}>{part}</span>
                      ),
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          ))
        )}
      </div>
    </div>
  );
}
