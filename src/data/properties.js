// This function can be defined once and reused.
const createMarkerIcon = (color, initial) => {
  const svg = `
    <svg width="42" height="52" viewBox="0 0 42 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 0C11.625 0 4 7.625 4 17C4 29.5 21 52 21 52C21 52 38 29.5 38 17C38 7.625 30.375 0 21 0Z" fill="${color}" fill-opacity="0.9" stroke="white" stroke-width="1.5"/>
        <text x="21" y="22" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle" dy=".3em">${initial}</text>
    </svg>
  `;
  // btoa() is a browser function to create base64 encoded strings
  return `data:image/svg+xml;base64,${window.btoa(svg)}`;
};

// A counter to assign unique image numbers for each property type
const imageCounters = {
  living: 0,
  commercial: 0,
  resorts: 0,
};

// All data related to properties is now in one place.
export const properties = [
  { id: 1, type: "living", title: "Luxury Residence Gangnam", lat: 37.501, lng: 127.040, url: "#" },
  { id: 2, type: "commercial", title: "Starfield COEX Mall", lat: 37.512, lng: 127.059, url: "#" },
  { id: 3, type: "living", title: "Seoul Forest Apartments", lat: 37.545, lng: 127.042, url: "#" },
  { id: 4, type: "commercial", title: "Gwanghwamun Business Tower", lat: 37.575, lng: 126.978, url: "#" },
  { id: 5, type: "resorts", title: "Grand Hyatt Seoul", lat: 37.540, lng: 126.999, url: "#" },
  { id: 6, type: "living", title: "Mapo Riverside Wellbeing", lat: 37.540, lng: 126.946, url: "#" },
  { id: 7, type: "resorts", title: "Paradise City", lat: 37.437, lng: 126.449, url: "#" },
].map(property => {
  // Increment the counter for the current property type
  imageCounters[property.type]++;
  // Assume images are in the '/img/portfolio/' directory with a .png extension
  const imageName = `${property.type}-${imageCounters[property.type]}.png`;
  
  return {
    ...property,
    image: `/img/portfolio/${imageName}` // Add the generated image path
  };
});


export const markerInfo = {
  living: { color: '#EF4444', initial: 'L' },
  commercial: { color: '#F59E0B', initial: 'C' },
  resorts: { color: '#3B82F6', initial: 'R' },
};

export const markerSources = {
  living: createMarkerIcon(markerInfo.living.color, markerInfo.living.initial),
  commercial: createMarkerIcon(markerInfo.commercial.color, markerInfo.commercial.initial),
  resorts: createMarkerIcon(markerInfo.resorts.color, markerInfo.resorts.initial),
};
