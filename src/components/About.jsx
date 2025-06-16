import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t } = useTranslation();

  useGSAP(() => {
    gsap.from(".about-subtext p", {
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
    <div id="about" className="w-screen pt-1">
      <div className="relative mb-8 mt-16 flex flex-col items-center gap-5">
        

        

        {/* <div className="about-subtext">
          <p className="text-gray-500">
            
          </p>
        </div> */}
      </div>

      <div className="relative h-screen w-screen">
        <img
          src="img/about.png"
          alt="About Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-white text-4xl md:text-6xl font-bold mb-4">
            <p className="font-general text-2xl uppercase md:text-3xl lg:text-4xl">
              {t('about.welcome')}
            </p>
            <AnimatedTitle
              title={t('about.discover')}
              containerClass="mt-5 !text-white text-center"
            />
          </h2>
          <p className="text-white text-lg md:text-xl max-w-2xl mt-20">
            {t('about.subtext')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;