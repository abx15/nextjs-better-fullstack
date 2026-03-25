"use client";

import { useEffect } from "react";

export function HydrationFix() {
  useEffect(() => {
    // Remove browser extension attributes that cause hydration issues
    const body = document.querySelector("body");
    if (body) {
      body.removeAttribute("cz-shortcut-listen");
      body.removeAttribute("data-new-gr-c-s-check-loaded");
      body.removeAttribute("data-gr-ext-installed");
      body.removeAttribute("data-lt-installed");
    }
  }, []);

  return null;
}
