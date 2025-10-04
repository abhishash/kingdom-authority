"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Keyboard, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import AppImage from "../ui/appImage";
import clsx from "clsx";

export default function BannerSlider({
  images,
  className,
  delay,
}: {
  images: { url: string; public_id: string; _id: string }[];
  className?: string;
  delay?: { delay: number; disableOnInteraction: boolean };
}) {
  return (
    <section className="w-full">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={false}
        loop={true}
        autoplay={{...delay}}
        pagination={{
          clickable: true,
        }}
        keyboard={{
          enabled: true,
        }}
        modules={[EffectFade, Keyboard, Autoplay, Pagination]}
        className="mySwiper"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="group">
            <AppImage
              src={img.url}
              alt={img.public_id}
              isFill
              className={clsx("w-full h-[60vh] md:h-[80vh] overflow-hidden", className)}
              priority={index === 0} // preload the first image
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
