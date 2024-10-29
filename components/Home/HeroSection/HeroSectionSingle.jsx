"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaAngleRight } from "react-icons/fa6";

const HeroSectionSingle = ({ sliderData }) => {
  return (
    <div className="h-screen relative">
      <div className="h-screen z-20 absolute top-0 left-0">
        <div className="px-16 w-[550px] h-full flex flex-col justify-center">
          <h1 className="text-[76px] leading-[96px] mb-6">
            {sliderData?.title}
          </h1>
          <h2 className="text-xl mb-6">{sliderData?.description}</h2>
          <Button className="w-40 text-white bg-black hover:bg-gray-800">
            Shop Collection <FaAngleRight />
          </Button>
        </div>
      </div>
      <Image
        src={sliderData?.image}
        layout="fill"
        priority
        alt="Fashionista"
        className="w-full max-w-full h-screen z-10"
      />
    </div>
  );
};

export default HeroSectionSingle;
