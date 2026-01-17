"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TextField from "@/components/input/TextField";
import TextareaField from "@/components/input/TextareaField";
import ImageInput from "@/components/input/ImageInput";
import SelectField from "@/components/input/SelectField";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { 
  useCreatePricePackageMutation, 
  useUpdatePricePackageMutation 
} from "@/api/landing/price-package/pricePackageApi";
import { useUpload } from "@/hooks/useUpload";

// Yup validation schema
const pricePackageSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title must not exceed 200 characters"),
  price: yup
    .string()
    .required("Price is required")
    .max(50, "Price must not exceed 50 characters"),
  description: yup
    .string()
    .required("Description is required")
    .max(1000, "Description must not exceed 1000 characters"),
  projectLimit: yup
    .string()
    .required("Project limit is required")
    .max(50, "Project limit must not exceed 50 characters"),
  revisionLimit: yup
    .string()
    .required("Revision limit is required")
    .max(50, "Revision limit must not exceed 50 characters"),
  features: yup.array().of(yup.string().required("Feature cannot be empty")),
  badge: yup.string().max(50, "Badge must not exceed 50 characters"),
  type: yup.string().oneOf(["monthly", "yearly", "one-time"], "Type must be monthly, yearly, or one-time"),
  iconUrl: yup.string().nullable().optional(),
});

