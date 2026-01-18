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
    <div className="max-w-2xl glass-card border-white/20 p-6 rounded-xl">
      <div className="flex items-center gap-6 mb-8">
        <div className="relative group cursor-pointer">
          <Avatar className="w-24 h-24 border-4 border-[#EFFC76] shadow-sm">
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback className="bg-[#EFFC76] text-black">DI</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-6 h-6 text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-white">Profile Picture</h3>
          <p className="text-sm text-white/70 mb-2">
            Upload a new avatar. Recommended size 400x400px.
          </p>
          <div className="flex gap-3">
             <Button
              variant="outline"
              size="sm"
              className="glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10"
             >
              Change
             </Button>
             <Button
              variant="ghost"
              size="sm"
              className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
             >
              Remove
             </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-white/80">First Name</Label>
            <Input
              id="firstName"
              defaultValue="Dipa"
              className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-white/80">Last Name</Label>
            <Input
              id="lastName"
              defaultValue="Inhouse"
              className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/80">Email Address</Label>
          <Input
            id="email"
            type="email"
            defaultValue="dipa@squadlog.com"
            className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="text-white/80">Role</Label>
          <Input
            id="role"
            defaultValue="Visual Design Lead"
            disabled
            className="bg-white/10 text-white/60 border border-white/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio" className="text-white/80">Bio</Label>
          <Textarea 
            id="bio" 
            placeholder="Write a short bio..." 
            className="min-h-[120px] bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
            defaultValue="Lead visual designer with 5+ years of experience in UI/UX and brand identity."
          />
        </div>

        <div className="pt-4 flex justify-end">
          <Button className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button min-w-[120px]">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
