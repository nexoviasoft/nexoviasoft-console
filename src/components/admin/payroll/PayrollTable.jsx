"use client";

import React, { useMemo, useState } from "react";
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
import { useGetPayrollQuery, useMarkPayrollPaidMutation, useDeletePayrollMutation } from "@/api/payrollApi";
import { toast } from "sonner";
import {
  Download,
  MoreHorizontal,
  Send,
  Search,
  User,
  DollarSign,
  TrendingUp,
  TrendingDownIcon,
  Wallet,
  Activity,
  Calendar,
  Edit,
  Trash2,
} from "lucide-react";
import dynamic from "next/dynamic";
const UpdatePayrollDialog = dynamic(() => import("./UpdatePayrollDialog"), { ssr: false });
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
    <Badge className="bg-[#F58220]/10 text-[#F58220] border border-[#F58220]/60 font-medium">
      Pending
    </Badge>
  );
};

export default function PayrollTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: payrollRows = [], isLoading } = useGetPayrollQuery();
  const [markPaid, { isLoading: isPaying }] = useMarkPayrollPaidMutation();
  const [deletePayroll, { isLoading: isDeleting }] = useDeletePayrollMutation();

  const [payrollToEdit, setPayrollToEdit] = useState(null);
  const [payrollToDelete, setPayrollToDelete] = useState(null);

  const handlePay = async (row) => {
    const toastId = toast.loading(`Paying ${row.name}...`);
    try {
      await markPaid(row.id).unwrap();
      toast.success(`${row.name} marked as Paid (email sent).`, { id: toastId });
    } catch (error) {
      toast.error(error?.data?.message || `Failed to pay ${row.name}`, { id: toastId });
    }
  };

  const confirmDeletePayroll = async () => {
    if (!payrollToDelete) return;
    try {
      await deletePayroll(payrollToDelete.id).unwrap();
      toast.success("Payroll entry deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete payroll entry");
    } finally {
      setPayrollToDelete(null);
    }
  };

  const generatePayslip = async (row) => {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF();

    // Header background
    doc.setFillColor(245, 130, 32); // #F58220
    doc.rect(0, 0, 210, 40, "F");

    // Header Text
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("PAYSLIP", 105, 20, null, null, "center");

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Date Generated: ${new Date().toLocaleDateString()}`, 105, 30, null, null, "center");

    // Company Info 
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("NexoviaSoft", 20, 55);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(110, 110, 110);
    doc.text("Rangpur", 20, 62);
    doc.text("Bangladesh", 20, 67);

    // Employee Info Section
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text("Employee Details", 130, 55);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(110, 110, 110);
    doc.text(`Name:`, 130, 62);
    doc.text(row.name, 160, 62);
    doc.text(`Role:`, 130, 67);
    doc.text(row.role, 160, 67);
    doc.text(`Payment Date:`, 130, 72);
    doc.text(row.paymentDate, 160, 72);
    doc.text(`Status:`, 130, 77);

    // Highlighted Status Badge
    let statusBgColor = [255, 237, 213]; // Orange/Pending
    let statusTextColor = [234, 88, 12];

    if (row.status?.toLowerCase() === "paid") {
      statusBgColor = [220, 252, 231]; // Green/Paid
      statusTextColor = [22, 163, 74];
    } else if (row.status?.toLowerCase() === "processing") {
      statusBgColor = [224, 242, 254]; // Sky/Processing
      statusTextColor = [2, 132, 199];
    }

    // Draw badge background
    doc.setFillColor(...statusBgColor);
    doc.roundedRect(158, 73, 24, 6, 1, 1, "F");

    // Draw badge text
    doc.setTextColor(...statusTextColor);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text((row.status || "Pending").toUpperCase(), 170, 77.2, null, null, "center");

    // Reset font for further elements
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(110, 110, 110);

    // Divider
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.line(20, 85, 190, 85);

    // Salary Details Table Header
    doc.setFillColor(245, 245, 245);
    doc.rect(20, 95, 170, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text("Description", 25, 102);
    doc.text("Amount", 185, 102, null, null, "right");

    // Table content
    doc.setFont("helvetica", "normal");
    let yPos = 115;

    // Base Salary
    doc.setTextColor(40, 40, 40);
    doc.text("Base Salary", 25, yPos);
    doc.text(`Tk. ${Number(row.raw.baseSalary || 0).toFixed(2)}`, 185, yPos, null, null, "right");
    yPos += 12;

    // Bonus
    doc.text("Bonus", 25, yPos);
    doc.text(`+ Tk. ${Number(row.raw.bonus || 0).toFixed(2)}`, 185, yPos, null, null, "right");
    yPos += 12;

    // Deductions
    doc.text("Deductions", 25, yPos);
    doc.setTextColor(220, 38, 38); // Red for deductions
    doc.text(`- Tk. ${Number(row.raw.deductions || 0).toFixed(2)}`, 185, yPos, null, null, "right");
    yPos += 12;

    // Border above total
    doc.setDrawColor(220, 220, 220);
    doc.line(20, yPos, 190, yPos);
    yPos += 10;

    // Net Pay
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(245, 130, 32);
    doc.text("Net Pay:", 120, yPos);
    doc.text(`${row.netPay}`, 185, yPos, null, null, "right");

    // Note
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(150, 150, 150);
    doc.text("* This is a computer generated document and does not require a physical signature for validity.", 105, 190, null, null, "center");

    // Manager Signature
    const signatureY = 240;

    // Simulate a signature above the line
    doc.setFont("times", "italic");
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text("Afrin Jahan", 160, signatureY - 2, null, null, "center");

    doc.setDrawColor(40, 40, 40);
    doc.setLineWidth(0.5);
    doc.line(130, signatureY, 190, signatureY);

    // Title under the signature line
    // doc.setFontSize(10);
    // doc.setFont("helvetica", "bold");
    // doc.setTextColor(40, 40, 40);
    // doc.text("Afrin Jahan", 160, signatureY + 6, null, null, "center");

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Head Of Finance", 160, signatureY + 11, null, null, "center");

    // Footer
    doc.setFillColor(245, 130, 32);
    doc.rect(0, 287, 210, 10, "F");

    doc.save(`Payslip-${row.name.replace(/\s+/g, '-')}-${row.paymentDate}.pdf`);
    toast.success(`Payslip for ${row.name} generated successfully.`);
  };

  const formatter = useMemo(() => {
    const numFormatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return {
      format: (val) => `৳ ${numFormatter.format(val)}`
    };
  }, []);

  const tableRows = useMemo(() => {
    return payrollRows.map((p) => {
      const team = p.team || {};
      const name = `${team.firstName || ""} ${team.lastName || ""}`.trim() || "Unknown";
      const role = team.position || "-";
      const avatar = team.profileImage || "";
      const baseSalary = Number(p.baseSalary || 0);
      const bonus = Number(p.bonus || 0);
      const deductions = Number(p.deductions || 0);
      const netPay = Number(p.netPay || 0);
      const status = p.status || "Pending";
      const paymentDate = p.paymentDate ? new Date(p.paymentDate).toDateString() : "-";

      return {
        id: p.id,
        name,
        role,
        avatar,
        salary: formatter.format(baseSalary),
        bonus: formatter.format(bonus),
        deductions: `-${formatter.format(Math.abs(deductions))}`,
        netPay: formatter.format(netPay),
        status,
        paymentDate,
        raw: p,
      };
    });
  }, [payrollRows, formatter]);

  const filteredData = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return tableRows.filter(
      (employee) =>
        employee.name.toLowerCase().includes(q) ||
        employee.role.toLowerCase().includes(q),
    );
  }, [searchTerm, tableRows]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 w-full sm:max-w-sm bg-white/5 border-none rounded-lg px-3 py-1 shadow-sm focus-within:ring-1 focus-within:ring-[#F58220] transition-all">
        <Search className="w-4 h-4 text-white/40" />
        <Input
          type="text"
          placeholder="Search employees..."
          className="border-0 bg-transparent shadow-none focus-visible:ring-0 px-0 h-8 text-sm text-white placeholder:text-white/40 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-[#1A1A1A] rounded-xl sm:rounded-2xl overflow-hidden overflow-x-auto border border-white/5">
        <Table>
          <TableHeader className="bg-[#1A1A1A]">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="w-[200px] sm:w-[300px] text-[#F58220] font-bold uppercase text-xs sm:text-sm py-5">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#F58220]" />
                  Employee
                </div>
              </TableHead>
              <TableHead className="text-[#F58220] font-bold uppercase text-xs sm:text-sm py-5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#F58220] text-sm leading-none pt-0.5">৳</span>
                  Base Salary
                </div>
              </TableHead>
              <TableHead className="text-[#F58220] font-bold uppercase text-xs sm:text-sm py-5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#F58220]" />
                  Bonus
                </div>
              </TableHead>
              <TableHead className="text-[#F58220] font-bold uppercase text-xs sm:text-sm py-5">
                <div className="flex items-center gap-2">
                  <TrendingDownIcon className="w-4 h-4 text-[#F58220]" />
                  Deductions
                </div>
              </TableHead>
              <TableHead className="text-[#F58220] font-bold uppercase text-xs sm:text-sm py-5">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-[#F58220]" />
                  Net Pay
                </div>
              </TableHead>
              <TableHead className="text-[#F58220] font-bold uppercase text-xs sm:text-sm py-5">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#F58220]" />
                  Status
                </div>
              </TableHead>
              <TableHead className="text-[#F58220] font-bold uppercase text-xs sm:text-sm py-5">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#F58220]" />
                  Date
                </div>
              </TableHead>
              <TableHead className="text-right text-[#F58220] font-bold uppercase text-xs sm:text-sm py-5">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-white/60 text-sm">
                  Loading payroll...
                </TableCell>
              </TableRow>
            ) : filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-white/5 cursor-pointer transition-colors border-white/5 group"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Avatar className="w-8 h-8 sm:w-9 sm:h-9">
                        <AvatarImage src={row.avatar} />
                        <AvatarFallback className="bg-[#F58220]/20 text-[#F58220] text-xs sm:text-sm">
                          {row.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-white text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none group-hover:text-[#F58220] transition-colors">
                          {row.name}
                        </div>
                        <div className="text-[10px] sm:text-xs text-white/60 truncate max-w-[100px] sm:max-w-none group-hover:text-[#F58220]/70 transition-colors">
                          {row.role}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white/80 font-medium text-xs sm:text-sm whitespace-nowrap group-hover:text-[#F58220] transition-colors">
                    {row.salary}
                  </TableCell>
                  <TableCell className="text-emerald-300 font-medium text-xs sm:text-sm whitespace-nowrap group-hover:text-[#F58220] transition-colors">
                    {row.bonus}
                  </TableCell>
                  <TableCell className="text-rose-300 font-medium text-xs sm:text-sm whitespace-nowrap group-hover:text-[#F58220] transition-colors">
                    {row.deductions}
                  </TableCell>
                  <TableCell className="font-bold text-[#F58220] text-xs sm:text-sm whitespace-nowrap">
                    {row.netPay}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={row.status} />
                  </TableCell>
                  <TableCell className="text-white/80 font-medium text-xs sm:text-sm whitespace-nowrap group-hover:text-[#F58220] transition-colors">
                    {row.paymentDate}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {(row.status === "Pending" || row.status === "Processing") && (
                        <Button
                          size="sm"
                          className="h-7 sm:h-8 bg-[#F58220] hover:bg-[#d91d79] text-black border-none text-xs sm:text-sm px-2 sm:px-3"
                          disabled={isPaying}
                          onClick={() => handlePay(row)}
                        >
                          <Send className="w-3 h-3 mr-1" />
                          {isPaying ? "Paying..." : "Pay"}
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setPayrollToEdit(row.raw)}
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-white/50 hover:text-[#F58220] hover:bg-white/5"
                        title="Edit Payroll"
                      >
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => generatePayslip(row)}
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-white/50 hover:text-[#F58220] hover:bg-white/5"
                        title="Download Payslip"
                      >
                        <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setPayrollToDelete(row)}
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-red-500/50 hover:text-red-500 hover:bg-red-500/10"
                        title="Delete Payroll"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-24 text-center text-white/60 text-sm"
                >
                  No employees found matching "{searchTerm}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <UpdatePayrollDialog
        open={!!payrollToEdit}
        onOpenChange={(open) => !open && setPayrollToEdit(null)}
        payroll={payrollToEdit}
      />

      <AlertDialog
        open={!!payrollToDelete}
        onOpenChange={(open) => !open && setPayrollToDelete(null)}
      >
        <AlertDialogContent className="bg-[#1A1A1A] border-white/20 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this payroll entry?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              Employee: <span className="text-white font-medium">{payrollToDelete?.name}</span>
              <br />
              Period: <span className="text-white font-medium">{payrollToDelete?.raw?.periodYear}-{payrollToDelete?.raw?.periodMonth}</span>
              <br />
              This action cannot be undone. This will permanently delete the payroll entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              disabled={isDeleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeletePayroll}
              className="bg-red-600 hover:bg-red-700 text-white border-none"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
