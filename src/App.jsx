import { useEffect, useState } from 'react'; // Import useState
import About from "./components/About";
import Features from "./components/Features";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';


import { useTranslation } from 'react-i18next';

import { Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';

// 1. RootRedirect (no changes)
function RootRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/ko', { replace: true });
    }
  }, [navigate, location]);

  return null;
}

// 2. LanguageValidatorAndContent:
//    Now includes an `isLanguageReady` state to explicitly manage rendering.
function LanguageValidatorAndContent() {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // State to track if the language has been successfully synced and is ready to render content
  const [isLanguageReady, setIsLanguageReady] = useState(false);

  const supportedLanguages = ['ko', 'en'];

  useEffect(() => {
    setIsLanguageReady(false); // Reset readiness when lang param or i18n changes

    if (lang && supportedLanguages.includes(lang)) {
      if (lang !== i18n.language) {
        // Language needs to be changed
        i18n.changeLanguage(lang).then(() => {
          // IMPORTANT: Set readiness ONLY after i18n has confirmed the language change
          setIsLanguageReady(true);
        });
      } else {
        // Language in URL already matches i18n, so it's ready
        setIsLanguageReady(true);
      }
    } else {
      // Invalid or missing language in URL
      if (location.pathname !== '/ko') { // Prevent redirect loop if already at /ko
        console.warn(`Invalid or missing language in URL (${lang}). Redirecting to /ko.`);
        navigate('/ko', { replace: true });
      }
      // If we are about to redirect, we are not ready to render content here
    }

    // Add a cleanup function to handle unmounting or changes
    return () => {
      // Any cleanup needed if component unmounts quickly or language changes again
    };

  }, [lang, i18n, navigate, location.pathname, supportedLanguages]); // Re-run if these change

  // Only render HomePage if the language has been successfully set AND matches the URL
  // This prevents rendering with an incorrect or pending language.
  if (!isLanguageReady || i18n.language !== lang) {
    return null; // Don't render content until the language is truly ready
  }

  return (
    <>
      <NavBar lang={lang} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="portfolio" element={<Portfolio />} />
        {/* You can add more routes here, e.g., <Route path="contact" element={<ContactPage />} /> */}
      </Routes>
    </>
  );
}

// 3. HomePage component (no changes)
function HomePage(){
  return(
    <>
      <Hero />
      <About />
      <Features />
      <Footer />
    </>
  );
}

// 4. Main App component (no changes from last working version)
function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/:lang/*" element={<LanguageValidatorAndContent />} />
      </Routes>
    </main>
  );
}

export default App;