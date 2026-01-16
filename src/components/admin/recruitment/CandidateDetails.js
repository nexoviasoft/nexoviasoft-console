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
        <p className="text-gray-500">Select a candidate to view details</p>
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
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Pipeline
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-purple-100 text-purple-600 text-xl">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{candidate.name}</CardTitle>
                  <p className="text-gray-500">{candidate.position}</p>
                </div>
              </div>
              <Badge className="text-sm">{candidate.stage}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium">{candidate.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-medium">{candidate.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Applied Date</p>
                  <p className="font-medium">{candidate.appliedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Experience</p>
                  <p className="font-medium">{candidate.experience}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, idx) => (
                  <Badge key={idx} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={() => setShowEmailDialog(true)} className="gap-2">
                <Mail className="w-4 h-4" />
                Send Email
              </Button>
              <Button variant="outline">Schedule Interview</Button>
              <Button variant="outline">Download Resume</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interview Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="Add notes about the candidate..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
            <Button onClick={handleAddNote}>Add Note</Button>
            
            <div className="space-y-3 mt-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">Initial Screening</span>
                  <span className="text-xs text-gray-500">2026-01-13</span>
                </div>
                <p className="text-sm text-gray-600">
                  Strong technical background. Good communication skills. Recommended for technical interview.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Email to {candidate.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600">
              This will open your email client with a pre-filled message to {candidate.email}
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowEmailDialog(false)}>Cancel</Button>
            <Button onClick={handleSendEmail} className="gap-2">
              <Send className="w-4 h-4" />
              Send Email
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
