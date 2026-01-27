"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, MapPin, Clock, Users, Edit, Eye } from "lucide-react";
import { toast } from "sonner";
import ImageInput from "@/components/input/ImageInput";
import { useUpload } from "@/hooks/useUpload";
import {
  useGetJobPostingsQuery,
  useCreateJobPostingMutation,
  useUpdateJobPostingMutation,
  useDeleteJobPostingMutation,
} from "@/api/admin/recruitment/recruitmentApi";
import { useGetDepartmentsQuery } from "@/api/landing/department/departmentApi";

export default function JobPostings({ onNewJob, onViewDetails }) {
  const { data: jobsResponse, isLoading, error } = useGetJobPostingsQuery();
  const [createJobPosting, { isLoading: isCreating }] = useCreateJobPostingMutation();
  const [updateJobPosting, { isLoading: isUpdating }] = useUpdateJobPostingMutation();
  const [deleteJobPosting] = useDeleteJobPostingMutation();
  const { uploadFile, isUploading } = useUpload({ folder: "job-postings" });

  const { data: departmentsResponse } = useGetDepartmentsQuery();
  const departments = departmentsResponse?.data || departmentsResponse || [];

  const jobs = jobsResponse?.data || [];
  const [showDialog, setShowDialog] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const emptyForm = {
    title: "",
    department: "",
    departmentId: undefined,
    type: "Full-time",
    location: "",
    description: "",
    imageUrl: "",
  };
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    departmentId: undefined,
    type: "Full-time",
    location: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (onNewJob !== undefined && onNewJob !== null) {
      setShowDialog(true);
      setEditingJob(null);
      setFormData(emptyForm);
      setImageFile(null);
    }
  }, [onNewJob]);

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      department: job.departmentEntity?.name || job.department,
      departmentId: job.departmentId,
      type: job.type,
      location: job.location,
      description: job.description || "",
      imageUrl: job.imageUrl || "",
    });
    setImageFile(null);
    setShowDialog(true);
  };

  const handleSave = async () => {
    try {
      const title = (formData.title || "").trim();
      const location = (formData.location || "").trim();
      const department = (formData.department || "").trim();
      const hasDept = Boolean(formData.departmentId) || department.length > 0;

      if (!title || !location || !formData.type || !hasDept) {
        toast.error("Please fill in Job Title, Department, Employment Type, and Location.");
        return;
      }

      let imageUrl = (formData.imageUrl || "").trim();
      if (imageFile) {
        toast.loading("Uploading image...", { id: "upload-job-image" });
        imageUrl = await uploadFile(imageFile);
        toast.success("Image uploaded", { id: "upload-job-image" });
      }

      if (editingJob) {
        await updateJobPosting({
          id: editingJob.id,
          ...formData,
          title,
          location,
          department,
          imageUrl,
          status: editingJob.status || "Active",
        }).unwrap();
        toast.success("Job updated successfully!");
      } else {
        await createJobPosting({
          ...formData,
          title,
          location,
          department,
          imageUrl,
          status: "Active",
          postedDate: new Date().toISOString().split('T')[0],
        }).unwrap();
        toast.success("Job posted successfully!");
      }
      setShowDialog(false);
      setEditingJob(null);
      setFormData(emptyForm);
      setImageFile(null);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save job posting");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      try {
        await deleteJobPosting(id).unwrap();
        toast.success("Job posting deleted successfully!");
      } catch (error) {
        toast.error(error?.data?.message || "Failed to delete job posting");
      }
    }
  };

  if (isLoading) {
    return <div className="text-white/70">Loading job postings...</div>;
  }

  if (error) {
    return <div className="text-red-400">Error loading job postings</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="glass-card border-white/20 hover:shadow-lg transition-shadow">
            <CardHeader className="p-3 sm:p-6 pb-2 sm:pb-3">
              {job.imageUrl ? (
                <div className="mb-3 overflow-hidden rounded-lg border border-white/10 bg-black/30">
                  <img
                    src={job.imageUrl}
                    alt={`${job.title} image`}
                    className="h-28 w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : null}
              <div className="flex justify-between items-start mb-2 gap-2">
                <Badge
                  variant={job.status === 'Active' ? 'default' : 'secondary'}
                  className="bg-[#EFFC76]/10 text-[#EFFC76] border-[#EFFC76]/40 text-[10px] sm:text-xs shrink-0"
                >
                  {job.status}
                </Badge>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 sm:h-8 sm:w-8 text-white/70 hover:bg-white/10"
                    onClick={() => handleEdit(job)}
                  >
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-sm sm:text-lg text-white truncate">{job.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0 space-y-2 sm:space-y-3">
              <div className="grid grid-cols-2 sm:flex sm:flex-col gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                  <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="truncate">{job.department}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70 col-span-2 sm:col-span-1">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="truncate">{job.type}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-white/10">
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-[#EFFC76]">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  {job.applicants || 0} applicants
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onViewDetails && onViewDetails(job)}
                  className="bg-[#EFFC76] hover:bg-[#EFFC76]/80 text-black border-none h-7 sm:h-9 text-[10px] sm:text-sm px-2 sm:px-4"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[600px] glass-panel border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingJob ? 'Edit Job' : 'Post New Job'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-white/80">Job Title</Label>
              <Input 
                placeholder="e.g. Senior Frontend Developer"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
              <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/80">Department</Label>
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
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
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
                <Label className="text-white/80">Employment Type</Label>
                <Select value={formData.type} onValueChange={(v) => setFormData({...formData, type: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white/80">Location</Label>
              <Input 
                placeholder="e.g. Remote, San Francisco, Hybrid"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/80">Job Description</Label>
              <Textarea 
                placeholder="Describe the role, responsibilities, and requirements..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={6}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
              />
            </div>

            <div className="space-y-2">
              <ImageInput
                id="jobImage"
                label="Job Image"
                currentImage={editingJob?.imageUrl}
                value={formData.imageUrl}
                onChange={(file, previewUrl) => {
                  setImageFile(file);
                  setFormData({ ...formData, imageUrl: previewUrl || "" });
                }}
                onRemove={() => {
                  setImageFile(null);
                  setFormData({ ...formData, imageUrl: "" });
                }}
                previewSize="w-40 h-24"
              />
              <p className="text-xs text-white/50">
                Optional. This image will appear on the job card and details page.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDialog(false)}
              className="border-[#EFFC76] text-[#EFFC76] hover:bg-[#EFFC76]/10 bg-transparent hover:text-[#EFFC76]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isCreating || isUpdating || isUploading}
              className="bg-[#EFFC76] hover:bg-[#EFFC76]/80 text-black font-medium"
            >
              {isCreating || isUpdating || isUploading ? 'Saving...' : editingJob ? 'Update Job' : 'Post Job'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
