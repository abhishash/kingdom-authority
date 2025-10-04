import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";

export default async function getBase64ImageUrl(image: any) {
  const response = await fetch(
    `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_1,w_10/${image.public_id}.${image.format}`
  );

  const buffer = await response.arrayBuffer();

  const optimized = await imagemin.buffer(Buffer.from(buffer), {
    plugins: [
      imageminMozjpeg({ quality: 60 }) // adjust quality for blur placeholder
    ],
  });

  return `data:image/jpeg;base64,${Buffer.from(optimized).toString("base64")}`;
}
