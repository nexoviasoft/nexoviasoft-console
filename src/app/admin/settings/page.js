"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSettings from "@/components/admin/settings/ProfileSettings";
import NotificationSettings from "@/components/admin/settings/NotificationSettings";
import { User, Bell, Shield, Wallet } from "lucide-react";

export default function Settings() {
  return (
    <div className="bg-gray-50 px-8 py-8">
      <div className="max-w-[1600px] w-full mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
            
            <Tabs defaultValue="profile" className="w-full">
              <div className="border-b border-gray-200 mb-8">
                <TabsList className="bg-transparent h-auto p-0 space-x-8">
                  <TabsTrigger 
                    value="profile" 
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none px-0 py-3 text-gray-500 data-[state=active]:text-purple-600 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                     className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none px-0 py-3 text-gray-500 data-[state=active]:text-purple-600 flex items-center gap-2"
                  >
                    <Bell className="w-4 h-4" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security" 
                     className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none px-0 py-3 text-gray-500 data-[state=active]:text-purple-600 flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    Security
                  </TabsTrigger>
                   <TabsTrigger 
                    value="billing" 
                     className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none px-0 py-3 text-gray-500 data-[state=active]:text-purple-600 flex items-center gap-2"
                  >
                    <Wallet className="w-4 h-4" />
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
                <div className="py-12 text-center text-gray-500 bg-white rounded-lg border border-dashed border-gray-200">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
                  <p>Two-factor authentication and password management coming soon.</p>
                </div>
              </TabsContent>

              <TabsContent value="billing" className="mt-0 outline-none">
                <div className="py-12 text-center text-gray-500 bg-white rounded-lg border border-dashed border-gray-200">
                  <Wallet className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900">Billing & Plans</h3>
                  <p>Invoices and subscription management coming soon.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
    </div>
  );
}
