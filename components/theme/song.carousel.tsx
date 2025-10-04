"use client";

import AppImage from "../ui/appImage";
import Link from "next/link";
import { FC, useRef, useState } from "react";
import { SongTypes } from "@/lib/folj/types";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  Play,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Keyboard, Navigation, Pagination } from "swiper/modules";
import clsx from "clsx";
import TitleProps from "./title-props";
import { isArray, isObject } from "@/lib/type-guards";
import { fadeInUp } from "@/lib/constants";
import QuickView from "./quick-view";
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
      href={`/songs/${item?.songSlug || ""}`}
      key={item._id}
      className="flex flex-col w-auto"
    >
      <div
        className="relative max-h-28 md:min-h-45 min-w-28 md:min-w-45 overflow-hidden rounded-sm md:rounded-3xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AppImage
          src={item?.images?.[0]?.url}
          alt={item?.images?.[0]?.public_id}
          isFill
          className="min-h-45 min-w-45 rounded-sm md:rounded-3xl overflow-hidden"
        />
        <p
          className="absolute z-10 justify-self-center rounded-lg font-semibold text-xs uppercase text-white overflow-hidden max-w-24 md:max-w-40 px-2 py-1 bg-white/[30%] bottom-9 md:bottom-13 line-clamp-2
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
          className={`absolute bottom-5.5 md:bottom-2 h-fit w-fit left-4 md:left-10 flex items-center justify-center gap-1 transition-all duration-300 ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-100 md:opacity-0 translate-y-4"
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
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-100 md:opacity-0 -translate-y-2"
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
  title: string;
}> = ({ songs, title }) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [item, setItem] = useState<SongTypes>();
  const [open, setOpen] = useState(false);
  const onView = (song: SongTypes) => {
    setItem(song);
    setOpen(!open);
  };

  return (
    <div className="flex flex-col gap-y-10">
      {isObject(item) && (
        <QuickView data={item} open={open} setOpen={setOpen} />
      )}
      <TitleProps
        title={title}
        description="The Lord will not allow me stumble; over me dat and night"
      />

      {isArray(songs) ? (
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Custom navigation buttons */}
          <div className="absolute bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            <button
              ref={prevRef}
              disabled={isBeginning}
              className={`p-2 rounded-full  border shadow-2xl transition 
                ${
                  isBeginning
                    ? "bg-gray-300 dark:bg-gray-600/40 cursor-not-allowed opacity-50"
                    : "bg-gray-200/60 dark:bg-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>

            <button
              ref={nextRef}
              disabled={isEnd}
              className={`p-2 rounded-full  border shadow-2xl transition 
                ${
                  isEnd
                    ? "bg-gray-300 dark:bg-gray-600/40 cursor-not-allowed opacity-50"
                    : "bg-gray-200/60 cursor-pointer dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
            >
              <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>
          </div>

          <Swiper
            spaceBetween={10}
            slidesPerView={3}
            breakpoints={{
              1280: { slidesPerView: 6, spaceBetween: 40 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              640: { slidesPerView: 2, spaceBetween: 20 },
            }}
            scrollbar={{ draggable: true }}
            modules={[Pagination, Keyboard, Navigation]}
            className="mySwiper"
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // @ts-expect-error: Swiper's type definitions don't include dynamic navigation refs
              swiper.params.navigation.prevEl = prevRef.current;

              // @ts-expect-error: Assigning custom navigation elements dynamically
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onReachBeginning={() => setIsBeginning(true)}
            onReachEnd={() => setIsEnd(true)}
          >
            {songs.map((song) => (
              <SwiperSlide key={song._id} className="min-h-full">
                <SongCarouselSlide item={song} onView={onView} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      ) : null}
    </div>
  );
};

export default SongCarousel;
