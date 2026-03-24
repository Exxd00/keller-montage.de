"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type AnimationVariant = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scaleUp" | "fadeIn";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

const variants = {
  fadeUp: {
    hidden: "opacity-0 translate-y-8",
    visible: "opacity-100 translate-y-0",
  },
  fadeDown: {
    hidden: "opacity-0 -translate-y-8",
    visible: "opacity-100 translate-y-0",
  },
  fadeLeft: {
    hidden: "opacity-0 translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  fadeRight: {
    hidden: "opacity-0 -translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  scaleUp: {
    hidden: "opacity-0 scale-95",
    visible: "opacity-100 scale-100",
  },
  fadeIn: {
    hidden: "opacity-0",
    visible: "opacity-100",
  },
};

export function ScrollReveal({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold,
    triggerOnce: once,
  });

  const selectedVariant = variants[variant];

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all will-change-transform",
        isVisible ? selectedVariant.visible : selectedVariant.hidden,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
}

// Staggered children animation wrapper
interface StaggeredRevealProps {
  children: ReactNode[];
  className?: string;
  childClassName?: string;
  variant?: AnimationVariant;
  staggerDelay?: number;
  duration?: number;
}

export function StaggeredReveal({
  children,
  className,
  childClassName,
  variant = "fadeUp",
  staggerDelay = 100,
  duration = 600,
}: StaggeredRevealProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  const selectedVariant = variants[variant];

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(
            "transition-all will-change-transform",
            isVisible ? selectedVariant.visible : selectedVariant.hidden,
            childClassName
          )}
          style={{
            transitionDuration: `${duration}ms`,
            transitionDelay: `${index * staggerDelay}ms`,
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
