"use client";

import api from "@/api/api";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { NoDataFound } from "@/components/common/NoDataFound";
import { FaRegEdit } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { serverUrl } from "@/constants";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useError from "@/hooks/useError";
import toast from "react-hot-toast";
import InputSearch from "@/components/common/InputSearch";
import { useSearchParams } from "next/navigation";
import { PaginationCustom } from "@/components/common/PaginationCustom";

// The ManageProduct component wraps SearchParamsWrapper in a Suspense component
const ManageProduct = () => {
  const { apiErrorHandel } = useError();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchParamsWrapper />
    </Suspense>
  );
};

// The SearchParamsWrapper component contains the logic for fetching products
const SearchParamsWrapper = () => {
  const searchTerm = useSearchParams();
  const pageNo = Number(searchTerm?.get("pageNo") ?? 1);
  const limit = Number(searchTerm?.get("limit") ?? 10);

  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(30);

  const { apiErrorHandel } = useError();

  const fetchProducts = async () => {
    setLoading(true);
    api()
      .Api({
        url: `${serverUrl}/products?page=${pageNo}&limit=${limit}&searchTerm=${debouncedSearchTerm}`,
        method: "GET",
      })
      .then((res) => {
        if (res?.status === 200 && res?.data?.statusCode === 200) {
          setProducts(res.data?.data?.data);
          setTotal(res.data?.data?.meta?.total);
        }
      })
      .catch((err) => {
        apiErrorHandel(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, [pageNo, limit, debouncedSearchTerm]);

  const handleProductDelete = async (id) => {
    setLoading(true);
    try {
      const response = await api().Api({
        url: `${serverUrl}/products/${id}`,
        method: "DELETE",
      });
      if (response.status === 200) {
        fetchProducts();
        toast.success("Product deleted successfully");
      }
    } catch (error) {
      apiErrorHandel(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mt-4 mb-16 flex justify-between">
        <InputSearch
          className="w-48 rounded"
          placeholder="Search..."
          setDebouncedSearchTerm={setDebouncedSearchTerm}
        />
        <Link href={"/admin/product/add"}>
          <Button className="bg-black hover:bg-gray-800 text-white rounded">
            Add Product
          </Button>
        </Link>
      </div>
      {loading && <LoadingSpinner />}

      {!loading && products && products?.length === 0 && (
        <NoDataFound message="No products found" />
      )}
      {!loading && products && products?.length > 0 && (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">Title</TableHead>
                <TableHead className="text-center">Price</TableHead>
                <TableHead className="text-center">Category</TableHead>
                <TableHead className="text-center">Image</TableHead>
                <TableHead className="text-right ">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!loading &&
                products?.length &&
                products?.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium pl-4">
                      {product?.title}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      <span className="line-through">
                        {product?.dummy_price}
                      </span>
                      {product?.price}$
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      {product?.category_id?.title}
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <Image
                        src={product?.main_image}
                        alt="product image"
                        height={100}
                        width={100}
                        className="object-cover rounded text-center"
                        style={{ width: "auto", height: "100%" }}
                      />
                    </TableCell>
                    <TableCell className="">
                      <p className="flex justify-end gap-x-2">
                        <Link href={`/admin/product/edit/${product?._id}`}>
                          <FaRegEdit className="text-3xl hover:text-gray-600" />
                        </Link>
                        <button
                          onClick={() => handleProductDelete(product?._id)}
                        >
                          <AiOutlineDelete className="text-4xl text-red-600 hover:text-red-400" />
                        </button>
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <PaginationCustom
            pageNo={pageNo}
            limit={limit}
            total={total}
            route="admin/product"
          />
        </div>
      )}
    </div>
  );
};

export default ManageProduct;
