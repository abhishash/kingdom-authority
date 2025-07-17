"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SkeletonCard = () => (
  <div className="flex flex-col animate-pulse bg-gray-200 rounded-lg md:max-w-xl border border-gray-300">
    <div className="relative overflow-hidden rounded-lg bg-gray-300 h-[80px] md:h-[140px]" />
    <div className="flex flex-col px-2 py-2 space-y-2">
      <div className="h-3 bg-gray-400 rounded w-3/4" />
      <div className="h-2 bg-gray-400 rounded w-1/2 hidden md:block" />
      <div className="h-2 bg-gray-400 rounded w-1/3" />
    </div>
  </div>
);

const SongCarouselSkeleton: FC = () => {
  const skeletonCount = 7; // Adjust to match max slides per view
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={3}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: 7,
          spaceBetween: 20,
        },
      }}
      className="mySwiper"
    >
      {Array.from({ length: skeletonCount }).map((_, idx) => (
        <SwiperSlide key={idx}>
          <SkeletonCard />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SongCarouselSkeleton;
