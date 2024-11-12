import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";

export const ProductCard = ({ product }) => {
  return (
    <div className="w-[320px]">
      <Image
        src={product?.main_image}
        width={320}
        height={350}
        alt={product?.title}
        className="rounded-lg"
      />
      <div className="mt-2">
        <div className="flex justify-between items-center">
          <p>{product?.category_id?.title}</p>
          <p className=" flex items-center gap-x-2">
            <CiHeart />
            <IoCartOutline />
          </p>
        </div>
        <h5 className="text-lg font-bold">{product?.title}</h5>
        <div className="flex justify-between items-center">
          <p className="text-md font-bold text-green-400">
            TK: <span className="line-through">{product?.dummy_price}</span>{" "}
            {product?.price}
          </p>
          <p className="text-red-400 text-sm">${product?.stock} items left</p>
        </div>
      </div>
    </div>
  );
};
