import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { HiArrowDown } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';


import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useTranslation();
  
  const playlist = [
    "videos/hero-1.mp4",
    "videos/hero-2.mp4",
    "videos/hero-3.mp4",
    "videos/hero-4.mp4",
  ];

  // State to manage the index of the currently playing video
  const [currentIndex, setCurrentIndex] = useState(0); 
  const videoRef = useRef(null);

  const handleVideoEnded = () => {
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(error => {
        console.error("Video interrupted:", error);
      });
    }
  }, [currentIndex]); 

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <video
            ref={videoRef}
            src={playlist[currentIndex]}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          Foundations
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              Kim&Co
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-2xl text-blue-100" dangerouslySetInnerHTML={{ __html: t('hero.tagline')}} />

            <Button
              id="portfolio"
              title={t('hero.button')}
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-500 flex-center gap-1"
            />
          </div>
        </div>

        <div className="absolute bottom-6 left-10 z-50 text-blue-100 flex flex-col items-center gap-2 animate-bounce-subtle animate-bounce"
        >
          <a
            href="#about"
          >
            <HiArrowDown className="text-3xl" />
          </a>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        Foundations
  </h1>
    </div>
  );
};

export default Hero;
