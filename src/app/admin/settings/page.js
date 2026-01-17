"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSettings from "@/components/admin/settings/ProfileSettings";
import NotificationSettings from "@/components/admin/settings/NotificationSettings";
import { User, Bell, Shield, Wallet } from "lucide-react";

export default function Settings() {
  return (
    <div className="px-8 py-8">
      <div className="max-w-[1600px] w-full mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>
            
            <Tabs defaultValue="profile" className="w-full">
              <div className="border-b border-white/10 mb-8">
                <TabsList className="bg-transparent h-auto p-0 space-x-8">
                  <TabsTrigger 
                    value="profile" 
                    className="bg-transparent data-[state=active]:bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-[#EFFC76] rounded-none px-0 py-3 text-white/60 data-[state=active]:text-white flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-[#EFFC76]" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                     className="bg-transparent data-[state=active]:bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-[#EFFC76] rounded-none px-0 py-3 text-white/60 data-[state=active]:text-white flex items-center gap-2"
                  >
                    <Bell className="w-4 h-4 text-[#EFFC76]" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security" 
                     className="bg-transparent data-[state=active]:bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-[#EFFC76] rounded-none px-0 py-3 text-white/60 data-[state=active]:text-white flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4 text-[#EFFC76]" />
                    Security
                  </TabsTrigger>
                   <TabsTrigger 
                    value="billing" 
                     className="bg-transparent data-[state=active]:bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-[#EFFC76] rounded-none px-0 py-3 text-white/60 data-[state=active]:text-white flex items-center gap-2"
                  >
                    <Wallet className="w-4 h-4 text-[#EFFC76]" />
                    Billing
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="profile" className="mt-0 outline-none">
                <ProfileSettings />
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0 outline-none">
                <NotificationSettings />
              </TabsContent>
              
              <TabsContent value="security" className="mt-0 outline-none">
                <div className="py-12 text-center text-white/70 glass-card rounded-xl border border-dashed border-white/30">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-[#EFFC76]" />
                  <h3 className="text-lg font-medium text-white">Security Settings</h3>
                  <p>Two-factor authentication and password management coming soon.</p>
                </div>
              </TabsContent>

              <TabsContent value="billing" className="mt-0 outline-none">
                <div className="py-12 text-center text-white/70 glass-card rounded-xl border border-dashed border-white/30">
                  <Wallet className="w-12 h-12 mx-auto mb-4 text-[#EFFC76]" />
                  <h3 className="text-lg font-medium text-white">Billing & Plans</h3>
                  <p>Invoices and subscription management coming soon.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
    </div>
  );
}
