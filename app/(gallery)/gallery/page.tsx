

import Logo from "@/components/theme/logo";
import cloudinary from "@/utils/cloudinary";
import getBase64ImageUrl from "@/utils/generateBlurPlaceholder";
import { ImageProps } from "@/utils/types";
import Link from "next/link";

const Page = async () => {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by("public_id", "desc")
    .max_results(400)
    .execute();

    let reducedResults: ImageProps[] = [];

  let i = 0;
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    });
    i++;
  }

  const blurImagePromises = results.resources.map((image: ImageProps) => {
    return getBase64ImageUrl(image);
  });
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
  }
  console.log("Results:", results);
  return (
    <>
      {/* {photoId && (
        <Modal
          images={images}
          onClose={() => {
            setLastViewedPhoto(photoId);
          }}
        />
      )} */}
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="flex max-h-full max-w-full items-center justify-center">
              {/* <Bridge /> */}
            </span>
            <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
          </div>
          <Logo />
          <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
            2024 Latest Photos
          </h1>
          <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
            Our incredible Next.js community got together in San Francisco for
            our first ever in-person conference!
          </p>
          <Link
            className="pointer z-10 mt-6 cursor-pointer rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
            href="/"
          >
            Go Back
          </Link>
        </div>
        {/* {images.map(({ id, public_id, format, blurDataUrl }) => (
          <Link
            key={id}
            href={`/?photoId=${id}`}
            as={`/p/${id}`}
            ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
            shallow
            className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
          >
            <Image
              alt="Next.js Conf photo"
              className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              style={{ transform: "translate3d(0, 0, 0)" }}
              placeholder="blur"
              blurDataURL={blurDataUrl}
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
              width={720}
              height={480}
              sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
            />
          </Link>
        ))} */}
      </div>
    </>
  );
};

export default Page;
