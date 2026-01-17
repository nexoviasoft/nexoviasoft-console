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
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                  {job.status}
                </Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(job)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg">{job.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Briefcase className="w-4 h-4" />
                {job.department}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                {job.type}
              </div>
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-2 text-sm font-medium text-purple-600">
                  <Users className="w-4 h-4" />
                  {job.applicants} applicants
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onViewDetails && onViewDetails(job)}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingJob ? 'Edit Job' : 'Post New Job'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input 
                placeholder="e.g. Senior Frontend Developer"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Department</Label>
                <Input 
                  placeholder="e.g. Engineering"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Employment Type</Label>
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
              <Label>Location</Label>
              <Input 
                placeholder="e.g. Remote, San Francisco, Hybrid"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Job Description</Label>
              <Textarea 
                placeholder="Describe the role, responsibilities, and requirements..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={6}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={handleSave}>
              {editingJob ? 'Update Job' : 'Post Job'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
