"use client";

import Slider from "react-slick";
import { MdArrowOutward, MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { SingleShopByCategory } from "./ShopByCategorySingle";
import Link from "next/link";

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border border-black rounded-full text-3xl absolute left-0 top-[-45px] transform -translate-y-1/2 z-10 bg-white hover:bg-black hover:text-white transition-all duration-100 ease-in"
    >
      <MdKeyboardArrowLeft />
    </div>
  );
}

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border border-black rounded-full text-3xl absolute left-10 top-[-45px] transform -translate-y-1/2 z-10 bg-white hover:bg-black hover:text-white transition-all duration-100 ease-in"
    >
      <MdKeyboardArrowRight className="" />
    </div>
  );
}

export const ShopByCategory = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const categoriesData = [
    {
      _id: 1,
      title: "Clothing",
      image: "/assets/images/category/clothing.jpg",
    },
    {
      _id: 2,
      title: "Sunglass",
      image: "/assets/images/category/sunglass.jpg",
    },
    {
      _id: 3,
      title: "Bags",
      image: "/assets/images/category/bags.jpg",
    },
    {
      _id: 4,
      title: "Fashion",
      image: "/assets/images/category/fashion.jpg",
    },
    {
      _id: 5,
      title: "Accessories",
      image: "/assets/images/category/accessories.jpg",
    },
  ];

  return (
    <div className="my-24 mx-12">
      <h3 className="uppercase font-bold ml-24 mb-8">Shop by categories</h3>

      <div className="grid grid-cols-4 gap-6">
        <div className="slider-container col-span-3">
          <Slider {...settings}>
            {categoriesData.map((category) => (
              <SingleShopByCategory key={category._id} category={category} />
            ))}
          </Slider>
        </div>
        <div className="border border-black h-[350px] w-[290px] pl-8 rounded">
          <p className="mt-36 text-4xl">Discover all new items</p>
          <p
            href="/shop/category"
            className="mt-6 p-3 border border-black rounded-full w-fit hover:bg-black hover:text-white transition-all duration-100 ease-in cursor-pointer"
          >
            <Link href="/shop/category">
              <MdArrowOutward className="text-lg" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
