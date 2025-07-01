// src/data/properties.js

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
  // Your property data...
  { id: 1, type: "living", title: "e편한세상 시티 부평역", lat: 37.490, lng: 126.719 },
  { id: 2, type: "living", title: "천안행정타운 센트럴 두산위브", lat: 36.779, lng: 127.153 },
  { id: 3, type: "living", title: "용화마을 신도브래뉴 아파트", lat: 36.7726, lng: 127.01252 },
  { id: 4, type: "living", title: "청당 벽산 블루밍", lat: 36.779, lng: 127.156 },
  { id: 5, type: "living", title: "일산 가좌 벽산 블루밍", lat: 37.6896, lng: 126.72289 },
  { id: 6, type: "living", title: "일산 킨텍스 자이 아파트", lat: 37.670, lng: 126.7287 },
  { id: 7, type: "living", title: "신반포 청구 아파트", lat: 37.5142, lng: 127.00845 },
  { id: 8, type: "resorts", title: "고성군 뽀로로 테마파크 호텔 (진행중)", lat: 38.3336, lng: 128.5248 },
  { id: 9, type: "commercial", title: "광교 신대역 킴앤코 시티하임 I", lat: 37.2981441104908, lng: 127.069888507164 },
  { id: 10, type: "commercial", title: "광교 경기대역 킴앤코 시티하임 II", lat: 37.2999363591715, lng: 127.044308069371 },
  { id: 11, type: "commercial", title: "광교 K-tower", lat: 37.2992306061982, lng: 127.042759297239 },
].map(property => {
  // Increment the counter for the current property type
  imageCounters[property.type]++;
  
  // Assume images are in the '/img/portfolio/' directory with a .png extension
  const imageName = `${property.type}-${imageCounters[property.type]}.png`;
  
  // ✅ **Generate the stable URL here**
  // We use encodeURIComponent to handle special characters like spaces or parentheses in the title.
  const encodedTitle = encodeURIComponent(property.title);
  const stableUrl = `https://map.kakao.com/link/map/${encodedTitle},${property.lat},${property.lng}`;
  
  return {
    ...property,
    url: stableUrl, // Assign the newly generated stable URL
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