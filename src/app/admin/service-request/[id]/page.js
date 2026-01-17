"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Building2,
  User,
  MessageSquare,
  Package,
  Edit,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { useGetServiceRequestByIdQuery } from "@/api/admin/service-request/serviceRequestApi";
import Link from "next/link";

export default function ServiceRequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceRequestId = params.id;

  const { data: serviceRequestData, isLoading, error } = useGetServiceRequestByIdQuery(serviceRequestId);

  const serviceRequest = serviceRequestData?.data || serviceRequestData;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading service request details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !serviceRequest) {
    return (
      <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-500 mb-4">Failed to load service request</p>
            <Button onClick={() => router.back()} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const client = serviceRequest.client || {};
  const pricePackage = serviceRequest.pricePackage;

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
          Back to Service Requests
        </Button>
        <Link href={`/admin/service-request?edit=${serviceRequestId}`}>
          <Button variant="outline" className="gap-2">
            <Edit className="w-4 h-4" />
            Edit Request
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <Card className="mb-6 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
              <Package className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 text-white">
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-white/20 text-white border-white/30">
                  Service Request #{serviceRequest.id || serviceRequest._id}
                </Badge>
                {serviceRequest.serviceType && (
                  <Badge className="bg-white/20 text-white border-white/30">
                    {serviceRequest.serviceType}
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-2">
                {client.name || "Service Request"}
              </h1>
              {client.companyName && (
                <p className="text-xl text-white/90 mb-2">{client.companyName}</p>
              )}
              {client.designation && (
                <p className="text-lg text-white/80">{client.designation}</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{client.name || "N/A"}</p>
                  </div>
                </div>
                {client.designation && (
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Designation</p>
                      <p className="font-medium">{client.designation}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{client.email || "N/A"}</p>
                  </div>
                </div>
                {client.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{client.phone}</p>
                    </div>
                  </div>
                )}
                {client.companyName && (
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Company Name</p>
                      <p className="font-medium">{client.companyName}</p>
                    </div>
                  </div>
                )}
                {client.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{client.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Service Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Service Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Service Type</p>
                    <p className="font-medium">{serviceRequest.serviceType || "N/A"}</p>
                  </div>
                </div>
                {serviceRequest.serviceId && (
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Service ID</p>
                      <p className="font-medium">{serviceRequest.serviceId}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Price Package Information */}
          {pricePackage && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Price Package
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Package Title</p>
                      <p className="font-medium">{pricePackage.title || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-medium">{pricePackage.price || "N/A"}</p>
                    </div>
                  </div>
                  {pricePackage.projectLimit && (
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Project Limit</p>
                        <p className="font-medium">{pricePackage.projectLimit}</p>
                      </div>
                    </div>
                  )}
                  {pricePackage.revisionLimit && (
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Revision Limit</p>
                        <p className="font-medium">{pricePackage.revisionLimit}</p>
                      </div>
                    </div>
                  )}
                </div>
                {pricePackage.feature && Array.isArray(pricePackage.feature) && pricePackage.feature.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-3">Features</p>
                    <div className="space-y-2">
                      {pricePackage.feature.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Message */}
          {serviceRequest.message && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {serviceRequest.message}
                </p>
              </CardContent>
            </Card>
          )}

          {/* No Price Package Notice */}
          {!pricePackage && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">No Price Package Selected</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      This service request does not have an associated price package.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Request Details */}
          <Card>
            <CardHeader>
              <CardTitle>Request Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Request ID</p>
                <p className="font-medium">#{serviceRequest.id || serviceRequest._id}</p>
              </div>
              {serviceRequest.serviceType && (
                <div>
                  <p className="text-gray-500 mb-1">Service Type</p>
                  <Badge variant="secondary">{serviceRequest.serviceType}</Badge>
                </div>
              )}
              {pricePackage && (
                <div>
                  <p className="text-gray-500 mb-1">Price Package</p>
                  <p className="font-medium">{pricePackage.title}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Timestamps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {serviceRequest.createdAt && (
                <div>
                  <p className="text-gray-500 mb-1">Created At</p>
                  <p className="font-medium">{formatDate(serviceRequest.createdAt)}</p>
                </div>
              )}
              {serviceRequest.updatedAt && (
                <div>
                  <p className="text-gray-500 mb-1">Updated At</p>
                  <p className="font-medium">{formatDate(serviceRequest.updatedAt)}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {client.email && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => window.location.href = `mailto:${client.email}`}
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </Button>
              )}
              {client.phone && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => window.location.href = `tel:${client.phone}`}
                >
                  <Phone className="w-4 h-4" />
                  Call Client
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
