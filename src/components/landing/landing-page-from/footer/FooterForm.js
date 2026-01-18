"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TextField from "@/components/input/TextField";
import TextareaField from "@/components/input/TextareaField";
import ImageInput from "@/components/input/ImageInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { 
  useGetFooterQuery,
  useUpdateFooterMutation 
} from "@/api/landing/footer/page";
import { useUpload } from "@/hooks/useUpload";
import { Plus, Trash2 } from "lucide-react";

// Yup validation schema
const footerSchema = yup.object({
  logo_url: yup
    .string()
    .url("Please enter a valid URL")
    .nullable()
    .optional(),
  company_name: yup
    .string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(200, "Company name must not exceed 200 characters"),
  company_description: yup
    .string()
    .required("Company description is required")
    .max(1000, "Company description must not exceed 1000 characters"),
  location: yup
    .string()
    .max(200, "Location must not exceed 200 characters")
    .nullable()
    .optional(),
  twitter_url: yup
    .string()
    .url("Please enter a valid URL")
    .nullable()
    .optional(),
  instagram_url: yup
    .string()
    .url("Please enter a valid URL")
    .nullable()
    .optional(),
  linkedin_url: yup
    .string()
    .url("Please enter a valid URL")
    .nullable()
    .optional(),
  youtube_url: yup
    .string()
    .url("Please enter a valid URL")
    .nullable()
    .optional(),
  company_links_title: yup
    .string()
    .max(100, "Title must not exceed 100 characters")
    .nullable()
    .optional(),
  company_links: yup
    .array()
    .of(
      yup.object({
        label: yup.string().required("Label is required"),
        url: yup.string().url("Please enter a valid URL").required("URL is required"),
      })
    )
    .nullable()
    .optional(),
  services_links_title: yup
    .string()
    .max(100, "Title must not exceed 100 characters")
    .nullable()
    .optional(),
  services_links: yup
    .array()
    .of(
      yup.object({
        label: yup.string().required("Label is required"),
        url: yup.string().url("Please enter a valid URL").required("URL is required"),
      })
    )
    .nullable()
    .optional(),
  legal_links_title: yup
    .string()
    .max(100, "Title must not exceed 100 characters")
    .nullable()
    .optional(),
  legal_links: yup
    .array()
    .of(
      yup.object({
        label: yup.string().required("Label is required"),
        url: yup.string().url("Please enter a valid URL").required("URL is required"),
      })
    )
    .nullable()
    .optional(),
  newsletter_title: yup
    .string()
    .max(100, "Title must not exceed 100 characters")
    .nullable()
    .optional(),
  newsletter_placeholder: yup
    .string()
    .max(100, "Placeholder must not exceed 100 characters")
    .nullable()
    .optional(),
  newsletter_enabled: yup
    .boolean()
    .default(true),
});

