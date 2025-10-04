import CategoryCarousel from "@/components/theme/category-carousel";
// import Songs from "@/components/theme/songs";
import { Suspense } from "react";
import SongCarouselSkeleton from "@/components/skeleton/song-carousel-skeleton";
import Songs from "@/components/theme/songs";
import BannerSlider from "@/components/theme/banner-slider";
import ImageGalleryBanner from "@/components/home/image-gallery-banner";

const images = [
  {
    public_id: "Ecommerce/ehphjfsrpbpoiol13oxc",
    url: "https://swiperjs.com/demos/images/nature-2.jpg",
    _id: "2",
  },
  {
    public_id: "Ecommerce/ehphjfsrpbpoiol13osss",
    url: "https://swiperjs.com/demos/images/nature-3.jpg",
    _id: "3",
  },
  {
    public_id: "Ecommerce/ehphjfsrpbpoiol13oxcdhjshdj",
    url: "https://swiperjs.com/demos/images/nature-4.jpg",
    _id: "4",
  },
  {
    public_id: "Ecommerce/ehphjfsrpbpoiol13oxc",
    url: "https://swiperjs.com/demos/images/nature-2.jpg",
    _id: "2",
  },
  {
    public_id: "Ecommerce/ehphjfsrpbpoiol13osss",
    url: "https://swiperjs.com/demos/images/nature-3.jpg",
    _id: "3",
  },
  {
    public_id: "Ecommerce/ehphjfsrpbpoiol13oxcdhjshdj",
    url: "https://swiperjs.com/demos/images/nature-4.jpg",
    _id: "4",
  },
  {
    public_id: "Ecommerce/ehphjfsrpbpoiol13oxcdhjshdj",
    url: "/images/amit-kamble.PNG",
    _id: "4",
  },
  {
    public_id: "Ecommerce/ehphjfsrpbpoiol13oxc",
    url: "https://swiperjs.com/demos/images/nature-2.jpg",
    _id: "2",
  },
];
export default async function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen gap-y-10 md:gap-y-18">
        {/* Main Banner */}
        <div>
          <BannerSlider
            images={images}
            delay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
          />
          <section className="bg-zinc-200">
            <h1 className="text-2xl md:text-4xl py-2 md:py-4 text-center font-bold">
              Jesus Calls you
            </h1>
          </section>
        </div>
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

        <section className="container mx-auto px-4 md:px-0">
          <Suspense fallback={<SongCarouselSkeleton />}>
            <CategoryCarousel
              title="Songs By Artist"
            />
          </Suspense>
        </section>

        {/* All songs */}
        <section className="container mx-auto px-4 md:px-0">
          <Suspense fallback={<SongCarouselSkeleton />}>
            <Songs
              title="Songs For you"
            />
          </Suspense>
        </section>
        
        {/* Image gallery Banner */}
        <section className="container mx-auto px-4 md:px-0">
          <Suspense fallback={<SongCarouselSkeleton />}>
            <ImageGalleryBanner images={images} title="Image Gallery" />
          </Suspense>
        </section>
      </div>
    </>
  );
}
