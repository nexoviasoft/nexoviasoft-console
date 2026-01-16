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
  DollarSign,
  Package,
  Calendar,
  FileCheck,
  RefreshCw,
  Tag
} from "lucide-react";
import { useGetPricePackageByIdQuery } from "@/api/landing/price-package/pricePackageApi";

export default function PricePackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pricePackageId = params.id;

  const { data: pricePackageData, isLoading, error } = useGetPricePackageByIdQuery(pricePackageId);

  const pricePackage = pricePackageData?.data || pricePackageData;

  if (isLoading) {
    return (
      <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading price package details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !pricePackage) {
    return (
      <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-500 mb-4">Failed to load price package</p>
            <Button onClick={() => router.back()} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getTypeLabel = (type) => {
    const typeMap = {
      "monthly": "Monthly",
      "yearly": "Yearly",
      "one-time": "One Time"
    };
    return typeMap[type] || type;
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => router.back()} 
        className="mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Price Packages
      </Button>

      {/* Hero Section with Icon */}
      <Card className="mb-6 overflow-hidden">
        {pricePackage.iconUrl && (
          <div className="relative w-full h-96 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={pricePackage.iconUrl}
                alt={pricePackage.title}
                className="w-64 h-64 object-contain"
              />
            </div>
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-center gap-2 mb-3">
                {pricePackage.badge && (
                  <Badge className="bg-green-500 text-white">
                    {pricePackage.badge}
                  </Badge>
                )}
                <Badge 
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  {getTypeLabel(pricePackage.type)}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold mb-2">{pricePackage.title}</h1>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-6 h-6" />
                <span className="text-3xl font-bold">{pricePackage.price}</span>
              </div>
              {pricePackage.description && (
                <p className="text-lg text-white/90 max-w-3xl">{pricePackage.description}</p>
              )}
            </div>
          </div>
        )}
        {!pricePackage.iconUrl && (
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex items-center gap-2 mb-3">
              {pricePackage.badge && (
                <Badge className="bg-green-500 text-white">
                  {pricePackage.badge}
                </Badge>
              )}
              <Badge 
                variant="secondary"
                className="bg-white/20 text-white border-white/30"
              >
                {getTypeLabel(pricePackage.type)}
              </Badge>
            </div>
            <CardTitle className="text-4xl mb-2">{pricePackage.title}</CardTitle>
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-6 h-6" />
              <span className="text-3xl font-bold">{pricePackage.price}</span>
            </div>
            {pricePackage.description && (
              <p className="text-lg text-white/90">{pricePackage.description}</p>
            )}
          </CardHeader>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Package Details Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Package Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pricePackage.projectLimit && (
                  <div className="flex items-start gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
                    <FileCheck className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Project Limit</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {pricePackage.projectLimit}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Projects included</p>
                    </div>
                  </div>
                )}
                {pricePackage.revisionLimit && (
                  <div className="flex items-start gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
                    <RefreshCw className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Revision Limit</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {pricePackage.revisionLimit}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Revisions per project</p>
                    </div>
                  </div>
                )}
              </div>

              {pricePackage.type && (
                <div className="flex items-start gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
                  <Calendar className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Billing Type</p>
                    <p className="font-medium text-lg">{getTypeLabel(pricePackage.type)}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features Section */}
          {pricePackage.features && pricePackage.features.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Package Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {pricePackage.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Package Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Price</p>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  <span className="text-2xl font-bold">{pricePackage.price}</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Billing Type</p>
                <Badge variant="secondary" className="text-sm">
                  {getTypeLabel(pricePackage.type)}
                </Badge>
              </div>

              {pricePackage.badge && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Badge</p>
                    <Badge className="bg-green-500 text-white">
                      {pricePackage.badge}
                    </Badge>
                  </div>
                </>
              )}

              {pricePackage.projectLimit && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Project Limit</p>
                    <p className="text-lg font-semibold">{pricePackage.projectLimit} Projects</p>
                  </div>
                </>
              )}

              {pricePackage.revisionLimit && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Revision Limit</p>
                    <p className="text-lg font-semibold">{pricePackage.revisionLimit} Revisions</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Icon Preview */}
          {pricePackage.iconUrl && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Package Icon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <img
                    src={pricePackage.iconUrl}
                    alt={pricePackage.title}
                    className="w-32 h-32 object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                      const parent = e.target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<span class="text-gray-400 text-sm">Failed to load icon</span>';
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
