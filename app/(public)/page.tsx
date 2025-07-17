import MainBanner from "@/components/theme/main-banner";
import CategoryCarousel from "@/components/theme/category-carousel";
// import Songs from "@/components/theme/songs";
import Subscribe from "@/components/theme/subscribe";
import { Suspense } from "react";
import SongCarouselSkeleton from "@/components/skeleton/song-carousel-skeleton";
export default async function Home() {
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
        {/* <section className="container mx-auto">
          <TrendingSongs title="Exclusive Songs" />
        </section> */}
        {/* Categories Songs */}
        {/* <section className="container mx-auto">
          <CategoryCarousel title="Categories" />
        </section> */}
        {/* Trending Songs */}
        {/* <section className="container mx-auto">
          <TrendingSongs title="Trending songs" />
        </section> */}
        {/* About Singers */}
        {/* <section className="container mx-auto"><Singers /></section> */}
        {/* Category Container */}

        <section className="container mx-auto">
          <Suspense fallback={<SongCarouselSkeleton />}>
            <CategoryCarousel title="Songs By Artist" />
          </Suspense>
        </section>

        {/* All songs */}
        {/* <section className="container mx-auto px-4 md:px-0">
          <Suspense fallback={<SongCarouselSkeleton />}>
            <Songs title="Songs For you" />
          </Suspense>
        </section> */}
        {/* Subscribe Container */}
        <section className="container mx-auto px-4 md:px-0">
          <Subscribe />
        </section>
      </div>
    </>
  );
}
