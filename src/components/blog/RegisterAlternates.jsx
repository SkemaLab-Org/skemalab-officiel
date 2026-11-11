"use client";

import { useEffect } from "react";
import { setAlternates } from "@/lib/blog/alternates-store";

/**
 * Publishes the localized equivalents of the current blog page to the
 * language switcher. Falls back to the blog index when a translation is
 * missing (handled by the caller).
 */
export default function RegisterAlternates({ alternates }) {
  const key = JSON.stringify(alternates);

  useEffect(() => {
    setAlternates(alternates);
    return () => setAlternates(null);
    // `key` is a stable serialization of `alternates` coming from the server.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return null;
}
