"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Paperclip, MessageSquare, ThumbsUp } from "lucide-react";

const broadcasts = [
  {
    id: 1,
    sender: { name: "Dipa Inhouse", avatar: "/avatars/01.png", role: "Admin" },
    subject: "Q1 Town Hall Meeting Summary",
    content: "Hi Team, thanks for attending today's town hall. Here is the summary of what we discussed regarding the new product roadmap and quarterly goals...",
    date: "2 hours ago",
    readRate: 94,
    attachments: 2,
    comments: 12,
    likes: 45,
    tag: "Important"
  },
  {
    id: 2,
    sender: { name: "Jane Cooper", avatar: "/avatars/02.png", role: "HR Manager" },
    subject: "Upcoming Holiday Schedule",
    content: "Please note that the office will be closed next Monday for the national holiday. Ensure you have consolidated your timesheets by Friday...",
    date: "Yesterday",
    readRate: 88,
    attachments: 0,
    comments: 5,
    likes: 32,
    tag: "HR"
  },
  {
    id: 3,
    sender: { name: "Cody Fisher", avatar: "/avatars/06.png", role: "IT Support" },
    subject: "System Maintenance Notification",
    content: "We will be performing scheduled maintenance on the main server this Saturday from 10 PM to 2 AM. Services may be intermittent...",
    date: "Jan 12, 2026",
    readRate: 76,
    attachments: 0,
    comments: 2,
    likes: 15,
    tag: "System"
  },
];

export default function BroadcastFeed() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Announcements</h2>
      {broadcasts.map((post) => (
        <Card key={post.id} className="shadow-sm border-gray-100 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-10 h-10 border border-gray-100">
                <AvatarImage src={post.sender.avatar} />
                <AvatarFallback>{post.sender.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div>
                     <h3 className="text-md font-semibold text-gray-900 flex items-center gap-2">
                       {post.subject}
                       <Badge variant="secondary" className="text-xs font-normal bg-gray-100 text-gray-600">{post.tag}</Badge>
                     </h3>
                     <p className="text-sm text-gray-500">
                       <span className="font-medium text-gray-700">{post.sender.name}</span> • {post.date}
                     </p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.content}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                   <div className="flex items-center gap-4 text-sm text-gray-500">
                     <span className="flex items-center gap-1.5 hover:text-gray-900 cursor-pointer">
                        <ThumbsUp className="w-4 h-4" /> {post.likes}
                     </span>
                     <span className="flex items-center gap-1.5 hover:text-gray-900 cursor-pointer">
                        <MessageSquare className="w-4 h-4" /> {post.comments}
                     </span>
                     {post.attachments > 0 && (
                       <span className="flex items-center gap-1.5 hover:text-gray-900 cursor-pointer">
                          <Paperclip className="w-4 h-4" /> {post.attachments}
                       </span>
                     )}
                   </div>
                   
                   <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
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
