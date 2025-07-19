"use client";

import { Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AppImage from "../ui/appImage";
import TitleProps from "./title-props";

const CategoryCarousel = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col gap-y-10">
       <TitleProps title={title} />
      <div className="flex items-center flex-col w-full gap-0">
       
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          breakpoints={{
            1280: {
              slidesPerView: 6,
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
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center gap-2">
                  <AppImage
                    src="/images/image1.jfif"
                    alt="songs"
                    isFill
                    className="max-w-[80px] min-w-[80px] min-h-[80px] md:min-h-[160px] md:min-w-[160px] rounded-full"
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
