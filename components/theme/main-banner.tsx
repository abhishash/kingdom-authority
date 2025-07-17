'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Keyboard, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

import AppImage from '../ui/appImage'

const images = [
  { src: '/images/image1.jfif', alt: 'Jesus song local' },
  { src: 'https://swiperjs.com/demos/images/nature-2.jpg', alt: 'Nature 2' },
  { src: 'https://swiperjs.com/demos/images/nature-3.jpg', alt: 'Nature 3' },
  { src: 'https://swiperjs.com/demos/images/nature-4.jpg', alt: 'Nature 4' },
]

export default function MainBanner() {
  return (
    <section className="w-full">
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={false}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
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
          <SwiperSlide key={index}>
              <AppImage
                src={img.src}
                alt={img.alt}
                isFill
                className="w-full h-[60vh] md:h-[80vh] overflow-hidden"
                priority={index === 0} // preload the first image
              />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
