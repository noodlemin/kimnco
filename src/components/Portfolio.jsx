import React, { useState, useEffect } from "react";
import {
  Map,
  MapMarker,
} from "react-kakao-maps-sdk";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { MdClose } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";

// We assume this data is in a separate file like `src/data/properties.js`
import { properties, markerSources } from "../data/properties";

// A separate component for the info window for cleaner code
const InfoWindow = ({ property, onClose }) => {
  const { t } = useTranslation();
  if (!property) return null;

  return (
    // This div is corrected. It no longer stretches to the right edge on mobile.
    // It now has a calculated width with a max-width to prevent overlap.
    <div className="absolute top-4 left-4 w-[calc(100%-2rem)] max-w-sm lg:left-4 lg:w-80 z-20 animate-fade-in">
      <div className="relative flex flex-col bg-gray-900 text-white rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-200 bg-black/40 rounded-full p-1 hover:text-white hover:bg-black/60 z-20 transition-colors"
          aria-label="Close"
        >
          <MdClose />
        </button>
        <img src={property.image} alt={property.title} className="w-full h-40 object-cover" />
        <div className="p-4 flex flex-col flex-grow min-w-0">
            <h3 className="font-bold text-lg mb-4 text-gray-100">{property.title}</h3>
            <a 
              href={property.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors"
            >
              {t('portfolio.viewDetails', 'View Details')}
              <FiExternalLink className="ml-2" />
            </a>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  
  const initialType = searchParams.get("type");
  const [filters, setFilters] = useState(() => 
    initialType ? [initialType] : ["living", "commercial", "resorts"]
  );
  
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [map, setMap] = useState(null);
  const [overviewBounds, setOverviewBounds] = useState(null);

  const toggleFilter = (type) => {
    setSelectedProperty(null);
    if (type === 'all') {
      setFilters(filters.length === 3 ? [] : ["living", "commercial", "resorts"]);
      return;
    }
    setFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
    if (map) {
      const newCenter = new window.kakao.maps.LatLng(property.lat, property.lng);
      map.setLevel(5); 
      map.panTo(newCenter);
      if (window.innerWidth < 1024) {
        map.panBy(0, -150);
      }
    }
  };

  const handleCloseOverlay = () => {
    setSelectedProperty(null);
    if (map && overviewBounds) {
      // We use setBounds with padding here as well to ensure a consistent view
      map.setBounds(overviewBounds, 100, 100, 100, 100);
    }
  };

  const filteredMarkers = properties.filter((p) => filters.includes(p.type));
  
  // This effect now correctly handles both the initial load and subsequent filter changes.
  useEffect(() => {
    if (!map) return;
    
    // Always close any open detail view when the filters change
    setSelectedProperty(null);

    if (filteredMarkers.length === 0) {
        // If no filters are active, do nothing, just keep the last view.
        return;
    }

    const bounds = new window.kakao.maps.LatLngBounds();
    filteredMarkers.forEach(marker => {
      bounds.extend(new window.kakao.maps.LatLng(marker.lat, marker.lng));
    });
    
    map.setBounds(bounds, 100, 100, 100, 100);
    // Always save the calculated bounds so we can return to this view.
    setOverviewBounds(bounds);

  }, [filters, map]);

  const filterButtons = [
    { id: 'all', label: t("portfolio.all", "All"), activeClass: "bg-gradient-to-r from-purple-600 to-blue-600" },
    { id: 'living', label: t("portfolio.living", "Living"), activeClass: "bg-red-600" },
    { id: 'commercial', label: t("portfolio.commercial", "Commercial"), activeClass: "bg-amber-600" },
    { id: 'resorts', label: t("portfolio.resorts", "Resorts"), activeClass: "bg-blue-600" },
  ];

  return (
    // The main section is now a flex container to center its content.
    <section id="portfolio" className="flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 bg-black text-gray-200 min-h-screen pt-24 md:pt-24">
      {/* The container now has a max-width and full width to work within the flex parent */}
      <div className="container w-full max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold special-font text-gray-100">
                {t('portfolio.title', 'Our Portfolio')}
            </h1>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {filterButtons.map(btn => {
            const isActive = (btn.id === 'all' && filters.length === 3) || filters.includes(btn.id);
            return (
              <button
                key={btn.id}
                onClick={() => toggleFilter(btn.id)}
                className={clsx(
                  "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105",
                  isActive ? `${btn.activeClass} text-white shadow-lg` : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                )}
              >
                {btn.label}
              </button>
            )
          })}
        </div>

        <div className="relative rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
          <Map
            center={{ lat: 37.2, lng: 127.0 }}
            style={{ width: "100%", height: "65vh" }}
            level={12}
            className="bg-gray-900"
            onCreate={setMap}
          >
            {filteredMarkers.map((property) => (
              <MapMarker
                key={property.id}
                position={{ lat: property.lat, lng: property.lng }}
                onClick={() => handleMarkerClick(property)}
                image={{
                  src: markerSources[property.type],
                  size: { width: 42, height: 52 },
                }}
                title={property.title}
              />
            ))}
          </Map>
          
          <InfoWindow property={selectedProperty} onClose={handleCloseOverlay} />
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
