import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t } = useTranslation();

  useGSAP(() => {
    gsap.from(".about-subtext", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about-subtext",
        start: "top 80%",
      },
    });
  });

  return (
    <div id="about" className="w-screen pt-10">
      <div className="relative h-[50vh] w-screen">
        <img
          src="img/about.png"
          alt="About Background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          {/* Title block */}
          <div className="mb-6">
            <p className="font-general text-2xl uppercase md:text-3xl lg:text-4xl text-white">
              {t('about.welcome')}
            </p>
            <AnimatedTitle
              title={t('about.discover')}
              containerClass="mt-5 text-white text-center"
            />
          </div>

          {/* Subtext block */}
          <div className="about-subtext text-white">
            {/* <p className="text-white text-lg md:text-xl"> */}
              {t('about.subtext')}
            {/* </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
