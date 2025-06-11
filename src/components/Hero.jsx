// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/all";
// import { TiLocationArrow } from "react-icons/ti";
// import { useEffect, useRef, useState } from "react";
// import { useTranslation } from 'react-i18next';

// import Button from "./Button";
// import VideoPreview from "./VideoPreview";

// gsap.registerPlugin(ScrollTrigger);

// const Hero = () => {
//   const { t } = useTranslation();

//   const [currentIndex, setCurrentIndex] = useState(1);
//   const [hasClicked, setHasClicked] = useState(false);

//   const [loading, setLoading] = useState(true);
//   const [loadedVideos, setLoadedVideos] = useState(0);

//   const totalVideos = 4;
//   const nextVdRef = useRef(null);

//   const handleVideoLoad = () => {
//     setLoadedVideos((prev) => prev + 1);
//   };

//   useEffect(() => {
//     if (loadedVideos === totalVideos - 1) {
//       setLoading(false);
//     }
//   }, [loadedVideos]);

//   const handleMiniVdClick = () => {
//     setHasClicked(true);

//     setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
//   };

//   useGSAP(
//     () => {
//       if (hasClicked) {
//         gsap.set("#next-video", { visibility: "visible" });
//         gsap.to("#next-video", {
//           transformOrigin: "center center",
//           scale: 1,
//           width: "100%",
//           height: "100%",
//           duration: 1,
//           ease: "power1.inOut",
//           onStart: () => nextVdRef.current.play(),
//         });
//         gsap.from("#current-video", {
//           transformOrigin: "center center",
//           scale: 0,
//           duration: 1.5,
//           ease: "power1.inOut",
//         });
//       }
//     },
//     {
//       dependencies: [currentIndex],
//       revertOnUpdate: true,
//     }
//   );

//   useGSAP(() => {
//     gsap.set("#video-frame", {
//       clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
//       borderRadius: "0% 0% 40% 10%",
//     });
//     gsap.from("#video-frame", {
//       clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//       borderRadius: "0% 0% 0% 0%",
//       ease: "power1.inOut",
//       scrollTrigger: {
//         trigger: "#video-frame",
//         start: "center center",
//         end: "bottom center",
//         scrub: true,
//       },
//     });
//   });

//   const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

//   return (
//     <div className="relative h-dvh w-screen overflow-x-hidden">

//       <div
//         id="video-frame"
//         className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
//       >

//         <div>
//           <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
//             <VideoPreview>
//               <div
//                 onClick={handleMiniVdClick}
//                 className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
//               >
//                 <video
//                   ref={nextVdRef}
//                   src={getVideoSrc((currentIndex % totalVideos) + 1)}
//                   // loop
//                   muted
//                   playsInline // Essential for iOS inline playback
//                   preload="metadata" // Recommended for performance
//                   id="current-video"
//                   className="size-64 origin-center scale-150 object-cover object-center"
//                   onLoadedData={handleVideoLoad}
//                 />
//               </div>
//             </VideoPreview>
//           </div>

//           <video
//             ref={nextVdRef}
//             src={getVideoSrc(currentIndex)}
//             // loop
//             muted
//             playsInline // Essential for iOS inline playback
//             preload="metadata" // Recommended for performance
//             id="next-video"
//             className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
//             onLoadedData={handleVideoLoad}
//           />
//           <video
//             src={getVideoSrc(
//               currentIndex === totalVideos - 1 ? 1 : currentIndex
//             )}
//             autoPlay
//             // loop
//             muted
//             playsInline // Essential for iOS inline playback
//             preload="metadata"
//             className="absolute left-0 top-0 size-full object-cover object-center"
//             onLoadedData={handleVideoLoad}
//           />
//         </div>

//         <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
//           Foundations
//         </h1>

//         <div className="absolute left-0 top-0 z-40 size-full">
//           <div className="mt-24 px-5 sm:px-10">
//             <h1 className="special-font hero-heading text-blue-100">
//               Kim&Co
//             </h1>

//             <p className="mb-5 max-w-64 font-robert-regular text-2xl text-blue-100" dangerouslySetInnerHTML={{ __html: t('hero.tagline')}} />

//             <Button
//               id="portfolio"
//               title={t('hero.button')}
//               leftIcon={<TiLocationArrow />}
//               containerClass="bg-yellow-500 flex-center gap-1"
//             />
            
//           </div>
//         </div>
//       </div>

//       <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
//         Foundations
//       </h1>
//     </div>
//   );
// };

// export default Hero;

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useRef } from "react"; // Removed useState for video logic
import { useTranslation } from 'react-i18next';

import Button from "./Button";
// VideoPreview component is no longer needed

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useTranslation();

  // Removed all state related to multiple videos and preview clicks
  // const [currentIndex, setCurrentIndex] = useState(1);
  // const [hasClicked, setHasClicked] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [loadedVideos, setLoadedVideos] = useState(0);
  // const totalVideos = 4;

  // Removed nextVdRef as it's no longer controlling a dynamic 'next' video
  // const nextVdRef = useRef(null);

  // Removed video load handler as there's no preview loading state
  // const handleVideoLoad = () => {
  //   setLoadedVideos((prev) => prev + 1);
  // };

  // Removed useEffect for loading state
  // useEffect(() => {
  //   if (loadedVideos === totalVideos - 1) {
  //     setLoading(false);
  //   }
  // }, [loadedVideos]);

  // Removed mini video click handler
  // const handleMiniVdClick = () => {
  //   setHasClicked(true);
  //   setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  // };

  // Removed the GSAP animation for video transitions
  // useGSAP(
  //   () => {
  //     if (hasClicked) {
  //       gsap.set("#next-video", { visibility: "visible" });
  //       gsap.to("#next-video", {
  //         transformOrigin: "center center",
  //         scale: 1,
  //         width: "100%",
  //         height: "100%",
  //         duration: 1,
  //         ease: "power1.inOut",
  //         onStart: () => nextVdRef.current.play(),
  //       });
  //       gsap.from("#current-video", {
  //         transformOrigin: "center center",
  //         scale: 0,
  //         duration: 1.5,
  //         ease: "power1.inOut",
  //       });
  //     }
  //   },
  //   {
  //     dependencies: [currentIndex],
  //     revertOnUpdate: true,
  //   }
  // );

  // Kept the GSAP animation for the video-frame container
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

  // Removed getVideoSrc as only one static video is used
  // const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          {/* Only the main background video remains */}
          <video
            src="videos/hero.mp4" // Set to a single video file
            autoPlay // Auto-play the video
            loop // Loop the video indefinitely
            muted // Mute the video by default
            playsInline // Essential for iOS inline playback
            preload="metadata" // Recommended for performance
            className="absolute left-0 top-0 size-full object-cover object-center"
            // onLoadedData is no longer strictly needed for loading state
          />
        </div>

        {/* Foundations text at bottom right (blue) */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          Foundations
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            {/* Kim&Co heading */}
            <h1 className="special-font hero-heading text-blue-100">
              Kim&Co
            </h1>

            {/* Tagline paragraph */}
            <p className="mb-5 max-w-64 font-robert-regular text-2xl text-blue-100" dangerouslySetInnerHTML={{ __html: t('hero.tagline')}} />

            {/* Portfolio button */}
            <Button
              id="portfolio"
              title={t('hero.button')}
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-500 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      {/* Foundations text at bottom right (black) */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        Foundations
      </h1>
    </div>
  );
};

export default Hero;
