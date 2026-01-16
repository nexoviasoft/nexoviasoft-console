"use client";

import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewProjectDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Start a new project board. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" placeholder="E.g., Website Redesign" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea id="description" placeholder="Project goals and scope..." className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="team" className="text-right">
              Team
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="design">Design Team</SelectItem>
                <SelectItem value="development">Development Team</SelectItem>
                <SelectItem value="marketing">Marketing Team</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lead" className="text-right">
              Lead
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select project lead" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sojib">Sojib (You)</SelectItem>
                <SelectItem value="alex">Alex Johnson</SelectItem>
                <SelectItem value="maria">Maria Garcia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit">Create Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
