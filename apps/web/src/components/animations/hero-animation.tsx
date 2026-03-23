"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function HeroAnimation() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Badge animation
    tl.from(badgeRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.out"
    });
    
    // Title animation - split into words
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('.word');
      tl.from(words, {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.2");
    }
    
    // Subtitle animation
    tl.from(subtitleRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3");
    
    // CTA animation
    tl.from(ctaRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      ease: "back.out(1.7)"
    }, "-=0.2");
    
    // Trust row animation
    if (trustRef.current) {
      const spans = trustRef.current.querySelectorAll('span');
      tl.from(spans, {
        opacity: 0,
        stagger: 0.1,
        duration: 0.4
      }, "-=0.2");
    }
  }, []);

  return {
    badgeRef,
    titleRef,
    subtitleRef,
    ctaRef,
    trustRef
  };
}
