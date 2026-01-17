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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { 
  useCreateOurServiceMutation, 
  useUpdateOurServiceMutation 
} from "@/api/landing/our-service/ourServiceApi";
import { useGetCategoriesQuery } from "@/api/landing/category/categoryApi";
import { useUpload } from "@/hooks/useUpload";
import { Plus, Trash2, X } from "lucide-react";

// Yup validation schema
const ourServiceSchema = yup.object({
  logo: yup
    .string()
    .nullable()
    .optional(),
  image: yup
    .string()
    .nullable()
    .optional(),
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title must not exceed 200 characters"),
  subtitle: yup
    .string()
    .required("Subtitle is required")
    .max(200, "Subtitle must not exceed 200 characters"),
  description: yup
    .string()
    .required("Description is required")
    .max(2000, "Description must not exceed 2000 characters"),
  keyFeature: yup
    .array()
    .of(yup.string().required("Feature cannot be empty"))
    .min(1, "At least one key feature is required"),
  benefit: yup
    .array()
    .of(yup.string().required("Benefit cannot be empty"))
    .min(1, "At least one benefit is required"),
  otherservice: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required("Service name is required"),
        description: yup.string().required("Service description is required"),
        isfeature: yup.boolean().default(false),
      })
    )
    .default([]),
  categoryId: yup
    .number()
    .typeError("Category is required")
    .required("Category is required")
    .positive("Please select a valid category"),
});

