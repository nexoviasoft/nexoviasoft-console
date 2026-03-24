"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TextField from "@/components/input/TextField";
import TextareaField from "@/components/input/TextareaField";
import { toast } from "sonner";
import { 
  useCreateDepartmentMutation, 
  useUpdateDepartmentMutation 
} from "@/api/landing/department/departmentApi";

// Yup validation schema
const departmentSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  description: yup
    .string()
    .max(500, "Description must not exceed 500 characters"),
});

export default function DepartmentForm({ 
  open, 
  onOpenChange, 
  editingDepartment, 
  onSuccess 
}) {
  // React Hook Form setup with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(departmentSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // API hooks
  const [createDepartment, { isLoading: isCreating }] = useCreateDepartmentMutation();
  const [updateDepartment, { isLoading: isUpdating }] = useUpdateDepartmentMutation();

  // Reset form when dialog opens/closes or editingDepartment changes
  useEffect(() => {
    if (open) {
      if (editingDepartment) {
        setValue("name", editingDepartment.name || "");
        setValue("description", editingDepartment.description || "");
      } else {
        reset({
          name: "",
          description: "",
        });
      }
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [open, editingDepartment, reset, setValue]);

  const onSubmit = async (data) => {
    try {
      if (editingDepartment) {
        // Update existing department
        await updateDepartment({
          id: editingDepartment.id || editingDepartment._id,
          ...data,
        }).unwrap();
        toast.success("Department updated successfully!");
      } else {
        // Create new department
        await createDepartment(data).unwrap();
        toast.success("Department created successfully!");
      }
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(error?.data?.message || `Failed to ${editingDepartment ? 'update' : 'create'} department`);
    }
  };

  const handleClose = () => {
    reset({
      name: "",
      description: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] glass-card border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white">
            {editingDepartment ? "Edit Department" : "Add New Department"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            <TextField
              label="Name"
              name="name"
              placeholder="e.g. Electrical Technology"
              register={register}
              error={errors.name?.message}
              required
            />
            <TextareaField
              label="Description"
              name="description"
              placeholder="e.g. Department of Electrical Engineering"
              register={register}
              error={errors.description?.message}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button 
              type="button"
              variant="outline" 
              onClick={handleClose}
              className="glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating || isUpdating || isSubmitting}
              className="bg-[#F58220] hover:bg-[#d91d79] text-black glass-button"
            >
              {isCreating || isUpdating || isSubmitting
                ? "Saving..."
                : editingDepartment
                ? "Update Department"
                : "Create Department"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
