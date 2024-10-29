import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

export const SingleShopByCategory = ({ category }) => {
  return (
    <Link href={`/shop/category/${category?.title}`} className="relative">
      <div>
        <Image
          src={category?.image}
          width={290}
          height={350}
          alt={category?.title}
          className="hover:scale-110 duration-1000 rounded"
        />
      </div>
      <div className="absolute bottom-8 left-4 px-6 py-2.5 bg-white font-medium rounded hover:bg-black hover:text-white group transition-all duration-100 ease-in-out">
        <p className="category-title-text flex items-center gap-x-2">
          {category?.title}
          <MdArrowOutward className="hidden text-white group-hover:block transition-all duration-1000 ease-in-out transform translate-x-8 translate-y-8 opacity-0 group-hover:-translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
        </p>
      </div>
    </Link>
  );
};
