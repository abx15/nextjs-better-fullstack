"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function useChatMessagePopIn() {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      gsap.from(messageRef.current, {
        opacity: 0,
        scale: 0.85,
        y: 10,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    }
  }, []);

  return messageRef;
}
