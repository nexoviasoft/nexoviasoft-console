"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ImageInput from "@/components/input/ImageInput";
import { toast } from "sonner";
import { 
  useCreateHeroCarouselMutation, 
  useUpdateHeroCarouselMutation 
} from "@/api/landing/hero-carousel/heroCarouselApi";
import { useUpload } from "@/hooks/useUpload";

// Yup validation schema
const heroCarouselSchema = yup.object({
  logoUrl: yup.string().nullable().optional(),
});

export default function HeroCarouselForm({ 
  open, 
  onOpenChange, 
  editingHeroCarousel, 
  onSuccess 
}) {
  const [logoFile, setLogoFile] = useState(null);
  
  // Upload hook
  const { uploadFile, isUploading } = useUpload({ folder: "hero-carousel" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(heroCarouselSchema),
    defaultValues: {
      logoUrl: "",
    },
  });

  // API hooks
  const [createHeroCarousel, { isLoading: isCreating }] = useCreateHeroCarouselMutation();
  const [updateHeroCarousel, { isLoading: isUpdating }] = useUpdateHeroCarouselMutation();

  // Reset form when dialog opens/closes or editingHeroCarousel changes
  useEffect(() => {
    if (open) {
      if (editingHeroCarousel) {
        reset({
          logoUrl: editingHeroCarousel.logoUrl || "",
        });
        setLogoFile(null);
      } else {
        reset({
          logoUrl: "",
        });
        setLogoFile(null);
      }
    } else {
      reset({
        logoUrl: "",
      });
      setLogoFile(null);
    }
  }, [open, editingHeroCarousel, reset]);

  const onSubmit = async (data) => {
    try {
      // Upload logo if a new file was selected
      let logoUrl = data.logoUrl;
      if (logoFile) {
        toast.loading("Uploading logo...", { id: "upload-logo" });
        try {
          logoUrl = await uploadFile(logoFile);
          toast.success("Logo uploaded successfully!", { id: "upload-logo" });
        } catch (error) {
          toast.error("Failed to upload logo", { id: "upload-logo" });
          return;
        }
      }

      const filteredData = {
        ...data,
        logoUrl: logoUrl || "",
      };

      if (editingHeroCarousel) {
        await updateHeroCarousel({
          id: editingHeroCarousel.id || editingHeroCarousel._id,
          ...filteredData,
        }).unwrap();
        toast.success("Hero carousel updated successfully!");
      } else {
        await createHeroCarousel(filteredData).unwrap();
        toast.success("Hero carousel created successfully!");
      }
      
      // Reset file states
      setLogoFile(null);
      
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(error?.data?.message || `Failed to ${editingHeroCarousel ? 'update' : 'create'} hero carousel`);
    }
  };

  const handleClose = () => {
    reset({
      logoUrl: "",
    });
    setLogoFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingHeroCarousel ? "Edit Hero Carousel" : "Add New Hero Carousel"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6 py-4">
            {/* Logo */}
            <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                Logo
              </h3>
              <ImageInput
                key={`logoUrl-${editingHeroCarousel?.id || 'new'}-${open}-${watch("logoUrl") || ''}`}
                id="logoUrl"
                label="Logo"
                value={watch("logoUrl") || editingHeroCarousel?.logoUrl || ""}
                currentImage={editingHeroCarousel?.logoUrl}
                onChange={(file, previewUrl) => {
                  setLogoFile(file);
                  setValue("logoUrl", previewUrl);
                }}
                onRemove={() => {
                  setLogoFile(null);
                  setValue("logoUrl", "");
                }}
                error={errors.logoUrl?.message}
                maxSize={10}
                previewSize="w-full h-48"
              />
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
                : editingHeroCarousel
                ? "Update Hero Carousel"
                : "Create Hero Carousel"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
