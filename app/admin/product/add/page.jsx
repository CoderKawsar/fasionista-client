"use client";

import api from "@/api/api";
import { ImageUploadSingle } from "@/components/common/ImageUploadSingle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { serverUrl, sizes, target_customer_category } from "@/constants";
import useError from "@/hooks/useError";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import SelectMulti from "@/components/common/SelectMulti";
import { SelectSingle } from "@/components/common/SelectSingle";
import ImageUploadMulti from "@/components/common/ImageUploadMulti";
import SunRichEditor from "@/components/common/SunRichEditor";

const AddProduct = () => {
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);

  const [otherImageFiles, setOtherImageFiles] = useState([]);
  const [otherImagePreviews, setOtherImagePreviews] = useState([]);

  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [targetCustomerCategory, setTargetCustomerCategory] = useState(null);
  const [description, setDescription] = useState("");

  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const { apiErrorHandel } = useError();
  const router = useRouter();

  const sizesForOption = sizes.map((size) => ({
    label: size,
    value: size,
  }));

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api().Api({
        url: `${serverUrl}/categories?limit=100`,
        method: "GET",
      });
      if (response.status === 200) {
        setCategories(response.data?.data?.data);
      }
    } catch (error) {
      console.log("error", error);
      apiErrorHandel(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    const title = e.target.title.value;
    const available_quantity = e.target.available_quantity.value;
    const price = e.target.price.value;
    const dummy_price = e.target.dummy_price.value;

    // Validate required fields
    if (!mainImageFile) {
      toast.error("Main image is required!");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    // Append main image
    formData.append("main_image", mainImageFile);

    // Append other images
    otherImageFiles.forEach((file) => {
      formData.append("other_images", file);
    });

    if (!colors[-1].name || !colors[-1].code) {
      setColors((prevColors) => prevColors.slice(0, prevColors.length - 1));
    }

    const productData = {
      title,
      description,
      price: Number(price),
      dummy_price: Number(dummy_price),
      available_quantity: Number(available_quantity),
      color: colors,
      size: selectedSizes,
      target_customer_category: targetCustomerCategory,
      category_id: selectedCategory,
    };

    // Append the data as a JSON string
    formData.append("data", JSON.stringify(productData));

    try {
      const response = await api().Api({
        url: `${serverUrl}/products`,
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        // Reset the form and state
        setLoading(false);
        formRef.current.reset();
        setMainImageFile(null);
        setMainImagePreview(null);
        setOtherImageFiles([]);
        setOtherImagePreviews([]);
        setColors([]);
        setSelectedCategory(null);
        setSelectedSizes([]);
        setTargetCustomerCategory(null);
        setDescription(" ");
        toast.success("Product added successfully");
      } else {
        toast.error(response?.data?.data?.message);
      }
    } catch (error) {
      setLoading(false);
      apiErrorHandel(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle change in color inputs
  const handleColorChange = (e, index, field) => {
    const updatedColors = [...colors];
    updatedColors[index][field] = e.target.value;
    setColors(updatedColors);
  };

  // Handle adding a new color
  const handleAddColor = () => {
    setColors([...colors, { name: "", code: "" }]);
  };

  // Handle removing a color
  const handleRemoveColor = (index) => {
    const updatedColors = colors.filter((_, i) => i !== index);
    setColors(updatedColors);
  };

  // Check if the current color input fields are valid
  const isColorInputValid = () => {
    return colors.every((color) => color.name.trim() && color.code.trim());
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Add Product</h2>
        <Button
          onClick={() => router.back()}
          className="bg-black hover:bg-gray-800 text-white rounded"
        >
          Back
        </Button>
      </div>
      <form onSubmit={handleCategoryAdd} ref={formRef}>
        <div className="flex w-full items-center gap-1.5 mb-4">
          <div className="w-full">
            <Label htmlFor="title">Product Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter Product Title"
              className="rounded"
              required
            />
          </div>
          <div className="w-44">
            <Label htmlFor="available_quantity">Stock available</Label>
            <Input
              id="available_quantity"
              type="number"
              placeholder="Stock"
              className="rounded number-input"
              required
            />
          </div>
          <div className="w-44">
            <Label htmlFor="price">Product Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="Price"
              className="rounded number-input"
              required
            />
          </div>
          <div className="w-44">
            <Label htmlFor="dummy_price">Dummy Price</Label>
            <Input
              id="dummy_price"
              type="number"
              placeholder="Dummy Price"
              className="rounded number-input"
              min="0"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-3 grid-x-2 items-center gap-1.5 mb-4">
          <SelectMulti
            className="mb-4"
            id="sizes"
            label="Size"
            options={sizesForOption}
            setItems={setSelectedSizes}
            value={selectedSizes}
          />
          {!loading && categories && (
            <SelectSingle
              className="mb-4"
              id="category"
              label="Category"
              options={categories.map((category) => ({
                label: category.title,
                value: category._id,
              }))}
              value={selectedCategory}
              setItem={setSelectedCategory}
              isSearchable={true}
            />
          )}
          <SelectSingle
            className="mb-4"
            id="target-category"
            label="Target Category"
            options={target_customer_category.map((category) => ({
              label: category,
              value: category,
            }))}
            value={targetCustomerCategory}
            setItem={setTargetCustomerCategory}
            isSearchable={true}
          />
        </div>
        <ImageUploadSingle
          label="Product Main Image"
          placeholder="Upload Product Image"
          height={200}
          width={200}
          setImageFile={setMainImageFile}
          imagePreview={mainImagePreview}
          setImagePreview={setMainImagePreview}
          required={true}
        />
        <ImageUploadMulti
          setImageFiles={setOtherImageFiles}
          imagePreviews={otherImagePreviews}
          setImagePreviews={setOtherImagePreviews}
          label="Product Other Images"
          placeholder="Upload Product Other Images"
          height={200}
          width={200}
        />
        <div className="mb-4">
          <Label className="block mb-1">Product Colors</Label>
          {colors.map((color, index) => (
            <div key={index} className="flex gap-4 mb-2 items-center">
              <div className="w-full">
                <Input
                  type="text"
                  placeholder="Color Name"
                  value={color.name}
                  onChange={(e) => handleColorChange(e, index, "name")}
                  required
                />
              </div>
              <div className="w-full">
                <Input
                  type="color"
                  value={color.code}
                  onChange={(e) => handleColorChange(e, index, "code")}
                  required
                />
              </div>
              <Button
                type="button"
                onClick={() => handleRemoveColor(index)}
                className="bg-red-500 hover:bg-red-600 text-white rounded"
              >
                ✕
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={handleAddColor}
            disabled={!isColorInputValid()}
            className="mt-2 bg-black hover:bg-gray-800 text-white rounded"
          >
            Add Color
          </Button>
        </div>
        <SunRichEditor
          label="Product Description"
          name="description"
          value={description}
          placeholder="Enter Product Description"
          handleChange={(content) => setDescription(content)}
          isRequired={true}
        />
        <div className="mt-6">
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

export default AddProduct;
