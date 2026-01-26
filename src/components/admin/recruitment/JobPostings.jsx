"use client";

import React, { useState } from "react";
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

const initialJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
    status: "Active",
    applicants: 24,
    postedDate: "2026-01-10",
    description: "We're looking for an experienced frontend developer..."
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    type: "Full-time",
    location: "San Francisco, CA",
    status: "Active",
    applicants: 18,
    postedDate: "2026-01-08",
    description: "Join our design team to create amazing user experiences..."
  },
  {
    id: 3,
    title: "DevOps Engineer",
    department: "Engineering",
    type: "Contract",
    location: "Hybrid",
    status: "Active",
    applicants: 12,
    postedDate: "2026-01-05",
    description: "Help us build and maintain our cloud infrastructure..."
  }
];

export default function JobPostings({ onNewJob, onViewDetails }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [showDialog, setShowDialog] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    type: "Full-time",
    location: "",
    description: ""
  });

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      type: job.type,
      location: job.location,
      description: job.description
    });
    setShowDialog(true);
  };

  const handleSave = () => {
    if (editingJob) {
      setJobs(jobs.map(j => j.id === editingJob.id ? { ...j, ...formData } : j));
      toast.success("Job updated successfully!");
    } else {
      const newJob = {
        id: jobs.length + 1,
        ...formData,
        status: "Active",
        applicants: 0,
        postedDate: new Date().toISOString().split('T')[0]
      };
      setJobs([...jobs, newJob]);
      toast.success("Job posted successfully!");
    }
    setShowDialog(false);
    setEditingJob(null);
    setFormData({ title: "", department: "", type: "Full-time", location: "", description: "" });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="glass-card border-white/20 hover:shadow-lg transition-shadow">
            <CardHeader className="p-3 sm:p-6 pb-2 sm:pb-3">
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
                  {job.applicants} applicants
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
                <Input 
                  placeholder="e.g. Engineering"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                />
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
              className="bg-[#EFFC76] hover:bg-[#EFFC76]/80 text-black font-medium"
            >
              {editingJob ? 'Update Job' : 'Post Job'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
