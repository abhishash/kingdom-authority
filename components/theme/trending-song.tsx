"use client";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const TrendingSongs = ({ title }: { title: string }) => {
  return (
    <div className="my-12">
      <div className="flex items-center flex-col gap-8">
        <h1 className="text-indigo-700 text-4xl mb-6 font-semibold">{title}</h1>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          autoplay={{
            delay: 1200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          keyboard={true}
          modules={[Autoplay, Keyboard]}
          className="mySwiper"
        >
          {Array.from({ length: 7 }).map((_, index) => (
            <SwiperSlide key={index}>
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 relative">
                <Link href="#" className="relative top-0 w-[80vw] min-h-[20vh]">
                  <Image
                    className="rounded-lg object-cover"
                    src="/images/image1.jfif"
                    alt="Trending Song Image"
                    width={400}
                    height={200}
                    
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TrendingSongs;
