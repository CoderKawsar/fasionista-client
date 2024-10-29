"use client";

import Slider from "react-slick";
import sliderImage1 from "@/public/assets/images/slider/fashion-slideshow-01.jpg";
import sliderImage2 from "@/public/assets/images/slider/fashion-slideshow-02.jpg";
import sliderImage3 from "@/public/assets/images/slider/fashion-slideshow-03.jpg";
import HeroSectionSingle from "./HeroSectionSingle";

const sliderData = [
  {
    _id: 1,
    title: "Unleash Your Style",
    description:
      "Discover the latest trends and redefine your wardrobe with our curated collections for every season.",
    bgColor: "#FAF6F1",
    image: sliderImage1,
  },
  {
    _id: 2,
    title: "Elegant Comfort",
    description:
      "Experience the perfect blend of elegance and comfort with pieces designed to elevate your daily style.",
    bgColor: "#FAF6F1",
    image: sliderImage2,
  },
  {
    _id: 3,
    title: "For Every Occasion",
    description:
      "From casual wear to evening glamour, find versatile fashion that fits every part of your life.",
    bgColor: "#FAF6F1",
    image: sliderImage3,
  },
];

const HeroSection = () => {
  const settings = {
    dots: true,
    fade: true,
    speed: 500,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };
  return (
    <div className="mt-[-80px] z-10 relative">
      <div className="slider-container max-w-full hero-section">
        <Slider {...settings}>
          {sliderData.map((slider) => (
            <HeroSectionSingle key={slider._id} sliderData={slider} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HeroSection;
