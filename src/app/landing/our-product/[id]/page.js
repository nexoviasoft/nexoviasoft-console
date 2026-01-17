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
  Users,
  ExternalLink,
  Tag,
  Calendar
} from "lucide-react";
import { useGetOurProductByIdQuery } from "@/api/landing/our-product/ourProductApi";
import { useGetCategoriesQuery } from "@/api/landing/category/categoryApi";

export default function OurProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;

  const { data: productData, isLoading, error } = useGetOurProductByIdQuery(productId);
  const { data: categoriesData } = useGetCategoriesQuery();

  const product = productData?.data || productData;
  const categories = categoriesData?.data || categoriesData || [];

  if (isLoading) {
    return (
      <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EFFC76] mx-auto mb-4" />
            <p className="text-white/70">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-500 mb-4">Failed to load product</p>
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
    if (!product.categoryId) return null;
    const category = categories.find((c) => (c.id || c._id) === product.categoryId);
    return category?.name || `Category ${product.categoryId}`;
  };

  const categoryName = getCategoryName();

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => router.back()} 
        className="mb-6 gap-2 text-white/80 hover:text-[#EFFC76] hover:bg-white/5"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Button>

      {/* Hero Section with Logo */}
      <Card className="mb-6 overflow-hidden glass-card border-white/20 bg-black/40">
        <CardHeader className="bg-gradient-to-r from-[#151515] via-[#1f1f1f] to-[#151515] text-white border-b border-white/10">
          <div className="flex items-start gap-6">
            {product.logo && (
              <div className="flex-shrink-0">
                <div className="bg-black/40 border border-white/20 rounded-lg p-4">
                  <img
                    src={product.logo}
                    alt={`${product.name} logo`}
                    className="h-24 w-auto object-contain"
                  />
                </div>
              </div>
            )}
            <div className="flex-1">
              {categoryName && (
                <Badge className="bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/40 mb-3">
                  {categoryName}
                </Badge>
              )}
              <CardTitle className="text-4xl mb-2 text-white">{product.name}</CardTitle>
              {product.description && (
                <p className="text-lg text-white/90 mb-4">{product.description}</p>
              )}
              <div className="flex flex-wrap items-center gap-4">
                {product.url && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => window.open(product.url, "_blank")}
                    className="gap-2 glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Website
                  </Button>
                )}
                {product.totalUser !== undefined && product.totalUser !== null && (
                  <div className="flex items-center gap-2 text-white/90">
                    <Users className="w-5 h-5 text-[#EFFC76]" />
                    <span className="font-semibold">{product.totalUser.toLocaleString()} Users</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Features Section */}
          {product.feature && product.feature.length > 0 && (
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Star className="w-5 h-5 text-[#EFFC76]" />
                  Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {product.feature.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#EFFC76] mt-0.5 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Description Section */}
          {product.description && (
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white">About This Product</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Product Info Card */}
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Tag className="w-5 h-5 text-[#EFFC76]" />
                Product Information
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
              {product.feature && product.feature.length > 0 && (
                <div>
                  <p className="text-sm text-white/60 mb-1">Features</p>
                  <p className="font-medium text-white">{product.feature.length} features</p>
                </div>
              )}
              {product.totalUser !== undefined && product.totalUser !== null && (
                <div>
                  <p className="text-sm text-white/60 mb-1">Total Users</p>
                  <p className="font-medium text-white">{product.totalUser.toLocaleString()}</p>
                </div>
              )}
              {product.url && (
                <div>
                  <p className="text-sm text-white/60 mb-1">Website</p>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#EFFC76] hover:text-white underline text-sm break-all"
                  >
                    {product.url}
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Logo Display */}
          {product.logo && (
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <ImageIcon className="w-5 h-5" />
                  Product Logo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-4 bg-black/40 border border-white/10 rounded-lg">
                  <img
                    src={product.logo}
                    alt={`${product.name} logo`}
                    className="max-h-32 w-auto object-contain"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timestamps */}
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5 text-[#EFFC76]" />
                Timestamps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {product.createdAt && (
                <div>
                  <p className="text-sm text-white/60 mb-1">Created At</p>
                  <p className="text-sm font-medium text-white">{formatDate(product.createdAt)}</p>
                </div>
              )}
              {product.updatedAt && (
                <div>
                  <p className="text-sm text-white/60 mb-1">Updated At</p>
                  <p className="text-sm font-medium text-white">{formatDate(product.updatedAt)}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
