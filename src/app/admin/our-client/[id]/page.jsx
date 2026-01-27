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
  Globe,
  Trash2,
  Zap,
} from "lucide-react";
import {
  useGetClientByIdQuery,
  useDeleteClientMutation,
} from "@/api/landing/client/clientApi";
import Link from "next/link";
import { toast } from "sonner";
import ConfirmActionModal from "@/components/modal/ConfirmActionModal";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";
export default function OurClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id;
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  const {
    data: clientData,
    isLoading,
    error,
  } = useGetClientByIdQuery(clientId);

  const [deleteClient, { isLoading: isDeleting }] = useDeleteClientMutation();

  const client = clientData?.data || clientData;

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    const toastId = toast.loading("Deleting client...");
    try {
      await deleteClient(clientId).unwrap();
      toast.success("Client deleted successfully!", { id: toastId });
      setShowConfirmModal(false);
      router.push("/admin/our-client");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete client", {
        id: toastId,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EFFC76] mx-auto mb-4"></div>
            <p className="text-white/70">Loading client details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="glass-card rounded-xl p-8 text-center border-white/20">
            <p className="text-red-400 mb-4">Failed to load client</p>
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10"
            >
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
    <PrivateRoute>
      <AppLayout>
        <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
      {/* Header with Back Button and Edit */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="gap-2 text-white/80 hover:text-[#EFFC76] hover:bg-white/5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Clients
        </Button>
        <div className="flex items-center gap-3">
          <Button
            variant="destructive"
            onClick={handleDeleteClick}
            className="gap-2 glass-button border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/50"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
          <Link href={`/admin/our-client?edit=${clientId}`}>
            <Button
              variant="outline"
              className="gap-2 glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white hover:border-[#EFFC76]/70"
            >
              <Edit className="w-4 h-4" />
              Edit Client
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section with Profile */}
      <Card className="mb-6 overflow-hidden glass-card border-white/20">
        <div className="bg-gradient-to-r from-[#151515] via-[#1f1f1f] to-[#151515] p-6 sm:p-8 border-b border-white/10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-[#EFFC76] shadow-lg">
              <AvatarImage src={client.photo} alt={client.name} />
              <AvatarFallback className="text-2xl sm:text-3xl bg-[#EFFC76] text-black">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-white text-center sm:text-left">
              <h1 className="text-2xl sm:text-4xl font-bold mb-2">
                {client.name || "N/A"}
              </h1>
              {client.designation && (
                <p className="text-lg sm:text-xl text-white/90 mb-2">
                  {client.designation}
                </p>
              )}
              {client.companyName && (
                <p className="text-base sm:text-lg text-white/80">
                  {client.companyName}
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <User className="w-5 h-5 text-[#EFFC76]" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3 overflow-hidden">
                  <Mail className="w-5 h-5 text-[#EFFC76] mt-1 flex-shrink-0" />
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-sm text-white/60">Email</p>
                    <p className="font-medium text-white/90 truncate text-sm sm:text-base">
                      {client.email || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 overflow-hidden">
                  <Phone className="w-5 h-5 text-[#EFFC76] mt-1 flex-shrink-0" />
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-sm text-white/60">Phone</p>
                    <p className="font-medium text-white/90 truncate text-sm sm:text-base">
                      {client.phone || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 overflow-hidden">
                  <Briefcase className="w-5 h-5 text-[#EFFC76] mt-1 flex-shrink-0" />
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-sm text-white/60">
                      Designation
                    </p>
                    <p className="font-medium text-white/90 truncate text-sm sm:text-base">
                      {client.designation || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Building2 className="w-5 h-5 text-[#EFFC76]" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3 overflow-hidden">
                  <Building2 className="w-5 h-5 text-[#EFFC76] mt-1 flex-shrink-0" />
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-sm text-white/60">
                      Company Name
                    </p>
                    <p className="font-medium text-white/90 truncate text-sm sm:text-base">
                      {client.companyName || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 overflow-hidden">
                  <Briefcase className="w-5 h-5 text-[#EFFC76] mt-1 flex-shrink-0" />
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-sm text-white/60">
                      Company Type
                    </p>
                    <p className="font-medium text-white/90 truncate text-sm sm:text-base">
                      {client.companyType || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 overflow-hidden">
                  <MapPin className="w-5 h-5 text-[#EFFC76] mt-1 flex-shrink-0" />
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-sm text-white/60">Location</p>
                    <p className="font-medium text-white/90 truncate text-sm sm:text-base">
                      {client.location || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 overflow-hidden">
                  <Globe className="w-5 h-5 text-[#EFFC76] mt-1 flex-shrink-0" />
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-sm text-white/60">Country</p>
                    <p className="font-medium text-white/90 truncate text-sm sm:text-base">
                      {client.country || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Zap className="w-5 h-5 text-[#EFFC76]" />
                Quick Info
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              {client.companyName && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-3.5 h-3.5 text-[#EFFC76]" />
                    <p className="text-white/60">Company</p>
                  </div>
                  <p className="font-medium text-white/90 truncate">
                    {client.companyName}
                  </p>
                </div>
              )}
              {client.companyType && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="w-3.5 h-3.5 text-[#EFFC76]" />
                    <p className="text-white/60">Company Type</p>
                  </div>
                  <p className="font-medium text-white/90 truncate">
                    {client.companyType}
                  </p>
                </div>
              )}
              {client.location && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#EFFC76]" />
                    <p className="text-white/60">Location</p>
                  </div>
                  <p className="font-medium text-white/90 truncate">
                    {client.location}
                  </p>
                </div>
              )}
              {client.country && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="w-3.5 h-3.5 text-[#EFFC76]" />
                    <p className="text-white/60">Country</p>
                  </div>
                  <p className="font-medium text-white/90 truncate">
                    {client.country}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Phone className="w-5 h-5 text-[#EFFC76]" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              {client.email && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="w-3.5 h-3.5 text-[#EFFC76]" />
                    <p className="text-white/60">Email</p>
                  </div>
                  <p className="font-medium text-white/90 truncate">
                    {client.email}
                  </p>
                </div>
              )}
              {client.phone && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Phone className="w-3.5 h-3.5 text-[#EFFC76]" />
                    <p className="text-white/60">Phone</p>
                  </div>
                  <p className="font-medium text-white/90 truncate">{client.phone}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmActionModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmDelete}
        action="delete"
        title="Delete Client"
        description={`Are you sure you want to delete ${client.name}? This action cannot be undone.`}
        itemName="client"
        loading={isDeleting}
      />
    </div>
    </AppLayout>
    </PrivateRoute>
  );
}
