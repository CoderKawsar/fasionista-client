import { ProductCard } from "@/components/common/ProductCard";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

export const NewArrivals = () => {
  const data = [
    {
      _id: 1,
      title: "Ribbed Modal T-shirt",
      main_image: "/assets/images/product/purple t-shirt.jpg",
      category_id: {
        title: "Clothing",
      },
      price: 20,
      dummy_price: 30,
      stock: 20,
    },
    {
      _id: 2,
      title: "Oversized Printed T-shirt",
      main_image: "/assets/images/product/purple t-shirt.jpg",
      category_id: {
        title: "T-Shirt",
      },
      price: 30,
      dummy_price: 50,
      stock: 10,
    },
    {
      _id: 3,
      title: "Oversized Printed T-shirt",
      main_image: "/assets/images/product/pink t-shirt.jpg",
      category_id: {
        title: "T-Shirt",
      },
      price: 30,
      dummy_price: 50,
      stock: 10,
    },
    {
      _id: 4,
      title: "Oversized Printed T-shirt",
      main_image: "/assets/images/product/purple t-shirt.jpg",
      category_id: {
        title: "T-Shirt",
      },
      price: 30,
      dummy_price: 50,
      stock: 10,
    },
  ];
  return (
    <div className="my-24 mx-12">
      <h2 className="uppercase font-bold mb-8">New Arrivals</h2>

      <div className="flex justify-between gap-x-8  flex-wrap">
        {data.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>

      <div className="w-fit mt-8 flex justify-center bg-black text-white font-medium rounded hover:bg-gray-800 hover:text-white group transition-all duration-500 ease-in-out">
        <Link
          href="/shop"
          className="category-title-text flex items-center gap-x-2 px-6 py-2.5"
        >
          View All
          <MdArrowOutward />
        </Link>
      </div>
    </div>
  );
};
