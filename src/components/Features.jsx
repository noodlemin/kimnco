import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useTranslation } from 'react-i18next';
import LogoShowcase from "./LogoShowcase";
import { useNavigate, useParams } from 'react-router-dom';

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, poster, title, description, lang, propertyType}) => {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  const handleMouseEnterCard = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Video playback failed:", err);
      });
    }
  };
  
  const handleMouseLeaveCard = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleButtonClick = () => {
    if (propertyType) {
      navigate(`/${lang}/portfolio?type=${propertyType}`);
    } else {
      // Fallback if no type is provided, just go to the map
      navigate(`/${lang}/portfolio`);
    }
    // Scroll to the top of the page after navigation
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative size-full"
      onMouseEnter={handleMouseEnterCard} // 👈 Add this
      onMouseLeave={handleMouseLeaveCard}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        muted
        // autoPlay
        playsInline
        preload="auto"
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col p-10 text-white text-wrap">
        <div className="flex-grow">
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-54 text-xs md:text-base">{description}</p>
          )}
        </div>

        <div
          onClick={handleButtonClick}
          ref={hoverButtonRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white self-end font-general md:text-xl"
        >
          {/* Radial gradient hover effect */}
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
            style={{
              opacity: hoverOpacity,
              background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
            }}
          />
          <TiLocationArrow className="relative z-20" />
          <p className="relative z-20">
            {t('features.feature-button')}
          </p>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const { t } = useTranslation();
  const { lang } = useParams();

  return(
    <section className="bg-black pb-24 md:pb-48">
      <div className="container mx-auto px-4 md:px-10">
        <div className="px-2 md:px-5 pt-24 md:pt-32 pb-5">
          <h1 className="bento-title special-font text-4xl md:text-5xl text-blue-50 ">
            {t('features.intro-title')}
          </h1>
          {/* <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            {t('features.intro-text')}
          </p> */}
        </div>

        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            lang={lang}
            propertyType="living"
            src="videos/feature-1.mp4"
            poster="img/poster1.png"
            title={
              <>
                {t('features.feature1-title')}
              </>
            }
            // description={t('features.feature1-text')}
            // isComingSoon
          />
        </BentoTilt>

        <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              lang={lang}
              propertyType="commercial"
              src="videos/feature-2.mp4"
              poster="img/poster2.png"
              title={
                <>
                  {t('features.feature2-title')}
                </>
              }

            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:ms-0">
            <BentoCard
              lang={lang}
              propertyType="resorts"
              src="videos/feature-3.mp4"
              poster="img/poster3.png"
              title={
                <>
                  {t('features.feature3-title')}
                </>
              }
              // description={t('features.feature3-text')}
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/feature-4.mp4"
              poster="img/poster4.png"
              title={
                <>
                  {t('features.feature4-title')}
                </>
              }
              // description={t('features.feature4-text')}
            />
          </BentoTilt>
        </div>
      </div>
      <LogoShowcase t={t('features.logo')}/>
    </section>
  );
}

export default Features;