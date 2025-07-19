"use client";

import AppImage from "../ui/appImage";
import Link from "next/link";
import { FC, useState } from "react";
import { SongTypes } from "@/lib/folj/types";
import { Bookmark, Eye, Heart, Play } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Pagination } from "swiper/modules";
import clsx from "clsx";
const SongCarouselSlide: FC<{
  item: SongTypes;
  onPlay?: (item: SongTypes) => void;
  onLike?: (item: SongTypes) => void;
  onWishlist?: (item: SongTypes) => void;
  onView?: (item: SongTypes) => void;
}> = ({ item, onPlay, onLike, onWishlist, onView }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation();
    action();
  };
  return (
    <Link
      href={`/song/${item?.songSlug || ""}`}
      key={item._id}
      className="flex flex-col  rounded-lg md:max-w-xl "
    >
      <div
        className="relative max-h-32 md:min-h-45 min-w-20 md:min-w-45 overflow-hidden rounded-4xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AppImage
          src={item?.images?.[0]?.url}
          alt={item?.images?.[0]?.public_id}
          isFill
          className="md:rounded-none min-h-45 min-w-45 rounded-4xl overflow-hidden"
        />
        <p
          className="absolute z-10  justify-self-center rounded-lg font-semibold text-xs uppercase text-white overflow-hidden max-w-28 md:max-w-40 px-2 py-1 bg-white/[30%] bottom-9 md:bottom-13 line-clamp-2
        "
        >
          {item.songTitle}
        </p>
        <div
          className={clsx(
            "absolute inset-0  rounded-xl transition-opacity duration-300 opacity-100 "
          )}
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8) 25%, rgba(0,0,0,0.2))",
            opacity: 1,
          }}
        />
        {/* Hover Buttons */}
        <div
          className={`absolute bottom-2 h-fit w-fit left-5 md:left-10 flex items-center justify-center gap-1 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Like Button */}
          <button
            onClick={(e) => handleButtonClick(e, () => onLike?.(item))}
            className="bg-white/20 cursor-pointer backdrop-blur-sm rounded-full p-1 md:p-2 hover:bg-red-500/80 transition-all duration-200 hover:scale-110 group/btn"
            title="Like"
          >
            <Heart className="w-4 h-4 md:w-4 md:h-4 text-white group-hover/btn:fill-white transition-all" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={(e) => handleButtonClick(e, () => onWishlist?.(item))}
            className="bg-white/20 cursor-pointer backdrop-blur-sm rounded-full p-1 md:p-2 hover:bg-blue-500/80 transition-all duration-200 hover:scale-110 group/btn"
            title="Add to Wishlist"
          >
            <Bookmark className=" w-4 h-4 text-white group-hover/btn:fill-white transition-all" />
          </button>

          {/* View Button */}
          <button
            onClick={(e) => handleButtonClick(e, () => onView?.(item))}
            className="bg-white/20 cursor-pointer backdrop-blur-sm rounded-full p-1 md:p-2 hover:bg-green-500/80 transition-all duration-200 hover:scale-110 group/btn"
            title="View Details"
          >
            <Eye className="w-4 h-4 md:w-4 md:h-4 text-white group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
        {/* Corner Play Button (Alternative smaller version) */}
        <div
          className={`absolute top-3 right-2 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <button
            onClick={(e) => handleButtonClick(e, () => onPlay?.(item))}
            className="bg-white/90 rounded-full p-1 md:p-2 hover:bg-white transition-all duration-200 shadow-lg"
            title="Quick Play"
          >
            <Play className="w-4 h-4 md:w-4 md:h-4 text-gray-800 fill-gray-800" />
          </button>
        </div>
      </div>
    </Link>
  );
};

const SongCarousel: FC<{
  songs: SongTypes[];
  // onPlay?: (item: SongTypes) => void;
  // onLike?: (item: SongTypes) => void;
  // onWishlist?: (item: SongTypes) => void;
  // onView?: (item: SongTypes) => void;
}> = ({ songs }) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={3}
      breakpoints={{
        1280: {
          slidesPerView: 6,
          spaceBetween: 40,
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
          slidesPerView: 2,
          spaceBetween: 20,
        },
      }}
      scrollbar={{ draggable: true }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {songs.map((song) => (
        <SwiperSlide key={song._id} className="min-h-full">
          <SongCarouselSlide
            item={song}
            // onPlay={handlePlay}
            // onLike={handleLike}
            // onWishlist={handleWishlist}
            // onView={handleView}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SongCarousel;
