import { useTranslation } from "react-i18next";
import Timeline from "./Timeline.jsx";

const About = () => {
  const { t } = useTranslation();
  const title = t("about.discover");
  let wordIndex = 0; // To track the index for the animation delay

  return (
    <>
      {/*
        This self-contained CSS block creates the "bottom to top" animation.
        It runs once when the component is rendered and is not affected by scrolling.
      */}
      <style>{`
        @keyframes slideUpFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px); /* Start 20px below */
          }
          to {
            opacity: 1;
            transform: translateY(0); /* End at its natural position */
          }
        }

        .discover-word {
          display: inline-block; /* Needed for transform to work */
          opacity: 0; /* Start hidden */
          animation-name: slideUpFadeIn;
          animation-duration: 0.6s;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards; /* Stay visible after animation */
        }
      `}</style>

      <div id="about" className="w-screen">
        {/* Hero Image Section */}
        <div className="relative h-[60vh] w-screen">
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
              
              {/* This is the new animated title section */}
              <div className="mt-5 text-white text-center">
                {title.split("<br />").map((line, lineIdx) => (
                  <div
                    key={lineIdx}
                    className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
                  >
                    {line.split(" ").map((word, wIdx) => {
                      const currentWordIndex = wordIndex++;
                      return (
                        <span
                          key={wIdx}
                          className="discover-word"
                          style={{ animationDelay: `${currentWordIndex * 0.05}s` }}
                          dangerouslySetInnerHTML={{ __html: word }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

            </div>

            <div className="about-subtext text-white">
              {t("about.subtext")}
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <Timeline />
      </div>
    </>
  );
};

export default About;