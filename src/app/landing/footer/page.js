"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import FooterForm from "@/components/landing/landing-page-from/footer/FooterForm";
import { useGetFooterQuery } from "@/api/landing/footer/page";

export default function FooterPage() {
  const [showDialog, setShowDialog] = useState(false);

  // API hooks
  const { data: footerData, isLoading, refetch } = useGetFooterQuery();

  const footer = footerData?.data || footerData;

  return (
    <div className="max-w-[1600px] w-full mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Footer Settings</CardTitle>
          <Button onClick={() => setShowDialog(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Update Footer
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : footer ? (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Company Name</p>
                    <p className="text-base text-gray-900 dark:text-gray-100">
                      {footer.company_name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
                    <p className="text-base text-gray-900 dark:text-gray-100">
                      {footer.location || "N/A"}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</p>
                    <p className="text-base text-gray-900 dark:text-gray-100">
                      {footer.company_description || "N/A"}
                    </p>
                  </div>
                  {footer.logo_url && (
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Logo</p>
                      <img
                        src={footer.logo_url}
                        alt="Company Logo"
                        className="h-20 object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Social Media Links */}
              {(footer.twitter_url || footer.instagram_url || footer.linkedin_url || footer.youtube_url) && (
                <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Social Media Links
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {footer.twitter_url && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Twitter</p>
                        <a
                          href={footer.twitter_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline text-base"
                        >
                          {footer.twitter_url}
                        </a>
                      </div>
                    )}
                    {footer.instagram_url && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Instagram</p>
                        <a
                          href={footer.instagram_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline text-base"
                        >
                          {footer.instagram_url}
                        </a>
                      </div>
                    )}
                    {footer.linkedin_url && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">LinkedIn</p>
                        <a
                          href={footer.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline text-base"
                        >
                          {footer.linkedin_url}
                        </a>
                      </div>
                    )}
                    {footer.youtube_url && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">YouTube</p>
                        <a
                          href={footer.youtube_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline text-base"
                        >
                          {footer.youtube_url}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Links Sections */}
              {(footer.company_links?.length > 0 || footer.services_links?.length > 0 || footer.legal_links?.length > 0) && (
                <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Footer Links
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {footer.company_links?.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          {footer.company_links_title || "Company"}
                        </p>
                        <ul className="space-y-1">
                          {footer.company_links.map((link, index) => (
                            <li key={index}>
                              <a
                                href={link.url}
                                className="text-blue-600 hover:text-blue-800 underline text-sm"
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {footer.services_links?.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          {footer.services_links_title || "Services"}
                        </p>
                        <ul className="space-y-1">
                          {footer.services_links.map((link, index) => (
                            <li key={index}>
                              <a
                                href={link.url}
                                className="text-blue-600 hover:text-blue-800 underline text-sm"
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {footer.legal_links?.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          {footer.legal_links_title || "Legal"}
                        </p>
                        <ul className="space-y-1">
                          {footer.legal_links.map((link, index) => (
                            <li key={index}>
                              <a
                                href={link.url}
                                className="text-blue-600 hover:text-blue-800 underline text-sm"
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Newsletter */}
              <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Newsletter
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Title</p>
                    <p className="text-base text-gray-900 dark:text-gray-100">
                      {footer.newsletter_title || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Placeholder</p>
                    <p className="text-base text-gray-900 dark:text-gray-100">
                      {footer.newsletter_placeholder || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Enabled</p>
                    <p className="text-base text-gray-900 dark:text-gray-100">
                      {footer.newsletter_enabled ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No footer data found. Click "Update Footer" to create one.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer Form Dialog */}
      <FooterForm
        open={showDialog}
        onOpenChange={setShowDialog}
        onSuccess={() => {
          refetch();
        }}
      />
    </div>
  );
}
