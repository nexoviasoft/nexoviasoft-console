import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, Upload, Image as ImageIcon } from "lucide-react";

const ImageInput = ({
  id,
  label = "Image",
  value = "",
  onChange,
  onRemove,
  accept = "image/*",
  previewSize = "w-32 h-20",
  showRemoveButton = true,
  required = false,
  error,
  className = "",
  placeholder = "Choose an image file",
  maxSize = 10, // MB
  currentImage = null, // For editing mode - existing image URL
  ...props
}) => {
  // Initialize preview with currentImage or value if available
  const getInitialPreview = () => {
    if (value && value.trim() !== "") return value;
    if (currentImage && currentImage.trim() !== "") return currentImage;
    return "";
  };

  const [preview, setPreview] = useState(() => getInitialPreview());
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  // Update preview when value or currentImage changes
  useEffect(() => {
    // If there's a new file selected, don't override its preview
    // The preview for new files is handled in processFile function
    if (file) {
      return;
    }

    // Priority: value > currentImage > empty
    // If there's a value (from form) and it's not empty, use it
    const formValue = value && value.trim() !== "" ? value : null;
    const existingImage = currentImage && currentImage.trim() !== "" ? currentImage : null;
    
    // Use form value if available, otherwise fall back to currentImage
    const imageToShow = formValue || existingImage || "";
    
    // Update preview if it's different
    if (preview !== imageToShow) {
      setPreview(imageToShow);
    }
  }, [value, currentImage, file, preview]);

  // Reset file and update preview when currentImage changes (for edit mode)
  useEffect(() => {
    if (currentImage && !file) {
      setFile(null);
      // If there's no form value, use currentImage for preview
      if (!value || value.trim() === "") {
        setPreview(currentImage);
      }
    }
  }, [currentImage, file, value]);

  const validateAndSetFile = (selectedFile) => {
    // Check file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return false;
    }

    // Check file type
    if (!selectedFile.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validateAndSetFile(selectedFile)) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile) => {
    setIsLoading(true);

    // Create preview first
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewUrl = e.target.result;
      setPreview(previewUrl);
      setFile(selectedFile);
      // Pass the File object to parent - they should handle it as FormData
      onChange?.(selectedFile, previewUrl);
      setIsLoading(false);
    };
    reader.onerror = () => {
      setIsLoading(false);
      alert("Error reading file");
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (validateAndSetFile(selectedFile)) {
        processFile(selectedFile);
      }
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onRemove?.();
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const getPreviewSrc = () => {
    // If there's a new file selected, use its preview
    if (file) {
      return preview;
    }

    // If there's a preview URL (from current image or value)
    if (preview && preview.trim() !== "") {
      // If it's already a full URL or data URL, use it as is
      if (preview.startsWith("http") || preview.startsWith("data:") || preview.startsWith("/")) {
        return preview;
      }
      // For relative paths, return as is (browser will handle it)
      return preview;
    }

    // Fallback to currentImage if no preview is set
    if (currentImage && currentImage.trim() !== "") {
      // If it's already a full URL or data URL, use it as is
      if (currentImage.startsWith("http") || currentImage.startsWith("data:") || currentImage.startsWith("/")) {
        return currentImage;
      }
      // For relative paths, return as is
      return currentImage;
    }

    return "";
  };

  const hasImage = file || preview || currentImage;

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <Label
          htmlFor={id}
          className={`text-white/80 ${
            required
              ? "after:content-['*'] after:ml-0.5 after:text-[#F58220]"
              : ""
          }`}
        >
          {label}
        </Label>
      )}

      <div className="space-y-4">
        {/* Drag & Drop Zone */}
        <div
          ref={dropZoneRef}
          className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 cursor-pointer ${
            dragActive
              ? "border-[#F58220] bg-[#F58220]/5 scale-105"
              : "border-white/30 hover:border-[#F58220]/60"
          } ${hasImage ? "bg-black/40" : "bg-black/40"}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
        >
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            id={id}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            {...props}
          />

          <div className="flex flex-col items-center justify-center text-center space-y-3">
            {hasImage ? (
              <>
                <div className="relative">
                  <img
                    src={getPreviewSrc()}
                    alt="Preview"
                    className={`${previewSize} object-cover rounded-lg border-2 border-white/30`}
                    onError={(e) => {
                      console.log("Image failed to load:", getPreviewSrc());
                      e.target.style.display = "none";
                      // Show fallback
                      const fallback = e.target.nextSibling;
                      if (fallback) {
                        fallback.style.display = "flex";
                      }
                    }}
                    onLoad={() => {
                      console.log(
                        "Image loaded successfully:",
                        getPreviewSrc(),
                      );
                    }}
                  />
                  {/* Fallback when image fails to load */}
                  <div
                    className="hidden items-center justify-center bg-black/60 rounded-lg border-2 border-white/20"
                    style={{ width: "128px", height: "80px" }}
                  >
                    <div className="text-center">
                      <ImageIcon className="w-6 h-6 mx-auto mb-1 text-white/60" />
                      <p className="text-xs text-white/60">
                        Image not available
                      </p>
                    </div>
                  </div>
                  {file && (
                    <div className="absolute -top-2 -right-2 bg-emerald-500/20 text-emerald-200 text-xs px-2 py-1 rounded-full font-medium border border-emerald-400/60">
                      New
                    </div>
                  )}
                  {!file && (currentImage || value) && (
                    <div className="absolute -top-2 -right-2 bg-[#F58220]/20 text-[#F58220] text-xs px-2 py-1 rounded-full font-medium border border-[#F58220]/60">
                      Current
                    </div>
                  )}
                </div>
                <div className="text-sm text-white/80">
                  {file ? (
                    <div className="space-y-1">
                      <p className="font-medium">{file.name}</p>
                      <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <p>Current image loaded</p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="p-4 bg-white/5 rounded-full border border-white/20">
                  <Upload className="w-8 h-8 text-white/70" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-medium text-white">
                    Drag and drop or{" "}
                    <span className="text-[#F58220] underline">
                      browse
                    </span>{" "}
                    to upload
                  </p>
                  <p className="text-sm text-white/70">
                    PNG, JPG, GIF up to {maxSize}MB
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/80 rounded-lg flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F58220]"></div>
            </div>
          )}
        </div>

        {/* Remove Button */}
        {showRemoveButton && hasImage && (
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemove}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/15 border-red-300/40"
            >
              <X className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default ImageInput;
