"use client";

import api from "@/api/api";
import { ImageUploadSingle } from "@/components/common/ImageUploadSingle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { serverUrl } from "@/constants";
import useError from "@/hooks/useError";
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const EditCategory = ({ params }) => {
  const [category, setCategory] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const { apiErrorHandel } = useError();
  const router = useRouter();
  const { id } = use(params);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api().Api({
          url: `${serverUrl}/categories/${id}`,
          method: "GET",
        });
        if (response.status === 200) {
          setCategory(response.data?.data);
          setImagePreview(response.data?.data?.image);
        }
      } catch (error) {
        apiErrorHandel(error);
      }
    };
    fetchCategory();
  }, [id]);

  const handleCategoryEdit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const title = e.target.title.value;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("data", JSON.stringify({ title }));

    try {
      const response = await api().Api({
        url: `${serverUrl}/categories/${id}`,
        method: "PATCH",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        // Reset the form and image state
        setLoading(false);

        // Get updated data from the response
        const updatedCategory = response.data?.data;

        // Update state with the new title and image
        setCategory(updatedCategory);
        setImagePreview(updatedCategory.image);

        toast.success("Category updated successfully");
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
        <h2 className="text-2xl font-bold">Edit Category</h2>
        <Button
          onClick={() => router.back()}
          className="bg-black hover:bg-gray-700 text-white rounded"
        >
          Back
        </Button>
      </div>
      <form onSubmit={handleCategoryEdit} ref={formRef}>
        <div className="grid w-full items-center gap-1.5 mb-4">
          <Label htmlFor="title">Category Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter Category Title"
            className="rounded"
            defaultValue={category?.title}
            required
          />
        </div>
        <ImageUploadSingle
          setImageFile={setImageFile}
          label="Category Image"
          placeholder="Upload Category Image"
          height={200}
          width={200}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
        />
        <div>
          <Button
            disabled={loading}
            className="px-8 bg-black hover:bg-gray-700 text-white rounded"
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
