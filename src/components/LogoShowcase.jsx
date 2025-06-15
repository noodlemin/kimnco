const logoIconsList = [
  {
    imgPath: "/img/logos/logo1.webp",
  },
  {
    imgPath: "/img/logos/logo2.svg",
  },
  {
    imgPath: "/img/logos/logo3.svg",
  },
  {
    imgPath: "/img/logos/logo4.svg",
  },
];

const LogoIcon = ({ icon }) => {
  return (
    <div className="flex-none flex items-center justify-center">
      <img 
        src={icon.imgPath} 
        alt={`${icon.name} logo`} 
        // Constrain logo height to prevent stretching and keep them uniform
        className="max-h-10 w-auto"
      />
    </div>
  );
};

const LogoShowcase = ({t}) => (
  <div className="mt-32 relative md:-mt-60">
    <div className="text-center">
      <h3 className="text-2xl md:text-4xl font-bold tracking-wider text-gray-400 uppercase mb-5">
        {t}
      </h3>
    </div>
    <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
    <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
    
    <div className="marquee h-24">
      <div className="marquee-box md:gap-12 gap-10">
        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}

        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}

        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}
        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}
        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}
        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}
        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}
        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}


      </div>
    </div>
  </div>
);

export default LogoShowcase;