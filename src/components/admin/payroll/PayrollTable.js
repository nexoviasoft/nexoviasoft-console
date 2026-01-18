"use client";

import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Download, MoreHorizontal, Send, Search } from "lucide-react";

const payrollData = [
  {
    id: 1,
    name: "Dipa Inhouse",
    role: "Visual Designer",
    avatar: "/avatars/01.png",
    salary: "$3,200.00",
    bonus: "$150.00",
    deductions: "-$50.00",
    netPay: "$3,300.00",
    status: "Paid",
    paymentDate: "Jan 28, 2026",
  },
  {
    id: 2,
    name: "Jane Cooper",
    role: "Product Manager",
    avatar: "/avatars/02.png",
    salary: "$4,500.00",
    bonus: "$0.00",
    deductions: "-$120.00",
    netPay: "$4,380.00",
    status: "Processing",
    paymentDate: "Pending",
  },
  {
    id: 3,
    name: "Floyd Miles",
    role: "Frontend Dev",
    avatar: "/avatars/03.png",
    salary: "$3,800.00",
    bonus: "$200.00",
    deductions: "-$100.00",
    netPay: "$3,900.00",
    status: "Pending",
    paymentDate: "-",
  },
  {
    id: 4,
    name: "Theresa Webb",
    role: "Marketing",
    avatar: "/avatars/04.png",
    salary: "$2,900.00",
    bonus: "$50.00",
    deductions: "-$25.00",
    netPay: "$2,925.00",
    status: "Paid",
    paymentDate: "Jan 28, 2026",
  },
  {
    id: 5,
    name: "Robert Fox",
    role: "Backend Dev",
    avatar: "/avatars/05.png",
    salary: "$4,000.00",
    bonus: "$300.00",
    deductions: "-$150.00",
    netPay: "$4,150.00",
    status: "Pending",
    paymentDate: "-",
  },
];

const StatusBadge = ({ status }) => {
  if (status === "Paid") {
    return (
      <Badge className="bg-emerald-500/15 text-emerald-200 border border-emerald-400/60 font-medium">
        Paid
      </Badge>
    );
  }
  if (status === "Processing") {
    return (
      <Badge className="bg-sky-500/15 text-sky-200 border border-sky-400/60 font-medium">
        Processing
      </Badge>
    );
  }
  return (
    <Badge className="bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/60 font-medium">
      Pending
    </Badge>
  );
};

export default function PayrollTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = payrollData.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 max-w-sm bg-black/40 border border-white/20 rounded-lg px-3 py-1 shadow-sm focus-within:border-[#EFFC76] transition-all">
        <Search className="w-4 h-4 text-white/40" />
        <Input 
          type="text" 
          placeholder="Search employees..." 
          className="border-0 bg-transparent shadow-none focus-visible:ring-0 px-0 h-8 text-sm text-white placeholder:text-white/40"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow>
              <TableHead className="w-[300px] text-white/70">Employee</TableHead>
              <TableHead className="text-white/70">Base Salary</TableHead>
              <TableHead className="text-white/70">Bonus</TableHead>
              <TableHead className="text-white/70">Deductions</TableHead>
              <TableHead className="font-bold text-white">Net Pay</TableHead>
              <TableHead className="text-white/70">Status</TableHead>
              <TableHead className="text-right text-white/70">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9 border border-white/20">
                        <AvatarImage src={row.avatar} />
                        <AvatarFallback className="bg-[#EFFC76]/20 text-[#EFFC76]">
                          {row.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-white">{row.name}</div>
                        <div className="text-xs text-white/60">{row.role}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white/80 font-medium">
                    {row.salary}
                  </TableCell>
                  <TableCell className="text-emerald-300 font-medium">
                    {row.bonus}
                  </TableCell>
                  <TableCell className="text-rose-300 font-medium">
                    {row.deductions}
                  </TableCell>
                  <TableCell className="font-bold text-[#EFFC76]">
                    {row.netPay}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={row.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {row.status === "Pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 glass-button border-white/30 
                          text-black hover:text-[#EFFC76] hover:bg-white/10"
                        >
                          <Send className="w-3 h-3 mr-1" />
                          Pay
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-white/50 hover:text-[#EFFC76] hover:bg-white/5"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-white/50 hover:text-[#EFFC76] hover:bg-white/5"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-white/60">
                  No employees found matching "{searchTerm}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
