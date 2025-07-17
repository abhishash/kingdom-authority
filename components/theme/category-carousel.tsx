"use client";

import Image from "next/image";
import { Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../ui/button";
import AppImage from "../ui/appImage";

const CategoryCarousel = ({ title }: { title: string }) => {
  return (
    <div className="my-2 px-4">
      <div className="flex items-center flex-col gap-0">
        <h1 className="md:text-4xl text-2xl my-1  font-semibold">{title}</h1>
        <h2 className="text-center text-sm font-poppins">The Lord will not allow me stumble; over me dat and night</h2>
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          breakpoints={{
            1280: {
              slidesPerView: 7,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          loop={true}
          keyboard={true}
          autoplay={false}
          modules={[Keyboard, Autoplay]}
          className="mySwiper my-4"
        >
          {Array.from({ length: 30 }).map((_, index) => (
            <SwiperSlide>
              <div className="flex flex-col items-center gap-2">
                  <AppImage
                    src="/images/image1.jfif"
                    alt="songs"
                    isFill
                    className="max-w-[80px] min-h-[80px] md:min-h-[160px] md:min-w-[160px] rounded-full"
                  />
                <h1 className="text-xs md:text-base text-center font-semibold">Amita Kamble</h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategoryCarousel;
