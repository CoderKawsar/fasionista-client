"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useEffect, useState } from "react";

export const SingleImageUpload = ({
  setImageFile,
  label,
  placeholder,
  height,
  width,
  imagePreview,
  setImagePreview,
  required,
}) => {
  // Handler for image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Cleanup the preview URL when the component unmounts or image changes
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);
  return (
    <div>
      <div className="grid w-full items-center gap-1.5 mb-4">
        <Label htmlFor="single-image">{label}</Label>
        <Input
          id="single-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="rounded"
          placeholder={placeholder}
          required={required}
        />
      </div>
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-4">
          <Image
            src={imagePreview}
            width={width}
            height={height}
            alt="Selected Category"
            className="w-48 h-48 object-cover rounded"
          />
        </div>
      )}
    </div>
  );
};
