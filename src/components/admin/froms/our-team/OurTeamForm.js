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
  useCreateOurTeamMutation, 
  useUpdateOurTeamMutation 
} from "@/api/admin/our-team/ourTeamApi";
import { useGetDepartmentsQuery } from "@/api/landing/department/departmentApi";
import { useUpload } from "@/hooks/useUpload";

// Yup validation schema
const ourTeamSchema = yup.object({
  employeeId: yup
    .string()
    .required("Employee ID is required")
    .min(2, "Employee ID must be at least 2 characters")
    .max(50, "Employee ID must not exceed 50 characters"),
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(100, "First name must not exceed 100 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(100, "Last name must not exceed 100 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .when('$isEditing', (isEditing, schema) => {
      return isEditing ? schema.notRequired() : schema.required("Password is required");
    }),
  salary: yup
    .number()
    .typeError("Salary must be a number")
    .positive("Salary must be positive")
    .required("Salary is required"),
  position: yup
    .string()
    .required("Position is required")
    .max(100, "Position must not exceed 100 characters"),
  role: yup
    .string()
    .required("Role is required")
    .oneOf(["Employee", "Manager", "Admin", "HR"], "Invalid role"),
  departmentId: yup
    .number()
    .typeError("Department is required")
    .required("Department is required")
    .positive("Please select a valid department"),
  hireDate: yup
    .string()
    .required("Hire date is required"),
  dateOfBirth: yup
    .string()
    .required("Date of birth is required"),
  address: yup
    .string()
    .max(200, "Address must not exceed 200 characters"),
  city: yup
    .string()
    .max(100, "City must not exceed 100 characters"),
  state: yup
    .string()
    .max(100, "State must not exceed 100 characters"),
  zipCode: yup
    .string()
    .max(20, "Zip code must not exceed 20 characters"),
  country: yup
    .string()
    .max(100, "Country must not exceed 100 characters"),
  emergencyContactName: yup
    .string()
    .max(100, "Emergency contact name must not exceed 100 characters"),
  emergencyContactPhone: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  status: yup
    .string()
    .required("Status is required")
    .oneOf(["active", "inactive", "on-leave"], "Invalid status"),
  bio: yup
    .string()
    .max(1000, "Bio must not exceed 1000 characters"),
  profileImage: yup
    .string()
    .nullable()
    .optional(),
  skills: yup
    .array()
    .of(yup.string())
    .default([]),
});

export default function OurTeamForm({ 
  open, 
  onOpenChange, 
  editingTeamMember, 
  onSuccess 
}) {
  const [profileImageFile, setProfileImageFile] = useState(null);
  
  // Upload hook
  const { uploadFile, isUploading } = useUpload({ folder: "our-team" });

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
    resolver: yupResolver(ourTeamSchema),
    context: { isEditing: !!editingTeamMember },
    defaultValues: {
      employeeId: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      salary: "",
      position: "",
      role: "Employee",
      departmentId: "",
      hireDate: "",
      dateOfBirth: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      status: "active",
      bio: "",
      profileImage: "",
      skills: [],
    },
  });

  // API hooks
  const [createOurTeam, { isLoading: isCreating }] = useCreateOurTeamMutation();
  const [updateOurTeam, { isLoading: isUpdating }] = useUpdateOurTeamMutation();
  const { data: departmentsData } = useGetDepartmentsQuery();
  
  const departments = departmentsData?.data || departmentsData || [];

  // Reset form when dialog opens/closes or editingTeamMember changes
  useEffect(() => {
    if (open) {
      if (editingTeamMember) {
        reset({
          employeeId: editingTeamMember.employeeId || "",
          firstName: editingTeamMember.firstName || "",
          lastName: editingTeamMember.lastName || "",
          email: editingTeamMember.email || "",
          phone: editingTeamMember.phone || "",
          salary: editingTeamMember.salary || "",
          position: editingTeamMember.position || "",
          role: editingTeamMember.role || "Employee",
          departmentId: editingTeamMember.departmentId || "",
          hireDate: editingTeamMember.hireDate || "",
          dateOfBirth: editingTeamMember.dateOfBirth || "",
          address: editingTeamMember.address || "",
          city: editingTeamMember.city || "",
          state: editingTeamMember.state || "",
          zipCode: editingTeamMember.zipCode || "",
          country: editingTeamMember.country || "",
          emergencyContactName: editingTeamMember.emergencyContactName || "",
          emergencyContactPhone: editingTeamMember.emergencyContactPhone || "",
          status: editingTeamMember.status || "active",
          bio: editingTeamMember.bio || "",
          profileImage: editingTeamMember.profileImage || "",
          skills: Array.isArray(editingTeamMember.skills) ? editingTeamMember.skills : [],
        });
        setProfileImageFile(null);
      } else {
        reset({
          employeeId: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          salary: "",
          position: "",
          role: "Employee",
          departmentId: "",
          hireDate: "",
          dateOfBirth: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
          emergencyContactName: "",
          emergencyContactPhone: "",
          status: "active",
          bio: "",
          profileImage: "",
          skills: [],
        });
        setProfileImageFile(null);
      }
    } else {
      reset({
        employeeId: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        salary: "",
        position: "",
        role: "Employee",
        departmentId: "",
        hireDate: "",
        dateOfBirth: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        status: "active",
        bio: "",
        profileImage: "",
        skills: [],
      });
      setProfileImageFile(null);
    }
  }, [open, editingTeamMember, reset]);

  const onSubmit = async (data) => {
    try {
      // Upload profile image if a new file was selected
      let profileImage = data.profileImage;
      if (profileImageFile) {
        toast.loading("Uploading profile image...", { id: "upload-image" });
        try {
          profileImage = await uploadFile(profileImageFile);
          toast.success("Profile image uploaded successfully!", { id: "upload-image" });
        } catch (error) {
          toast.error("Failed to upload profile image", { id: "upload-image" });
          return;
        }
      }

      // Convert skills string to array if it's a string
      const formattedData = {
        ...data,
        departmentId: Number(data.departmentId),
        salary: Number(data.salary),
        profileImage: profileImage || "",
        skills: Array.isArray(data.skills) 
          ? data.skills 
          : typeof data.skills === 'string' && data.skills.trim()
          ? data.skills.split(',').map(s => s.trim()).filter(s => s)
          : [],
      };

      // Remove password if editing and it's empty
      if (editingTeamMember && !formattedData.password) {
        delete formattedData.password;
      }

      if (editingTeamMember) {
        // Update existing team member
        await updateOurTeam({
          id: editingTeamMember.id || editingTeamMember._id,
          ...formattedData,
        }).unwrap();
        toast.success("Team member updated successfully!");
      } else {
        // Create new team member
        await createOurTeam(formattedData).unwrap();
        toast.success("Team member created successfully!");
      }
      
      // Reset file states
      setProfileImageFile(null);
      
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(error?.data?.message || `Failed to ${editingTeamMember ? 'update' : 'create'} team member`);
    }
  };

  const handleClose = () => {
    reset({
      employeeId: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      salary: "",
      position: "",
      role: "Employee",
      departmentId: "",
      hireDate: "",
      dateOfBirth: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      status: "active",
      bio: "",
      profileImage: "",
      skills: [],
    });
    setProfileImageFile(null);
    onOpenChange(false);
  };

  const roleOptions = [
    { value: "Employee", label: "Employee" },
    { value: "Manager", label: "Manager" },
    { value: "Admin", label: "Admin" },
    { value: "HR", label: "HR" },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "on-leave", label: "On Leave" },
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingTeamMember ? "Edit Team Member" : "Add New Team Member"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6 py-4">
            {/* Basic Information */}
            <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="Employee ID"
                  name="employeeId"
                  placeholder="e.g. EMP-1001"
                  register={register}
                  error={errors.employeeId?.message}
                  required
                />
                <TextField
                  label="First Name"
                  name="firstName"
                  placeholder="e.g. John"
                  register={register}
                  error={errors.firstName?.message}
                  required
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  placeholder="e.g. Doe"
                  register={register}
                  error={errors.lastName?.message}
                  required
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="e.g. john.doe@example.com"
                  register={register}
                  error={errors.email?.message}
                  required
                />
                <TextField
                  label="Phone"
                  name="phone"
                  placeholder="e.g. +8801712345678"
                  register={register}
                  error={errors.phone?.message}
                  required
                />
                {!editingTeamMember && (
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    register={register}
                    error={errors.password?.message}
                    required
                  />
                )}
              </div>
            </div>

            {/* Employment Information */}
            <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                Employment Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="Position"
                  name="position"
                  placeholder="e.g. Software Engineer"
                  register={register}
                  error={errors.position?.message}
                  required
                />
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <SelectField
                      label="Role"
                      name="role"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      options={roleOptions}
                      error={errors.role?.message}
                      required
                    />
                  )}
                />
                <TextField
                  label="Salary"
                  name="salary"
                  type="number"
                  placeholder="e.g. 55000"
                  register={register}
                  error={errors.salary?.message}
                  required
                />
                <Controller
                  name="departmentId"
                  control={control}
                  render={({ field }) => (
                    <SelectField
                      label="Department"
                      name="departmentId"
                      value={field.value?.toString() || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      options={departments.map(dept => ({
                        value: dept.id?.toString() || dept._id?.toString() || "",
                        label: dept.name || "Unknown Department"
                      }))}
                      placeholder="Select department"
                      error={errors.departmentId?.message}
                      required
                    />
                  )}
                />
                <TextField
                  label="Hire Date"
                  name="hireDate"
                  type="date"
                  register={register}
                  error={errors.hireDate?.message}
                  required
                />
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <SelectField
                      label="Status"
                      name="status"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      options={statusOptions}
                      error={errors.status?.message}
                      required
                    />
                  )}
                />
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  register={register}
                  error={errors.dateOfBirth?.message}
                  required
                />
                <TextField
                  label="Address"
                  name="address"
                  placeholder="e.g. House 12, Road 5"
                  register={register}
                  error={errors.address?.message}
                />
                <TextField
                  label="City"
                  name="city"
                  placeholder="e.g. Dhaka"
                  register={register}
                  error={errors.city?.message}
                />
                <TextField
                  label="State"
                  name="state"
                  placeholder="e.g. Dhaka"
                  register={register}
                  error={errors.state?.message}
                />
                <TextField
                  label="Zip Code"
                  name="zipCode"
                  placeholder="e.g. 1207"
                  register={register}
                  error={errors.zipCode?.message}
                />
                <TextField
                  label="Country"
                  name="country"
                  placeholder="e.g. Bangladesh"
                  register={register}
                  error={errors.country?.message}
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                Emergency Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="Emergency Contact Name"
                  name="emergencyContactName"
                  placeholder="e.g. Md Rahman"
                  register={register}
                  error={errors.emergencyContactName?.message}
                />
                <TextField
                  label="Emergency Contact Phone"
                  name="emergencyContactPhone"
                  placeholder="e.g. +8801812345678"
                  register={register}
                  error={errors.emergencyContactPhone?.message}
                />
              </div>
            </div>

            {/* Profile & Skills */}
            <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                Profile & Skills
              </h3>
              <div className="space-y-4">
                <ImageInput
                  key={`profileImage-${editingTeamMember?.id || 'new'}-${open}-${watch("profileImage") || ''}`}
                  id="profileImage"
                  label="Profile Image"
                  value={watch("profileImage") || editingTeamMember?.profileImage || ""}
                  currentImage={editingTeamMember?.profileImage}
                  onChange={(file, previewUrl) => {
                    setProfileImageFile(file);
                    setValue("profileImage", previewUrl);
                  }}
                  onRemove={() => {
                    setProfileImageFile(null);
                    setValue("profileImage", "");
                  }}
                  error={errors.profileImage?.message}
                  maxSize={10}
                  previewSize="w-full h-48"
                />
                <TextareaField
                  label="Bio"
                  name="bio"
                  placeholder="e.g. Passionate full-stack developer with experience in NestJS and React."
                  register={register}
                  error={errors.bio?.message}
                  rows={4}
                />
                <div>
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Controller
                    name="skills"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <Input
                          id="skills"
                          placeholder="e.g. NestJS, React, TypeScript, PostgreSQL"
                          value={Array.isArray(field.value) ? field.value.join(", ") : field.value || ""}
                          onChange={(e) => {
                            const skillsArray = e.target.value
                              .split(",")
                              .map(s => s.trim())
                              .filter(s => s);
                            field.onChange(skillsArray);
                          }}
                        />
                        {errors.skills && (
                          <p className="text-sm text-red-500 mt-1">{errors.skills.message}</p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
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
                : editingTeamMember
                ? "Update Team Member"
                : "Create Team Member"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
