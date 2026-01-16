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
  useCreateCategoryMutation, 
  useUpdateCategoryMutation 
} from "@/api/landing/category/categoryApi";

// Yup validation schema
const categorySchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  description: yup
    .string()
    .max(500, "Description must not exceed 500 characters"),
});

export default function CategoryForm({ 
  open, 
  onOpenChange, 
  editingCategory, 
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
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // API hooks
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  // Reset form when dialog opens/closes or editingCategory changes
  useEffect(() => {
    if (open) {
      if (editingCategory) {
        setValue("name", editingCategory.name || "");
        setValue("description", editingCategory.description || "");
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
  }, [open, editingCategory, reset, setValue]);

  const onSubmit = async (data) => {
    try {
      if (editingCategory) {
        // Update existing category
        await updateCategory({
          id: editingCategory.id || editingCategory._id,
          ...data,
        }).unwrap();
        toast.success("Category updated successfully!");
      } else {
        // Create new category
        await createCategory(data).unwrap();
        toast.success("Category created successfully!");
      }
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(error?.data?.message || `Failed to ${editingCategory ? 'update' : 'create'} category`);
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editingCategory ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            <TextField
              label="Name"
              name="name"
              placeholder="e.g. Web Development"
              register={register}
              error={errors.name?.message}
              required
            />
            <TextareaField
              label="Description"
              name="description"
              placeholder="e.g. All web-related projects and case studies"
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
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating || isUpdating || isSubmitting}
            >
              {isCreating || isUpdating || isSubmitting
                ? "Saving..."
                : editingCategory
                ? "Update Category"
                : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
