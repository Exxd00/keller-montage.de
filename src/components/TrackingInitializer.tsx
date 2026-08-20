"use client";

import { useEffect } from "react";
import { initTracking } from "@/lib/tracking";

export function TrackingInitializer() {
  useEffect(() => {
    // Initialize tracking to capture GCLID, UTM parameters, etc.
    initTracking();
  }, []);

  return null;
}
