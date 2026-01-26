"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import TextField from "@/components/input/TextField";
import TextareaField from "@/components/input/TextareaField";
import ImageInput from "@/components/input/ImageInput";
import SelectField from "@/components/input/SelectField";
import MultiSelectDropdown from "@/components/dropdown/multiSelectDropdown";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { 
  useCreateCaseStudyMutation, 
  useUpdateCaseStudyMutation 
} from "@/api/landing/case-studies/caseStudiesApi";
import { useGetCategoriesQuery } from "@/api/landing/category/categoryApi";
import { useGetClientsQuery } from "@/api/landing/client/clientApi";
import { useUpload } from "@/hooks/useUpload";

// Yup validation schema
const caseStudySchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title must not exceed 200 characters"),
  description: yup
    .string()
    .required("Description is required")
    .max(1000, "Description must not exceed 1000 characters"),
  badge: yup.boolean(),
  features: yup.array().of(yup.string().required("Feature cannot be empty")),
  categories: yup.array().of(yup.number()),
  imageUrl: yup.string().nullable().optional(),
  caseStudyUrl: yup.string().url("Must be a valid URL"),
  liveUrl: yup.string().url("Must be a valid URL"),
  status: yup.string().oneOf(["active", "inactive", "draft"]),
  clientId: yup.number().nullable().optional(),
  industry: yup.string().max(100, "Industry must not exceed 100 characters"),
  problem_statement: yup.string().max(1000, "Problem statement must not exceed 1000 characters"),
  solution_overview: yup.string().max(1000, "Solution overview must not exceed 1000 characters"),
  results: yup.string().max(1000, "Results must not exceed 1000 characters"),
  duration: yup.string().max(50, "Duration must not exceed 50 characters"),
  projectimage: yup.array().of(yup.string().nullable().optional()),
});

