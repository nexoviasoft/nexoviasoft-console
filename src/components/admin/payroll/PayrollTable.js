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
import { Download, MoreHorizontal, Send } from "lucide-react";

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
  const styles = {
    Paid: "bg-green-100 text-green-700 hover:bg-green-200",
    Processing: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    Pending: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
  };
  return <Badge className={`${styles[status] || "bg-gray-100"} font-medium border-0 shadow-none`}>{status}</Badge>;
};

export default function PayrollTable() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[300px]">Employee</TableHead>
            <TableHead>Base Salary</TableHead>
            <TableHead>Bonus</TableHead>
            <TableHead>Deductions</TableHead>
            <TableHead className="font-bold text-gray-900">Net Pay</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payrollData.map((row) => (
            <TableRow key={row.id} className="hover:bg-gray-50/50">
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="w-9 h-9 border border-gray-100">
                    <AvatarImage src={row.avatar} />
                    <AvatarFallback>{row.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">{row.name}</div>
                    <div className="text-xs text-gray-500">{row.role}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-gray-600 font-medium">{row.salary}</TableCell>
              <TableCell className="text-green-600 font-medium">{row.bonus}</TableCell>
              <TableCell className="text-red-500 font-medium">{row.deductions}</TableCell>
              <TableCell className="font-bold text-gray-900">{row.netPay}</TableCell>
              <TableCell>
                <StatusBadge status={row.status} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                   {row.status === "Pending" && (
                     <Button size="sm" variant="outline" className="h-8 text-green-600 border-green-200 hover:bg-green-50">
                       <Send className="w-3 h-3 mr-1" /> Pay
                     </Button>
                   )}
                   <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-900">
                     <Download className="w-4 h-4" />
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