export default function OurServiceForm({ 
  open, 
  onOpenChange, 
  editingService, 
  onSuccess 
}) {
  const formId = "our-service-form";
  const [logoFile, setLogoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  
  // Upload hook
  const { uploadFile, isUploading } = useUpload({ folder: "our-service" });

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
    resolver: yupResolver(ourServiceSchema),
    defaultValues: {
      logo: "",
      image: "",
      title: "",
      subtitle: "",
      description: "",
      keyFeature: [""],
      benefit: [""],
      otherservice: [],
      categoryId: "",
    },
  });

  // API hooks
  const [createService, { isLoading: isCreating }] = useCreateOurServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateOurServiceMutation();
  const { data: categoriesData } = useGetCategoriesQuery();
  
  const categories = categoriesData?.data || categoriesData || [];

  // Watch form values for dynamic arrays
  const keyFeatures = watch("keyFeature") || [];
  const benefits = watch("benefit") || [];
  const otherServices = watch("otherservice") || [];

  // Reset form when dialog opens/closes or editingService changes
  useEffect(() => {
    if (open) {
      if (editingService) {
        reset({
          logo: editingService.logo || "",
          image: editingService.image || "",
          title: editingService.title || "",
          subtitle: editingService.subtitle || "",
          description: editingService.description || "",
          keyFeature: Array.isArray(editingService.keyFeature) && editingService.keyFeature.length > 0
            ? editingService.keyFeature
            : [""],
          benefit: Array.isArray(editingService.benefit) && editingService.benefit.length > 0
            ? editingService.benefit
            : [""],
          otherservice: Array.isArray(editingService.otherservice) && editingService.otherservice.length > 0
            ? editingService.otherservice
            : [],
          categoryId: editingService.categoryId || "",
        });
        setLogoFile(null);
        setImageFile(null);
      } else {
        reset({
          logo: "",
          image: "",
          title: "",
          subtitle: "",
          description: "",
          keyFeature: [""],
          benefit: [""],
          otherservice: [],
          categoryId: "",
        });
        setLogoFile(null);
        setImageFile(null);
      }
    } else {
      reset({
        logo: "",
        image: "",
        title: "",
        subtitle: "",
        description: "",
        keyFeature: [""],
        benefit: [""],
        otherservice: [],
        categoryId: "",
      });
      setLogoFile(null);
      setImageFile(null);
    }
  }, [open, editingService, reset]);

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

      // Upload image if a new file was selected
      let image = data.image;
      if (imageFile) {
        toast.loading("Uploading image...", { id: "upload-image" });
        try {
          image = await uploadFile(imageFile);
          toast.success("Image uploaded successfully!", { id: "upload-image" });
        } catch (error) {
          toast.error("Failed to upload image", { id: "upload-image" });
          return;
        }
      }

      // Filter out empty strings from arrays
      const formattedData = {
        ...data,
        logo: logo || "",
        image: image || "",
        keyFeature: data.keyFeature.filter((f) => f && f.trim() !== ""),
        benefit: data.benefit.filter((b) => b && b.trim() !== ""),
        categoryId: Number(data.categoryId),
      };

      if (editingService) {
        // Update existing service
        await updateService({
          id: editingService.id || editingService._id,
          ...formattedData,
        }).unwrap();
        toast.success("Service updated successfully!");
      } else {
        // Create new service
        await createService(formattedData).unwrap();
        toast.success("Service created successfully!");
      }
      
      // Reset file states
      setLogoFile(null);
      setImageFile(null);
      
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(error?.data?.message || `Failed to ${editingService ? 'update' : 'create'} service`);
    }
  };

  const handleClose = () => {
    reset({
      logo: "",
      image: "",
      title: "",
      subtitle: "",
      description: "",
      keyFeature: [""],
      benefit: [""],
      otherservice: [],
      categoryId: "",
    });
    setLogoFile(null);
    setImageFile(null);
    onOpenChange(false);
  };

  // Key Features handlers
  const addKeyFeature = () => {
    const current = watch("keyFeature") || [];
    setValue("keyFeature", [...current, ""]);
  };

  const removeKeyFeature = (index) => {
    const current = watch("keyFeature") || [];
    if (current.length > 1) {
      setValue("keyFeature", current.filter((_, i) => i !== index));
    }
  };

  const updateKeyFeature = (index, value) => {
    const current = watch("keyFeature") || [];
    const updated = [...current];
    updated[index] = value;
    setValue("keyFeature", updated);
  };

  // Benefits handlers
  const addBenefit = () => {
    const current = watch("benefit") || [];
    setValue("benefit", [...current, ""]);
  };

  const removeBenefit = (index) => {
    const current = watch("benefit") || [];
    if (current.length > 1) {
      setValue("benefit", current.filter((_, i) => i !== index));
    }
  };

  const updateBenefit = (index, value) => {
    const current = watch("benefit") || [];
    const updated = [...current];
    updated[index] = value;
    setValue("benefit", updated);
  };

  // Other Services handlers
  const addOtherService = () => {
    const current = watch("otherservice") || [];
    setValue("otherservice", [...current, { name: "", description: "", isfeature: false }]);
  };

  const removeOtherService = (index) => {
    const current = watch("otherservice") || [];
    setValue("otherservice", current.filter((_, i) => i !== index));
  };

  const updateOtherService = (index, field, value) => {
    const current = watch("otherservice") || [];
    const updated = [...current];
    updated[index] = { ...updated[index], [field]: value };
    setValue("otherservice", updated);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto glass-card border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white">
            {editingService ? "Edit Service" : "Add New Service"}
          </DialogTitle>
        </DialogHeader>
        <form id={formId} onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6 py-4">
            {/* Basic Information */}
            <div className="space-y-4 p-4 border border-white/10 rounded-lg bg-black/40">
              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="Title"
                  name="title"
                  placeholder="e.g. Web Development Service"
                  register={register}
                  error={errors.title?.message}
                  required
                />
                <TextField
                  label="Subtitle"
                  name="subtitle"
                  placeholder="e.g. Modern & Scalable Solutions"
                  register={register}
                  error={errors.subtitle?.message}
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
              </div>
              <TextareaField
                label="Description"
                name="description"
                placeholder="e.g. We provide full-stack web development services using modern technologies."
                register={register}
                error={errors.description?.message}
                required
                rows={4}
                textareaClassName="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
              />
            </div>

            {/* Images */}
            <div className="space-y-4 p-4 border border-white/10 rounded-lg bg-black/40">
              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                Images
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageInput
                  key={`logo-${editingService?.id || 'new'}-${open}-${watch("logo") || ''}`}
                  id="logo"
                  label="Logo"
                  value={watch("logo") || editingService?.logo || ""}
                  currentImage={editingService?.logo}
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
                <ImageInput
                  key={`image-${editingService?.id || 'new'}-${open}-${watch("image") || ''}`}
                  id="image"
                  label="Service Image"
                  value={watch("image") || editingService?.image || ""}
                  currentImage={editingService?.image}
                  onChange={(file, previewUrl) => {
                    setImageFile(file);
                    setValue("image", previewUrl);
                  }}
                  onRemove={() => {
                    setImageFile(null);
                    setValue("image", "");
                  }}
                  error={errors.image?.message}
                  maxSize={10}
                  previewSize="w-full h-32"
                />
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-4 p-4 border border-white/10 rounded-lg bg-black/40">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="text-lg font-semibold text-white">
                  Key Features
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addKeyFeature}
                  className="gap-2 glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                  Add Feature
                </Button>
              </div>
              <div className="space-y-3">
                {keyFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        value={feature || ""}
                        onChange={(e) => updateKeyFeature(index, e.target.value)}
                        placeholder="e.g. Responsive Design"
                        className={`bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76] ${errors.keyFeature?.[index] ? "border-red-500" : ""}`}
                      />
                      {errors.keyFeature?.[index] && (
                        <p className="text-sm text-red-500 mt-1">{errors.keyFeature[index]?.message}</p>
                      )}
                    </div>
                    {keyFeatures.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeKeyFeature(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {errors.keyFeature && typeof errors.keyFeature.message === 'string' && (
                  <p className="text-sm text-red-500">{errors.keyFeature.message}</p>
                )}
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4 p-4 border border-white/10 rounded-lg bg-black/40">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="text-lg font-semibold text-white">
                  Benefits
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addBenefit}
                  className="gap-2 glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                  Add Benefit
                </Button>
              </div>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        value={benefit || ""}
                        onChange={(e) => updateBenefit(index, e.target.value)}
                        placeholder="e.g. Fast loading"
                        className={`bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76] ${errors.benefit?.[index] ? "border-red-500" : ""}`}
                      />
                      {errors.benefit?.[index] && (
                        <p className="text-sm text-red-500 mt-1">{errors.benefit[index]?.message}</p>
                      )}
                    </div>
                    {benefits.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeBenefit(index)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                    >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {errors.benefit && typeof errors.benefit.message === 'string' && (
                  <p className="text-sm text-red-500">{errors.benefit.message}</p>
                )}
              </div>
            </div>

            {/* Other Services */}
            <div className="space-y-4 p-4 border border-white/10 rounded-lg bg-black/40">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="text-lg font-semibold text-white">
                  Other Services
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addOtherService}
                  className="gap-2 glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                  Add Service
                </Button>
              </div>
              <div className="space-y-4">
                {otherServices.map((service, index) => (
                  <div key={index} className="p-4 border border-white/10 rounded-lg space-y-3 bg-black/40">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white">
                        Service {index + 1}
                      </h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOtherService(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <Input
                        value={service.name || ""}
                        onChange={(e) => updateOtherService(index, "name", e.target.value)}
                        placeholder="Service name (e.g. UI/UX Design)"
                        className={`bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76] ${errors.otherservice?.[index]?.name ? "border-red-500" : ""}`}
                      />
                      {errors.otherservice?.[index]?.name && (
                        <p className="text-sm text-red-500 mt-1">{errors.otherservice[index].name.message}</p>
                      )}
                      <TextareaField
                        value={service.description || ""}
                        onChange={(e) => updateOtherService(index, "description", e.target.value)}
                        placeholder="Service description (e.g. We provide UI/UX design services for your website)"
                        textareaClassName={`bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76] ${errors.otherservice?.[index]?.description ? "border-red-500" : ""}`}
                      />
                      {errors.otherservice?.[index]?.description && (
                        <p className="text-sm text-red-500 mt-1">{errors.otherservice[index].description.message}</p>
                      )}
                    </div>  
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
        <DialogFooter className="mt-4">
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
            form={formId}
            disabled={isCreating || isUpdating || isSubmitting}
            className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button"
          >
            {isCreating || isUpdating || isSubmitting
              ? "Saving..."
              : editingService
              ? "Update Service"
              : "Create Service"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
