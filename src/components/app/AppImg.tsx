"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

type AppImgProps = Omit<ImageProps, "src" | "alt"> & {
  src?: string | null;
  alt?: string | null;
  fallbackSrc?: string;
};

export default function AppImg({
  src,
  alt,
  width = 500,
  height = 500,
  fallbackSrc = "/default-avatar.png",
  ...props
}: AppImgProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || "Image"}
      width={width}
      height={height}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}
