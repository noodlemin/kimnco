import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { FaAngleDoubleDown } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useTranslation();

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
            src="videos/hero.mp4"
            loop
            autoPlay
            muted
            playsInline
            preload="auto"
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          Inc.
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              Kim&Co
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-2xl text-blue-100" dangerouslySetInnerHTML={{ __html: t('hero.tagline')}} />

          </div>
        </div>

        <div className="absolute bottom-8 inset-x-0 mx-auto z-50 text-blue-100 flex flex-col items-center gap-2 animate-bounce-subtle animate-bounce w-fit">
          <a
            href="#about"
          >
            <FaAngleDoubleDown className="text-6xl" />
          </a>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        Inc.
  </h1>
    </div>
  );
};

export default Hero;
