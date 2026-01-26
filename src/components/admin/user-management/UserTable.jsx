"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit2, Trash2, Shield } from "lucide-react";

const users = [
  {
    id: 1,
    name: "Dipa Inhouse",
    email: "dipa@squadlog.com",
    role: "Administrator",
    avatar: "/avatars/01.png",
    status: "Active",
    lastActive: "Now",
  },
  {
    id: 2,
    name: "Jane Cooper",
    email: "jane@squadlog.com",
    role: "Manager",
    avatar: "/avatars/02.png",
    status: "Active",
    lastActive: "2 min ago",
  },
  {
    id: 3,
    name: "Floyd Miles",
    email: "floyd@squadlog.com",
    role: "Team Member",
    avatar: "/avatars/03.png",
    status: "Inactive",
    lastActive: "2 days ago",
  },
  {
    id: 4,
    name: "Theresa Webb",
    email: "theresa@squadlog.com",
    role: "Team Member",
    avatar: "/avatars/04.png",
    status: "Active",
    lastActive: "1 hour ago",
  },
];

const RoleBadge = ({ role }) => {
  const styles = {
    Administrator: "bg-purple-100 text-purple-700",
    Manager: "bg-blue-100 text-blue-700",
    "Team Member": "bg-gray-100 text-gray-700",
  };
  return (
    <Badge className={`${styles[role] || "bg-gray-100"} font-medium border-0 shadow-none flex w-fit items-center gap-1`}>
       {role === "Administrator" && <Shield className="w-3 h-3" />}
       {role}
    </Badge>
  );
};

export default function UserTable() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[300px]">User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-gray-50/50">
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="w-9 h-9 border border-gray-100">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <RoleBadge role={user.role} />
              </TableCell>
              <TableCell>
                 <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                   {user.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>}
                   {user.status}
                 </span>
              </TableCell>
              <TableCell className="text-gray-500">{user.lastActive}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                   <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-900">
                     <Edit2 className="w-4 h-4" />
                   </Button>
                   <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50">
                     <Trash2 className="w-4 h-4" />
                   </Button>
                   <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-900">
                     <MoreHorizontal className="w-4 h-4" />
                   </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
