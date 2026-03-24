"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSettings from "@/components/admin/settings/ProfileSettings";
import NotificationSettings from "@/components/admin/settings/NotificationSettings";
import { User, Bell, Shield, Wallet } from "lucide-react";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";
export default function Settings() {
  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 sm:px-8 py-4 sm:py-8">
      <div className="max-w-[1600px] w-full mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">Settings</h1>
            
            <Tabs defaultValue="profile" className="w-full">
              <div className="border-b border-white/10 mb-6 sm:mb-8 overflow-x-auto">
                <TabsList className="bg-transparent h-auto p-0 flex w-max sm:w-full gap-4 sm:gap-8">
                  <TabsTrigger 
                    value="profile" 
                    className="bg-transparent data-[state=active]:bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-[#F58220] rounded-none px-2 sm:px-0 py-3 text-white/60 data-[state=active]:text-white flex items-center gap-2 text-xs sm:text-base"
                  >
                    <User className="w-4 h-4 text-[#F58220]" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="bg-transparent data-[state=active]:bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-[#F58220] rounded-none px-2 sm:px-0 py-3 text-white/60 data-[state=active]:text-white flex items-center gap-2 text-xs sm:text-base"
                  >
                    <Bell className="w-4 h-4 text-[#F58220]" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security" 
                    className="bg-transparent data-[state=active]:bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-[#F58220] rounded-none px-2 sm:px-0 py-3 text-white/60 data-[state=active]:text-white flex items-center gap-2 text-xs sm:text-base"
                  >
                    <Shield className="w-4 h-4 text-[#F58220]" />
                    Security
                  </TabsTrigger>
                   <TabsTrigger 
                    value="billing" 
                    className="bg-transparent data-[state=active]:bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-[#F58220] rounded-none px-2 sm:px-0 py-3 text-white/60 data-[state=active]:text-white flex items-center gap-2 text-xs sm:text-base"
                  >
                    <Wallet className="w-4 h-4 text-[#F58220]" />
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
                  <Shield className="w-12 h-12 mx-auto mb-4 text-[#F58220]" />
                  <h3 className="text-lg font-medium text-white">Security Settings</h3>
                  <p>Two-factor authentication and password management coming soon.</p>
                </div>
              </TabsContent>

              <TabsContent value="billing" className="mt-0 outline-none">
                <div className="py-12 text-center text-white/70 glass-card rounded-xl border border-dashed border-white/30">
                  <Wallet className="w-12 h-12 mx-auto mb-4 text-[#F58220]" />
                  <h3 className="text-lg font-medium text-white">Billing & Plans</h3>
                  <p>Invoices and subscription management coming soon.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
    </div>
    </AppLayout>
    </PrivateRoute>
  );
}

//////efdsfdsfsdfsd