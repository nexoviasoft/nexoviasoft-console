"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TextField from "@/components/input/TextField";
import ImageInput from "@/components/input/ImageInput";
import { toast } from "sonner";
import { 
  useCreateClientMutation, 
  useUpdateClientMutation 
} from "@/api/landing/client/clientApi";
import { useUpload } from "@/hooks/useUpload";

// Yup validation schema
const ourClientSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  designation: yup
    .string()
    .required("Designation is required")
    .max(100, "Designation must not exceed 100 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  photo: yup
    .string()
    .nullable()
    .optional(),
  companyName: yup
    .string()
    .required("Company name is required")
    .max(200, "Company name must not exceed 200 characters"),
  companyType: yup
    .string()
    .required("Company type is required")
    .max(100, "Company type must not exceed 100 characters"),
  location: yup
    .string()
    .required("Location is required")
    .max(100, "Location must not exceed 100 characters"),
  country: yup
    .string()
    .required("Country is required")
    .max(100, "Country must not exceed 100 characters"),
});

export default function OurClientForm({ 
  open, 
  onOpenChange, 
  editingClient, 
  onSuccess 
}) {
  const [photoFile, setPhotoFile] = useState(null);
  
  // Upload hook
  const { uploadFile, isUploading } = useUpload({ folder: "our-client" });

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
    resolver: yupResolver(ourClientSchema),
    defaultValues: {
      name: "",
      designation: "",
      email: "",
      phone: "",
      photo: "",
      companyName: "",
      companyType: "",
      location: "",
      country: "",
    },
  });

  // API hooks
  const [createClient, { isLoading: isCreating }] = useCreateClientMutation();
  const [updateClient, { isLoading: isUpdating }] = useUpdateClientMutation();

  // Reset form when dialog opens/closes or editingClient changes
  useEffect(() => {
    if (open) {
      if (editingClient) {
        reset({
          name: editingClient.name || "",
          designation: editingClient.designation || "",
          email: editingClient.email || "",
          phone: editingClient.phone || "",
          photo: editingClient.photo || "",
          companyName: editingClient.companyName || "",
          companyType: editingClient.companyType || "",
          location: editingClient.location || "",
          country: editingClient.country || "",
        });
        setPhotoFile(null);
      } else {
        reset({
          name: "",
          designation: "",
          email: "",
          phone: "",
          photo: "",
          companyName: "",
          companyType: "",
          location: "",
          country: "",
        });
        setPhotoFile(null);
      }
    } else {
      reset({
        name: "",
        designation: "",
        email: "",
        phone: "",
        photo: "",
        companyName: "",
        companyType: "",
        location: "",
        country: "",
      });
      setPhotoFile(null);
    }
  }, [open, editingClient, reset]);

  const onSubmit = async (data) => {
    try {
      // Upload photo if a new file was selected
      let photo = data.photo;
      if (photoFile) {
        toast.loading("Uploading photo...", { id: "upload-photo" });
        try {
          photo = await uploadFile(photoFile);
          toast.success("Photo uploaded successfully!", { id: "upload-photo" });
        } catch (error) {
          toast.error("Failed to upload photo", { id: "upload-photo" });
          return;
        }
      }

      const formattedData = {
        ...data,
        photo: photo || "",
      };

      if (editingClient) {
        // Update existing client
        await updateClient({
          id: editingClient.id || editingClient._id,
          ...formattedData,
        }).unwrap();
        toast.success("Client updated successfully!");
      } else {
        // Create new client
        await createClient(formattedData).unwrap();
        toast.success("Client created successfully!");
      }
      
      // Reset file states
      setPhotoFile(null);
      
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(error?.data?.message || `Failed to ${editingClient ? 'update' : 'create'} client`);
    }
  };

  const handleClose = () => {
    reset({
      name: "",
      designation: "",
      email: "",
      phone: "",
      photo: "",
      companyName: "",
      companyType: "",
      location: "",
      country: "",
    });
    setPhotoFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto glass-card border-white/20 scrollbar-thin scrollbar-glass">
        <DialogHeader>
          <DialogTitle className="text-white">
            {editingClient ? "Edit Client" : "Add New Client"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6 py-4">
            {/* Personal Information */}
            <div className="space-y-4 p-4 rounded-lg bg-black/40 border border-white/15">
              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="Name"
                  name="name"
                  placeholder="e.g. John Smith"
                  register={register}
                  error={errors.name?.message}
                  required
                />
                <TextField
                  label="Designation"
                  name="designation"
                  placeholder="e.g. CEO"
                  register={register}
                  error={errors.designation?.message}
                  required
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="e.g. john.smith@example.com"
                  register={register}
                  error={errors.email?.message}
                  required
                />
                <TextField
                  label="Phone"
                  name="phone"
                  placeholder="e.g. +1-202-555-0189"
                  register={register}
                  error={errors.phone?.message}
                  required
                />
              </div>
            </div>

            {/* Company Information */}
            <div className="space-y-4 p-4 rounded-lg bg-black/40 border border-white/15">
              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                Company Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="Company Name"
                  name="companyName"
                  placeholder="e.g. TechSoft Ltd"
                  register={register}
                  error={errors.companyName?.message}
                  required
                />
                <TextField
                  label="Company Type"
                  name="companyType"
                  placeholder="e.g. Software Company"
                  register={register}
                  error={errors.companyType?.message}
                  required
                />
                <TextField
                  label="Location"
                  name="location"
                  placeholder="e.g. New York"
                  register={register}
                  error={errors.location?.message}
                  required
                />
                <TextField
                  label="Country"
                  name="country"
                  placeholder="e.g. USA"
                  register={register}
                  error={errors.country?.message}
                  required
                />
              </div>
            </div>

            {/* Photo */}
            <div className="space-y-4 p-4 rounded-lg bg-black/40 border border-white/15">
              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                Photo
              </h3>
              <ImageInput
                key={`photo-${editingClient?.id || 'new'}-${open}-${watch("photo") || ''}`}
                id="photo"
                label="Client Photo"
                value={watch("photo") || editingClient?.photo || ""}
                currentImage={editingClient?.photo}
                onChange={(file, previewUrl) => {
                  setPhotoFile(file);
                  setValue("photo", previewUrl);
                }}
                onRemove={() => {
                  setPhotoFile(null);
                  setValue("photo", "");
                }}
                error={errors.photo?.message}
                maxSize={10}
                previewSize="w-full h-48"
              />
            </div>
          </div>
          <DialogFooter className="border-t border-white/10 pt-4 mt-2">
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
              className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button"
            >
              {isCreating || isUpdating || isSubmitting || isUploading
                ? isUploading
                  ? "Uploading..."
                  : "Saving..."
                : editingClient
                ? "Update Client"
                : "Create Client"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
