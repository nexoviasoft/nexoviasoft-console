"use client";

import React, { useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Briefcase,
  Building2,
  User,
  Shield,
  AlertCircle,
  Heart,
  Code,
  Edit,
  Download
} from "lucide-react";
import { useGetOurTeamByIdQuery } from "@/api/admin/our-team/ourTeamApi";
import { useGetDepartmentsQuery } from "@/api/landing/department/departmentApi";
import Link from "next/link";
import IdCard from "@/components/admin/froms/our-team/IdCard";
import { generateIdCardPdf } from "@/utils/idCardPdf";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function OurTeamDetailPage() {
  const params = useParams();
  const router = useRouter();
  const teamMemberId = params.id;
  const idCardRef = useRef(null);

  const { data: teamMemberData, isLoading, error } = useGetOurTeamByIdQuery(teamMemberId);
  const { data: departmentsData } = useGetDepartmentsQuery();

  const teamMember = teamMemberData?.data || teamMemberData;
  const departments = departmentsData?.data || departmentsData || [];

  const handleDownloadIdCard = async () => {
    if (!idCardRef.current || !teamMember) return;
    
    try {
      const fullName = `${teamMember.firstName || ""} ${teamMember.lastName || ""}`.trim();
      const fileName = `ID-Card-${fullName.replace(/\s+/g, '-')}.pdf`;
      await generateIdCardPdf(idCardRef.current, fileName);
    } catch (error) {
      console.error('Failed to generate ID card PDF:', error);
      alert('Failed to generate ID card. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EFFC76] mx-auto mb-4"></div>
            <p className="text-white">Loading team member details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !teamMember) {
    return (
      <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center text-white">
            <p className="mb-4">Failed to load team member</p>
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getDepartmentName = () => {
    if (!teamMember.departmentId) return "No Department";
    const department = departments.find((dept) => (dept.id || dept._id) === teamMember.departmentId);
    return department?.name || `Department #${teamMember.departmentId}`;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: {
        label: "Active",
        variant: "default",
        className: "bg-emerald-500/20 text-white border border-emerald-400/60",
      },
      inactive: {
        label: "Inactive",
        variant: "secondary",
        className: "bg-slate-500/20 text-white border border-slate-400/60",
      },
      "on-leave": {
        label: "On Leave",
        variant: "secondary",
        className: "bg-amber-500/20 text-white border border-amber-400/60",
      },
    };
    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <Badge className={`${config.className} font-medium shadow-none`}>
        {config.label}
      </Badge>
    );
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      Employee: {
        className: "bg-sky-500/15 text-white border border-sky-400/60",
      },
      Manager: {
        className: "bg-purple-500/15 text-white border border-purple-400/60",
      },
      Admin: {
        className: "bg-rose-500/15 text-white border border-rose-400/60",
      },
      HR: {
        className: "bg-emerald-500/15 text-white border border-emerald-400/60",
      },
    };
    const config = roleConfig[role] || roleConfig.Employee;
    return (
      <Badge className={`${config.className} font-medium shadow-none`}>
        {role}
      </Badge>
    );
  };

  const fullName = `${teamMember.firstName || ""} ${teamMember.lastName || ""}`.trim();
  const initials = `${teamMember.firstName?.[0] || ""}${teamMember.lastName?.[0] || ""}`.toUpperCase();

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="max-w-[1600px] w-full mx-auto px-4 py-8 text-white">
      {/* Hidden ID Card for PDF generation */}
      <div className="fixed -left-[9999px] -top-[9999px] opacity-0 pointer-events-none">
        {teamMember && (
          <IdCard 
            teamMember={teamMember} 
            departmentName={getDepartmentName()} 
            companyName="SquadLog"
            ref={idCardRef} 
          />
        )}
      </div>

      {/* Header with Back Button and Edit */}
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="ghost" 
          onClick={() => router.back()} 
          className="gap-2 glass-button border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Team Members
        </Button>
        <div className="flex items-center gap-3">
          <Button 
            variant="default" 
            className="gap-2 bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button"
            onClick={handleDownloadIdCard}
          >
            <Download className="w-4 h-4" />
            Download ID Card
          </Button>
          <Link href={`/admin/our-team?edit=${teamMemberId}`}>
            <Button variant="outline" className="gap-2 glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <Edit className="w-4 h-4" />
              Edit Member
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section with Profile */}
      <Card className="mb-6 overflow-hidden glass-card border-white/20">
        <div className="bg-gradient-to-r from-[#151515] via-[#1f1f1f] to-[#151515] p-8">
          <div className="flex items-start gap-6">
            <Avatar className="w-32 h-32 border-4 border-white/80 shadow-lg">
              <AvatarImage src={teamMember.profileImage} alt={fullName} />
              <AvatarFallback className="text-3xl bg-black text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-white">
              <div className="flex items-center gap-3 mb-3">
                {getStatusBadge(teamMember.status)}
                {getRoleBadge(teamMember.role)}
              </div>
              <h1 className="text-4xl font-bold mb-2">{fullName}</h1>
              {teamMember.position && (
                <p className="text-xl text-white mb-2">{teamMember.position}</p>
              )}
              {teamMember.employeeId && (
                <p className="text-lg text-white">ID: {teamMember.employeeId}</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <User className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-white mt-1" />
                  <div>
                    <p className="text-sm text-white">Email</p>
                    <p className="font-medium text-white">{teamMember.email || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-white mt-1" />
                  <div>
                    <p className="text-sm text-white">Phone</p>
                    <p className="font-medium text-white">{teamMember.phone || "N/A"}</p>
                  </div>
                </div>
                {teamMember.dateOfBirth && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-white mt-1" />
                    <div>
                      <p className="text-sm text-white">Date of Birth</p>
                      <p className="font-medium text-white">
                        {new Date(teamMember.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
                {teamMember.hireDate && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-white mt-1" />
                    <div>
                      <p className="text-sm text-white">Hire Date</p>
                      <p className="font-medium text-white">
                        {new Date(teamMember.hireDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Employment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Briefcase className="w-5 h-5" />
                Employment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-white mt-1" />
                  <div>
                    <p className="text-sm text-white">Position</p>
                    <p className="font-medium text-white">{teamMember.position || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-white mt-1" />
                  <div>
                    <p className="text-sm text-white">Role</p>
                    <div className="mt-1 text-white">
                      {getRoleBadge(teamMember.role)}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-white mt-1" />
                  <div>
                    <p className="text-sm text-white">Department</p>
                    <p className="font-medium text-white">{getDepartmentName()}</p>
                  </div>
                </div>
                {teamMember.salary && (
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-white mt-1" />
                    <div>
                      <p className="text-sm text-white">Salary</p>
                      <p className="font-medium text-white">
                        ${teamMember.salary.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          {(teamMember.address || teamMember.city || teamMember.state || teamMember.country) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MapPin className="w-5 h-5 text-white" />
                  Address Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-white mt-1" />
                  <div className="space-y-1 text-white">
                    {teamMember.address && <p className="font-medium">{teamMember.address}</p>}
                    <p className="text-white">
                      {[
                        teamMember.city,
                        teamMember.state,
                        teamMember.zipCode,
                        teamMember.country
                      ].filter(Boolean).join(", ")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Emergency Contact */}
          {(teamMember.emergencyContactName || teamMember.emergencyContactPhone) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <AlertCircle className="w-5 h-5" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
                  {teamMember.emergencyContactName && (
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-white mt-1" />
                      <div>
                        <p className="text-sm text-white">Contact Name</p>
                        <p className="font-medium">{teamMember.emergencyContactName}</p>
                      </div>
                    </div>
                  )}
                  {teamMember.emergencyContactPhone && (
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-white mt-1" />
                      <div>
                        <p className="text-sm text-white">Contact Phone</p>
                        <p className="font-medium">{teamMember.emergencyContactPhone}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Bio */}
          {teamMember.bio && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <User className="w-5 h-5" />
                  Biography
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white leading-relaxed">{teamMember.bio}</p>
              </CardContent>
            </Card>
          )}

          {/* Skills */}
          {teamMember.skills && Array.isArray(teamMember.skills) && teamMember.skills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Code className="w-5 h-5" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 text-white">
                  {teamMember.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-white mb-2">Current Status</p>
                {getStatusBadge(teamMember.status)}
              </div>
              <div>
                <p className="text-sm text-white mb-2">Role</p>
                {getRoleBadge(teamMember.role)}
              </div>
              {teamMember.employeeId && (
                <div>
                  <p className="text-sm text-white mb-1">Employee ID</p>
                  <p className="font-medium text-white">{teamMember.employeeId}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-white/80">
              {teamMember.hireDate && (
                <div>
                  <p className="text-white mb-1">Hire Date</p>
                  <p className="font-medium">
                    {new Date(teamMember.hireDate).toLocaleDateString()}
                  </p>
                </div>
              )}
              {teamMember.departmentId && (
                <div>
                  <p className="text-white mb-1">Department</p>
                  <p className="font-medium">{getDepartmentName()}</p>
                </div>
              )}
              {teamMember.salary && (
                <div>
                  <p className="text-white mb-1">Salary</p>
                  <p className="font-medium">${teamMember.salary.toLocaleString()}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </AppLayout>
    </PrivateRoute>
  );
}
