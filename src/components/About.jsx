import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
import { useTranslation } from "react-i18next";
import Timeline from "./Timeline.jsx";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t } = useTranslation();

  return (
    <div id="about" className="w-screen">
      {/* Hero Image Section */}
      <div className="relative h-[50vh] w-screen">
        <img
          src="img/about.png"
          alt="About Background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <div className="mb-6">
            <p className="font-general text-2xl uppercase md:text-3xl lg:text-4xl text-white">
              {t("about.welcome")}
            </p>
            <AnimatedTitle
              title={t("about.discover")}
              containerClass="mt-5 text-white text-center"
            />
          </div>

          <div className="about-subtext text-white">
            {t("about.subtext")}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <Timeline />
    </div>
  );
};

export default About;
