// LanguageToggle.jsx (Revised)
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Remove useParams here

const LanguageToggle = ({ className }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  // isKoreanActive should ONLY depend on i18n.language
  // The 'i18n.language' itself will be updated by LanguageValidatorAndContent
  // when the URL changes.
  const isKoreanActive = i18n.language.startsWith('ko');

  // State to track if it's a small screen (mobile)
  const [isMobile, setIsMobile] = useState(false);

  // Function to handle language toggle
  const handleToggle = () => {
    const targetLang = isKoreanActive ? 'en' : 'ko';

    // Change i18n language first
    i18n.changeLanguage(targetLang);

    // Navigate to the new URL with the chosen language
    // This will trigger the LanguageValidatorAndContent to update i18n.language
    // if it hasn't already caught up, and also update the URL.
    navigate(`/${targetLang}`);
  };

  // Effect to check screen size on mount and resize (no changes here, it's correct)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind's 'sm' breakpoint is 640px
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Define translation values based on screen size for the slider's position.
  const koreanPosition = isMobile ? 'translateX(15%)' : 'translateX(5%)';
  const englishPosition = isMobile ? 'translateX(145%)' : 'translateX(115%)';

  return (
    <div
      onClick={handleToggle}
      className={clsx(
        "relative flex h-12 w-28 cursor-pointer items-center rounded-full p-1",
        "sm:h-10 sm:w-24 focus-within:ring-2 focus-within:ring-yellow-400 focus-within:ring-offset-2 focus-within:ring-offset-gray-900",
        className
      )}
      role="switch"
      aria-checked={isKoreanActive}
      aria-label="Toggle language between Korean and English"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle();
        }
      }}
    >
      {/* Sliding indicator */}
      <div
        className={clsx(
          "absolute h-8 w-10 rounded-full bg-yellow-500 shadow-md transition-transform duration-300 ease-in-out",
          "sm:h-8 sm:w-10"
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
          isKoreanActive ? 'text-gray-800' : 'text-white'
        )}
      >
        한
      </span>
      <span
        className={clsx(
          "z-10 flex-1 text-center font-general text-xs uppercase transition-colors duration-300",
          !isKoreanActive ? 'text-gray-800' : 'text-white'
        )}
      >
        EN
      </span>
    </div>
  );
};

export default LanguageToggle;