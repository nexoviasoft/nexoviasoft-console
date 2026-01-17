"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Mail,
  Phone,
  MapPin,
  Building2,
  User,
  Briefcase,
  Edit,
  Globe
} from "lucide-react";
import { useGetClientByIdQuery } from "@/api/landing/client/clientApi";
import Link from "next/link";

export default function OurClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id;

  const { data: clientData, isLoading, error } = useGetClientByIdQuery(clientId);

  const client = clientData?.data || clientData;

  if (isLoading) {
    return (
      <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading client details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-500 mb-4">Failed to load client</p>
            <Button onClick={() => router.back()} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const initials = client.name
    ? client.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "CL";

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
      {/* Header with Back Button and Edit */}
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="ghost" 
          onClick={() => router.back()} 
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Clients
        </Button>
        <Link href={`/admin/our-client?edit=${clientId}`}>
          <Button variant="outline" className="gap-2">
            <Edit className="w-4 h-4" />
            Edit Client
          </Button>
        </Link>
      </div>

      {/* Hero Section with Profile */}
      <Card className="mb-6 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8">
          <div className="flex items-start gap-6">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={client.photo} alt={client.name} />
              <AvatarFallback className="text-3xl bg-white text-gray-700">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-white">
              <h1 className="text-4xl font-bold mb-2">{client.name || "N/A"}</h1>
              {client.designation && (
                <p className="text-xl text-white/90 mb-2">{client.designation}</p>
              )}
              {client.companyName && (
                <p className="text-lg text-white/80">{client.companyName}</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{client.email || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{client.phone || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Designation</p>
                    <p className="font-medium">{client.designation || "N/A"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Company Name</p>
                    <p className="font-medium">{client.companyName || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Company Type</p>
                    <p className="font-medium">{client.companyType || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{client.location || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Country</p>
                    <p className="font-medium">{client.country || "N/A"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {client.companyName && (
                <div>
                  <p className="text-gray-500 mb-1">Company</p>
                  <p className="font-medium">{client.companyName}</p>
                </div>
              )}
              {client.companyType && (
                <div>
                  <p className="text-gray-500 mb-1">Company Type</p>
                  <p className="font-medium">{client.companyType}</p>
                </div>
              )}
              {client.location && (
                <div>
                  <p className="text-gray-500 mb-1">Location</p>
                  <p className="font-medium">{client.location}</p>
                </div>
              )}
              {client.country && (
                <div>
                  <p className="text-gray-500 mb-1">Country</p>
                  <p className="font-medium">{client.country}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {client.email && (
                <div>
                  <p className="text-gray-500 mb-1">Email</p>
                  <p className="font-medium break-all">{client.email}</p>
                </div>
              )}
              {client.phone && (
                <div>
                  <p className="text-gray-500 mb-1">Phone</p>
                  <p className="font-medium">{client.phone}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
