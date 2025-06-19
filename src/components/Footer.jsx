import React from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const Footer = () => {
  const { t } = useTranslation();

  return (
    // Main footer container
    // bg-gray-900: Dark background for contrast.
    // text-gray-300: Light gray text for readability on dark background.
    // p-8 md:p-12: Responsive padding.
    // rounded-t-lg: Rounded top corners for modern look.
    <footer className="bg-gray-900 text-gray-300 p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Main Content Area: Left (Copyright & Figures) and Right (More Legal Links) */}
        {/* On mobile, these two columns will stack vertically (flex-col). On desktop, they will be side-by-side (md:flex-row) and justified between. */}
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-12">
          {/* Left Column - Copyright & Figures Statement */}
          {/* Text is centered on mobile, left-aligned on desktop. */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <p className="text-sm md:text-base mb-1 rounded-md">
              &copy; {t('footer.companyNameShort')}
            </p>
            <p className="text-xs md:text-sm mb-1 rounded-md">
              <span className="font-semibold">{t('footer.businessNumber')}</span> | 214-87-43822
            </p>
            <p className="text-xs md:text-sm mb-1 rounded-md">
              <span className="font-semibold">{t('footer.owner')}</span> | {t('footer.ownerName')}
            </p>
            <p className="text-xs md:text-sm mb-1 rounded-md">
              <span className="font-semibold">{t('footer.tel')}</span> | {t('footer.telNo')}
            </p>
            <p className="text-xs md:text-sm mb-1 rounded-md">
              <span className="font-semibold">FAX</span> | {t('footer.faxNo')}
            </p>
            <p className="text-xs md:text-sm mb-1 rounded-md">
              {t('footer.addressDetail')}
            </p>
            
          </div>

          {/* Right Column - Additional Legal/Disclosure Links */}
          {/* Text is centered on mobile, right-aligned on desktop. */}
          <div className="w-full md:w-1/2 text-center md:text-right">
            <ul className="space-y-2">
              <li><a href="" className="hover:text-white transition-colors duration-200 text-sm md:text-base rounded-md">{t('footer.contact')}</a></li>
              <li><a href="privacy" className="hover:text-white transition-colors duration-200 text-sm md:text-base rounded-md">{t('footer.privacyPolicy')}</a></li>
              <li><a href="noemail" className="hover:text-white transition-colors duration-200 text-sm md:text-base rounded-md">{t('footer.noEmail')}</a></li>
              
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Line */}
        {/* A separate divider before the final copyright. Text is centered. */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs md:text-sm rounded-md">
          <p>
            &copy; Kim & Co {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
