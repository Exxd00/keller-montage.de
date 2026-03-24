"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseParallaxOptions {
  speed?: number; // Parallax speed (0.1 = slow, 0.5 = medium, 1 = fast)
  direction?: "up" | "down";
  disabled?: boolean;
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: UseParallaxOptions = {}
) {
  const { speed = 0.3, direction = "up", disabled = false } = options;
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  const calculateOffset = useCallback(() => {
    if (!ref.current || disabled) return;

    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Check if element is in viewport
    if (rect.bottom < 0 || rect.top > windowHeight) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    // Calculate scroll progress relative to element position
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;
    const distanceFromCenter = elementCenter - viewportCenter;

    // Apply parallax effect
    const parallaxOffset = distanceFromCenter * speed * (direction === "up" ? -1 : 1);
    setOffset(parallaxOffset);
  }, [speed, direction, disabled]);

  useEffect(() => {
    if (disabled) return;

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(calculateOffset);
    };

    // Initial calculation
    calculateOffset();

    // Add passive scroll listener for performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [calculateOffset, disabled]);

  return { ref, offset, isVisible };
}

// Hook for multiple parallax layers
export function useParallaxLayers() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const getParallaxStyle = (speed: number = 0.5) => ({
    transform: `translateY(${scrollY * speed}px)`,
  });

  return { scrollY, getParallaxStyle };
}
