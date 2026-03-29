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
import { MoreHorizontal, Eye, Edit, Trash2, CheckCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AttendanceDetailsDialog from "./AttendanceDetailsDialog";
import AttendanceEditDialog from "./AttendanceEditDialog";
import AddAttendanceDialog from "./AddAttendanceDialog";
import {
  useUpdateAttendanceMutation,
  useCreateAttendanceMutation,
  useApproveAttendanceMutation,
} from "@/api/admin/attendance/attendanceApi";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";


const StatusBadge = ({ status }) => {
  const styles = {
    "On Time":
      "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40",
    Late: "bg-orange-500/20 text-orange-300 border border-orange-400/40",
    Absent: "bg-red-500/20 text-red-300 border border-red-400/40",
  };
  return (
    <Badge className={`${styles[status]} font-medium shadow-none`}>
      {status}
    </Badge>
  );
};

const ApprovedBadge = ({ approved }) => {
  return (
    <Badge
      className={`font-medium shadow-none ${
        approved
          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30"
          : "bg-orange-500/15 text-orange-200 border border-orange-400/30"
      }`}
    >
      {approved ? "Approved" : "Pending"}
    </Badge>
  );
};

export default function AttendanceTable({ rows }) {
  const [data, setData] = useState(rows || []);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [updateAttendance] = useUpdateAttendanceMutation();
  const [createAttendance] = useCreateAttendanceMutation();
  const [approveAttendance] = useApproveAttendanceMutation();
  const { userRole } = useAuth();
  const isAdmin = userRole === "admin";

  const computeWorkHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return "";

    const parse = (value) => {
      // Support "HH:MM" and "HH:MM AM/PM"
      let date;
      if (value.toLowerCase().includes("am") || value.toLowerCase().includes("pm")) {
        date = new Date(`1970-01-01 ${value}`);
      } else {
        date = new Date(`1970-01-01T${value}`);
      }
      if (isNaN(date.getTime())) return null;
      return date;
    };

    const start = parse(checkIn);
    const end = parse(checkOut);
    if (!start || !end) return "";

    const diffMs = end.getTime() - start.getTime();
    if (diffMs <= 0) return "";

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    return `${hours}h ${minutes}m`;
  };

  React.useEffect(() => {
    if (rows) {
      setData(rows);
    }
  }, [rows]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowDetails(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowEdit(true);
  };

  const handleSaveEdit = async (updatedEmployee) => {
    // Auto compute work hours from times if possible
    const calculatedWorkHours = computeWorkHours(
      updatedEmployee.checkIn,
      updatedEmployee.checkOut
    );
    if (calculatedWorkHours) {
      updatedEmployee = {
        ...updatedEmployee,
        workHours: calculatedWorkHours,
      };
    }
    // Optimistic local update
    setData((prev) =>
      prev.map((item) =>
        item.id === updatedEmployee.id ? updatedEmployee : item,
      ),
    );

    try {
      const payload = {
        id: updatedEmployee.id,
        checkIn: updatedEmployee.checkIn,
        checkOut: updatedEmployee.checkOut,
        status: updatedEmployee.status,
        workHours: updatedEmployee.workHours,
      };

      await updateAttendance(payload).unwrap();
      toast.success("Attendance updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update attendance. Please try again.");
    }
  };

  const handleCreate = async (formData) => {
    try {
      const calculatedWorkHours = computeWorkHours(
        formData.checkIn,
        formData.checkOut
      );

      await createAttendance({
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        status: formData.status,
        workHours: calculatedWorkHours || formData.workHours,
      }).unwrap();
      toast.success("Attendance added successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add attendance. Please try again.");
    }
  };

  const handleApprove = async (row) => {
    try {
      await approveAttendance(row.id).unwrap();
      setData((prev) =>
        prev.map((item) =>
          item.id === row.id ? { ...item, approved: true } : item
        )
      );
      toast.success("Attendance approved.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve attendance.");
    }
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
      <AddAttendanceDialog
        open={showAdd}
        onOpenChange={setShowAdd}
        onCreate={handleCreate}
      />
      <AttendanceDetailsDialog 
        open={showDetails} 
        onOpenChange={setShowDetails} 
        employee={selectedEmployee} 
      />
      <AttendanceEditDialog 
        open={showEdit} 
        onOpenChange={setShowEdit} 
        employee={selectedEmployee} 
        onSave={handleSaveEdit}
      />
      <div className="overflow-x-auto">
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <span className="text-sm text-white/70 font-medium">
            Attendance Records
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowAdd(true)}
            className="border-[#F58220]/60 text-[#F58220] hover:bg-[#F58220]/10 hover:text-[#F58220]"
          >
            + Add Attendance
          </Button>
        </div>
        <Table>
          <TableHeader className="bg-[#F58220]/10">
            <TableRow className="hover:bg-transparent border-white/10">
              <TableHead className="w-[220px] text-[#F58220] font-semibold">Employee</TableHead>
              <TableHead className="text-[#F58220] font-semibold">Date</TableHead>
              <TableHead className="text-[#F58220] font-semibold">Check In</TableHead>
              <TableHead className="text-[#F58220] font-semibold">Check Out</TableHead>
              <TableHead className="text-[#F58220] font-semibold">Work Hours</TableHead>
              <TableHead className="text-[#F58220] font-semibold">Status</TableHead>
              <TableHead className="text-[#F58220] font-semibold">Approved</TableHead>
              <TableHead className="text-right text-[#F58220] font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-[#F58220]/5 cursor-pointer transition-colors border-white/10"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-9 h-9 border border-[#F58220]/20">
                      <AvatarImage src={row.avatar} />
                      <AvatarFallback className="bg-[#F58220]/10 text-[#F58220]">{row.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-white">{row.name}</div>
                      <div className="text-xs text-white/60">{row.role}</div>
                    </div>
                  </div>
                </TableCell>
              <TableCell className="text-white/70">
                {row.date
                  ? new Date(row.date).toLocaleDateString()
                  : "-"}
              </TableCell>
              <TableCell className="text-white/80 font-medium">
                {row.checkIn}
              </TableCell>
              <TableCell className="text-white/80 font-medium">
                {row.checkOut}
              </TableCell>
              <TableCell className="text-white/80 font-medium">
                {row.workHours}
              </TableCell>
              <TableCell>
                <StatusBadge status={row.status} />
              </TableCell>
              <TableCell>
                <ApprovedBadge approved={!!row.approved} />
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white/50 hover:text-[#F58220] hover:bg-white/5"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-[#1A1A1A] border-white/10 text-white"
                  >
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem
                      className="hover:bg-white/10 cursor-pointer focus:bg-white/10 focus:text-white"
                      onClick={() => handleViewDetails(row)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="hover:bg-white/10 cursor-pointer focus:bg-white/10 focus:text-white"
                      onClick={() => handleEdit(row)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit Record</span>
                    </DropdownMenuItem>
                    {isAdmin && !row.approved && (
                      <DropdownMenuItem
                        className="hover:bg-white/10 cursor-pointer text-emerald-400 focus:text-emerald-400 focus:bg-white/10"
                        onClick={() => handleApprove(row)}
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        <span>Approve Attendance</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      className="hover:bg-white/10 cursor-pointer text-red-400 focus:text-red-400 focus:bg-white/10"
                      onClick={() => handleDelete(row.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  );
}
