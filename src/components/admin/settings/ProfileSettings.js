"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

export default function ProfileSettings() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-6 mb-8">
        <div className="relative group cursor-pointer">
          <Avatar className="w-24 h-24 border-4 border-white shadow-sm">
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback>DI</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-6 h-6 text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">Profile Picture</h3>
          <p className="text-sm text-gray-500 mb-2">
            Upload a new avatar. Recommended size 400x400px.
          </p>
          <div className="flex gap-3">
             <Button variant="outline" size="sm">Change</Button>
             <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">Remove</Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" defaultValue="Dipa" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" defaultValue="Inhouse" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" defaultValue="dipa@squadlog.com" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input id="role" defaultValue="Visual Design Lead" disabled className="bg-gray-50 text-gray-500" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea 
            id="bio" 
            placeholder="Write a short bio..." 
            className="min-h-[120px]"
            defaultValue="Lead visual designer with 5+ years of experience in UI/UX and brand identity."
          />
        </div>

        <div className="pt-4 flex justify-end">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white min-w-[120px]">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
