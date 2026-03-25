import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import  logo  from '../../assets/swift-logo.PNG'

const Banner = () => {
  const banners = [
    {
      title: "Premium Laptops",
      desc: "Experience high performance with our latest laptops.",
      img: "https://hp.widen.net/content/shzoamkywc/png/shzoamkywc.png?w=400&h=400&dpi=72&color=ffffff00"
    },
    {
      title: "Graphic Cards",
      desc: "Unleash ultimate gaming power with high-end GPUs.",
      img: "PASTE_GRAPHIC_CARD_IMAGE_URL_HERE"
    },
    {
      title: "Latest Smartphones",
      desc: "Stay connected with cutting-edge mobile technology.",
      img: "PASTE_MOBILE_IMAGE_URL_HERE"
    }
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-gray-100">
      
      {/* Logo */}
      <div className="absolute top-5 left-5 z-20">
        <img src={logo} alt="Company Logo" className="w-24 h-auto" />
      </div>

      {/* Slides */}
      {banners.map((item, index) => (
        <div
          key={index}
          className={`absolute w-full h-full flex flex-col justify-center items-center text-center px-6 transition-all duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={item.img} alt={item.title} className="w-60 h-60 object-contain mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{item.title}</h1>
          <p className="text-lg md:text-xl max-w-2xl">{item.desc}</p>
        </div>
      ))}

      {/* Buttons */}
      <button onClick={prevSlide} className="absolute left-5 top-1/2 -translate-y-1/2 text-4xl text-gray-700 hover:text-black z-10">
        <ChevronLeft size={48} />
      </button>
      <button onClick={nextSlide} className="absolute right-5 top-1/2 -translate-y-1/2 text-4xl text-gray-700 hover:text-black z-10">
        <ChevronRight size={48} />
      </button>
    </div>
  );
};

export default Banner;