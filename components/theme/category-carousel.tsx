"use client";

import { Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AppImage from "../ui/appImage";
import TitleProps from "./title-props";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/constants";

const CategoryCarousel = ({
  title,
  delay,
}: {
  title: string;
  delay?: { delay: number; disableOnInteraction: boolean };
}) => {
  return (
    <div className="flex flex-col gap-y-10">
      <TitleProps
        title={title}
        description="The Lord will not allow me stumble; over me dat and night"
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
        className="relative"
      >
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
            autoplay={{ ...delay }}
            keyboard={true}
            modules={[Keyboard, Autoplay]}
            className="mySwiper my-4"
          >
            {Array.from({ length: 30 }).map((_, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center gap-2">
                  <AppImage
                    src="/images/amit-kamble.PNG"
                    alt="songs"
                    isFill
                    className="max-w-[100px] min-w-[100px] min-h-[100px] md:min-h-[160px] md:min-w-[160px] rounded-full"
                  />
                  <h1 className="text-xs md:text-base text-center font-semibold">
                    Amita Kamble
                  </h1>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>
    </div>
  );
};

export default CategoryCarousel;
