"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  containerClassName,
  priority = false,
  sizes = "100vw",
  quality = 85,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Skeleton loader */}
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}

      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={() => setIsLoading(false)}
        priority={priority}
        sizes={sizes}
        quality={quality}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
}

// Skeleton placeholder component for lazy loading
export function ImageSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-muted animate-pulse rounded-lg",
        className
      )}
    />
  );
}
