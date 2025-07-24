import Image from "next/image";

const ImageGalleryBanner = ({
  images,
}: {
  images: {
    url: string;
    public_id: string;
    _id: string;
  }[];
}) => {
  return (
    <div className="columns-3 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
      {images.map(({ url: src, public_id }) => (
        <div
          key={public_id}
          className="after:content after:shadow-highlight group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg"
        >
          <Image
            alt="Next.js Conf photo"
            className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
            style={{ transform: "translate3d(0, 0, 0)" }}
            placeholder="blur"
            blurDataURL={src}
            src={src}
            width={720}
            height={480}
            sizes="(max-width: 640px) 100vw,
(max-width: 1280px) 50vw,
(max-width: 1536px) 33vw,
25vw"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGalleryBanner;
