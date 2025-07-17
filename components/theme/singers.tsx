"use client";
import Image from "next/image";
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const Singers = () => {
    return (
        <div className="my-12">
            <div className="flex items-center flex-col gap-8">
                <h1 className="text-indigo-700 text-4xl mb-6 font-semibold">About Artist</h1>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    autoplay= {
                       { delay: 1200,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true}
                    }
                    loop={true}
                    keyboard={true}
                   
                    modules={[Autoplay]}
                    className="mySwiper"
                >
                    {
                        Array.from({ length: 7 }).map((_, index) =>
                            <SwiperSlide key={index}>
                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 relative">
                                    <a href="#">
                                        <Image className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                    </a>
                                    <div className="p-5">
                                        <a href="#">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Amit Kamble</h5>
                                        </a>
                                        <p className="mb-3 font-normal line-clamp-2 text-gray-700">
                                            Here are I was born in a God fearing family in Solapur, India. I grew up in the environment of music. My father, a good singer, guided me to grow in music. He has been to Mauritius, Kenya and more places abroad for singing in orchestras.
                                        </p>
                                       
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </div>

        </div>
    )
}
export default Singers