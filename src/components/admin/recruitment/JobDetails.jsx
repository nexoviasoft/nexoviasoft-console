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
  Save,
  Check
} from "lucide-react";
import { toast } from "sonner";
import {
  useUpdateJobPostingMutation,
  useDeleteJobPostingMutation,
  useGetCandidatesQuery,
  useCreateBulkInterviewsMutation,
} from "@/api/admin/recruitment/recruitmentApi";

/**
 * JobDetails Component
 * 
 * Displays detailed information about a job posting.
 */
export default function JobDetails({ job, onBack, onUpdate, onDelete, onEdit }) {
  const [deleteJobPosting] = useDeleteJobPostingMutation();
  const [updateJobPosting] = useUpdateJobPostingMutation();
  const { data: candidatesResponse } = useGetCandidatesQuery();
  
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [showBulkInviteDialog, setShowBulkInviteDialog] = useState(false);
  const [createBulkInterviews, { isLoading: isBulkCreating }] = useCreateBulkInterviewsMutation();
  const [bulkInterviewData, setBulkInterviewData] = useState({
    date: "",
    time: "",
    interviewer: "",
    type: "Technical",
    meetLink: "",
  });

  // Return null if no job data is provided
  if (!job) return null;

  const allCandidates = candidatesResponse?.data || [];
  /**
   * Filter candidates that match this job position
   */
  const applicants = allCandidates.filter(c => c.jobPostingId === job.id || c.position === job.title);

  /**
   * Handle job deletion
   */
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this job posting? This action cannot be undone.")) {
      try {
        await deleteJobPosting(job.id).unwrap();
        if (onDelete) {
          onDelete(job.id);
        }
        toast.success("Job posting deleted");
      } catch (error) {
        toast.error(error?.data?.message || "Failed to delete job posting");
      }
    }
  };

  /**
   * Handle toggling job status (Active/Inactive)
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

  const handleToggleSelection = (candidateId) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId) 
        : [...prev, candidateId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCandidates.length === applicants.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(applicants.map(c => c.id));
    }
  };

  const handleBulkInvite = async () => {
    if (!bulkInterviewData.date || !bulkInterviewData.time || !bulkInterviewData.interviewer) {
      toast.error("Please fill in all required fields (Date, Time, Interviewer)");
      return;
    }

    try {
      await createBulkInterviews({
        interview: {
          ...bulkInterviewData,
          position: job.title,
        },
        candidateIds: selectedCandidates,
      }).unwrap();
      
      toast.success("Interviews scheduled and emails sent successfully!");
      setShowBulkInviteDialog(false);
      setSelectedCandidates([]);
      setBulkInterviewData({
        date: "",
        time: "",
        interviewer: "",
        type: "Technical",
        meetLink: "",
      });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to schedule interviews");
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
      <div className="glass-card rounded-xl p-8 border border-white/10 bg-white/5">
        {/* Header section with title, status, and action buttons */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            {job.imageUrl ? (
              <div className="mb-5 overflow-hidden rounded-xl border border-white/10 bg-black/30 max-w-2xl">
                <img
                  src={job.imageUrl}
                  alt={`${job.title} image`}
                  className="h-64 w-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : null}
            {/* Job title and status badge */}
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-white">{job.title}</h1>
              <Badge
                variant={job.status === 'Active' ? 'success' : 'secondary'}
                className="bg-[#F58220]/10 text-[#F58220] border-[#F58220]/40"
              >
                {job.status}
              </Badge>
            </div>

            {/* Job metadata (department, location, type, posted date) */}
            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              <div className="flex items-center gap-1">
                <Briefcase className="w-4 h-4 text-[#F58220]" />
                {job.department}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#F58220]" />
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-[#F58220]" />
                {job.type}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-[#F58220]" />
                Vacancy: {job.vacancy || 1}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-[#F58220]" />
                Posted {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : '-'}
              </div>
              {job.expiryDate && (
                <div className="flex items-center gap-1 text-red-400 font-medium">
                  <Clock className="w-4 h-4" />
                  Expires {new Date(job.expiryDate).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            {/* Edit button */}
            <Button 
              onClick={onEdit}
              className="bg-[#F58220] hover:bg-[#F58220]/80 text-black font-medium"
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
        <div className="prose max-w-none text-white/70 mb-8 pt-6 border-t border-white/10">
          <h3 className="text-lg font-semibold text-white mb-2">
            Job Description
          </h3>
          <p className="whitespace-pre-line leading-relaxed">
            {job.description || "No description provided."}
          </p>
        </div>

        {/* Recent applicants section */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-[#F58220]" />
              Applicants ({applicants.length})
            </h3>
            {applicants.length > 0 && (
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                  className="text-white/70 border-white/20 hover:bg-white/10"
                >
                  {selectedCandidates.length === applicants.length ? "Deselect All" : "Select All"}
                </Button>
                {selectedCandidates.length > 0 && (
                  <Button
                    size="sm"
                    onClick={() => setShowBulkInviteDialog(true)}
                    className="bg-[#F58220] hover:bg-[#F58220]/80 text-black font-medium"
                  >
                    Bulk Invite ({selectedCandidates.length})
                  </Button>
                )}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applicants.length > 0 ? (
              applicants.map((applicant) => (
                <Card
                  key={applicant.id}
                  className={`relative cursor-pointer hover:shadow-lg transition-all border ${
                    selectedCandidates.includes(applicant.id) 
                      ? "bg-[#F58220]/10 border-[#F58220]/50 shadow-[#F58220]/5" 
                      : "bg-white/5 border-white/10"
                  }`}
                  onClick={() => handleToggleSelection(applicant.id)}
                >
                  <CardContent className="p-4">
                    <div className="absolute top-3 right-3">
                      <div className={`w-5 h-5 rounded border ${
                        selectedCandidates.includes(applicant.id)
                          ? "bg-[#F58220] border-[#F58220]"
                          : "border-white/20"
                      } flex items-center justify-center transition-all`}>
                        {selectedCandidates.includes(applicant.id) && (
                          <Check className="w-3 h-3 text-black font-bold" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-start gap-3 pt-2">
                      <Avatar className="h-10 w-10 ring-2 ring-white/5">
                        <AvatarFallback className="bg-[#F58220]/15 text-[#F58220] font-bold">
                          {applicant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm text-white truncate pr-6">
                          {applicant.name}
                        </p>
                        <p className="text-xs text-white/50 truncate">
                          {applicant.email}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1">
                          <Badge
                            variant="secondary"
                            className="text-[10px] px-2 h-5 bg-white/10 border-white/10 text-white/80"
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
              <div className="col-span-full py-12 text-center text-white/50 bg-white/5 rounded-xl border border-dashed border-white/10">
                No applicants found for this position yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bulk Invite Dialog */}
      <Dialog open={showBulkInviteDialog} onOpenChange={setShowBulkInviteDialog}>
        <DialogContent className="sm:max-w-[500px] glass-panel border-white/20 bg-[#121212] text-white p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-xl">Bulk Schedule Interviews</DialogTitle>
            <DialogDescription className="text-white/60">
              Scheduling interviews for {selectedCandidates.length} selected candidates for <strong>{job.title}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/80 font-medium">Date</Label>
                <Input
                  type="date"
                  value={bulkInterviewData.date}
                  onChange={(e) =>
                    setBulkInterviewData({ ...bulkInterviewData, date: e.target.value })
                  }
                  className="bg-white/5 border-white/20 text-white focus:border-[#F58220]/50 [color-scheme:dark]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white/80 font-medium">Time</Label>
                <Input
                  type="time"
                  value={bulkInterviewData.time}
                  onChange={(e) =>
                    setBulkInterviewData({ ...bulkInterviewData, time: e.target.value })
                  }
                  className="bg-white/5 border-white/20 text-white focus:border-[#F58220]/50 [color-scheme:dark]"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-white/80 font-medium">Interviewer</Label>
              <Input
                placeholder="Enter interviewer name"
                value={bulkInterviewData.interviewer}
                onChange={(e) =>
                  setBulkInterviewData({ ...bulkInterviewData, interviewer: e.target.value })
                }
                className="bg-white/5 border-white/20 text-white focus:border-[#F58220]/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/80 font-medium">Interview Type</Label>
                <Select
                  value={bulkInterviewData.type}
                  onValueChange={(v) => setBulkInterviewData({ ...bulkInterviewData, type: v })}
                >
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] border-white/20 text-white">
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Managerial">Managerial</SelectItem>
                    <SelectItem value="Culture Fit">Culture Fit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white/80 font-medium">Meeting Link (Optional)</Label>
                <Input
                  placeholder="Zoom/Google Meet link"
                  value={bulkInterviewData.meetLink}
                  onChange={(e) =>
                    setBulkInterviewData({ ...bulkInterviewData, meetLink: e.target.value })
                  }
                  className="bg-white/5 border-white/20 text-white focus:border-[#F58220]/50"
                />
              </div>
            </div>
          </div>
          
          <div className="p-6 pt-2 bg-white/5 border-t border-white/10 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowBulkInviteDialog(false)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBulkInvite}
              disabled={isBulkCreating}
              className="bg-[#F58220] hover:bg-[#F58220]/80 text-black font-bold"
            >
              {isBulkCreating ? "Scheduling..." : `Schedule ${selectedCandidates.length} Interviews`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
