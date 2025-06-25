// LanguageToggle.jsx (Simplified and Improved Aesthetics)
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const LanguageToggle = ({ className }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const isKoreanActive = i18n.language.startsWith('ko');

  const handleLanguageChange = (lang) => {
    if (i18n.language.startsWith(lang)) return;

    i18n.changeLanguage(lang);
    navigate(`/${lang}`);
  };

  // --- Style classes for the buttons ---
  // Base styling for both buttons for consistency
  const buttonBaseClasses = "z-10 flex-1 rounded-lg px-5 py-2.5 text-center text-sm font-bold uppercase transition-all duration-300 ease-in-out";
  
  // Styling for the focused state, consistent for both buttons
  const focusClasses = "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900";

  return (
    // The main container. We use a softer rounded shape and subtle background.
    <div
      className={clsx(
        "flex items-center space-x-1 rounded-xl p-1",
        "bg-gray-700/50", // A semi-transparent background to blend better
        className
      )}
      role="group"
      aria-label="Language selection"
    >
      {/* Korean Language Button */}
      <button
        onClick={() => handleLanguageChange('ko')}
        aria-pressed={isKoreanActive}
        className={clsx(
          buttonBaseClasses,
          focusClasses,
          {
            'bg-gray-200 text-gray-900 shadow-sm': isKoreanActive, // Active state: light, clear, with subtle shadow
            'bg-transparent text-gray-300 hover:bg-gray-600/70': !isKoreanActive, // Inactive state: transparent, subtle hover
          }
        )}
      >
        한
      </button>

      {/* English Language Button */}
      <button
        onClick={() => handleLanguageChange('en')}
        aria-pressed={!isKoreanActive}
        className={clsx(
          buttonBaseClasses,
          focusClasses,
          {
            'bg-gray-200 text-gray-900 shadow-sm': !isKoreanActive, // Active state
            'bg-transparent text-gray-300 hover:bg-gray-600/70': isKoreanActive, // Inactive state
          }
        )}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;