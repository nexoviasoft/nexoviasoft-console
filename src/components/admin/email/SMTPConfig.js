"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function SMTPConfig({ open, onOpenChange }) {
  const [config, setConfig] = useState({
    host: "",
    port: "587",
    username: "",
    password: "",
    fromEmail: ""
  });

  useEffect(() => {
    if (open) {
      const saved = localStorage.getItem("smtp_config");
      if (saved) {
        setConfig(JSON.parse(saved));
      }
    }
  }, [open]);

  const handleSave = () => {
    localStorage.setItem("smtp_config", JSON.stringify(config));
    toast.success("SMTP configuration saved successfully!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>SMTP Configuration</DialogTitle>
          <DialogDescription>
            Configure your SMTP server settings for sending emails
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>SMTP Host</Label>
            <Input 
              placeholder="smtp.gmail.com" 
              value={config.host}
              onChange={(e) => setConfig({...config, host: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Port</Label>
              <Input 
                placeholder="587" 
                value={config.port}
                onChange={(e) => setConfig({...config, port: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>From Email</Label>
              <Input 
                type="email"
                placeholder="alerts@company.com" 
                value={config.fromEmail}
                onChange={(e) => setConfig({...config, fromEmail: e.target.value})}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Username</Label>
            <Input 
              placeholder="your-email@gmail.com" 
              value={config.username}
              onChange={(e) => setConfig({...config, username: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Password</Label>
            <Input 
              type="password"
              placeholder="••••••••" 
              value={config.password}
              onChange={(e) => setConfig({...config, password: e.target.value})}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Configuration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
