"use client";

import React from "react";
import { Mail, Building2, QrCode, Phone, ShieldCheck, User } from "lucide-react";

import logo from "../../../../icon/logo.png"

/**
 * Premium Team ID Card Component
 * Designed for a modern, professional look with a dark theme and brand accents.
 */
const IdCard = React.forwardRef(({ teamMember, departmentName, companyName = "NexoviaSoft" }, ref) => {
  const fullName = `${teamMember.firstName || ""} ${teamMember.lastName || ""}`.trim();
  const position = teamMember.position || "Staff Member";
  const employeeId = (teamMember.employeeId && String(teamMember.employeeId) !== "NaN") 
    ? teamMember.employeeId 
    : "NX-0000";

  const email = teamMember.email || "hello@nexoviasoft.com";
  const department = departmentName || "General Operations";
  const phone = teamMember.phone || "+1 (555) 000-0000";

  return (
    <div
      ref={ref}
      className="w-[380px] h-[600px] bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden relative shadow-2xl border border-white/10"
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Background Decorative Elements - Multi-Color Palette */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top-Right Glow (Purple/Pink) */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#702E86]/30 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#d91d79]/20 rounded-full blur-[80px]" />
        
        {/* Bottom-Left Glow (Orange) */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#F58220]/15 rounded-full blur-[100px]" />
        
        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Lanyard Slot Visualization */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-16 h-4 bg-[#1a1a1a] rounded-b-xl border-x border-b border-white/5 shadow-inner" />
        <div className="w-10 h-1.5 bg-black/60 rounded-full mt-1 border border-white/10" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full items-center pt-10 px-6 pb-8">

        {/* Header / Company Branding with Logo only */}
        <div className="w-full flex justify-center mb-6">
          <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-lg group hover:border-[#F58220]/30 transition-all duration-300">
            <img src={logo.src || logo} alt="Logo" className="h-10 w-auto object-contain" />
          </div>
        </div>

        {/* Profile Image Section */}
        <div className="relative mb-6">
          {/* Decorative Outer Rings - Dynamic Gradient */}
          <div className="absolute inset-0 -m-3 border border-white/5 rounded-[2rem]" />
          <div className="absolute inset-0 -m-1.5 border border-white/10 rounded-[1.8rem]" />
          
          <div className="w-44 h-44 bg-gradient-to-br from-[#702E86]/40 via-[#d91d79]/40 to-[#F58220]/40 p-[2px] rounded-[1.5rem] shadow-2xl">
            <div className="w-full h-full rounded-[1.35rem] overflow-hidden bg-[#0d0d0d] flex items-center justify-center relative">
               {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
              
              {teamMember.profileImage ? (
                <img
                  src={teamMember.profileImage}
                  alt={fullName}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-white/10">
                  <User size={64} strokeWidth={1} />
                  <span className="text-[0.6rem] font-bold tracking-widest mt-2 uppercase">Identity Pending</span>
                </div>
              )}
            </div>
          </div>

          {/* Verification Badge - Color Plate Accent */}
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-[#d91d79] to-[#F58220] p-1.5 rounded-full border-2 border-[#0a0a0a] shadow-xl">
            <ShieldCheck size={16} className="text-white" />
          </div>
        </div>

        {/* Identity Details */}
        <div className="text-center w-full mb-6">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-tight mb-2">
            {fullName || "Identity Unknown"}
          </h2>
          <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#702E86] via-[#d91d79] to-[#F58220] text-white text-[0.7rem] font-black uppercase tracking-widest rounded-lg shadow-lg">
            {position}
          </div>
        </div>

        {/* ID Serial Number */}
        <div className="w-full mb-8">
          <div className="flex items-center justify-between px-6 py-3 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
            <span className="text-white/40 text-[0.6rem] font-bold uppercase tracking-widest">Employee ID</span>
            <span className="text-[#F58220] text-sm font-mono font-bold tracking-tighter shadow-sm">
              {employeeId}
            </span>
          </div>
        </div>

        {/* Detailed Info (Glass Card) */}
        <div className="w-full space-y-3 bg-white/[0.03] p-5 rounded-3xl border border-white/10 backdrop-blur-2xl flex-1 shadow-2xl">
          <div className="flex items-center gap-4 group">
            <div className="w-8 h-8 rounded-lg bg-[#702E86]/10 flex items-center justify-center border border-white/5 group-hover:border-[#702E86]/50 transition-all duration-300">
              <Mail size={14} className="text-[#d91d79]" />
            </div>
            <div className="flex flex-col">
              <span className="text-white/20 text-[0.5rem] font-bold uppercase tracking-widest">Network Mail</span>
              <span className="text-white/80 text-[0.75rem] font-medium truncate max-w-[210px]">{email}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="w-8 h-8 rounded-lg bg-[#d91d79]/10 flex items-center justify-center border border-white/5 group-hover:border-[#d91d79]/50 transition-all duration-300">
              <Building2 size={14} className="text-[#F58220]" />
            </div>
            <div className="flex flex-col">
              <span className="text-white/20 text-[0.5rem] font-bold uppercase tracking-widest">Divisional Unit</span>
              <span className="text-white/80 text-[0.75rem] font-medium">{department}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="w-8 h-8 rounded-lg bg-[#F58220]/10 flex items-center justify-center border border-white/5 group-hover:border-[#F58220]/50 transition-all duration-300">
              <Phone size={14} className="text-[#d91d79]" />
            </div>
            <div className="flex flex-col">
              <span className="text-white/20 text-[0.5rem] font-bold uppercase tracking-widest">Secure Link</span>
              <span className="text-white/80 text-[0.75rem] font-medium">{phone}</span>
            </div>
          </div>
        </div>

        {/* Footer / Auth */}
        <div className="w-full mt-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-white/10 text-[0.55rem] font-bold uppercase tracking-[0.2em] mb-1">Authorization Status</span>
            <span className="text-white/50 text-[0.65rem] font-bold uppercase tracking-widest">Active Access</span>
          </div>
          <div className="p-2 bg-white rounded-xl shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#702E86]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <QrCode size={26} className="text-black relative z-10" strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Dynamic Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#702E86] via-[#d91d79] to-[#F58220] opacity-80" />
    </div>
  );
});

IdCard.displayName = 'IdCard';

export default IdCard;
