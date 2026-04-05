"use client";

import React, { useEffect, useState } from "react";
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
import { useUpdatePayrollMutation } from "@/api/payrollApi";

export default function UpdatePayrollDialog({
  open,
  onOpenChange,
  payroll,
}) {
  const [updatePayroll, { isLoading: isUpdating }] = useUpdatePayrollMutation();

  const [formData, setFormData] = useState({
    baseSalary: "",
    bonus: "0",
    deductions: "0",
    status: "Pending",
    notes: "",
  });

  useEffect(() => {
    if (open && payroll) {
      setFormData({
        baseSalary: payroll.baseSalary || "",
        bonus: payroll.bonus || "0",
        deductions: payroll.deductions || "0",
        status: payroll.status || "Pending",
        notes: payroll.notes || "",
      });
    }
  }, [open, payroll]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.baseSalary || Number(formData.baseSalary) < 0)
      return toast.error("Please enter a valid base salary");

    try {
      const payload = {
        id: payroll.id,
        baseSalary: Number(formData.baseSalary),
        bonus: Number(formData.bonus || 0),
        deductions: Number(formData.deductions || 0),
        status: formData.status,
        notes: formData.notes?.trim() || undefined,
      };

      await updatePayroll(payload).unwrap();
      toast.success("Payroll updated successfully!");
      onOpenChange(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update payroll");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] w-[95vw] sm:w-full max-h-[85vh] overflow-y-auto bg-[#0A0A0A] border-white/20 text-white shadow-2xl p-3 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-white">Update Payroll</DialogTitle>
          <DialogDescription className="text-white/70">
            Update payroll details for {payroll?.team?.firstName} {payroll?.team?.lastName}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
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
                  className="bg-black/40 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#F58220]"
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
                  className="bg-black/40 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#F58220]"
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
                  className="bg-black/40 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#F58220]"
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
                  <SelectTrigger className="bg-black/40 border-white/20 text-white focus:ring-[#F58220] w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A0A0A] border-white/20 text-white">
                    {["Pending", "Processing", "Paid"].map((s) => (
                      <SelectItem
                        key={s}
                        value={s}
                        className="focus:bg-[#F58220]/20 focus:text-[#F58220]"
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
                  className="bg-black/40 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#F58220]"
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
              disabled={isUpdating}
              className="bg-[#F58220] hover:bg-[#d91d79] text-black font-semibold"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Payroll"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
