import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const LanguageToggle = ({ className }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams(); // current language from URL
  // Use 'ko' for Korean based on ISO 639-1 standard
  const isKoreanActive = i18n.language.startsWith('ko');

  // State to track if it's a small screen (mobile)
  const [isMobile, setIsMobile] = useState(false);

  // Function to handle language toggle
  const handleToggle = () => {
    const newLang = isKoreanActive ? 'en' : 'ko';
    i18n.changeLanguage(newLang);

    // Only change the URL if it's different
    if (lang !== newLang) {
      navigate(`/${newLang}`);
    }
  };

  // Effect to check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind's 'sm' breakpoint is 640px
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []); // Empty dependency array ensures this runs once on mount

  // Define translation values based on screen size for the slider's position.
  // We're defining the *target* positions for English and Korean.
  const koreanPosition = isMobile ? 'translateX(15%)' : 'translateX(5%)';
  const englishPosition = isMobile ? 'translateX(150%)' : 'translateX(115%)';

  return (
    <div
      onClick={handleToggle}
      className={clsx(
        "relative flex h-12 w-28 cursor-pointer items-center rounded-full p-1",
        "bg-gray-700 sm:h-10 sm:w-24 focus-within:ring-2 focus-within:ring-yellow-400 focus-within:ring-offset-2 focus-within:ring-offset-gray-900", // Added focus styling
        className
      )}
      role="switch"
      // aria-checked should reflect the state of the *current* selection
      aria-checked={isKoreanActive}
      aria-label="Toggle language between Korean and English" // More descriptive label
      tabIndex={0} // Make the div focusable
      onKeyDown={(e) => { // Allow keyboard interaction
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault(); // Prevent default scroll for space bar
          handleToggle();
        }
      }}
    >
      {/* Sliding indicator */}
      <div
        className={clsx(
          "absolute h-8 w-10 rounded-full bg-yellow-500 shadow-md transition-transform duration-300 ease-in-out",
          "sm:h-8 sm:w-10" // Consistent sizing
        )}
        style={{
          // Apply the correct transform based on the active language
          transform: isKoreanActive ? koreanPosition : englishPosition,
        }}
      />

      {/* Text Labels */}
      <span
        className={clsx(
          "z-10 flex-1 text-center font-general text-xs uppercase transition-colors duration-300",
          isKoreanActive ? 'text-gray-800' : 'text-white' // Text color for Korean label
        )}
      >
        한
      </span>
      <span
        className={clsx(
          "z-10 flex-1 text-center font-general text-xs uppercase transition-colors duration-300",
          !isKoreanActive ? 'text-gray-800' : 'text-white' // Text color for English label
        )}
      >
        EN
      </span>
    </div>
  );
};

export default LanguageToggle;