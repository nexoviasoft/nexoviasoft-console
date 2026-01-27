"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Paperclip, MessageSquare, ThumbsUp } from "lucide-react";
import { useGetBroadcastsQuery } from "@/api/admin/broadcast/broadcastApi";

const fallbackBroadcasts = [];

function formatRelativeOrDate(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return "";

  const diffMs = Date.now() - d.getTime();
  const diffMin = Math.round(diffMs / 60000);
  if (diffMin < 60) return `${Math.max(diffMin, 1)} min ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hours ago`;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

export default function BroadcastFeed({ dashboard }) {
  const { data: broadcasts } = useGetBroadcastsQuery();

  const apiPosts = Array.isArray(broadcasts)
    ? broadcasts.map((b) => ({
        id: b.id,
        sender: {
          name: b?.sender?.name || "Admin",
          avatar: b?.sender?.avatar || "",
          role: b?.sender?.role || "",
        },
        subject: b.subject,
        content: b.content,
        createdAt: b.createdAt,
        readRate: typeof b.readRate === "number" ? b.readRate : 0,
        attachments: typeof b.attachments === "number" ? b.attachments : 0,
        comments: typeof b.comments === "number" ? b.comments : 0,
        likes: typeof b.likes === "number" ? b.likes : 0,
        tag: b.tag || "Announcement",
      }))
    : [];

  const posts =
    apiPosts.length > 0 ? apiPosts : dashboard?.recent?.length ? dashboard.recent : fallbackBroadcasts;

  return (
    <div className="space-y-4">
      <h2 className="text-base sm:text-lg font-semibold text-white mb-4">Recent Announcements</h2>
      {posts.length === 0 && (
        <div className="text-sm text-white/60 border border-white/10 rounded-lg p-4 bg-white/5">
          No announcements yet. Click “New Announcement” to create the first one.
        </div>
      )}
      {posts.map((post) => (
        <Card
          key={post.id}
          className="glass-card border-white/20 hover:bg-white/10 transition-all"
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border border-white/20">
                <AvatarImage src={post.sender.avatar} />
                <AvatarFallback>{post.sender.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1 sm:gap-0">
                  <div>
                    <h3 className="text-sm sm:text-md font-semibold text-white flex items-center gap-2 flex-wrap">
                      {post.subject}
                      <Badge
                        variant="secondary"
                        className="text-[10px] sm:text-xs font-normal bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/40"
                      >
                        {post.tag}
                      </Badge>
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60">
                      <span className="font-medium text-white/80">
                        {post.sender.name}
                      </span>{" "}
                      • {post.date || formatRelativeOrDate(post.createdAt)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white/60 hover:text-[#EFFC76] hover:bg-white/10 absolute top-4 right-4 sm:static"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2 mt-2 sm:mt-0">
                  {post.content}
                </p>

                <div className="flex flex-wrap items-center justify-between pt-4 border-t border-white/10 gap-3">
                  <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-white/60">
                    <span className="flex items-center gap-1.5 hover:text-[#EFFC76] cursor-pointer">
                      <ThumbsUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-[#EFFC76] cursor-pointer">
                      <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {post.comments}
                    </span>
                    {post.attachments > 0 && (
                      <span className="flex items-center gap-1.5 hover:text-[#EFFC76] cursor-pointer">
                        <Paperclip className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {post.attachments}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs font-medium text-white/70 bg-white/5 px-2 py-1 rounded-full border border-white/15">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400"></span>
                    {post.readRate}% Read
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
