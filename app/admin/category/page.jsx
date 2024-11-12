"use client";

import api from "@/api/api";
import { CustomPagination } from "@/components/common/CustomPagination";
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
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useError from "@/hooks/useError";
import toast from "react-hot-toast";
import InputSearch from "@/components/common/InputSearch";
import { useSearchParams } from "next/navigation";

const ManageCategory = () => {
  const { apiErrorHandel } = useError();
  const searchTerm = useSearchParams();

  const pageNo = Number(searchTerm?.get("pageNo") ?? 1);
  const limit = Number(searchTerm?.get("limit") ?? 10);

  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(30);

  const fetchCategories = async () => {
    setLoading(true);
    api()
      .Api({
        url: `${serverUrl}/categories?page=${pageNo}&limit=${limit}&searchTerm=${debouncedSearchTerm}`,
        method: "GET",
      })
      .then((res) => {
        if (res?.status === 200 && res?.data?.statusCode === 200) {
          setCategories(res.data?.data?.data);
          setTotal(res.data?.data?.meta?.total);
        }
      })
      .catch((err) => {
        console.log(err);
        apiErrorHandel(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, [pageNo, limit, debouncedSearchTerm]);

  const handleCategoryDelete = async (id) => {
    setLoading(true);
    try {
      const response = await api().Api({
        url: `${serverUrl}/categories/${id}`,
        method: "DELETE",
      });
      if (response.status === 200) {
        fetchCategories();
        toast.success("Category deleted successfully");
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
        <Link href={"/admin/category/add"}>
          <Button className="bg-black hover:bg-gray-800 text-white rounded">
            Add Category
          </Button>
        </Link>
      </div>
      {loading && <LoadingSpinner />}

      {!loading && categories && categories?.length === 0 && (
        <NoDataFound message="No categories found" />
      )}

      {!loading && categories && categories?.length > 0 && (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">Title</TableHead>
                <TableHead className="text-center">Image</TableHead>
                <TableHead className="text-right ">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!loading &&
                categories?.length &&
                categories?.map((category, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium pl-4">
                      {category.title}
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <Image
                        src={category.image}
                        alt="Category image"
                        height={100}
                        width={100}
                        className="object-cover rounded text-center"
                        style={{ width: "auto", height: "100%" }}
                      />
                    </TableCell>
                    <TableCell className="">
                      <p className="flex justify-end gap-x-2">
                        <Link href={`/admin/category/edit/${category._id}`}>
                          <FaRegEdit className="text-3xl hover:text-gray-600" />
                        </Link>
                        <button
                          onClick={() => handleCategoryDelete(category._id)}
                        >
                          <AiOutlineDelete className="text-4xl text-red-600 hover:text-red-400" />
                        </button>
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <CustomPagination
            pageNo={pageNo}
            limit={limit}
            total={total}
            route="admin/category"
          />
        </div>
      )}
    </div>
  );
};

export default ManageCategory;
