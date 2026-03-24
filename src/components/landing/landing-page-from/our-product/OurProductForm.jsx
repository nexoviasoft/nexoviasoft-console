"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TextField from "@/components/input/TextField";
import TextareaField from "@/components/input/TextareaField";
import SelectField from "@/components/input/SelectField";
import ImageInput from "@/components/input/ImageInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  useCreateOurProductMutation, 
  useUpdateOurProductMutation 
} from "@/api/landing/our-product/ourProductApi";
import { useGetCategoriesQuery } from "@/api/landing/category/categoryApi";
import { useUpload } from "@/hooks/useUpload";
import { Plus, Trash2 } from "lucide-react";

// Yup validation schema
const ourProductSchema = yup.object({
  logo: yup
    .string()
    .nullable()
    .optional(),
  name: yup
    .string()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters")
    .max(200, "Product name must not exceed 200 characters"),
  description: yup
    .string()
    .required("Description is required")
    .max(2000, "Description must not exceed 2000 characters"),
  feature: yup
    .array()
    .of(yup.string().required("Feature cannot be empty"))
    .min(1, "At least one feature is required"),
  url: yup
    .string()
    .url("Please enter a valid URL")
    .required("URL is required"),
  totalUser: yup
    .number()
    .typeError("Total users must be a number")
    .required("Total users is required")
    .min(0, "Total users cannot be negative")
    .integer("Total users must be a whole number"),
  categoryId: yup
    .number()
    .typeError("Category is required")
    .required("Category is required")
    .positive("Please select a valid category"),
});

