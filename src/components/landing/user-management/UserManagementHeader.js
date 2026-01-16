"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddUserDialog from "./AddUserDialog";

export default function UserManagementHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage access, roles, and permissions for your team.
        </p>
      </div>

      <AddUserDialog open={open} onOpenChange={setOpen}>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </Button>
      </AddUserDialog>
    </div>
  );
}
