import Image, { ImageProps } from "next/image";
import { FC } from "react";
import clsx from "clsx";

interface AppImageProps extends Partial<ImageProps> {
  src?: string;
  alt?: string;
  fallbackSrc?: string;
  className?: string;
  isFill?: boolean;
}

const AppImage: FC<AppImageProps> = ({
  src,
  alt = "Image",
  fallbackSrc = "/placeholder.jpg",
  className = "",
  isFill = false,
  ...props
}) => {
  const finalSrc = src || fallbackSrc;

  if (isFill) {
    return (
      <div className={clsx("relative overflow-hidden", className)}>
        <Image
          src={finalSrc}
          alt={alt}
          fill
          className="object-cover object-center"
          {...props}
        />
      </div>
    );
  }

  return (
    <Image
      src={finalSrc}
      alt={alt}
      className={clsx("object-cover", className)}
      {...props}
    />
  );
};

export default AppImage;
