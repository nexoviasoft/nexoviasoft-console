"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useGetOurTeamQuery } from "@/api/admin/our-team/ourTeamApi";
import { useCreatePayrollMutation } from "@/api/payrollApi";

export default function CreatePayrollDialog({
  open,
  onOpenChange,
  defaultYear,
  defaultMonth,
}) {
  const { data: teamData, isLoading: isLoadingTeam } = useGetOurTeamQuery(undefined, {
    skip: !open,
  });
  const [createPayroll, { isLoading: isCreating }] = useCreatePayrollMutation();

  const teamMembers = teamData?.data || teamData || [];

  const [formData, setFormData] = useState({
    teamId: "",
    periodYear: "",
    periodMonth: "",
    baseSalary: "",
    bonus: "0",
    deductions: "0",
    status: "Pending",
    notes: "",
  });

  useEffect(() => {
    if (!open) return;
    setFormData((prev) => ({
      ...prev,
      periodYear: String(defaultYear || new Date().getFullYear()),
      periodMonth: String(defaultMonth || new Date().getMonth() + 1),
    }));
  }, [open, defaultYear, defaultMonth]);

  useEffect(() => {
    if (!open) {
      setFormData({
        teamId: "",
        periodYear: "",
        periodMonth: "",
        baseSalary: "",
        bonus: "0",
        deductions: "0",
        status: "Pending",
        notes: "",
      });
    }
  }, [open]);

  const monthOptions = useMemo(
    () => [
      { value: "1", label: "January" },
      { value: "2", label: "February" },
      { value: "3", label: "March" },
      { value: "4", label: "April" },
      { value: "5", label: "May" },
      { value: "6", label: "June" },
      { value: "7", label: "July" },
      { value: "8", label: "August" },
      { value: "9", label: "September" },
      { value: "10", label: "October" },
      { value: "11", label: "November" },
      { value: "12", label: "December" },
    ],
    [],
  );

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.teamId) return toast.error("Please select an employee");
    if (!formData.periodYear) return toast.error("Please select a year");
    if (!formData.periodMonth) return toast.error("Please select a month");
    if (!formData.baseSalary || Number(formData.baseSalary) < 0)
      return toast.error("Please enter a valid base salary");

    try {
      const payload = {
        teamId: Number(formData.teamId),
        periodYear: Number(formData.periodYear),
        periodMonth: Number(formData.periodMonth),
        baseSalary: Number(formData.baseSalary),
        bonus: Number(formData.bonus || 0),
        deductions: Number(formData.deductions || 0),
        status: formData.status,
        notes: formData.notes?.trim() || undefined,
      };

      await createPayroll(payload).unwrap();
      toast.success("Payroll created successfully!");
      onOpenChange(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create payroll");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] w-[95vw] sm:w-full max-h-[85vh] overflow-y-auto bg-[#0A0A0A] border-white/20 text-white shadow-2xl p-3 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-white">Create Payroll</DialogTitle>
          <DialogDescription className="text-white/70">
            Create a payroll entry for an employee for the selected month.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Employee */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-white">
                Employee <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3">
                {isLoadingTeam ? (
                  <div className="flex items-center gap-2 text-white/60">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading employees...
                  </div>
                ) : (
                  <Select
                    value={formData.teamId}
                    onValueChange={(v) => handleInputChange("teamId", v)}
                  >
                    <SelectTrigger className="bg-black/40 border-white/20 text-white focus:ring-[#EFFC76] w-full">
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0A0A0A] border-white/20 text-white">
                      {teamMembers.map((m) => {
                        const id = m.id || m._id;
                        const name = `${m.firstName || ""} ${m.lastName || ""}`.trim();
                        return (
                          <SelectItem
                            key={id}
                            value={String(id)}
                            className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76]"
                          >
                            {name || "Unnamed"} {m.position ? `- ${m.position}` : ""}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            {/* Period */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-white">
                Period <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3 grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  min="2000"
                  max="3000"
                  value={formData.periodYear}
                  onChange={(e) => handleInputChange("periodYear", e.target.value)}
                  className="bg-black/40 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                  placeholder="Year (e.g. 2026)"
                  required
                />
                <Select
                  value={formData.periodMonth}
                  onValueChange={(v) => handleInputChange("periodMonth", v)}
                >
                  <SelectTrigger className="bg-black/40 border-white/20 text-white focus:ring-[#EFFC76] w-full">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A0A0A] border-white/20 text-white">
                    {monthOptions.map((m) => (
                      <SelectItem
                        key={m.value}
                        value={m.value}
                        className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76]"
                      >
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Amounts */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-white">
                Base Salary <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3">
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.baseSalary}
                  onChange={(e) => handleInputChange("baseSalary", e.target.value)}
                  className="bg-black/40 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-white">Bonus</Label>
              <div className="col-span-3">
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.bonus}
                  onChange={(e) => handleInputChange("bonus", e.target.value)}
                  className="bg-black/40 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-white">Deductions</Label>
              <div className="col-span-3">
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.deductions}
                  onChange={(e) => handleInputChange("deductions", e.target.value)}
                  className="bg-black/40 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Status */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-white">Status</Label>
              <div className="col-span-3">
                <Select
                  value={formData.status}
                  onValueChange={(v) => handleInputChange("status", v)}
                >
                  <SelectTrigger className="bg-black/40 border-white/20 text-white focus:ring-[#EFFC76] w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A0A0A] border-white/20 text-white">
                    {["Pending", "Processing", "Paid"].map((s) => (
                      <SelectItem
                        key={s}
                        value={s}
                        className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76]"
                      >
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Notes */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-white">Notes</Label>
              <div className="col-span-3">
                <Input
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="bg-black/40 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                  placeholder="Optional notes"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating}
              className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black font-semibold"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Payroll"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

