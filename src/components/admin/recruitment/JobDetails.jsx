"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageInput from "@/components/input/ImageInput";
import { useUpload } from "@/hooks/useUpload";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  ArrowLeft, 
  Briefcase, 
  MapPin, 
  Clock, 
  Calendar, 
  Users,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Save
} from "lucide-react";
import { toast } from "sonner";
import {
  useUpdateJobPostingMutation,
  useDeleteJobPostingMutation,
  useGetCandidatesQuery,
} from "@/api/admin/recruitment/recruitmentApi";

/**
 * JobDetails Component
 * 
 * Displays detailed information about a job posting with edit capabilities.
 * Features:
 * - View job details (title, description, location, type, etc.)
 * - Edit job information via dialog
 * - Delete job posting
 * - Toggle job status (Active/Inactive)
 * - View recent applicants
 * 
 * @param {Object} props - Component props
 * @param {Object} props.job - Job posting object
 * @param {Function} props.onBack - Callback to navigate back to jobs list
 * @param {Function} props.onUpdate - Callback when job is updated
 * @param {Function} props.onDelete - Callback when job is deleted
 */
export default function JobDetails({ job, onBack, onUpdate, onDelete }) {
  const [updateJobPosting, { isLoading: isUpdating }] = useUpdateJobPostingMutation();
  const [deleteJobPosting, { isLoading: isDeleting }] = useDeleteJobPostingMutation();
  const { data: candidatesResponse } = useGetCandidatesQuery();
  const { uploadFile, isUploading } = useUpload({ folder: "job-postings" });
  
  // State management for edit dialog and form data
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedJob, setEditedJob] = useState(job);
  const [imageFile, setImageFile] = useState(null);

  // Return null if no job data is provided
  if (!job) return null;

  const allCandidates = candidatesResponse?.data || [];
  /**
   * Filter candidates that match this job position
   */
  const applicants = allCandidates.filter(c => c.jobPostingId === job.id || c.position === job.title);

  /**
   * Handle opening the edit dialog
   * Resets the form data to current job values
   */
  const handleEditClick = () => {
    setEditedJob({ ...job });
    setImageFile(null);
    setIsEditDialogOpen(true);
  };

  /**
   * Handle form input changes
   * Updates the editedJob state with new values
   * 
   * @param {string} field - The field name to update
   * @param {any} value - The new value for the field
   */
  const handleInputChange = (field, value) => {
    setEditedJob(prev => ({ ...prev, [field]: value }));
  };

  /**
   * Handle saving edited job data
   * Validates required fields and calls API
   */
  const handleSaveEdit = async () => {
    // Validation: Check required fields
    if (!editedJob.title?.trim()) {
      toast.error("Job title is required");
      return;
    }
    if (!editedJob.department?.trim()) {
      toast.error("Department is required");
      return;
    }

    try {
      let imageUrl = (editedJob.imageUrl || "").trim();
      if (imageFile) {
        toast.loading("Uploading image...", { id: "upload-job-image" });
        imageUrl = await uploadFile(imageFile);
        toast.success("Image uploaded", { id: "upload-job-image" });
      }

      const updated = await updateJobPosting({
        id: job.id,
        ...editedJob,
        imageUrl,
        postedDate: editedJob.postedDate ? new Date(editedJob.postedDate).toISOString().split('T')[0] : job.postedDate,
      }).unwrap();
      
      // Call parent update handler
      if (onUpdate) {
        onUpdate(updated.data || updated);
      }

      // Show success message and close dialog
      toast.success("Job posting updated successfully");
      setIsEditDialogOpen(false);
      setImageFile(null);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update job posting");
    }
  };

  /**
   * Handle job deletion
   * Shows confirmation and calls API
   */
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this job posting? This action cannot be undone.")) {
      try {
        await deleteJobPosting(job.id).unwrap();
        if (onDelete) {
          onDelete(job.id);
        }
        toast.success("Job posting deleted");
        onBack(); // Navigate back to jobs list
      } catch (error) {
        toast.error(error?.data?.message || "Failed to delete job posting");
      }
    }
  };

  /**
   * Handle toggling job status (Active/Inactive)
   * Updates the job status via API
   */
  const handleToggleStatus = async () => {
    const newStatus = job.status === 'Active' ? 'Inactive' : 'Active';
    
    try {
      const updated = await updateJobPosting({
        id: job.id,
        status: newStatus,
      }).unwrap();
      
      if (onUpdate) {
        onUpdate(updated.data || updated);
      }

      toast.success(`Job posting ${newStatus === 'Active' ? 'activated' : 'deactivated'}`);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update job status");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="gap-2 text-white/80 hover:bg-white/10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Jobs
      </Button>

      {/* Main job details card */}
      <div className="glass-card rounded-xl p-8">
        {/* Header section with title, status, and action buttons */}
        <div className="flex items-start justify-between mb-6">
          <div>
            {job.imageUrl ? (
              <div className="mb-5 overflow-hidden rounded-xl border border-white/10 bg-black/30">
                <img
                  src={job.imageUrl}
                  alt={`${job.title} image`}
                  className="h-44 w-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : null}
            {/* Job title and status badge */}
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-white">{job.title}</h1>
              <Badge
                variant={job.status === 'Active' ? 'success' : 'secondary'}
                className="bg-[#EFFC76]/10 text-[#EFFC76] border-[#EFFC76]/40"
              >
                {job.status}
              </Badge>
            </div>

            {/* Job metadata (department, location, type, posted date) */}
            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              <div className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {job.department}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {job.type}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Posted {job.postedDate}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            {/* Edit button */}
            <Button 
              onClick={handleEditClick}
              className="bg-[#EFFC76] hover:bg-[#dce865] text-black"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Job
            </Button>

            {/* More actions dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:bg-white/10"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-white/10 text-white">
                <DropdownMenuItem onClick={handleToggleStatus} className="cursor-pointer hover:bg-white/10">
                  {job.status === 'Active' ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Deactivate Job
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Activate Job
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem 
                  onClick={handleDelete}
                  className="cursor-pointer text-red-400 hover:bg-red-400/10 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Job
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Job description section */}
        <div className="prose max-w-none text-white/70 mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">
            Job Description
          </h3>
          <p className="whitespace-pre-line leading-relaxed">
            {job.description || "No description provided."}
          </p>
        </div>

        {/* Recent applicants section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Recent Applicants ({applicants.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applicants.length > 0 ? (
              applicants.map((applicant) => (
                <Card
                  key={applicant.id}
                  className="cursor-pointer hover:shadow-md transition-all bg-white/5 border border-white/10"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-[#EFFC76]/15 text-[#EFFC76]">
                          {applicant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm text-white">
                          {applicant.name}
                        </p>
                        <p className="text-xs text-white/70">
                          {applicant.email}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <Badge
                            variant="secondary"
                            className="text-[10px] px-1.5 h-5 bg-white/5 border-white/20 text-white/80"
                          >
                            {applicant.stage}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-white/70 bg-white/5 rounded-lg border border-dashed border-white/20">
                No applicants found for this position yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Job Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl glass-card border-white/20 text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Job Posting</DialogTitle>
            <DialogDescription className="text-white/60">
              Update the job details below. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Job Title */}
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-white">
                Job Title <span className="text-red-400">*</span>
              </Label>
              <Input
                id="title"
                value={editedJob.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Senior Frontend Developer"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>

            {/* Department and Location */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="department" className="text-white">
                  Department <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="department"
                  value={editedJob.department || ''}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  placeholder="e.g., Engineering"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location" className="text-white">Location</Label>
                <Select
                  value={editedJob.location || ''}
                  onValueChange={(value) => handleInputChange('location', value)}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="On-site">On-site</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Job Type and Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type" className="text-white">Job Type</Label>
                <Select
                  value={editedJob.type || ''}
                  onValueChange={(value) => handleInputChange('type', value)}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status" className="text-white">Status</Label>
                <Select
                  value={editedJob.status || ''}
                  onValueChange={(value) => handleInputChange('status', value)}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Job Description */}
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-white">
                Job Description
              </Label>
              <Textarea
                id="description"
                value={editedJob.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the role, responsibilities, and requirements..."
                className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-white/40 resize-none"
              />
            </div>

            {/* Job Image */}
            <div className="grid gap-2">
              <ImageInput
                id="jobImageEdit"
                label="Job Image"
                currentImage={job.imageUrl}
                value={editedJob.imageUrl || ""}
                onChange={(file, previewUrl) => {
                  setImageFile(file);
                  handleInputChange("imageUrl", previewUrl || "");
                }}
                onRemove={() => {
                  setImageFile(null);
                  handleInputChange("imageUrl", "");
                }}
                previewSize="w-44 h-28"
              />
            </div>
          </div>

          {/* Dialog Footer with action buttons */}
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-white/20 hover:bg-white/10 text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              disabled={isUpdating || isUploading}
              className="bg-[#EFFC76] hover:bg-[#dce865] text-black"
            >
              <Save className="w-4 h-4 mr-2" />
              {isUpdating || isUploading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
