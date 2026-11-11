"use client";

import { useSyncExternalStore } from "react";

let current = null;
const listeners = new Set();

export function setAlternates(alternates) {
  current = alternates;
  listeners.forEach((listener) => listener());
}

export function useBlogAlternates() {
  return useSyncExternalStore(
    (callback) => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    () => current,
    () => null,
  );
}
