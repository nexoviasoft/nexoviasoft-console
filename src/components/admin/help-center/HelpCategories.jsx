"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Wallet, BookOpen, Wrench, Users, ShieldCheck } from "lucide-react";

export default function HelpCategories() {
  const categories = [
    {
      icon: Rocket,
      title: "Getting Started",
      description: "Learn the basics of using NexoviaSoft Console.",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: Wallet,
      title: "Account & Billing",
      description: "Manage your subscription and payment methods.",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      icon: BookOpen,
      title: "Features & Guides",
      description: "Detailed tutorials for all platform features.",
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      icon: Wrench,
      title: "Troubleshooting",
      description: "Solutions for common issues and errors.",
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      icon: Users,
      title: "User Management",
      description: "How to add users and key permissions.",
      color: "text-pink-600",
      bg: "bg-pink-50"
    },
    {
      icon: ShieldCheck,
      title: "Security & Privacy",
      description: "Information about data protection and security.",
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    },
  ];

  return (
    <div className="mb-16">
      <h2 className="text-xl font-bold text-white mb-6">Browse by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <Card
            key={index}
            className="glass-card border-white/20 hover:border-[#F58220]/60 transition-shadow cursor-pointer group"
          >
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg bg-[#F58220]/15 text-[#F58220] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <cat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#F58220] transition-colors">
                {cat.title}
              </h3>
              <p className="text-sm text-white/70 line-clamp-2">
                {cat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
