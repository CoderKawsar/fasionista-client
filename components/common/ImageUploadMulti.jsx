"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useEffect, useState } from "react";

const ImageUploadMulti = ({
  setImageFiles,
  imagePreviews,
  setImagePreviews,
  label,
  placeholder,
  height = 200,
  width = 200,
  required,
}) => {
  // Handler for image selection
  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    if (newFiles.length) {
      // Create previews for new files
      const newPreviews = newFiles.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        file,
      }));

      // Append new files to existing image previews
      const updatedPreviews = [...imagePreviews, ...newPreviews];
      setImagePreviews(updatedPreviews);

      // Update the image files in the parent component
      const updatedFiles = updatedPreviews.map((preview) => preview.file);
      setImageFiles(updatedFiles);
    }
  };

  // Handler for deleting an image preview
  // Handler for deleting an image preview
  const handleDeleteImage = (index) => {
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    // Update state after deletion
    setImagePreviews(updatedPreviews);
    setImageFiles(updatedPreviews.map((preview) => preview.file));
  };

  // Cleanup the preview URLs when the component unmounts or image changes
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [imagePreviews]);

  return (
    <div>
      <div className="grid w-full items-center gap-1.5 mb-4">
        <Label htmlFor="multi-image">{label}</Label>
        <Input
          id="multi-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="rounded"
          placeholder={placeholder}
          required={required}
          multiple
        />
      </div>
      {/* Image Previews with Delete Button */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative">
            <Image
              src={preview.url}
              width={width}
              height={height}
              alt={`Selected image ${index + 1}`}
              className="w-full h-full object-cover rounded"
            />
            <button
              type="button"
              onClick={() => handleDeleteImage(index)}
              className="absolute top-2 right-2 bg-white text-red-800 w-10 h-10 rounded-full p-1"
            >
              ✕
            </button>
            <p className="text-sm text-center mt-2">{preview.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploadMulti;
