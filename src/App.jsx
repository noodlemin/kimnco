import { useEffect } from 'react';
import About from "./components/About";
import Features from "./components/Features";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import { useTranslation } from 'react-i18next';

import {  Routes, Route, useParams, useNavigate } from 'react-router-dom';

// This component syncs the URL language with the i18n instance
function LanguageSync() {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return null;
}

// This component handles the root URL and redirects to the default language
function RootRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
      navigate('/ko');
  }, [navigate]);
  return null;
}

function HomePage(){
  return(
    <>
      <Hero />
      <About />
      <Features />
    </>
  );
}


function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <LanguageSync />
      <NavBar />
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/:lang" element={<HomePage />} />
      </Routes>

    </main>
  );
}

export default App;