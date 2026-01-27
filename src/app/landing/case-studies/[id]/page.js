"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  Building2, 
  Clock, 
  CheckCircle2,
  Image as ImageIcon,
  Link as LinkIcon,
  FileText,
  Target,
  Lightbulb,
  TrendingUp
} from "lucide-react";
import { useGetCaseStudyByIdQuery } from "@/api/landing/case-studies/caseStudiesApi";
import { useGetCategoriesQuery } from "@/api/landing/category/categoryApi";
import { useGetClientsQuery } from "@/api/landing/client/clientApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function CaseStudyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const caseStudyId = params.id;

  const { data: caseStudyData, isLoading, error } = useGetCaseStudyByIdQuery(caseStudyId);
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: clientsData } = useGetClientsQuery();

  const caseStudy = caseStudyData?.data || caseStudyData;
  const categories = categoriesData?.data || categoriesData || [];
  const clients = clientsData?.data || clientsData || [];

  if (isLoading) {
    return (
      <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading case study details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-500 mb-4">Failed to load case study</p>
            <Button onClick={() => router.back()} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Get category names
  const getCategoryNames = () => {
    if (!caseStudy.categories || caseStudy.categories.length === 0) return [];
    return caseStudy.categories.map((cat) => {
      // If category is an object with name property, use it directly
      if (typeof cat === 'object' && cat.name) {
        return cat.name;
      }
      // If category is an object with id/_id, find the category name
      if (typeof cat === 'object' && (cat.id !== undefined || cat._id !== undefined)) {
        const catId = cat.id || cat._id;
        const category = categories.find((c) => (c.id || c._id) === catId);
        return category?.name || `Category ${catId}`;
      }
      // If category is just an ID (number or string), find the category name
      const catId = cat;
      const category = categories.find((c) => (c.id || c._id) === catId);
      return category?.name || `Category ${catId}`;
    });
  };

  // Get client name
  const getClientName = () => {
    if (!caseStudy.clientId) return null;
    const client = clients.find((c) => (c.id || c._id) === caseStudy.clientId);
    return client?.name || client?.companyName || `Client #${caseStudy.clientId}`;
  };

  const categoryNames = getCategoryNames();
  const clientName = getClientName();

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => router.back()} 
        className="mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Case Studies
      </Button>

      {/* Hero Section with Cover Image */}
      <Card className="mb-6 overflow-hidden">
        {caseStudy.imageUrl && (
          <div className="relative w-full h-96 bg-gradient-to-r from-blue-500 to-purple-600">
            <img
              src={caseStudy.imageUrl}
              alt={caseStudy.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-center gap-2 mb-3">
                {caseStudy.badge && (
                  <Badge className="bg-blue-500 text-white">Featured</Badge>
                )}
                <Badge 
                  variant={caseStudy.status === "active" ? "default" : "secondary"}
                  className="bg-white/20 text-white border-white/30"
                >
                  {caseStudy.status?.charAt(0).toUpperCase() + caseStudy.status?.slice(1)}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold mb-2">{caseStudy.title}</h1>
              {caseStudy.description && (
                <p className="text-lg text-white/90 max-w-3xl">{caseStudy.description}</p>
              )}
            </div>
          </div>
        )}
        {!caseStudy.imageUrl && (
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex items-center gap-2 mb-3">
              {caseStudy.badge && (
                <Badge className="bg-blue-500 text-white">Featured</Badge>
              )}
              <Badge 
                variant="secondary"
                className="bg-white/20 text-white border-white/30"
              >
                {caseStudy.status?.charAt(0).toUpperCase() + caseStudy.status?.slice(1)}
              </Badge>
            </div>
            <CardTitle className="text-4xl mb-2">{caseStudy.title}</CardTitle>
            {caseStudy.description && (
              <p className="text-lg text-white/90">{caseStudy.description}</p>
            )}
          </CardHeader>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Details Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Project Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clientName && (
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Client</p>
                      <p className="font-medium">{clientName}</p>
                    </div>
                  </div>
                )}
                {caseStudy.industry && (
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Industry</p>
                      <p className="font-medium">{caseStudy.industry}</p>
                    </div>
                  </div>
                )}
                {caseStudy.duration && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{caseStudy.duration}</p>
                    </div>
                  </div>
                )}
                {categoryNames.length > 0 && (
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Categories</p>
                      <div className="flex flex-wrap gap-2">
                        {categoryNames.map((name, idx) => (
                          <Badge key={idx} variant="secondary">{name}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Features Section */}
          {caseStudy.features && caseStudy.features.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Key Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {caseStudy.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Case Study Content Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Case Study Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {caseStudy.problem_statement && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-red-500" />
                    <h3 className="text-lg font-semibold">Problem Statement</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed pl-7">
                    {caseStudy.problem_statement}
                  </p>
                </div>
              )}

              {caseStudy.solution_overview && (
                <>
                  <Separator />
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-5 h-5 text-yellow-500" />
                      <h3 className="text-lg font-semibold">Solution Overview</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed pl-7">
                      {caseStudy.solution_overview}
                    </p>
                  </div>
                </>
              )}

              {caseStudy.results && (
                <>
                  <Separator />
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <h3 className="text-lg font-semibold">Results</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed pl-7">
                      {caseStudy.results}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Project Images Gallery */}
          {caseStudy.projectimage && caseStudy.projectimage.length > 0 && caseStudy.projectimage.some(img => img && img.trim() !== "") && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Project Images
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {caseStudy.projectimage
                    .filter(img => img && img.trim() !== "")
                    .map((imageUrl, index) => (
                      <div key={index} className="relative group overflow-hidden rounded-lg">
                        <img
                          src={imageUrl}
                          alt={`Project image ${index + 1}`}
                          className="w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Links */}
          {(caseStudy.caseStudyUrl || caseStudy.liveUrl) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="w-5 h-5" />
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {caseStudy.caseStudyUrl && (
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => window.open(caseStudy.caseStudyUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Case Study
                  </Button>
                )}
                {caseStudy.liveUrl && (
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => window.open(caseStudy.liveUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Live Site
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Status</p>
                <Badge 
                  variant={caseStudy.status === "active" ? "default" : "secondary"}
                >
                  {caseStudy.status?.charAt(0).toUpperCase() + caseStudy.status?.slice(1)}
                </Badge>
              </div>
              {caseStudy.badge && (
                <div>
                  <p className="text-gray-500 mb-1">Featured</p>
                  <Badge className="bg-blue-500">Yes</Badge>
                </div>
              )}
              {categoryNames.length > 0 && (
                <div>
                  <p className="text-gray-500 mb-2">Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {categoryNames.map((name, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {name}
                      </Badge>
                    ))}
                  </div>
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
