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

  // Base styling for the text links
  const buttonBaseClasses = "text-sm font-medium transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 rounded";

  return (
    <div
      className={clsx("flex items-center space-x-2", className)}
      role="group"
      aria-label="Language selection"
    >
      {/* Korean Language Button */}
      <button
        onClick={() => handleLanguageChange('ko')}
        className={clsx(
          buttonBaseClasses,
          {
            'text-white font-semibold': isKoreanActive,
            'text-gray-600 hover:text-white': !isKoreanActive,
          }
        )}
      >
        한
      </button>

      {/* Separator */}
      <span className="text-gray-600">/</span>

      {/* English Language Button */}
      <button
        onClick={() => handleLanguageChange('en')}
        className={clsx(
          buttonBaseClasses,
          {
            'text-white font-semibold': !isKoreanActive,
            'text-gray-600 hover:text-white': isKoreanActive,
          }
        )}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;