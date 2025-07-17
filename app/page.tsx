import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileText, Search, TrendingUp } from "lucide-react";
import MainBanner from "@/components/theme/main-banner";
import CategoryCarousel from "@/components/theme/category-carousel";
import Singers from "@/components/theme/singers";
import TrendingSongs from "@/components/theme/trending-song";
import Songs from "@/components/theme/songs";
import Subscribe from "@/components/theme/subscribe";
import { Suspense } from "react";
import SongCarouselSkeleton from "@/components/skeleton/song-carousel-skeleton";
export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Main Banner */}
        <MainBanner />
        <section className="bg-zinc-200">
          <h1 className="text-2xl md:text-4xl py-2 md:py-4 text-center font-bold">
            Jesus Calls you
          </h1>
        </section>
        {/* Exclusive Songs */}
        <section className="container mx-auto">
          {/* <TrendingSongs title="Exclusive Songs" /> */}
        </section>
        {/* Categories Songs */}
        <section className="container mx-auto">
          {/* <CategoryCarousel title="Categories" /> */}
        </section>
        {/* Trending Songs */}
        <section className="container mx-auto">
          {/* <TrendingSongs title="Trending songs" /> */}
        </section>
        {/* About Singers */}
        <section className="container mx-auto">{/* <Singers /> */}</section>
        {/* Category Container */}
        <section className="container mx-auto">
          <Suspense fallback={<SongCarouselSkeleton />}>
            <CategoryCarousel title="Songs By Artist" />
          </Suspense>
        </section>
        {/* All songs */}
        <section className="container mx-auto px-4 md:px-0">
          <Suspense fallback={<SongCarouselSkeleton />}>
            <Songs title="Songs For you" />
          </Suspense>
        </section>
        {/* Subscribe Container */}
        <section className="container mx-auto px-4 md:px-0">
          <Subscribe />
        </section>
      </div>
    </>
  );
}

// Mock data for featured lyrics
const featuredLyrics = [
  {
    id: "1",
    title: "Summer Breeze",
    artist: "Ocean Waves",
    coverImage: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "2",
    title: "Midnight Dreams",
    artist: "Luna Sky",
    coverImage: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "3",
    title: "Electric Pulse",
    artist: "Neon Beats",
    coverImage: "/placeholder.svg?height=400&width=600",
  },
];
