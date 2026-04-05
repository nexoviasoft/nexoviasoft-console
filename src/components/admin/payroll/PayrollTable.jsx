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
import jsPDF from "jspdf";
import UpdatePayrollDialog from "./UpdatePayrollDialog";
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

  const generatePayslip = (row) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Payslip", 105, 20, null, null, "center");
    
    doc.setFontSize(12);
    doc.text(`Employee Name: ${row.name}`, 20, 40);
    doc.text(`Role: ${row.role}`, 20, 50);
    doc.text(`Status: ${row.status}`, 20, 60);
    doc.text(`Payment Date: ${row.paymentDate}`, 20, 70);
    
    doc.text("---------------------------------------------------------", 20, 80);
    
    doc.text(`Base Salary: $${row.raw.baseSalary || 0}`, 20, 95);
    doc.text(`Bonus: $${row.raw.bonus || 0}`, 20, 105);
    doc.text(`Deductions: -$${row.raw.deductions || 0}`, 20, 115);
    
    doc.setFont(undefined, 'bold');
    doc.text(`Net Pay: ${row.netPay}`, 20, 135);
    
    doc.save(`Payslip-${row.name.replace(/\s+/g, '-')}-${row.paymentDate}.pdf`);
    toast.success(`Payslip for ${row.name} generated successfully.`);
  };

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [],
  );

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
                  <DollarSign className="w-4 h-4 text-[#F58220]" />
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
