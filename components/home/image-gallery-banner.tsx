"use client";

import Image from "next/image";
import { fadeInUp } from "@/lib/constants";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";

const ImageGalleryBanner = ({
  images,
  title,
}: {
  images: {
    url: string;
    public_id: string;
    _id: string;
  }[];
  title: string;
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeInUp}
      viewport={{ once: true }}
    >
      <div className="flex gap-10 px-12 py-20 rounded-xl items-center justify-between bg-gradient-to-t from-yellow-400/10 via-white/10 to-purple-600/10 dark:bg-neutral-900">
        {/* LEFT SIDE */}
        <div>
          <h2 className="font-bold bg-gradient-to-tr from-blue-500 to-red-600 bg-clip-text text-transparent text-4xl mb-2">
            Image Gallery
          </h2>
          <div className="flex items-end flex-col justify-center gap-x-2">
            <p className="mb-1 tracking-wide font-medium">
              The Lord will not allow me stumble; over me day and night
            </p>
            <Badge variant="default">Psalms 121:3</Badge>
          </div>
          <Link href="/gallery" className="text-sm font-medium underline mt-2 block">
            View Gallery
          </Link>
        </div>

        {/* RIGHT SIDE – Image Gallery */}
        <article className="gallery">
          {images?.length > 0
            ? images.map((img, index) => (
                <Image
                  key={img._id || index}
                  src={img.url}
                  alt={title || `gallery-image-${index}`}
                  width={200}
                  height={200}
                  className="gallery-image"
                />
              ))
            : // fallback demo images
              [...Array(8)].map((_, i) => (
                <Image
                  key={i}
                  src="https://assets.codepen.io/1506195/unsplash-music-0.avif"
                  alt={`gallery-img-${i}`}
                  width={200}
                  height={200}
                  className="gallery-image"
                />
              ))}
        </article>
      </div>
    </motion.div>
  );
};

export default ImageGalleryBanner;
