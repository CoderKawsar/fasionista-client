"use client";

import api from "@/api/api";
import { SingleImageUpload } from "@/components/common/SingleImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { serverUrl } from "@/constants";
import useError from "@/hooks/useError";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const AddCategory = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const { apiErrorHandel } = useError();
  const router = useRouter();

  const handleCategoryAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    const title = e.target.title.value;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("data", JSON.stringify({ title }));

    try {
      const response = await api().Api({
        url: `${serverUrl}/categories`,
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        // Reset the form and image state
        setLoading(false);
        formRef.current.reset();
        setImageFile(null);
        setImagePreview(null);

        toast.success("Category added successfully");
      } else {
        setLoading(false);
        toast.error(response?.data?.data?.message);
      }
    } catch (error) {
      setLoading(false);
      apiErrorHandel(error);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Add Category</h2>
        <Button
          onClick={() => router.back()}
          className="bg-black hover:bg-gray-800 text-white rounded"
        >
          Back
        </Button>
      </div>
      <form onSubmit={handleCategoryAdd} ref={formRef}>
        <div className="grid w-full items-center gap-1.5 mb-4">
          <Label htmlFor="title">Category Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter Category Title"
            className="rounded"
            required
          />
        </div>
        <SingleImageUpload
          setImageFile={setImageFile}
          label="Category Image"
          placeholder="Upload Category Image"
          height={200}
          width={200}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          required={true}
        />
        <div>
          <Button
            disabled={loading}
            className="px-8 bg-black hover:bg-gray-700 text-white rounded"
          >
            {loading ? "Adding..." : "Add"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