export default function CaseStudyForm({ 
  open, 
  onOpenChange, 
  editingCaseStudy, 
  onSuccess 
}) {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [projectImageFiles, setProjectImageFiles] = useState({});
  
  // Upload hook
  const { uploadFile, uploadMultipleFiles, isUploading } = useUpload({ folder: "case-studies" });
  
  // Fetch categories for multi-select
  const { data: categoriesData } = useGetCategoriesQuery();
  
  // Fetch clients for dropdown
  const { data: clientsData } = useGetClientsQuery();
  
  useEffect(() => {
    if (categoriesData?.data || categoriesData) {
      const categories = categoriesData?.data || categoriesData || [];
      setCategoryOptions(
        categories.map((cat) => {
          const id = cat.id || cat._id;
          // Ensure value is always a number to match form values
          return {
            value: typeof id === 'number' ? id : Number(id),
            label: cat.name || "Unnamed Category",
          };
        })
      );
    }
  }, [categoriesData]);

  useEffect(() => {
    if (clientsData?.data || clientsData) {
      const clients = clientsData?.data || clientsData || [];
      setClientOptions(
        clients.map((client) => ({
          value: client.id || client._id,
          label: client.name || client.companyName || `Client #${client.id || client._id}`,
        }))
      );
    }
  }, [clientsData]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
    getValues,
    control,
  } = useForm({
    resolver: yupResolver(caseStudySchema),
    defaultValues: {
      title: "",
      description: "",
      badge: false,
      features: [""],
      categories: [],
      imageUrl: "",
      caseStudyUrl: "",
      liveUrl: "",
      status: "active",
      clientId: "",
      industry: "",
      problem_statement: "",
      solution_overview: "",
      results: "",
      duration: "",
      projectimage: [""],
    },
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control,
    name: "features",
  });

  const { fields: projectImageFields, append: appendProjectImage, remove: removeProjectImage } = useFieldArray({
    control,
    name: "projectimage",
  });

  // API hooks
  const [createCaseStudy, { isLoading: isCreating }] = useCreateCaseStudyMutation();
  const [updateCaseStudy, { isLoading: isUpdating }] = useUpdateCaseStudyMutation();

  const badgeValue = watch("badge");
  const categoriesValue = watch("categories") || [];

  // Reset form when dialog opens/closes or editingCaseStudy changes
  // Also re-run when categoryOptions are loaded to properly set categories
  useEffect(() => {
    if (open) {
      if (editingCaseStudy) {
        // Extract category IDs from editingCaseStudy.categories
        // Categories can come as: [{name: "Web Development"}, {id: 1}, or just [1, 2, 3]
        let categoryIds = [];
        
        if (editingCaseStudy.categories && editingCaseStudy.categories.length > 0) {
          categoryIds = editingCaseStudy.categories
            .map((cat) => {
              // Case 1: Object with id or _id property
              if (typeof cat === 'object' && (cat.id !== undefined || cat._id !== undefined)) {
                const id = cat.id || cat._id;
                return typeof id === 'number' ? id : Number(id);
              }
              
              // Case 2: Object with name property - find matching category by name
              if (typeof cat === 'object' && cat.name && categoryOptions.length > 0) {
                const found = categoryOptions.find(opt => opt.label === cat.name);
                if (found) return found.value;
              }
              
              // Case 3: Already a number (ID)
              if (typeof cat === 'number') return cat;
              
              // Case 4: String that can be converted to number
              if (typeof cat === 'string' && !isNaN(cat)) return Number(cat);
              
              return null;
            })
            .filter((id) => id !== null && !isNaN(id));
        }
        
        // Use reset to properly initialize all form values at once
        reset({
          title: editingCaseStudy.title || "",
          description: editingCaseStudy.description || "",
          badge: editingCaseStudy.badge || false,
          features: editingCaseStudy.features?.length > 0 ? editingCaseStudy.features : [""],
          categories: categoryIds,
          imageUrl: editingCaseStudy.imageUrl || "",
          caseStudyUrl: editingCaseStudy.caseStudyUrl || "",
          liveUrl: editingCaseStudy.liveUrl || "",
          status: editingCaseStudy.status || "active",
          clientId: editingCaseStudy.clientId ? String(editingCaseStudy.clientId) : "",
          industry: editingCaseStudy.industry || "",
          problem_statement: editingCaseStudy.problem_statement || "",
          solution_overview: editingCaseStudy.solution_overview || "",
          results: editingCaseStudy.results || "",
          duration: editingCaseStudy.duration || "",
          projectimage: editingCaseStudy.projectimage?.length > 0 ? editingCaseStudy.projectimage : [""],
        });
        // Reset file states when editing
        setMainImageFile(null);
        setProjectImageFiles({});
      } else {
        reset({
          title: "",
          description: "",
          badge: false,
          features: [""],
          categories: [],
          imageUrl: "",
          caseStudyUrl: "",
          liveUrl: "",
          status: "active",
          clientId: "",
          industry: "",
          problem_statement: "",
          solution_overview: "",
          results: "",
          duration: "",
          projectimage: [""],
        });
        setMainImageFile(null);
        setProjectImageFiles({});
      }
    } else {
      reset({
        title: "",
        description: "",
        badge: false,
        features: [""],
        categories: [],
        imageUrl: "",
        caseStudyUrl: "",
        liveUrl: "",
        status: "active",
        clientId: "",
        industry: "",
        problem_statement: "",
        solution_overview: "",
        results: "",
        duration: "",
        projectimage: [""],
      });
      setMainImageFile(null);
      setProjectImageFiles({});
    }
  }, [open, editingCaseStudy, reset, setValue, categoryOptions]);

  // Update categories when categoryOptions are loaded (for edit mode)
  // This ensures categories are set even if options load after initial reset
  useEffect(() => {
    if (open && editingCaseStudy && categoryOptions.length > 0 && editingCaseStudy.categories) {
      // Re-extract category IDs now that options are available
      const categoryIds = editingCaseStudy.categories
        .map((cat) => {
          // Object with id/_id
          if (typeof cat === 'object' && (cat.id !== undefined || cat._id !== undefined)) {
            const id = cat.id || cat._id;
            return typeof id === 'number' ? id : Number(id);
          }
          // Object with name - find by name
          if (typeof cat === 'object' && cat.name) {
            const found = categoryOptions.find(opt => opt.label === cat.name);
            if (found) return found.value;
          }
          // Already a number
          if (typeof cat === 'number') return cat;
          // String number
          if (typeof cat === 'string' && !isNaN(cat)) return Number(cat);
          return null;
        })
        .filter((id) => id !== null && !isNaN(id));
      
      // Only update if we found valid category IDs
      if (categoryIds.length > 0) {
        const currentCategories = getValues("categories") || [];
        // Check if categories need to be updated (compare sorted arrays to avoid order issues)
        const currentSorted = [...currentCategories].sort((a, b) => a - b);
        const newSorted = [...categoryIds].sort((a, b) => a - b);
        const needsUpdate = currentSorted.length !== newSorted.length ||
          !currentSorted.every((id, idx) => id === newSorted[idx]);
        
        if (needsUpdate) {
          setValue("categories", categoryIds, { shouldValidate: false });
        }
      }
    }
  }, [categoryOptions, open, editingCaseStudy, setValue, getValues]);

  const onSubmit = async (data) => {
    try {
      // Upload main image if a new file was selected
      let imageUrl = data.imageUrl;
      if (mainImageFile) {
        toast.loading("Uploading image...", { id: "upload-image" });
        try {
          imageUrl = await uploadFile(mainImageFile);
          toast.success("Image uploaded successfully!", { id: "upload-image" });
        } catch (error) {
          toast.error("Failed to upload image", { id: "upload-image" });
          return;
        }
      }

      // Upload project images if new files were selected
      let projectImages = [...(data.projectimage || [])];
      const filesToUpload = Object.entries(projectImageFiles)
        .filter(([index, file]) => file !== null)
        .map(([index, file]) => ({ index: parseInt(index), file }));

      if (filesToUpload.length > 0) {
        toast.loading(`Uploading ${filesToUpload.length} image(s)...`, { id: "upload-project-images" });
        try {
          const files = filesToUpload.map(({ file }) => file);
          const uploadedUrls = await uploadMultipleFiles(files);
          
          // Replace the URLs at the correct indices
          filesToUpload.forEach(({ index }, i) => {
            projectImages[index] = uploadedUrls[i];
          });
          
          toast.success("Project images uploaded successfully!", { id: "upload-project-images" });
        } catch (error) {
          toast.error("Failed to upload project images", { id: "upload-project-images" });
          return;
        }
      }

      // Filter out empty features and project images
      const filteredData = {
        ...data,
        imageUrl: imageUrl || "",
        features: data.features.filter((f) => f && f.trim() !== ""),
        projectimage: projectImages.filter((img) => img && img.trim() !== ""),
        clientId: data.clientId ? Number(data.clientId) : undefined,
      };

      if (editingCaseStudy) {
        await updateCaseStudy({
          id: editingCaseStudy.id || editingCaseStudy._id,
          ...filteredData,
        }).unwrap();
        toast.success("Case study updated successfully!");
      } else {
        await createCaseStudy(filteredData).unwrap();
        toast.success("Case study created successfully!");
      }
      
      // Reset file states
      setMainImageFile(null);
      setProjectImageFiles({});
      
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(error?.data?.message || `Failed to ${editingCaseStudy ? 'update' : 'create'} case study`);
    }
  };

  const handleClose = () => {
    reset({
      title: "",
      description: "",
      badge: false,
      features: [""],
      categories: [],
      imageUrl: "",
      caseStudyUrl: "",
      liveUrl: "",
      status: "active",
      clientId: "",
      industry: "",
      problem_statement: "",
      solution_overview: "",
      results: "",
      duration: "",
      projectimage: [""],
    });
    setMainImageFile(null);
    setProjectImageFiles({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingCaseStudy ? "Edit Case Study" : "Add New Case Study"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6 py-4">
            {/* Basic Information */}
            <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                Basic Information
              </h3>
              <TextField
                label="Title"
                name="title"
                placeholder="e.g. Management System"
                register={register}
                error={errors.title?.message}
                required
              />
              <TextareaField
                label="Description"
                name="description"
                placeholder="e.g. A complete digital solution for managing school operations."
                register={register}
                error={errors.description?.message}
                rows={4}
                required
              />
              <div className="flex items-center space-x-2">
                <Switch
                  id="badge"
                  checked={badgeValue}
                  onCheckedChange={(checked) => setValue("badge", checked)}
                />
                <Label htmlFor="badge" className="cursor-pointer">
                  Show Badge
                </Label>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                Features
              </h3>
              {featureFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-start">
                  <TextField
                    label={index === 0 ? "Feature" : ""}
                    name={`features.${index}`}
                    placeholder="e.g. Student Management"
                    register={register}
                    error={errors.features?.[index]?.message}
                    className="flex-1"
                  />
                  {featureFields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="mt-6 h-10 w-10 text-red-600"
                      onClick={() => removeFeature(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendFeature("")}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Feature
              </Button>
            </div>

            {/* Categories & URLs */}
            <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                Categories & URLs
              </h3>
              <MultiSelectDropdown
                options={categoryOptions}
                value={categoriesValue}
                onChange={(value) => setValue("categories", value)}
                LabelName="Categories"
                placeholder="Select categories"
                error={errors.categories?.message}
              />
              <ImageInput
                key={`imageUrl-${editingCaseStudy?.id || 'new'}-${open}-${watch("imageUrl") || ''}`}
                id="imageUrl"
                label="Cover Image"
                value={watch("imageUrl") || editingCaseStudy?.imageUrl || ""}
                currentImage={editingCaseStudy?.imageUrl}
                onChange={(file, previewUrl) => {
                  setMainImageFile(file);
                  setValue("imageUrl", previewUrl);
                }}
                onRemove={() => {
                  setMainImageFile(null);
                  setValue("imageUrl", "");
                }}
                error={errors.imageUrl?.message}
                maxSize={10}
                previewSize="w-full h-48"
              />
              <TextField
                label="Case Study URL"
                name="caseStudyUrl"
                placeholder="https://example.com/case-study/school-management"
                register={register}
                error={errors.caseStudyUrl?.message}
              />
              <TextField
                label="Live URL"
                name="liveUrl"
                placeholder="https://school.example.com"
                register={register}
                error={errors.liveUrl?.message}
              />
            </div>

            {/* Project Details */}
            <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                Project Details
              </h3>
              <SelectField
                label="Status"
                name="status"
                value={watch("status") || "active"}
                onChange={(e) => setValue("status", e.target.value)}
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                  { value: "draft", label: "Draft" },
                ]}
                error={errors.status?.message}
                className="w-full"
              />
              <SelectField
                label="Client"
                name="clientId"
                value={watch("clientId") ? String(watch("clientId")) : ""}
                onChange={(e) => setValue("clientId", e.target.value ? Number(e.target.value) : null)}
                options={clientOptions}
                placeholder="Select a client"
                error={errors.clientId?.message}
                className="w-full"
              />
              <TextField
                label="Industry"
                name="industry"
                placeholder="e.g. Education"
                register={register}
                error={errors.industry?.message}
              />
              <TextField
                label="Duration"
                name="duration"
                placeholder="e.g. 6 Months"
                register={register}
                error={errors.duration?.message}
              />
            </div>

            {/* Case Study Content */}
            <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                Case Study Content
              </h3>
              <TextareaField
                label="Problem Statement"
                name="problem_statement"
                placeholder="e.g. Manual record keeping caused data loss and inefficiency."
                register={register}
                error={errors.problem_statement?.message}
                rows={3}
              />
              <TextareaField
                label="Solution Overview"
                name="solution_overview"
                placeholder="e.g. We developed a centralized web-based management system."
                register={register}
                error={errors.solution_overview?.message}
                rows={3}
              />
              <TextareaField
                label="Results"
                name="results"
                placeholder="e.g. Reduced administrative workload by 60%."
                register={register}
                error={errors.results?.message}
                rows={3}
              />
            </div>

            {/* Project Images */}
            <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                Project Images
              </h3>
              {projectImageFields.map((field, index) => (
                <div key={field.id} className="space-y-2">
                  <ImageInput
                    key={`projectimage-${field.id}-${editingCaseStudy?.id || 'new'}-${open}-${watch(`projectimage.${index}`) || editingCaseStudy?.projectimage?.[index] || ''}`}
                    id={`projectimage-${index}`}
                    label={index === 0 ? "Project Image" : ""}
                    value={watch(`projectimage.${index}`) || editingCaseStudy?.projectimage?.[index] || ""}
                    currentImage={editingCaseStudy?.projectimage?.[index]}
                    onChange={(file, previewUrl) => {
                      setProjectImageFiles((prev) => ({
                        ...prev,
                        [index]: file,
                      }));
                      setValue(`projectimage.${index}`, previewUrl);
                    }}
                    onRemove={() => {
                      setProjectImageFiles((prev) => {
                        const newFiles = { ...prev };
                        delete newFiles[index];
                        return newFiles;
                      });
                      setValue(`projectimage.${index}`, "");
                    }}
                    error={errors.projectimage?.[index]?.message}
                    maxSize={10}
                    previewSize="w-full h-48"
                  />
                  {projectImageFields.length > 1 && (
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => {
                          removeProjectImage(index);
                          setProjectImageFiles((prev) => {
                            const newFiles = { ...prev };
                            delete newFiles[index];
                            // Shift indices for files after the removed one
                            const shifted = {};
                            Object.keys(newFiles).forEach((key) => {
                              const keyNum = parseInt(key);
                              if (keyNum > index) {
                                shifted[keyNum - 1] = newFiles[key];
                              } else {
                                shifted[key] = newFiles[key];
                              }
                            });
                            return shifted;
                          });
                        }}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Remove Image
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendProjectImage("")}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project Image
              </Button>
            </div>
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
              disabled={isCreating || isUpdating || isSubmitting || isUploading}
            >
              {isCreating || isUpdating || isSubmitting || isUploading
                ? isUploading
                  ? "Uploading..."
                  : "Saving..."
                : editingCaseStudy
                ? "Update Case Study"
                : "Create Case Study"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
