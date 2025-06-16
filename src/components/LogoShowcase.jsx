const logoIconsList = [
  {
    imgPath: "/img/logos/logo1.webp",
    name: "Logo 1"
  },
  {
    imgPath: "/img/logos/logo2.svg",
    name: "Logo 2"
  },
  {
    imgPath: "/img/logos/logo3.svg",
    name: "Logo 3"
  },
  {
    imgPath: "/img/logos/logo4.svg",
    name: "Logo 4"
  },
];

const LogoIcon = ({ icon }) => {
  return (
    // Apply marquee-item here if you need specific styling on each item
    <div className="flex-none flex items-center justify-center marquee-item">
      <img
        src={icon.imgPath}
        alt={`${icon.name} logo`}
        className="max-h-10 w-auto"
      />
    </div>
  );
};

const LogoShowcase = ({ t }) => (
  // This outermost div defines the 'bento' width for the entire section.
  // Make sure 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' matches your overall bento/container styling.
  <div className="mt-32 relative md:-mt-60 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <h3 className="text-2xl md:text-4xl font-bold tracking-wider text-gray-400 uppercase mb-5">
        {t}
      </h3>
    </div>

    {/* This div acts as the viewport for the marquee. */}
    {/* It needs overflow-hidden to clip the scrolling content and relative for absolute gradients. */}
    <div className="relative overflow-hidden">
      {/* Gradients are absolute to this overflow-hidden container */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />

      {/* The marquee itself */}
      <div className="marquee h-24"> {/* Height defined here, or in CSS */}
        {/* The marquee-box contains all the logos for scrolling */}
        {/* Removed md:gap-12 gap-10 from here, as 'gap' is now handled by CSS on marquee-box */}
        <div className="marquee-box">
          {/* Duplicate content enough times to ensure seamless looping */}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`1-${index}`} icon={icon} />
          ))}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`2-${index}`} icon={icon} />
          ))}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`3-${index}`} icon={icon} />
          ))}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`4-${index}`} icon={icon} />
          ))}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`5-${index}`} icon={icon} />
          ))}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`6-${index}`} icon={icon} />
          ))}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`7-${index}`} icon={icon} />
          ))}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`8-${index}`} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default LogoShowcase;