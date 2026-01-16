"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, AtSign } from "lucide-react";
import { toast } from "sonner";

const employees = [
  { id: 1, name: "Sarah Johnson", username: "sarah.j" },
  { id: 2, name: "Mike Chen", username: "mike.c" },
  { id: 3, name: "Emily Rodriguez", username: "emily.r" },
  { id: 4, name: "David Kim", username: "david.k" },
  { id: 5, name: "Lisa Anderson", username: "lisa.a" }
];

const initialComments = [
  {
    id: 1,
    author: "Sarah Johnson",
    content: "Great progress on the UI components! @mike.c can you review the design system?",
    timestamp: "2026-01-15 10:30 AM",
    mentions: ["mike.c"]
  },
  {
    id: 2,
    author: "Mike Chen",
    content: "@sarah.j Looks good! I've approved the PR. @emily.r please test on mobile devices.",
    timestamp: "2026-01-15 11:45 AM",
    mentions: ["sarah.j", "emily.r"]
  }
];

export default function ProjectComments({ projectId }) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleCommentChange = (e) => {
    const value = e.target.value;
    const cursor = e.target.selectionStart;
    setNewComment(value);
    setCursorPosition(cursor);

    // Check if user is typing @mention
    const lastAtIndex = value.lastIndexOf('@', cursor - 1);
    if (lastAtIndex !== -1 && cursor > lastAtIndex) {
      const searchTerm = value.substring(lastAtIndex + 1, cursor);
      if (!searchTerm.includes(' ')) {
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
    const lastAtIndex = newComment.lastIndexOf('@', cursorPosition - 1);
    const before = newComment.substring(0, lastAtIndex);
    const after = newComment.substring(cursorPosition);
    setNewComment(`${before}@${username} ${after}`);
    setShowMentions(false);
  };

  const handleSubmit = () => {
    if (newComment.trim()) {
      const mentions = newComment.match(/@(\w+\.?\w+)/g)?.map(m => m.substring(1)) || [];
      const comment = {
        id: comments.length + 1,
        author: "Current User",
        content: newComment,
        timestamp: new Date().toLocaleString(),
        mentions
      };
      setComments([...comments, comment]);
      setNewComment("");
      toast.success("Comment posted!");
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.username.toLowerCase().includes(mentionSearch.toLowerCase()) ||
    emp.name.toLowerCase().includes(mentionSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder="Add a comment... Use @ to mention team members"
                value={newComment}
                onChange={handleCommentChange}
                rows={3}
                className="resize-none"
              />
              {showMentions && filteredEmployees.length > 0 && (
                <Card className="absolute z-10 w-64 mt-1 shadow-lg">
                  <CardContent className="p-2">
                    {filteredEmployees.slice(0, 5).map((emp) => (
                      <div
                        key={emp.id}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => handleMentionSelect(emp.username)}
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                            {emp.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{emp.name}</div>
                          <div className="text-xs text-gray-500">@{emp.username}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <AtSign className="w-4 h-4" />
                <span>Use @ to mention team members</span>
              </div>
              <Button onClick={handleSubmit} className="gap-2">
                <Send className="w-4 h-4" />
                Post Comment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Comments ({comments.length})</h3>
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarFallback className="bg-purple-100 text-purple-600">
                    {comment.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{comment.author}</span>
                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {comment.content.split(/(@\w+\.?\w+)/g).map((part, idx) => 
                      part.startsWith('@') ? (
                        <span key={idx} className="text-purple-600 font-medium">{part}</span>
                      ) : (
                        <span key={idx}>{part}</span>
                      )
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
