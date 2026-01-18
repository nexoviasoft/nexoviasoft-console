"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, User, Video } from "lucide-react";
import { toast } from "sonner";

const upcomingInterviews = [
  {
    id: 1,
    candidate: "David Kim",
    position: "DevOps Engineer",
    date: "2026-01-17",
    time: "10:00 AM",
    interviewer: "John Smith",
    type: "Technical",
    status: "Scheduled"
  },
  {
    id: 2,
    candidate: "Lisa Anderson",
    position: "Product Designer",
    date: "2026-01-17",
    time: "2:00 PM",
    interviewer: "Sarah Johnson",
    type: "Final Round",
    status: "Scheduled"
  },
  {
    id: 3,
    candidate: "Emily Rodriguez",
    position: "Product Designer",
    date: "2026-01-18",
    time: "11:00 AM",
    interviewer: "Mike Chen",
    type: "Portfolio Review",
    status: "Scheduled"
  }
];

export default function InterviewScheduler() {
  const [showDialog, setShowDialog] = useState(false);
  const [interviews, setInterviews] = useState(upcomingInterviews);
  const [formData, setFormData] = useState({
    candidate: "",
    date: "",
    time: "",
    interviewer: "",
    type: "Technical"
  });

  const handleSchedule = () => {
    const newInterview = {
      id: interviews.length + 1,
      ...formData,
      status: "Scheduled"
    };
    setInterviews([...interviews, newInterview]);
    toast.success("Interview scheduled successfully!");
    setShowDialog(false);
    setFormData({ candidate: "", date: "", time: "", interviewer: "", type: "Technical" });
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Upcoming Interviews</h3>
          <Button
            onClick={() => setShowDialog(true)}
            className="bg-white hover:bg-white/90 text-black"
          >
            Schedule Interview
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {interviews.map((interview) => (
            <Card
              key={interview.id}
              className="glass-card border-white/20 hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base text-white">
                    {interview.candidate}
                  </CardTitle>
                  <span className="text-xs bg-[#EFFC76]/10 text-[#EFFC76] px-2 py-1 rounded border border-[#EFFC76]/40">
                    {interview.status}
                  </span>
                </div>
                <p className="text-sm text-white/70">{interview.position}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Calendar className="w-4 h-4 text-white/60" />
                  <span>{interview.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Clock className="w-4 h-4 text-white/60" />
                  <span>{interview.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <User className="w-4 h-4 text-white/60" />
                  <span>{interview.interviewer}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Video className="w-4 h-4 text-white/60" />
                  <span>{interview.type}</span>
                </div>
                <div className="flex gap-2 pt-3 border-t border-white/10">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-white hover:bg-white/90 text-black"
                  >
                    Reschedule
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-white hover:bg-white/90 text-black"
                  >
                    Join Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[500px] glass-panel border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">Schedule Interview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-white/80">Candidate Name</Label>
              <Input 
                placeholder="Enter candidate name"
                value={formData.candidate}
                onChange={(e) => setFormData({...formData, candidate: e.target.value})}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/80">Date</Label>
                <Input 
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">Time</Label>
                <Input 
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white/80">Interviewer</Label>
              <Input 
                placeholder="Enter interviewer name"
                value={formData.interviewer}
                onChange={(e) => setFormData({...formData, interviewer: e.target.value})}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/80">Interview Type</Label>
              <Select value={formData.type} onValueChange={(v) => setFormData({...formData, type: v})}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Behavioral">Behavioral</SelectItem>
                  <SelectItem value="Portfolio Review">Portfolio Review</SelectItem>
                  <SelectItem value="Final Round">Final Round</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDialog(false)}
              className="bg-white hover:bg-white/90 text-black"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSchedule}
              className="bg-white hover:bg-white/90 text-black"
            >
              Schedule Interview
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
