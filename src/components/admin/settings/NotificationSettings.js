"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Mail, Smartphone } from "lucide-react";

export default function NotificationSettings() {
  return (
    <div className="max-w-3xl space-y-6">
      <Card className="glass-card border-white/20">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-[#EFFC76]/15 rounded-lg border border-[#EFFC76]/60">
              <Mail className="w-5 h-5 text-[#EFFC76]" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Email Notifications</h3>
              <p className="text-sm text-white/70">Manage what emails you receive from us.</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label className="text-sm sm:text-base text-white">Weekly Digest</Label>
                <p className="text-xs sm:text-sm text-white/70">Get a summary of your team's activity every Monday.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label className="text-sm sm:text-base text-white">New Project Invitations</Label>
                <p className="text-xs sm:text-sm text-white/70">Receive emails when you are added to a new project.</p>
              </div>
              <Switch defaultChecked />
            </div>
             <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label className="text-sm sm:text-base text-white">Task Assignments</Label>
                <p className="text-xs sm:text-sm text-white/70">Get notified when someone assigns you a task.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-white/20">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-white/10 rounded-lg border border-white/30">
              <Smartphone className="w-5 h-5 text-[#EFFC76]" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Push Notifications</h3>
              <p className="text-sm text-white/70">Manage notifications on your mobile devices.</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label className="text-sm sm:text-base text-white">Direct Messages</Label>
                <p className="text-xs sm:text-sm text-white/70">Instant notifications for team chats.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label className="text-sm sm:text-base text-white">Mentions</Label>
                <p className="text-xs sm:text-sm text-white/70">Get notified when someone mentions you in a comment.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
