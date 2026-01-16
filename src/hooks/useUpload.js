import { useState } from "react";
import { uploadToCDN } from "@/lib/upload";
import { toast } from "sonner";

/**
 * Custom hook for handling file uploads
 * @param {Object} options - Upload options
 * @param {string} options.folder - Folder name for upload (default: 'images')
 * @returns {Object} - Upload state and handlers
 */
export const useUpload = (options = {}) => {
  const { folder = "images" } = options;
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFile = async (file) => {
    if (!file) {
      throw new Error("No file provided");
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const url = await uploadToCDN(file, folder);
      setUploadProgress(100);
      setIsUploading(false);
      return url;
    } catch (error) {
      setIsUploading(false);
      setUploadProgress(0);
      toast.error(error.message || "Failed to upload file");
      throw error;
    }
  };

  const uploadMultipleFiles = async (files) => {
    if (!files || files.length === 0) {
      throw new Error("No files provided");
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const uploadPromises = files.map((file) => uploadToCDN(file, folder));
      const urls = await Promise.all(uploadPromises);
      setUploadProgress(100);
      setIsUploading(false);
      return urls;
    } catch (error) {
      setIsUploading(false);
      setUploadProgress(0);
      toast.error(error.message || "Failed to upload files");
      throw error;
    }
  };

  return {
    uploadFile,
    uploadMultipleFiles,
    isUploading,
    uploadProgress,
  };
};
