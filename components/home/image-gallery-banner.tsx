import Image from "next/image";
import TitleProps from "../theme/title-props";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";

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
    <div className="flex gap-10 px-12 py-20  rounded-xl items-center justify-between bg-gray-100/60 dark:bg-neutral-900">
      <div className=" ">
        <h1 className="font-bold text-4xl text-red-600 mb-2">Image Galery</h1>
        <div className="flex items-end flex-col justify-center gap-x-2">
          <p className="mb-1 tracking-wide font-medium">
            The Lord will not allow me stumble; over me day and night
          </p>
          <Badge variant="default">Psalms 121:3</Badge>
        </div>
        <Button variant="destructive" className="cursor-pointer tracking-wider">
          {" "}
          <Link href="gallery">View Gallery</Link>{" "}
        </Button>
      </div>

      <article className="gallery">
        <img
          src="https://assets.codepen.io/1506195/unsplash-music-0.avif"
          alt="guitar player at concert"
        />
        <img
          src="https://assets.codepen.io/1506195/unsplash-music-0.avif"
          alt="duo singing"
        />
        <img
          src="https://assets.codepen.io/1506195/unsplash-music-0.avif"
          alt="crowd cheering"
        />
        <img
          src="https://assets.codepen.io/1506195/unsplash-music-0.avif"
          alt="singer performing"
        />
        <img
          src="https://assets.codepen.io/1506195/unsplash-music-0.avif"
          alt="singer fistbumping crowd"
        />
        <img
          src="https://assets.codepen.io/1506195/unsplash-music-0.avif"
          alt="man with a guitar singing"
        />
        <img
          src="https://assets.codepen.io/1506195/unsplash-music-0.avif"
          alt="crowd looking at a lighted stage"
        />
        <img
          src="https://assets.codepen.io/1506195/unsplash-music-0.avif"
          alt="woman singing on stage"
        />
      </article>
    </div>
  );
};

export default ImageGalleryBanner;
