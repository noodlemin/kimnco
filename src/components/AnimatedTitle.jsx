import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // We removed ScrollTrigger.normalizeScroll() to prioritize animation smoothness.
    // The will-change CSS property (added below) is a more direct performance fix.

    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Changed to trigger a bit earlier for a smoother feel
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.out", // Changed to a slightly smoother ease
          stagger: 0.03, // Slightly increased stagger for clarity
        },
        0
      );
    }, containerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  return (
    <>
      {/* --- PERFORMANCE OPTIMIZATION --- */}
      {/* This style tag tells the browser to prepare for animation on these elements,
          which often enables GPU acceleration for much smoother results. */}
      <style>{`
        .animated-word {
          will-change: transform, opacity;
        }
      `}</style>
      
      <div ref={containerRef} className={clsx("animated-title", containerClass)}>
        {title.split("<br />").map((line, index) => (
          <div
            key={index}
            className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
          >
            {line.split(" ").map((word, idx) => (
              <span
                key={idx}
                className="animated-word"
                dangerouslySetInnerHTML={{ __html: word }}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default AnimatedTitle;