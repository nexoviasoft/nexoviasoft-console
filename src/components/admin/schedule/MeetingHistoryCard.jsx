"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Clock, 
  Users, 
  Copy, 
  Check, 
  ExternalLink,
  Video 
} from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/lib/generateMeetingLink";
import { format, parseISO, isPast, isFuture } from "date-fns";

const STATUS_STYLES = {
  upcoming: {
    badge: "bg-blue-500/20 text-blue-300 border-blue-400/30",
    icon: "text-blue-400",
  },
  completed: {
    badge: "bg-green-500/20 text-green-300 border-green-400/30",
    icon: "text-green-400",
  },
  cancelled: {
    badge: "bg-red-500/20 text-red-300 border-red-400/30",
    icon: "text-red-400",
  },
};

export default function MeetingHistoryCard({ meeting }) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = async () => {
    const success = await copyToClipboard(meeting.meetingLink);
    if (success) {
      setCopiedLink(true);
      toast.success("Meeting link copied!");
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      toast.error("Failed to copy link");
    }
  };

  const meetingDate = parseISO(meeting.dateTime);
  const isUpcoming = isFuture(meetingDate);
  const statusStyle = STATUS_STYLES[meeting.status] || STATUS_STYLES.upcoming;

  return (
    <Card className="glass-card border-white/20 hover:border-white/30 transition-all duration-300 group">
      <CardContent className="p-4 md:p-5">
        {/* Header with Topic and Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-semibold text-white mb-1 truncate">
              {meeting.topic}
            </h3>
            {meeting.description && (
              <p className="text-sm text-white/60 line-clamp-2">
                {meeting.description}
              </p>
            )}
          </div>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium border shrink-0 ${statusStyle.badge}`}
          >
            {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
          </span>
        </div>

        {/* Date, Time, and Duration */}
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-white/70">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#F58220]" />
            <span>{format(meetingDate, "MMM dd, yyyy")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#F58220]" />
            <span>{format(meetingDate, "hh:mm a")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Video className="w-4 h-4 text-[#F58220]" />
            <span>{meeting.duration} min</span>
          </div>
        </div>

        {/* Attendees */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-white/60" />
            <span className="text-xs text-white/60 font-medium">
              {meeting.attendees.length} Attendee{meeting.attendees.length > 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {meeting.attendees.slice(0, 5).map((attendee, index) => (
                <Avatar
                  key={attendee.id || index}
                  className="w-8 h-8 border-2 border-black"
                  title={attendee.name}
                >
                  <AvatarImage src={attendee.avatar} />
                  <AvatarFallback className="bg-[#F58220]/20 text-[#F58220] text-xs">
                    {attendee.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            {meeting.attendees.length > 5 && (
              <span className="text-xs text-white/50">
                +{meeting.attendees.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Meeting Link and Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-3 border-t border-white/10">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/50 mb-1">Meeting Link</p>
            <p className="text-xs text-white/70 font-mono truncate">
              {meeting.meetingLink}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1.5" />
                  Copy
                </>
              )}
            </Button>
            {isUpcoming && meeting.status === "upcoming" && (
              <Button
                size="sm"
                className="bg-[#F58220] hover:bg-[#d91d79] text-black"
                onClick={() => window.open(meeting.meetingLink, "_blank")}
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                Join
              </Button>
            )}
          </div>
        </div>

        {/* Organizer */}
        {meeting.organizer && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-xs text-white/50">
              Organized by <span className="text-white/70 font-medium">{meeting.organizer}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