export default function OurProductForm({ 
  open, 
  onOpenChange, 
  editingProduct, 
  onSuccess 
}) {
  const [logoFile, setLogoFile] = useState(null);
  
  // Upload hook
  const { uploadFile, isUploading } = useUpload({ folder: "our-product" });

  // React Hook Form setup with Yup validation
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(ourProductSchema),
    defaultValues: {
      logo: "",
      name: "",
      description: "",
      feature: [""],
      url: "",
      totalUser: 0,
      categoryId: "",
    },
  });

  // API hooks
  const [createProduct, { isLoading: isCreating }] = useCreateOurProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateOurProductMutation();
  const { data: categoriesData } = useGetCategoriesQuery();
  
  const categories = categoriesData?.data || categoriesData || [];

  // Watch form values for dynamic arrays
  const features = watch("feature") || [];

  // Reset form when dialog opens/closes or editingProduct changes
  useEffect(() => {
    if (open) {
      if (editingProduct) {
        reset({
          logo: editingProduct.logo || "",
          name: editingProduct.name || "",
          description: editingProduct.description || "",
          feature: Array.isArray(editingProduct.feature) && editingProduct.feature.length > 0
            ? editingProduct.feature
            : [""],
          url: editingProduct.url || "",
          totalUser: editingProduct.totalUser || 0,
          categoryId: editingProduct.categoryId || "",
        });
        setLogoFile(null);
      } else {
        reset({
          logo: "",
          name: "",
          description: "",
          feature: [""],
          url: "",
          totalUser: 0,
          categoryId: "",
        });
        setLogoFile(null);
      }
    } else {
      reset({
        logo: "",
        name: "",
        description: "",
        feature: [""],
        url: "",
        totalUser: 0,
        categoryId: "",
      });
      setLogoFile(null);
    }
  }, [open, editingProduct, reset]);

  const onSubmit = async (data) => {
    try {
      // Upload logo if a new file was selected
      let logo = data.logo;
      if (logoFile) {
        toast.loading("Uploading logo...", { id: "upload-logo" });
        try {
          logo = await uploadFile(logoFile);
          toast.success("Logo uploaded successfully!", { id: "upload-logo" });
        } catch (error) {
          toast.error("Failed to upload logo", { id: "upload-logo" });
          return;
        }
      }

      // Filter out empty strings from arrays
      const formattedData = {
        ...data,
        logo: logo || "",
        feature: data.feature.filter((f) => f && f.trim() !== ""),
        categoryId: Number(data.categoryId),
        totalUser: Number(data.totalUser),
      };

      if (editingProduct) {
        // Update existing product
        await updateProduct({
          id: editingProduct.id || editingProduct._id,
          ...formattedData,
        }).unwrap();
        toast.success("Product updated successfully!");
      } else {
        // Create new product
        await createProduct(formattedData).unwrap();
        toast.success("Product created successfully!");
      }
      
      // Reset file states
      setLogoFile(null);
      
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(error?.data?.message || `Failed to ${editingProduct ? 'update' : 'create'} product`);
    }
  };

  const handleClose = () => {
    reset({
      logo: "",
      name: "",
      description: "",
      feature: [""],
      url: "",
      totalUser: 0,
      categoryId: "",
    });
    setLogoFile(null);
    onOpenChange(false);
  };

  // Features handlers
  const addFeature = () => {
    const current = watch("feature") || [];
    setValue("feature", [...current, ""]);
  };

  const removeFeature = (index) => {
    const current = watch("feature") || [];
    if (current.length > 1) {
      setValue("feature", current.filter((_, i) => i !== index));
    }
  };

  const updateFeature = (index, value) => {
    const current = watch("feature") || [];
    const updated = [...current];
    updated[index] = value;
    setValue("feature", updated);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto glass-card border-white/20 scrollbar-thin scrollbar-glass">
        <DialogHeader>
          <DialogTitle className="text-white">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6 py-4">
            <div className="space-y-4 p-4 border border-white/10 rounded-lg bg-black/40">
              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="Product Name"
                  name="name"
                  placeholder="e.g. NexoviaSoft CRM"
                  register={register}
                  error={errors.name?.message}
                  required
                />
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <SelectField
                      label="Category"
                      name="categoryId"
                      value={field.value?.toString() || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      options={categories.map(cat => ({
                        value: cat.id?.toString() || cat._id?.toString() || "",
                        label: cat.name || "Unknown Category"
                      }))}
                      placeholder="Select category"
                      error={errors.categoryId?.message}
                      required
                    />
                  )}
                />
                <TextField
                  label="URL"
                  name="url"
                  placeholder="e.g. https://nexoviasoft.com"
                  register={register}
                  error={errors.url?.message}
                  required
                />
                <TextField
                  label="Total Users"
                  name="totalUser"
                  type="number"
                  placeholder="e.g. 1200"
                  register={register}
                  error={errors.totalUser?.message}
                  required
                />
              </div>
              <TextareaField
                label="Description"
                name="description"
                placeholder="e.g. A complete CRM solution designed to manage customers, sales, and analytics efficiently."
                register={register}
                error={errors.description?.message}
                required
                rows={4}
              />
            </div>

            <div className="space-y-4 p-4 border border-white/10 rounded-lg bg-black/40">
              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                Logo
              </h3>
              <ImageInput
                key={`logo-${editingProduct?.id || 'new'}-${open}-${watch("logo") || ''}`}
                id="logo"
                label="Product Logo"
                value={watch("logo") || editingProduct?.logo || ""}
                currentImage={editingProduct?.logo}
                onChange={(file, previewUrl) => {
                  setLogoFile(file);
                  setValue("logo", previewUrl);
                }}
                onRemove={() => {
                  setLogoFile(null);
                  setValue("logo", "");
                }}
                error={errors.logo?.message}
                maxSize={10}
                previewSize="w-full h-32"
              />
            </div>

            <div className="space-y-4 p-4 border border-white/10 rounded-lg bg-black/40">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="text-lg font-semibold text-white">
                  Features
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFeature}
                  className="gap-2 glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                  Add Feature
                </Button>
              </div>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        value={feature || ""}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder="e.g. Lead Management"
                        className={`bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#F58220] ${errors.feature?.[index] ? "border-red-500" : ""}`}
                      />
                      {errors.feature?.[index] && (
                        <p className="text-sm text-red-500 mt-1">{errors.feature[index]?.message}</p>
                      )}
                    </div>
                    {features.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFeature(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {errors.feature && typeof errors.feature.message === 'string' && (
                  <p className="text-sm text-red-500">{errors.feature.message}</p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || isCreating || isUpdating || isUploading}
              className="bg-[#F58220] hover:bg-[#d91d79] text-black glass-button"
            >
              {isSubmitting || isCreating || isUpdating || isUploading
                ? "Saving..."
                : editingProduct
                ? "Update Product"
                : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