export default function FooterForm({ 
  open, 
  onOpenChange, 
  onSuccess 
}) {
  const [logoFile, setLogoFile] = useState(null);
  
  // Upload hook
  const { uploadFile, isUploading } = useUpload({ folder: "footer" });

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
    resolver: yupResolver(footerSchema),
    defaultValues: {
      logo_url: "",
      company_name: "",
      company_description: "",
      location: "",
      twitter_url: "",
      instagram_url: "",
      linkedin_url: "",
      youtube_url: "",
      company_links_title: "",
      company_links: [{ label: "", url: "" }],
      services_links_title: "",
      services_links: [{ label: "", url: "" }],
      legal_links_title: "",
      legal_links: [{ label: "", url: "" }],
      newsletter_title: "",
      newsletter_placeholder: "",
      newsletter_enabled: true,
    },
  });

  // API hooks
  const { data: footerData, isLoading: isLoadingFooter } = useGetFooterQuery(undefined, {
    skip: !open, // Only fetch when dialog is open
  });
  const [updateFooter, { isLoading: isUpdating }] = useUpdateFooterMutation();

  // Watch form values for dynamic arrays
  const companyLinks = watch("company_links") || [];
  const servicesLinks = watch("services_links") || [];
  const legalLinks = watch("legal_links") || [];
  const newsletterEnabled = watch("newsletter_enabled");

  // Reset form when dialog opens/closes or footer data changes
  useEffect(() => {
    if (open && footerData) {
      const footer = footerData?.data || footerData;
      reset({
        logo_url: footer.logo_url || "",
        company_name: footer.company_name || "",
        company_description: footer.company_description || "",
        location: footer.location || "",
        twitter_url: footer.twitter_url || "",
        instagram_url: footer.instagram_url || "",
        linkedin_url: footer.linkedin_url || "",
        youtube_url: footer.youtube_url || "",
        company_links_title: footer.company_links_title || "",
        company_links: Array.isArray(footer.company_links) && footer.company_links.length > 0
          ? footer.company_links
          : [{ label: "", url: "" }],
        services_links_title: footer.services_links_title || "",
        services_links: Array.isArray(footer.services_links) && footer.services_links.length > 0
          ? footer.services_links
          : [{ label: "", url: "" }],
        legal_links_title: footer.legal_links_title || "",
        legal_links: Array.isArray(footer.legal_links) && footer.legal_links.length > 0
          ? footer.legal_links
          : [{ label: "", url: "" }],
        newsletter_title: footer.newsletter_title || "",
        newsletter_placeholder: footer.newsletter_placeholder || "",
        newsletter_enabled: footer.newsletter_enabled !== undefined ? footer.newsletter_enabled : true,
      });
      setLogoFile(null);
    } else if (open && !isLoadingFooter) {
      // Reset to defaults if no data
      reset({
        logo_url: "",
        company_name: "",
        company_description: "",
        location: "",
        twitter_url: "",
        instagram_url: "",
        linkedin_url: "",
        youtube_url: "",
        company_links_title: "",
        company_links: [{ label: "", url: "" }],
        services_links_title: "",
        services_links: [{ label: "", url: "" }],
        legal_links_title: "",
        legal_links: [{ label: "", url: "" }],
        newsletter_title: "",
        newsletter_placeholder: "",
        newsletter_enabled: true,
      });
      setLogoFile(null);
    }
  }, [open, footerData, isLoadingFooter, reset]);

  const onSubmit = async (data) => {
    try {
      // Upload logo if a new file was selected
      let logo_url = data.logo_url;
      if (logoFile) {
        toast.loading("Uploading logo...", { id: "upload-logo" });
        try {
          logo_url = await uploadFile(logoFile);
          toast.success("Logo uploaded successfully!", { id: "upload-logo" });
        } catch (error) {
          toast.error("Failed to upload logo", { id: "upload-logo" });
          return;
        }
      }

      // Filter out empty links from arrays
      const formattedData = {
        ...data,
        logo_url: logo_url || "",
        company_links: (data.company_links || []).filter(
          (link) => link.label && link.label.trim() !== "" && link.url && link.url.trim() !== ""
        ),
        services_links: (data.services_links || []).filter(
          (link) => link.label && link.label.trim() !== "" && link.url && link.url.trim() !== ""
        ),
        legal_links: (data.legal_links || []).filter(
          (link) => link.label && link.label.trim() !== "" && link.url && link.url.trim() !== ""
        ),
      };

      await updateFooter(formattedData).unwrap();
      toast.success("Footer updated successfully!");
      
      // Reset file states
      setLogoFile(null);
      
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update footer");
    }
  };

  const handleClose = () => {
    setLogoFile(null);
    onOpenChange(false);
  };

  // Link handlers for company links
  const addCompanyLink = () => {
    const current = watch("company_links") || [];
    setValue("company_links", [...current, { label: "", url: "" }]);
  };

  const removeCompanyLink = (index) => {
    const current = watch("company_links") || [];
    if (current.length > 1) {
      setValue("company_links", current.filter((_, i) => i !== index));
    }
  };

  const updateCompanyLink = (index, field, value) => {
    const current = watch("company_links") || [];
    const updated = [...current];
    updated[index] = { ...updated[index], [field]: value };
    setValue("company_links", updated);
  };

  // Link handlers for services links
  const addServicesLink = () => {
    const current = watch("services_links") || [];
    setValue("services_links", [...current, { label: "", url: "" }]);
  };

  const removeServicesLink = (index) => {
    const current = watch("services_links") || [];
    if (current.length > 1) {
      setValue("services_links", current.filter((_, i) => i !== index));
    }
  };

  const updateServicesLink = (index, field, value) => {
    const current = watch("services_links") || [];
    const updated = [...current];
    updated[index] = { ...updated[index], [field]: value };
    setValue("services_links", updated);
  };

  // Link handlers for legal links
  const addLegalLink = () => {
    const current = watch("legal_links") || [];
    setValue("legal_links", [...current, { label: "", url: "" }]);
  };

  const removeLegalLink = (index) => {
    const current = watch("legal_links") || [];
    if (current.length > 1) {
      setValue("legal_links", current.filter((_, i) => i !== index));
    }
  };

  const updateLegalLink = (index, field, value) => {
    const current = watch("legal_links") || [];
    const updated = [...current];
    updated[index] = { ...updated[index], [field]: value };
    setValue("legal_links", updated);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto glass-card border-white/20 scrollbar-thin scrollbar-glass">
        <DialogHeader>
          <DialogTitle className="text-white">Update Footer</DialogTitle>
        </DialogHeader>
        {isLoadingFooter ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6 py-4">
              {/* Basic Information */}
              <div className="space-y-4 p-4 border border-white/10 rounded-lg bg-black/40">
                <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    label="Company Name"
                    name="company_name"
                    placeholder="e.g. TechSoft Ltd"
                    register={register}
                    error={errors.company_name?.message}
                    required
                    inputClassName="bg-black border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                  />
                  <TextField
                    label="Location"
                    name="location"
                    placeholder="e.g. New York, USA"
                    register={register}
                    error={errors.location?.message}
                    inputClassName="bg-black border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                  />
                </div>
                <TextareaField
                  label="Company Description"
                  name="company_description"
                  placeholder="e.g. We provide high-quality software solutions for businesses worldwide."
                  register={register}
                  error={errors.company_description?.message}
                  required
                  rows={3}
                  textareaClassName="bg-black text-white placeholder:text-white/40 border-white/20 focus-visible:ring-[#EFFC76]"
                />
              </div>

              {/* Logo */}
              <div className="space-y-4 p-4 border border-white/10 rounded-lg bg-black/40">
                <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                  Logo
                </h3>
                <ImageInput
                  key={`logo-${watch("logo_url") || ''}-${open}`}
                  id="logo_url"
                  label="Company Logo URL"
                  value={watch("logo_url") || ""}
                  currentImage={footerData?.data?.logo_url || footerData?.logo_url}
                  onChange={(file, previewUrl) => {
                    setLogoFile(file);
                    setValue("logo_url", previewUrl);
                  }}
                  onRemove={() => {
                    setLogoFile(null);
                    setValue("logo_url", "");
                  }}
                  error={errors.logo_url?.message}
                  maxSize={10}
                  previewSize="w-full h-32"
                />
              </div>

              {/* Social Media Links */}
              <div className="space-y-4 p-4 border border-white/10 rounded-lg bg-black/40">
                <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                  Social Media Links
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    label="Twitter URL"
                    name="twitter_url"
                    placeholder="https://twitter.com/techsoft"
                    register={register}
                    error={errors.twitter_url?.message}
                    inputClassName="bg-black border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                  />
                  <TextField
                    label="Instagram URL"
                    name="instagram_url"
                    placeholder="https://instagram.com/techsoft"
                    register={register}
                    error={errors.instagram_url?.message}
                    inputClassName="bg-black border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                  />
                  <TextField
                    label="LinkedIn URL"
                    name="linkedin_url"
                    placeholder="https://linkedin.com/company/techsoft"
                    register={register}
                    error={errors.linkedin_url?.message}
                    inputClassName="bg-black border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                  />
                  <TextField
                    label="YouTube URL"
                    name="youtube_url"
                    placeholder="https://youtube.com/techsoft"
                    register={register}
                    error={errors.youtube_url?.message}
                    inputClassName="bg-black border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                  />
                </div>
              </div>

              {/* Company Links */}
              <div className="space-y-4 p-4 border border-white/10 rounded-lg bg-black/40">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-lg font-semibold text-white">
                    Company Links
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addCompanyLink}
                    className="gap-2 glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                    Add Link
                  </Button>
                </div>
                <TextField
                  label="Company Links Title"
                  name="company_links_title"
                  placeholder="e.g. Company"
                  register={register}
                  error={errors.company_links_title?.message}
                  inputClassName="bg-black border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                />
                <div className="space-y-3">
                  {companyLinks.map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <Input
                          value={link?.label || ""}
                          onChange={(e) => updateCompanyLink(index, "label", e.target.value)}
                          placeholder="Label (e.g. About Us)"
                          className={`bg-black border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76] ${
                            errors.company_links?.[index]?.label ? "border-red-500" : ""
                          }`}
                        />
                        <Input
                          value={link?.url || ""}
                          onChange={(e) => updateCompanyLink(index, "url", e.target.value)}
                          placeholder="URL (e.g. /about)"
                          className={`bg-black border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76] ${
                            errors.company_links?.[index]?.url ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {companyLinks.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCompanyLink(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Services Links */}
              <div className="space-y-4 p-4 border border-white/10 rounded-lg bg-black/40">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-lg font-semibold text-white">
                    Services Links
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addServicesLink}
                    className="gap-2 glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                    Add Link
                  </Button>
                </div>
                <TextField
                  label="Services Links Title"
                  name="services_links_title"
                  placeholder="e.g. Services"
                  register={register}
                  error={errors.services_links_title?.message}
                  inputClassName="bg-black border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                />
                <div className="space-y-3">
                  {servicesLinks.map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <Input
                          value={link?.label || ""}
                          onChange={(e) => updateServicesLink(index, "label", e.target.value)}
                          placeholder="Label (e.g. Web Development)"
                          className={`bg-black border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76] ${
                            errors.services_links?.[index]?.label ? "border-red-500" : ""
                          }`}
                        />
                        <Input
                          value={link?.url || ""}
                          onChange={(e) => updateServicesLink(index, "url", e.target.value)}
                          placeholder="URL (e.g. /services/web-development)"
                          className={`bg-black border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76] ${
                            errors.services_links?.[index]?.url ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {servicesLinks.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeServicesLink(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal Links */}
              <div className="space-y-4 p-4 border border-white/10 rounded-lg bg-black/40">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-lg font-semibold text-white">
                    Legal Links
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addLegalLink}
                    className="gap-2 glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                    Add Link
                  </Button>
                </div>
                <TextField
                  label="Legal Links Title"
                  name="legal_links_title"
                  placeholder="e.g. Legal"
                  register={register}
                  error={errors.legal_links_title?.message}
                  inputClassName="bg-black border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                />
                <div className="space-y-3">
                  {legalLinks.map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <Input
                          value={link?.label || ""}
                          onChange={(e) => updateLegalLink(index, "label", e.target.value)}
                          placeholder="Label (e.g. Privacy Policy)"
                          className={`bg-black border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76] ${
                            errors.legal_links?.[index]?.label ? "border-red-500" : ""
                          }`}
                        />
                        <Input
                          value={link?.url || ""}
                          onChange={(e) => updateLegalLink(index, "url", e.target.value)}
                          placeholder="URL (e.g. /privacy-policy)"
                          className={`bg-black border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76] ${
                            errors.legal_links?.[index]?.url ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {legalLinks.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLegalLink(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="space-y-4 p-4 border border-white/10 rounded-lg bg-black/40">
                <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                  Newsletter
                </h3>
                <div className="space-y-4">
                  <TextField
                    label="Newsletter Title"
                    name="newsletter_title"
                    placeholder="e.g. Stay Updated"
                    register={register}
                    error={errors.newsletter_title?.message}
                    inputClassName="bg-black border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                  />
                  <TextField
                    label="Newsletter Placeholder"
                    name="newsletter_placeholder"
                    placeholder="e.g. Email address"
                    register={register}
                    error={errors.newsletter_placeholder?.message}
                    inputClassName="bg-black border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                  />
                  <div className="flex items-center space-x-2">
                    <Controller
                      name="newsletter_enabled"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor="newsletter_enabled">Enable Newsletter</Label>
                  </div>
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
                disabled={isSubmitting || isUpdating || isUploading || isLoadingFooter}
                className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button"
              >
                {isSubmitting || isUpdating || isUploading
                  ? "Updating..."
                  : "Update Footer"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
