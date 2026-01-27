"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  CheckCircle2,
  Image as ImageIcon,
  Star,
  Sparkles,
  Package,
  Tag
} from "lucide-react";
import { useGetOurServiceByIdQuery } from "@/api/landing/our-service/ourServiceApi";
import { useGetCategoriesQuery } from "@/api/landing/category/categoryApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";
export default function OurServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.id;

  const { data: serviceData, isLoading, error } = useGetOurServiceByIdQuery(serviceId);
  const { data: categoriesData } = useGetCategoriesQuery();

  const service = serviceData?.data || serviceData;
  const categories = categoriesData?.data || categoriesData || [];

  if (isLoading) {
    return (
      <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EFFC76] mx-auto mb-4" />
            <p className="text-white/70">Loading service details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-500 mb-4">Failed to load service</p>
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="gap-2 glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:border-[#EFFC76]/70"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Get category name
  const getCategoryName = () => {
    if (!service.categoryId) return null;
    const category = categories.find((c) => (c.id || c._id) === service.categoryId);
    return category?.name || `Category ${service.categoryId}`;
  };

  const categoryName = getCategoryName();

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 gap-2 text-white/80 hover:text-[#EFFC76] hover:bg-white/5"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Services
      </Button>

      {/* Hero Section with Cover Image */}
      <Card className="mb-6 overflow-hidden glass-card border-white/20 bg-black/40">
        {service.image && (
          <div className="relative w-full h-96 bg-gradient-to-r from-[#151515] via-[#1f1f1f] to-[#151515]">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              {service.logo && (
                <div className="mb-4">
                  <img
                    src={service.logo}
                    alt={`${service.title} logo`}
                    className="h-16 w-auto object-contain"
                  />
                </div>
              )}
              {categoryName && (
                <Badge className="bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/40 mb-3">
                  {categoryName}
                </Badge>
              )}
              <h1 className="text-4xl font-bold mb-2 text-white">{service.title}</h1>
              {service.subtitle && (
                <p className="text-xl text-white/90 mb-3">{service.subtitle}</p>
              )}
              {service.description && (
                <p className="text-lg text-white/90 max-w-3xl">{service.description}</p>
              )}
            </div>
          </div>
        )}
        {!service.image && (
          <CardHeader className="bg-gradient-to-r from-[#151515] via-[#1f1f1f] to-[#151515] text-white border-b border-white/10">
            {service.logo && (
              <div className="mb-4">
                <img
                  src={service.logo}
                  alt={`${service.title} logo`}
                  className="h-16 w-auto object-contain"
                />
              </div>
            )}
            {categoryName && (
              <Badge className="bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/40 mb-3">
                {categoryName}
              </Badge>
            )}
            <CardTitle className="text-4xl mb-2 text-white">{service.title}</CardTitle>
            {service.subtitle && (
              <p className="text-xl text-white/90 mb-3">{service.subtitle}</p>
            )}
            {service.description && (
              <p className="text-lg text-white/90">{service.description}</p>
            )}
          </CardHeader>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Features Section */}
          {service.keyFeature && service.keyFeature.length > 0 && (
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Star className="w-5 h-5" />
                  Key Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.keyFeature.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#EFFC76] mt-0.5 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Benefits Section */}
          {service.benefit && service.benefit.length > 0 && (
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Sparkles className="w-5 h-5" />
                  Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.benefit.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#EFFC76] mt-0.5 flex-shrink-0" />
                      <span className="text-white/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Other Services Section */}
          {service.otherservice && service.otherservice.length > 0 && (
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Package className="w-5 h-5" />
                  Related Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {service.otherservice.map((otherService, index) => (
                    <div key={index}>
                      <div className="flex items-start gap-3 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-white">
                              {otherService.name}
                            </h3>
                            {otherService.isfeature && (
                              <Badge variant="secondary" className="bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/40">
                                Featured
                              </Badge>
                            )}
                          </div>
                          {otherService.description && (
                            <p className="text-white/80 leading-relaxed">
                              {otherService.description}
                            </p>
                          )}
                        </div>
                      </div>
                      {index < service.otherservice.length - 1 && (
                        <Separator className="mt-4 bg-white/10" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Service Info Card */}
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Tag className="w-5 h-5" />
                Service Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryName && (
                <div>
                  <p className="text-sm text-white/60 mb-1">Category</p>
                  <Badge variant="secondary" className="text-sm bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/40">
                    {categoryName}
                  </Badge>
                </div>
              )}
              {service.keyFeature && service.keyFeature.length > 0 && (
                <div>
                  <p className="text-sm text-white/60 mb-1">Key Features</p>
                  <p className="font-medium text-white">{service.keyFeature.length} features</p>
                </div>
              )}
              {service.benefit && service.benefit.length > 0 && (
                <div>
                  <p className="text-sm text-white/60 mb-1">Benefits</p>
                  <p className="font-medium text-white">{service.benefit.length} benefits</p>
                </div>
              )}
              {service.otherservice && service.otherservice.length > 0 && (
                <div>
                  <p className="text-sm text-white/60 mb-1">Related Services</p>
                  <p className="font-medium text-white">{service.otherservice.length} services</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Logo Display */}
          {service.logo && (
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <ImageIcon className="w-5 h-5" />
                  Service Logo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-4 bg-black/40 border border-white/10 rounded-lg">
                  <img
                    src={service.logo}
                    alt={`${service.title} logo`}
                    className="max-h-32 w-auto object-contain"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
    </AppLayout>
    </PrivateRoute>
  );
}
