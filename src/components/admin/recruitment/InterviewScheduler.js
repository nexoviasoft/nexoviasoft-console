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
          <h3 className="text-lg font-semibold">Upcoming Interviews</h3>
          <Button onClick={() => setShowDialog(true)} className="bg-purple-600 hover:bg-purple-700">
            Schedule Interview
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {interviews.map((interview) => (
            <Card key={interview.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{interview.candidate}</CardTitle>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {interview.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{interview.position}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{interview.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{interview.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{interview.interviewer}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Video className="w-4 h-4 text-gray-400" />
                  <span>{interview.type}</span>
                </div>
                <div className="flex gap-2 pt-3 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Join Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Candidate Name</Label>
              <Input 
                placeholder="Enter candidate name"
                value={formData.candidate}
                onChange={(e) => setFormData({...formData, candidate: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input 
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input 
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Interviewer</Label>
              <Input 
                placeholder="Enter interviewer name"
                value={formData.interviewer}
                onChange={(e) => setFormData({...formData, interviewer: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Interview Type</Label>
              <Select value={formData.type} onValueChange={(v) => setFormData({...formData, type: v})}>
                <SelectTrigger>
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
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={handleSchedule}>Schedule Interview</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
