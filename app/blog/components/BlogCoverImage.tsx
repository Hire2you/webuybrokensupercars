import Image from "next/image";
import PlaceholderImage from "@/components/PlaceholderImage";

type BlogCoverImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export default function BlogCoverImage({
  src,
  alt,
  className = "object-cover object-center",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
}: BlogCoverImageProps) {
  if (!src) {
    return (
      <PlaceholderImage
        label={alt}
        aspectRatio="16/10"
        className="absolute inset-0 h-full w-full rounded-none ring-0"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
