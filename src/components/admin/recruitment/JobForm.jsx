"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ImageInput from "@/components/input/ImageInput";
import { useUpload } from "@/hooks/useUpload";
import {
  useCreateJobPostingMutation,
  useUpdateJobPostingMutation,
} from "@/api/admin/recruitment/recruitmentApi";
import { useGetDepartmentsQuery } from "@/api/landing/department/departmentApi";

export default function JobForm({ job = null, onBack, onSaveSuccess }) {
  const [createJobPosting, { isLoading: isCreating }] = useCreateJobPostingMutation();
  const [updateJobPosting, { isLoading: isUpdating }] = useUpdateJobPostingMutation();
  const { uploadFile, isUploading } = useUpload({ folder: "job-postings" });
  
  const { data: departmentsResponse } = useGetDepartmentsQuery();
  const departments = departmentsResponse?.data || departmentsResponse || [];

  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: job?.title || "",
    department: job?.departmentEntity?.name || job?.department || "",
    departmentId: job?.departmentId || undefined,
    type: job?.type || "Full-time",
    location: job?.location || "",
    description: job?.description || "",
    imageUrl: job?.imageUrl || "",
    startDate: job?.startDate ? job.startDate.split('T')[0] : "",
    expiryDate: job?.expiryDate ? job.expiryDate.split('T')[0] : "",
    vacancy: job?.vacancy || 1,
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const title = (formData.title || "").trim();
      const location = (formData.location || "").trim();
      const department = (formData.department || "").trim();
      const hasDept = Boolean(formData.departmentId) || department.length > 0;

      if (!title || !location || !formData.type || !hasDept) {
        toast.error("Please fill in all required fields (Title, Dept, Type, Location).");
        return;
      }

      let imageUrl = (formData.imageUrl || "").trim();
      if (imageFile) {
        toast.loading("Uploading image...", { id: "upload-job-image" });
        imageUrl = await uploadFile(imageFile);
        toast.success("Image uploaded", { id: "upload-job-image" });
      }

      const payload = {
        ...formData,
        title,
        location,
        department,
        imageUrl,
      };

      let result;
      if (job) {
        result = await updateJobPosting({
          id: job.id,
          ...payload,
          status: job.status || "Active",
        }).unwrap();
        toast.success("Job updated successfully!");
      } else {
        result = await createJobPosting({
          ...payload,
          status: "Active",
          postedDate: new Date().toISOString().split('T')[0],
        }).unwrap();
        toast.success("Job posted successfully!");
      }

      if (onSaveSuccess) {
        onSaveSuccess(result.data || result);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save job posting");
    }
  };

  const isPending = isCreating || isUpdating || isUploading;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2 text-white/80 hover:bg-white/10 hover:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to List
        </Button>
        <h2 className="text-xl font-bold text-white">
          {job ? "Edit Job Posting" : "Post New Job"}
        </h2>
      </div>

      <Card className="glass-panel border-white/10 bg-white/5 shadow-2xl overflow-hidden">
        <CardHeader className="border-b border-white/10 bg-white/5 py-4">
          <CardTitle className="text-lg font-semibold text-white">
            Job Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          {/* Main Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label className="text-white/80 text-sm font-medium">Job Title <span className="text-[#F58220]">*</span></Label>
              <Input 
                placeholder="e.g. Senior Frontend Developer"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11 focus:border-[#F58220]/50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/80 text-sm font-medium">Department <span className="text-[#F58220]">*</span></Label>
              <Select
                value={formData.departmentId ? String(formData.departmentId) : ""}
                onValueChange={(value) => {
                  const dept = departments.find((d) => String(d.id) === value);
                  setFormData({
                    ...formData,
                    departmentId: dept ? dept.id : undefined,
                    department: dept ? dept.name : "",
                  });
                }}
              >
                <SelectTrigger className="bg-white/5 border-white/20 text-white h-11 focus:border-[#F58220]/50">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-white/20 text-white">
                  {departments.map((dept) => (
                    <SelectItem
                      key={dept.id}
                      value={String(dept.id)}
                      className="focus:bg-white/10 focus:text-white cursor-pointer"
                    >
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white/80 text-sm font-medium">Employment Type <span className="text-[#F58220]">*</span></Label>
              <Select value={formData.type} onValueChange={(v) => handleInputChange("type", v)}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white h-11 focus:border-[#F58220]/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-white/20 text-white">
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white/80 text-sm font-medium">Location <span className="text-[#F58220]">*</span></Label>
              <Input 
                placeholder="e.g. Remote, Dhaka, Hubrid"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11 focus:border-[#F58220]/50"
              />
            </div>
          </div>

          {/* Dates & Vacancy Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="space-y-2">
              <Label className="text-white/80 text-sm font-medium">Start Date</Label>
              <Input 
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className="bg-white/5 border-white/20 text-white h-11 focus:border-[#F58220]/50 [color-scheme:dark]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/80 text-sm font-medium">Expiry Date</Label>
              <Input 
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                className="bg-white/5 border-white/20 text-white h-11 focus:border-[#F58220]/50 [color-scheme:dark]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/80 text-sm font-medium">Vacancy</Label>
              <Input 
                type="number"
                min="1"
                value={formData.vacancy}
                onChange={(e) => handleInputChange("vacancy", parseInt(e.target.value) || 1)}
                className="bg-white/5 border-white/20 text-white h-11 focus:border-[#F58220]/50"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 pt-4">
            <Label className="text-white/80 text-sm font-medium">Job Description</Label>
            <Textarea 
              placeholder="Describe the role, responsibilities, and requirements..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={8}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-[#F58220]/50 resize-none leading-relaxed"
            />
          </div>

          {/* Image Upload */}
          <div className="pt-4">
            <Label className="text-white/80 text-sm font-medium mb-3 block">Job Highlight Image</Label>
            <div className="bg-white/5 border border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center gap-4">
              <ImageInput
                id="jobImage"
                label="Job Image"
                currentImage={job?.imageUrl}
                value={formData.imageUrl}
                onChange={(file, previewUrl) => {
                  setImageFile(file);
                  handleInputChange("imageUrl", previewUrl || "");
                }}
                onRemove={() => {
                  setImageFile(null);
                  handleInputChange("imageUrl", "");
                }}
                previewSize="w-64 h-36"
              />
              <p className="text-xs text-white/40">
                Recommended size: 1200x630. This image will appear on the job card.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-4 pt-8 border-t border-white/10">
            <Button
              variant="outline"
              disabled={isPending}
              onClick={onBack}
              className="border-white/20 text-white hover:bg-white/10 h-11 px-8 transition-all"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isPending}
              className="bg-[#F58220] hover:bg-[#F58220]/90 text-black font-bold h-11 px-10 shadow-lg shadow-[#F58220]/20 transition-all transform active:scale-95"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {job ? "Update Job Posting" : "Publish Job Posting"}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
