import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // --- TARGETED FIX FOR MOBILE SCROLL JUMP ---
    // This tells ScrollTrigger to NOT refresh its calculations when the viewport
    // height changes on touch devices. This is the most direct way to prevent
    // the layout jump caused by the browser's UI appearing/disappearing.
    // This configuration should ideally be set once in your main App component.
    ScrollTrigger.config({ ignoreMobileResize: true });


    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.out",
          stagger: 0.03,
        },
        0
      );
    }, containerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  return (
    <>
      {/* This performance optimization is still helpful for smoothness */}
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