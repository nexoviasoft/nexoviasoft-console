"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Mail, Smartphone } from "lucide-react";

export default function NotificationSettings() {
  return (
    <div className="max-w-3xl space-y-6">
      <Card className="shadow-sm border-gray-100">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Email Notifications</h3>
              <p className="text-sm text-gray-500">Manage what emails you receive from us.</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Weekly Digest</Label>
                <p className="text-sm text-gray-500">Get a summary of your team's activity every Monday.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">New Project Invitations</Label>
                <p className="text-sm text-gray-500">Receive emails when you are added to a new project.</p>
              </div>
              <Switch defaultChecked />
            </div>
             <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Task Assignments</Label>
                <p className="text-sm text-gray-500">Get notified when someone assigns you a task.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-gray-100">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Smartphone className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Push Notifications</h3>
              <p className="text-sm text-gray-500">Manage notifications on your mobile devices.</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Direct Messages</Label>
                <p className="text-sm text-gray-500">Instant notifications for team chats.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Mentions</Label>
                <p className="text-sm text-gray-500">Get notified when someone mentions you in a comment.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
