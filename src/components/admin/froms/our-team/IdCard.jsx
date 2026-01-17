"use client";

import React from "react";

const IdCard = React.forwardRef(({ teamMember, departmentName, companyName = "SquadLog" }, ref) => {
  const fullName = `${teamMember.firstName || ""} ${teamMember.lastName || ""}`.trim();
  const position = teamMember.position || "Employee";
  const employeeId = teamMember.employeeId || "N/A";
  const email = teamMember.email || "N/A";
  const department = departmentName || "No Department";

  return (
    <div 
      ref={ref}
      className="w-[400px] h-[600px] bg-[#1a237e] rounded-2xl overflow-hidden relative shadow-2xl"
      style={{
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Top decorative section with abstract shapes */}
      <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 400 128" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#26a69a', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#4dd0e1', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          {/* Abstract swirling shapes */}
          <path
            d="M0,0 Q100,40 200,20 T400,0 L400,128 Q300,88 200,108 T0,128 Z"
            fill="url(#grad1)"
            opacity="0.8"
          />
          <circle cx="80" cy="30" r="25" fill="#4dd0e1" opacity="0.6" />
          <circle cx="320" cy="50" r="30" fill="#26a69a" opacity="0.5" />
          <ellipse cx="200" cy="20" rx="60" ry="25" fill="#80deea" opacity="0.7" />
        </svg>
      </div>

      {/* Company Name */}
      <div className="relative z-10 text-center pt-4 px-4">
        <h1 className="text-2xl font-bold text-white uppercase tracking-wider">
          {companyName}
        </h1>
      </div>

      {/* Photo section - Square and Bigger */}
      <div className="relative z-10 flex justify-center pt-4">
        <div className="relative">
          <div className="w-48 h-48 bg-white p-2 shadow-lg rounded-lg">
            <div className="w-full h-full rounded-lg overflow-hidden bg-gray-200 border-2 border-[#4dd0e1]">
              {teamMember.profileImage ? (
                <img
                  src={teamMember.profileImage}
                  alt={fullName}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300 text-[#1a237e] text-3xl font-bold">
                  {fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Name */}
      <div className="relative z-10 text-center mt-4 px-4">
        <h2 className="text-3xl font-bold text-white uppercase tracking-wide">
          {fullName || "EMPLOYEE NAME"}
        </h2>
      </div>

      {/* Position */}
      <div className="relative z-10 text-center mt-2 px-4">
        <p className="text-lg text-white">
          {position}
        </p>
      </div>

      {/* ID Number Box */}
      <div className="relative z-10 flex justify-center mt-4 px-4">
        <div className="bg-[#26a69a] rounded-lg px-6 py-2 shadow-md">
          <p className="text-white font-semibold text-lg">
            ID NO: {employeeId}
          </p>
        </div>
      </div>

      {/* Email and Department */}
      <div className="relative z-10 mt-6 px-8 space-y-2">
        <div className="text-white">
          <p className="text-base">
            <span className="font-semibold">Email :</span> {email}
          </p>
        </div>
        <div className="text-white">
          <p className="text-base">
            <span className="font-semibold">Department :</span> {department}
          </p>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 right-0 w-32 h-32 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 128 128">
          <path
            d="M128,128 Q64,64 0,128 L0,128 L128,128 Z"
            fill="#4dd0e1"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Lanyard hook (visual representation) */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
        <div className="w-12 h-6 bg-gray-300 rounded-t-lg border-2 border-gray-400"></div>
      </div>
    </div>
  );
});

IdCard.displayName = 'IdCard';

export default IdCard;
