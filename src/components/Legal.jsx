import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";

// The component has been renamed to LegalPage for clarity, assuming you will rename the file.
const LegalPage = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // Function to determine the active tab from the URL hash. Defaults to 'privacy'.
  const getTabFromHash = (hash) => {
    return hash === '#noemail' ? 'noemail' : 'privacy';
  };

  const [activeTab, setActiveTab] = useState(getTabFromHash(location.hash));

  // Effect to update the tab when the URL hash changes
  useEffect(() => {
    setActiveTab(getTabFromHash(location.hash));
  }, [location.hash]);

  // --- Reusable Sub-Components for Content ---

  // Enhanced helper component for rendering policy sections
  const PolicySection = ({ title, children }) => (
    <section className="mb-10 w-full">
      <h2 className="text-2xl font-semibold text-gray-100 mb-6 border-l-4 border-blue-500 pl-4">
        {title}
      </h2>
      <div className="space-y-4 text-gray-400 leading-relaxed pl-2">
        {children}
      </div>
    </section>
  );

  // Content for the Privacy Policy tab
  const PrivacyContent = () => (
    <div className="mt-12 text-left">
      <p className="mb-4">{t('privacy.intro_p1')}</p>
      <p className="mb-8">{t('privacy.intro_p2')}</p>

      {/* Table of Contents */}
      <div className="mb-12 p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-200 mb-3">{t('privacy.contents_title')}</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-400">
          {t('privacy.contents', { returnObjects: true }).map((item, index) => (
            <li key={index}>{item.substring(item.indexOf(' ') + 1)}</li>
          ))}
        </ol>
      </div>

      {/* Dynamic Sections from JSON */}
      <PolicySection title={t('privacy.section1.title')}>
        <h3 className="text-lg font-semibold text-gray-300 mb-2">{t('privacy.section1.subtitle_a')}</h3>
        <p>{t('privacy.section1.p1_a')}</p>
        <p className="text-sm text-gray-500">{t('privacy.section1.p2_a')}</p>
        <h3 className="text-lg font-semibold text-gray-300 mt-6 mb-2">{t('privacy.section1.subtitle_b')}</h3>
        <p>{t('privacy.section1.p1_b')}</p>
        <ul className="list-disc list-inside pl-4 space-y-1">
          {t('privacy.section1.list_b', { returnObjects: true }).map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </PolicySection>
      
      <PolicySection title={t('privacy.section2.title')}>
        <p>{t('privacy.section2.p1')}</p>
        <h3 className="text-lg font-semibold text-gray-300 mt-6 mb-2">{t('privacy.section2.subtitle_a')}</h3>
        <p>{t('privacy.section2.p1_a')}</p>
        <h3 className="text-lg font-semibold text-gray-300 mt-6 mb-2">{t('privacy.section2.subtitle_b')}</h3>
        <p>{t('privacy.section2.p1_b')}</p>
        <h3 className="text-lg font-semibold text-gray-300 mt-6 mb-2">{t('privacy.section2.subtitle_c')}</h3>
        <p>{t('privacy.section2.p1_c')}</p>
      </PolicySection>

      <PolicySection title={t('privacy.section3.title')}>
        <p>{t('privacy.section3.p1')}</p>
        <ul className="list-disc list-inside pl-4 space-y-1 mt-4">
            {t('privacy.section3.list', { returnObjects: true }).map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </PolicySection>
      
      <PolicySection title={t('privacy.section4.title')}>
        <p>{t('privacy.section4.p1')}</p>
      </PolicySection>

      <PolicySection title={t('privacy.section5.title')}>
        <p>{t('privacy.section5.p1')}</p>
        <h3 className="text-lg font-semibold text-gray-300 mt-6 mb-2">{t('privacy.section5.subtitle_a')}</h3>
        <ul className="list-disc list-inside pl-4 space-y-1">
            {t('privacy.section5.list_a', { returnObjects: true }).map((item, index) => <li key={index}>{item}</li>)}
        </ul>
        <h3 className="text-lg font-semibold text-gray-300 mt-6 mb-2">{t('privacy.section5.subtitle_b')}</h3>
        <p>{t('privacy.section5.p1_b')}</p>
        <ul className="list-disc list-inside pl-4 space-y-1 mt-4">
            {t('privacy.section5.list_b', { returnObjects: true }).map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </PolicySection>

      <PolicySection title={t('privacy.section6.title')}>
        <p>{t('privacy.section6.p1')}</p>
        <h3 className="text-lg font-semibold text-gray-300 mt-6 mb-2">{t('privacy.section6.subtitle_a')}</h3>
        <p>{t('privacy.section6.p1_a')}</p>
        <h3 className="text-lg font-semibold text-gray-300 mt-6 mb-2">{t('privacy.section6.subtitle_b')}</h3>
        <p>{t('privacy.section6.p1_b')}</p>
      </PolicySection>

      <PolicySection title={t('privacy.section7.title')}>
        <p>{t('privacy.section7.p1')}</p>
      </PolicySection>

      <PolicySection title={t('privacy.section8.title')}>
        <p>{t('privacy.section8.p1')}</p>
      </PolicySection>

      <PolicySection title={t('privacy.section9.title')}>
        <p>{t('privacy.section9.p1')}</p>
        <div className="mt-4 p-4 bg-gray-900/50 rounded-md">
            <h4 className="font-semibold text-gray-200">{t('privacy.section9.contact_title')}</h4>
            <p>{t('privacy.section9.contact_name')}</p>
            <p>{t('privacy.section9.contact_phone')}</p>
            <p dangerouslySetInnerHTML={{ __html: t('privacy.section9.contact_email') }} />
        </div>
        <p className="mt-4">{t('privacy.section9.p2')}</p>
        <ul className="list-disc list-inside pl-4 space-y-1 mt-4">
            {t('privacy.section9.org_list', { returnObjects: true }).map((item, index) => 
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
            )}
        </ul>
      </PolicySection>
    </div>
  );

  // Content for the "Refusal of Unauthorized Email Collection" tab
  const NoEmailContent = () => (
    <div className="mt-12 text-center">
      <MdOutlineDoNotDisturbAlt className="mx-auto text-blue-400 text-6xl mb-6" />
      <div className="text-left bg-gray-900/50 border border-gray-700 rounded-lg p-8">
        <p className="text-gray-300 leading-relaxed">{t('noemail.p1')}</p>
        <p className="text-gray-500 text-sm mt-6">{t('noemail.p2')}</p>
      </div>
    </div>
  );
  
  // --- Main Component Render ---
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold special-font text-gray-100 mb-8 pb-4">
            {activeTab === 'privacy' 
              ? t('footer.privacyPolicy') 
              : t('footer.noEmail')
            }
          </h1>

          {/* Tab Buttons */}
          <div className="flex space-x-2 border-b border-gray-700">
            <button
              onClick={() => setActiveTab('privacy')}
              className={clsx("py-3 px-6 text-sm md:text-base font-semibold transition-colors duration-200", {
                "border-b-2 border-blue-500 text-white": activeTab === 'privacy',
                "text-gray-500 hover:text-gray-300": activeTab !== 'privacy'
              })}
            >
              {t('footer.privacyPolicy')}
            </button>
            <button
              onClick={() => setActiveTab('noemail')}
              className={clsx("py-3 px-6 text-sm md:text-base font-semibold transition-colors duration-200", {
                "border-b-2 border-blue-500 text-white": activeTab === 'noemail',
                "text-gray-500 hover:text-gray-300": activeTab !== 'noemail'
              })}
            >
              {t('footer.noEmail')}
            </button>
          </div>

          {/* Conditionally Rendered Content */}
          {activeTab === 'privacy' ? <PrivacyContent /> : <NoEmailContent />}
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
