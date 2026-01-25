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
      <DialogContent className="sm:max-w-[500px] glass-panel border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white">SMTP Configuration</DialogTitle>
          <DialogDescription className="text-white/70">
            Configure your SMTP server settings for sending emails
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-white/80">SMTP Host</Label>
            <Input 
              placeholder="smtp.gmail.com" 
              value={config.host}
              onChange={(e) => setConfig({...config, host: e.target.value})}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white/80">Port</Label>
              <Input 
                placeholder="587" 
                value={config.port}
                onChange={(e) => setConfig({...config, port: e.target.value})}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/80">From Email</Label>
              <Input 
                type="email"
                placeholder="alerts@company.com" 
                value={config.fromEmail}
                onChange={(e) => setConfig({...config, fromEmail: e.target.value})}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-white/80">Username</Label>
            <Input 
              placeholder="your-email@gmail.com" 
              value={config.username}
              onChange={(e) => setConfig({...config, username: e.target.value})}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-white/80">Password</Label>
            <Input 
              type="password"
              placeholder="••••••••" 
              value={config.password}
              onChange={(e) => setConfig({...config, password: e.target.value})}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-[#EFFC76] text-[#EFFC76] hover:bg-[#EFFC76]/10 bg-transparent hover:text-[#EFFC76]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#EFFC76] hover:bg-[#EFFC76]/80 text-black font-medium"
          >
            Save Configuration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
