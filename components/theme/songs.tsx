import { getSongs } from "@/lib/folj";
import { isArray } from "@/lib/type-guards";
import Link from "next/link";
import { FC } from "react";
import AppImage from "../ui/appImage";
import { formatToMonthYear } from "@/lib/utils";
import SongCarousel from "./song.carousel";
import { Swiper, SwiperSlide } from "swiper/react";

const Songs: FC<{
  title: string;
}> = async ({ title }) => {
  const songsList = await getSongs();
  const songs = songsList?.songs || [];
  // const handlePlay = (item: any) => {
  //   console.log("Playing:", item.songTitle);
  //   // Implement your play logic here
  // };

  // const handleLike = (item: any) => {
  //   console.log("Liked:", item.songTitle);
  //   // Implement your like logic here
  // };

  // const handleWishlist = (item: any) => {
  //   console.log("Added to wishlist:", item.songTitle);
  //   // Implement your wishlist logic here
  // };

  // const handleView = (item: any) => {
  //   console.log("Viewing details:", item.songTitle);
  //   // Implement your view logic here
  // };

  return (
    <div className="">
      <h1 className="text-center text-2xl font-bold mb-6">{title}</h1>
      {isArray(songs) ? (
          <SongCarousel
            songs={songs}
            // onPlay={handlePlay}
            // onLike={handleLike}
            // onWishlist={handleWishlist}
            // onView={handleView}
          />
       
      ) : (
        null
      )}
    </div>
  );
};

export default Songs;
