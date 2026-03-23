"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useStatsCounter(targetValue: number, duration: number = 2) {
  const [displayValue, setDisplayValue] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const objRef = useRef({ val: 0 });

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(objRef.current,
      { val: 0 },
      {
        val: targetValue,
        duration: duration,
        ease: "power1.inOut",
        snap: { val: 1 },
        onUpdate: () => setDisplayValue(Math.round(objRef.current.val)),
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          once: true,
        }
      }
    );
  }, [targetValue, duration]);

  return { displayValue, cardRef };
}