export default function PricePackageForm({ 
  open, 
  onOpenChange, 
  editingPricePackage, 
  onSuccess 
}) {
  const [iconFile, setIconFile] = useState(null);
  
  // Upload hook
  const { uploadFile, isUploading } = useUpload({ folder: "price-package" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
    control,
  } = useForm({
    resolver: yupResolver(pricePackageSchema),
    defaultValues: {
      title: "",
      price: "",
      description: "",
      projectLimit: "",
      revisionLimit: "",
      features: [""],
      badge: "",
      type: "monthly",
      iconUrl: "",
    },
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control,
    name: "features",
  });

  // API hooks
  const [createPricePackage, { isLoading: isCreating }] = useCreatePricePackageMutation();
  const [updatePricePackage, { isLoading: isUpdating }] = useUpdatePricePackageMutation();

  // Reset form when dialog opens/closes or editingPricePackage changes
  useEffect(() => {
    if (open) {
      if (editingPricePackage) {
        reset({
          title: editingPricePackage.title || "",
          price: editingPricePackage.price || "",
          description: editingPricePackage.description || "",
          projectLimit: editingPricePackage.projectLimit || "",
          revisionLimit: editingPricePackage.revisionLimit || "",
          features: editingPricePackage.features?.length > 0 ? editingPricePackage.features : [""],
          badge: editingPricePackage.badge || "",
          type: editingPricePackage.type || "monthly",
          iconUrl: editingPricePackage.iconUrl || "",
        });
        setIconFile(null);
      } else {
        reset({
          title: "",
          price: "",
          description: "",
          projectLimit: "",
          revisionLimit: "",
          features: [""],
          badge: "",
          type: "monthly",
          iconUrl: "",
        });
        setIconFile(null);
      }
    } else {
      reset({
        title: "",
        price: "",
        description: "",
        projectLimit: "",
        revisionLimit: "",
        features: [""],
        badge: "",
        type: "monthly",
        iconUrl: "",
      });
      setIconFile(null);
    }
  }, [open, editingPricePackage, reset]);

  const onSubmit = async (data) => {
    try {
      // Upload icon if a new file was selected
      let iconUrl = data.iconUrl;
      if (iconFile) {
        toast.loading("Uploading icon...", { id: "upload-icon" });
        try {
          iconUrl = await uploadFile(iconFile);
          toast.success("Icon uploaded successfully!", { id: "upload-icon" });
        } catch (error) {
          toast.error("Failed to upload icon", { id: "upload-icon" });
          return;
        }
      }

      const filteredData = {
        ...data,
        iconUrl: iconUrl || "",
        // Filter out empty features
        features: data.features.filter(feature => feature && feature.trim() !== ""),
      };

      if (editingPricePackage) {
        await updatePricePackage({
          id: editingPricePackage.id || editingPricePackage._id,
          ...filteredData,
        }).unwrap();
        toast.success("Price package updated successfully!");
      } else {
        await createPricePackage(filteredData).unwrap();
        toast.success("Price package created successfully!");
      }
      
      // Reset file states
      setIconFile(null);
      
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(error?.data?.message || `Failed to ${editingPricePackage ? 'update' : 'create'} price package`);
    }
  };

  const handleClose = () => {
    reset({
      title: "",
      price: "",
      description: "",
      projectLimit: "",
      revisionLimit: "",
      features: [""],
      badge: "",
      type: "monthly",
      iconUrl: "",
    });
    setIconFile(null);
    onOpenChange(false);
  };

  const typeOptions = [
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
    { value: "one-time", label: "One Time" },
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto glass-card border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white">
            {editingPricePackage ? "Edit Price Package" : "Add New Price Package"}
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
                  label="Title"
                  name="title"
                  register={register}
                  error={errors.title?.message}
                  placeholder="e.g., Basic Package"
                  required
                />
                
                <TextField
                  label="Price"
                  name="price"
                  register={register}
                  error={errors.price?.message}
                  placeholder="e.g., $199"
                  required
                />
              </div>

              <TextareaField
                label="Description"
                name="description"
                register={register}
                error={errors.description?.message}
                placeholder="e.g., Ideal for small projects and startups"
                rows={3}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="Project Limit"
                  name="projectLimit"
                  register={register}
                  error={errors.projectLimit?.message}
                  placeholder="e.g., 3"
                  required
                />
                
                <TextField
                  label="Revision Limit"
                  name="revisionLimit"
                  register={register}
                  error={errors.revisionLimit?.message}
                  placeholder="e.g., 2"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField
                  label="Type"
                  name="type"
                  value={watch("type") || "monthly"}
                  onChange={(e) => setValue("type", e.target.value)}
                  error={errors.type?.message}
                  options={typeOptions}
                  required
                />
                
                <TextField
                  label="Badge (Optional)"
                  name="badge"
                  register={register}
                  error={errors.badge?.message}
                  placeholder="e.g., Popular"
                />
              </div>
            </div>

            <div className="space-y-4 p-4 border border-white/10 rounded-lg bg-black/40">
              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                Icon
              </h3>
              <ImageInput
                key={`iconUrl-${editingPricePackage?.id || 'new'}-${open}-${watch("iconUrl") || ''}`}
                id="iconUrl"
                label="Icon"
                value={watch("iconUrl") || editingPricePackage?.iconUrl || ""}
                currentImage={editingPricePackage?.iconUrl}
                onChange={(file, previewUrl) => {
                  setIconFile(file);
                  setValue("iconUrl", previewUrl);
                }}
                onRemove={() => {
                  setIconFile(null);
                  setValue("iconUrl", "");
                }}
                error={errors.iconUrl?.message}
                maxSize={10}
                previewSize="w-full h-48"
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
                  onClick={() => appendFeature("")}
                  className="gap-2 glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Feature
                </Button>
              </div>
              
              <div className="space-y-3">
                {featureFields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-2">
                    <div className="flex-1">
                      <TextField
                        label={index === 0 ? "Feature" : ""}
                        name={`features.${index}`}
                        register={register}
                        error={errors.features?.[index]?.message}
                        placeholder={`Feature ${index + 1}`}
                      />
                    </div>
                    {featureFields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-red-400 hover:text-red-300 hover:bg-red-500/20 mt-6"
                        onClick={() => removeFeature(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
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
              disabled={isCreating || isUpdating || isSubmitting || isUploading}
              className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button"
            >
              {isCreating || isUpdating || isSubmitting || isUploading
                ? isUploading
                  ? "Uploading..."
                  : "Saving..."
                : editingPricePackage
                ? "Update Price Package"
                : "Create Price Package"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
