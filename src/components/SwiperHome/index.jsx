import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function SwiperHome() {
  // const imageCount = 10; // Số lần lặp lại hình ảnh
  const imageUrl ={
    slide1: "https://jollibee.com.vn/media/mageplaza/bannerslider/banner/image/w/e/web_jollibee_2893x1104px-01_1_.jpg",
    slide2: "https://jollibee.com.vn/media/mageplaza/bannerslider/banner/image/w/e/web-06.jpg",
  }
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      navigation
      // pagination={{ clickable: true }}
      autoplay={{ 
        delay: 6000,
      }}
      loop={true}
    >
      {/* {[...Array(imageCount)].map((_, index) => ( */}
        <SwiperSlide >
          <Image width={1440} height={549.67} src={imageUrl.slide1} className="w-full h-auto" alt="Gà Jollibee thơm ngon"/>
        </SwiperSlide>
        <SwiperSlide >
          <Image width={1440} height={549.67} src={imageUrl.slide2} className="w-full h-auto" alt="Gà Jollibee thơm ngon"/>
        </SwiperSlide>
      {/* ))} */}
    </Swiper>
  );
}

export default SwiperHome; 
