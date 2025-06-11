// LanguageToggle.jsx
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const LanguageToggle = ({ className }) => {
  const { i18n } = useTranslation();
  const isKorean = i18n.language.startsWith('kr');

  // State to track if it's a small screen (mobile)
  const [isMobile, setIsMobile] = useState(false);

  // Function to handle language toggle
  const handleToggle = () => {
    // If current language is Korean, change to English.
    // If current language is English, change to Korean.
    i18n.changeLanguage(isKorean ? 'en' : 'kr');
  };

  // Effect to check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind's 'sm' breakpoint is 640px
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Define translation values based on screen size
  // The values here are for the *physical positions* on the left/right,
  // not tied to which language they represent yet.
  const leftTranslateX = isMobile ? 'translateX(15%)' : 'translateX(5%)';
  const rightTranslateX = isMobile ? 'translateX(150%)' : 'translateX(115%)';

  return (
    <div
      onClick={handleToggle}
      className={clsx(
        "relative flex h-12 w-28 cursor-pointer items-center rounded-full p-1",
        "sm:h-10 sm:w-24",
        className
      )}
      role="switch"
      aria-checked={isKorean} // `aria-checked` should still reflect if KR is active
      aria-label="Language Toggle"
    >
      {/* Sliding indicator */}
      <div
        className={clsx(
          "absolute h-8 w-10 rounded-full bg-yellow-500 shadow-md transition-transform duration-300 ease-in-out",
          "sm:h-8 sm:w-10" // Note: Fixed 'w-10' here from 'w-10' in original to 'sm:w-10'
        )}
        style={{
          // If Korean is active, move to the left position
          // If English is active, move to the right position
          transform: isKorean ? leftTranslateX : rightTranslateX,
        }}
      />

      {/* Text Labels - Swapped order */}
      <span
        className={`z-10 flex-1 text-center
                    font-general text-xs uppercase
                    transition-colors duration-300 ${isKorean ? 'text-gray-800' : 'text-white'}`}
      >
        한
      </span>
      <span
        className={`z-10 flex-1 text-center
                    font-general text-xs uppercase
                    transition-colors duration-300 ${!isKorean ? 'text-gray-800' : 'text-white'}`}
      >
        EN
      </span>
    </div>
  );
};

export default LanguageToggle;