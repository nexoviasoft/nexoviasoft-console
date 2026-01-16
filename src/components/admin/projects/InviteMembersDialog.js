"use client";

import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check } from "lucide-react";

export default function InviteMembersDialog({ open, onOpenChange }) {
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  
  // Mock users
  const users = [
    { id: "1", name: "Sarah Connor", email: "sarah@example.com", avatar: "/avatars/01.png" },
    { id: "2", name: "John Doe", email: "john@example.com", avatar: "/avatars/02.png" },
    { id: "3", name: "Kyle Reese", email: "kyle@example.com", avatar: "/avatars/03.png" },
    { id: "4", name: "T-800", email: "arnold@example.com", avatar: "/avatars/04.png" },
  ];

  const toggleUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Invite Team Members</DialogTitle>
          <DialogDescription>
            Add members to this project. They will receive notifications and access.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
            <Label className="mb-2 block">Search People</Label>
            <div className="border rounded-md">
                <div className="p-2 border-b">
                   <Input placeholder="Search by name or email..." className="border-none shadow-none focus-visible:ring-0 px-0 h-auto" />
                </div>
                <div className="max-h-[200px] overflow-y-auto p-1">
                    {users.map((user) => (
                        <div 
                            key={user.id} 
                            className={`flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer ${selectedUsers.includes(user.id) ? 'bg-purple-50' : ''}`}
                            onClick={() => toggleUser(user.id)}
                        >
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>{user.name.substring(0,2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                            </div>
                            {selectedUsers.includes(user.id) && <Check className="h-4 w-4 text-purple-600" />}
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <DialogFooter>
           <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
           <Button type="submit">Invite {selectedUsers.length > 0 ? `(${selectedUsers.length})` : ''}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
