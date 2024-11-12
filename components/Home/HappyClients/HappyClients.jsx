"use client";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Slider from "react-slick";

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-3xl bg-white rounded-full p-2 border hover:bg-gray-200"
    >
      <MdKeyboardArrowLeft />
    </button>
  );
}

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-10 text-3xl bg-white rounded-full p-2 border hover:bg-gray-200"
    >
      <MdKeyboardArrowRight />
    </button>
  );
}

const HappyClients = () => {
  const reviews = [
    {
      _id: 1,
      title: "Best Online Fashion Site",
      description:
        "I always find something stylish and affordable on this web fashion site.",
      start_count: 5,
      user_id: {
        _id: 1,
        full_name: "John Doe",
        district: "Pabna",
      },
    },
    {
      _id: 2,
      title: "Great Selection and Quality",
      description:
        "I love the variety of styles and the high-quality clothing on this web fashion site.",
      start_count: 5,
      user_id: {
        _id: 2,
        full_name: "Paul Allan",
        district: "Kustia",
      },
    },
    {
      _id: 3,
      title: "Best Customer Service",
      description:
        "I finally found a web fashion site with stylish and flattering options in my size.",
      start_count: 5,
      user_id: {
        _id: 7,
        full_name: "Mr. X",
        district: "Rajshahi",
      },
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="my-24 mx-12">
      <h2 className="text-3xl text-center mb-4">Happy Clients</h2>
      <p className="text-center mb-12">Hear what they say about us</p>
      <div className="slider-container">
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review._id} className="px-4">
              <div
                key={review._id}
                className="review-card w-80 border rounded px-8 pt-8 pb-4"
              >
                <div className="flex items-center gap-x-2 mb-2">
                  {[...Array(review.start_count)].map((_, index) => (
                    <span key={index} className="text-[#FF7B54]">
                      ★
                    </span>
                  ))}
                </div>
                <h3 className="font-bold text-lg mb-1">{review.title}</h3>
                <p className="text-md">{review.description}</p>

                <p className="font-bold mt-6">{review.user_id.full_name}</p>
                <p className="text-sm text-gray-500">
                  {" "}
                  Customer from {review.user_id.district}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HappyClients;
