"use client";

import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  speed?: number;
  direction?: "up" | "down";
  priority?: boolean;
  sizes?: string;
  overlay?: boolean;
  overlayClassName?: string;
  children?: ReactNode;
}

export function ParallaxImage({
  src,
  alt,
  className,
  containerClassName,
  speed = 0.15,
  direction = "up",
  priority = false,
  sizes = "100vw",
  overlay = false,
  overlayClassName,
  children,
}: ParallaxImageProps) {
  const { ref, offset, isVisible } = useParallax<HTMLDivElement>({
    speed,
    direction,
  });

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translateY(${offset}px) scale(1.1)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={cn("object-cover", className)}
          priority={priority}
          sizes={sizes}
        />
      </div>
      {overlay && (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent",
            overlayClassName
          )}
        />
      )}
      {children && (
        <div className="relative z-10">{children}</div>
      )}
    </div>
  );
}

// Simpler parallax section background
interface ParallaxSectionProps {
  children: ReactNode;
  backgroundImage?: string;
  backgroundColor?: string;
  speed?: number;
  className?: string;
  innerClassName?: string;
  overlay?: boolean;
}

export function ParallaxSection({
  children,
  backgroundImage,
  backgroundColor,
  speed = 0.2,
  className,
  innerClassName,
  overlay = true,
}: ParallaxSectionProps) {
  const { ref, offset } = useParallax<HTMLDivElement>({
    speed,
    direction: "up",
  });

  return (
    <section
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{ backgroundColor }}
    >
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 will-change-transform"
            style={{
              transform: `translateY(${offset}px) scale(1.15)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <Image
              src={backgroundImage}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          {overlay && (
            <div className="absolute inset-0 bg-black/40" />
          )}
        </>
      )}
      <div className={cn("relative z-10", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
