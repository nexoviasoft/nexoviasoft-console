"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCreateBroadcastMutation } from "@/api/admin/broadcast/broadcastApi";

export default function CreateBroadcastDialog({ open, onOpenChange }) {
  const [createBroadcast, { isLoading: isCreating }] = useCreateBroadcastMutation();

  const [formData, setFormData] = useState({
    subject: "",
    content: "",
    tag: "",
  });

  useEffect(() => {
    if (!open) {
      setFormData({ subject: "", content: "", tag: "" });
    }
  }, [open]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.subject.trim()) return toast.error("Please enter a subject");
    if (!formData.content.trim()) return toast.error("Please enter the announcement content");

    try {
      await createBroadcast({
        subject: formData.subject.trim(),
        content: formData.content.trim(),
        tag: formData.tag?.trim() || undefined,
      }).unwrap();

      toast.success("Announcement created!");
      onOpenChange(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create announcement");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] w-[95vw] sm:w-full max-h-[85vh] overflow-y-auto bg-[#0A0A0A] border-white/20 text-white shadow-2xl p-3 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-white">New Announcement</DialogTitle>
          <DialogDescription className="text-white/70">
            Create a company-wide broadcast announcement.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right text-white">
                Subject <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3">
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className="bg-black/40 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                  placeholder="e.g., Q1 Town Hall Summary"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right text-white pt-2">
                Content <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3">
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  className="bg-black/40 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76] min-h-[140px]"
                  placeholder="Write your announcement..."
                  required
                />
                <p className="text-xs text-white/50 mt-1">
                  Keep it short and clear—everyone will see this.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tag" className="text-right text-white">
                Tag
              </Label>
              <div className="col-span-3">
                <Input
                  id="tag"
                  value={formData.tag}
                  onChange={(e) => handleInputChange("tag", e.target.value)}
                  className="bg-black/40 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                  placeholder="e.g., Important, HR, System"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating}
              className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black font-semibold"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Announcement"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

