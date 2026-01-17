"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, Phone, Calendar, FileText, Clock, User, ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";

export default function CandidateDetails({ candidate, onBack }) {
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [notes, setNotes] = useState("");

  if (!candidate) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-white/70">Select a candidate to view details</p>
      </div>
    );
  }

  const handleSendEmail = () => {
    toast.success(`Email sent to ${candidate.name}`);
    setShowEmailDialog(false);
  };

  const handleAddNote = () => {
    if (notes.trim()) {
      toast.success("Note added successfully");
      setNotes("");
    }
  };

  return (
    <>
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2 text-white/80 hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Pipeline
        </Button>

        <Card className="glass-card border-white/20">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-[#EFFC76]/15 text-[#EFFC76] text-xl">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl text-white">
                    {candidate.name}
                  </CardTitle>
                  <p className="text-white/70">{candidate.position}</p>
                </div>
              </div>
              <Badge className="text-sm bg-[#EFFC76]/10 text-[#EFFC76] border-[#EFFC76]/40">
                {candidate.stage}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white/60" />
                <div>
                  <p className="text-xs text-white/60">Email</p>
                  <p className="font-medium text-white">{candidate.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white/60" />
                <div>
                  <p className="text-xs text-white/60">Phone</p>
                  <p className="font-medium text-white">{candidate.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-white/60" />
                <div>
                  <p className="text-xs text-white/60">Applied Date</p>
                  <p className="font-medium text-white">
                    {candidate.appliedDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-white/60" />
                <div>
                  <p className="text-xs text-white/60">Experience</p>
                  <p className="font-medium text-white">
                    {candidate.experience}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-white">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="bg-white/5 border-white/20 text-white/80"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-white/10">
              <Button
                onClick={() => setShowEmailDialog(true)}
                className="gap-2 bg-white hover:bg-white/90 text-black"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </Button>
              <Button
                variant="outline"
                className="bg-white hover:bg-white/90 text-black"
              >
                Schedule Interview
              </Button>
              <Button
                variant="outline"
                className="bg-white hover:bg-white/90 text-black"
              >
                Download Resume
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Interview Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="Add notes about the candidate..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
            />
            <Button
              onClick={handleAddNote}
              className="bg-white hover:bg-white/90 text-black"
            >
              Add Note
            </Button>
            
            <div className="space-y-3 mt-6">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm text-white">
                    Initial Screening
                  </span>
                  <span className="text-xs text-white/60">2026-01-13</span>
                </div>
                <p className="text-sm text-white/70">
                  Strong technical background. Good communication skills. Recommended for technical interview.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="glass-panel border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">
              Send Email to {candidate.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-white/70">
              This will open your email client with a pre-filled message to {candidate.email}
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowEmailDialog(false)}
              className="bg-white hover:bg-white/90 text-black"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendEmail}
              className="gap-2 bg-white hover:bg-white/90 text-black"
            >
              <Send className="w-4 h-4" />
              Send Email
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
