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
  { id: 1, type: "living", title: "e편한세상 시티 부평역", lat: 37.490, lng: 126.719, url: "https://map.kakao.com/?map_type=TYPE_MAP&itemId=1873580302&urlLevel=1&urlX=437894&urlY=1108633" },
  { id: 2, type: "living", title: "천안행정타운 센트럴 두산위브", lat: 36.779, lng: 127.153, url: "https://map.kakao.com/?map_type=TYPE_MAP&itemId=412129454&urlLevel=5&urlX=535215&urlY=912090" },
  { id: 3, type: "living", title: "용화마을 신도브래뉴 아파트", lat: 36.7726, lng: 127.01252, url: "https://map.kakao.com/?map_type=TYPE_MAP&itemId=11113991&urlLevel=3&urlX=502831&urlY=909448" },
  { id: 4, type: "living", title: "청당 벽산 블루밍", lat: 36.779, lng: 127.156, url: "https://map.kakao.com/?map_type=TYPE_MAP&itemId=11231379&urlLevel=4&urlX=535002&urlY=911647" },
  { id: 5, type: "living", title: "일산 가좌 벽산 블루밍", lat: 37.6896, lng: 126.72289, url: "https://map.kakao.com/?map_type=TYPE_MAP&itemId=11072400&urlLevel=2&urlX=438856&urlY=1163951" },
  { id: 6, type: "living", title: "일산 킨텍스 자이 아파트", lat: 37.670, lng: 126.7287, url: "https://map.kakao.com/?map_type=TYPE_MAP&itemId=11540449&urlLevel=1&urlX=440226&urlY=1158466" },
  { id: 7, type: "living", title: "신반포 청구 아파트", lat: 37.5142, lng: 127.00845, url: "https://map.kakao.com/?map_type=TYPE_MAP&itemId=11159136&urlLevel=2&urlX=501866&urlY=1115183" },
  { id: 8, type: "resorts", title: "고성군 뽀로로 테마파크 호텔 (진행중)", lat: 38.3336, lng: 128.5248, url: "https://map.kakao.com/?map_type=TYPE_MAP&q=%EA%B0%95%EC%9B%90%ED%8A%B9%EB%B3%84%EC%9E%90%EC%B9%98%EB%8F%84+%EA%B3%A0%EC%84%B1%EA%B5%B0+%EC%A3%BD%EC%99%95%EB%A9%B4+%EC%98%A4%ED%98%B8%EB%A6%AC+245-23&urlLevel=3&urlX=833416&urlY=1345340"},
  { id: 9, type: "commercial", title: "광교 신대역 킴앤코 시티하임 I", lat: 37.2981441104908, lng: 127.069888507164, url: "https://map.kakao.com/?map_type=TYPE_MAP&itemId=18995819&urlLevel=1&urlX=515491&urlY=1055256"},
  { id: 10, type: "commercial", title: "광교 경기대역 킴앤코 시티하임 II", lat: 37.2999363591715, lng: 127.044308069371, url: "https://map.kakao.com/?map_type=TYPE_MAP&itemId=26589235&urlLevel=1&urlX=509863&urlY=1055760"},
  { id: 11, type: "commercial", title: "광교 K-tower", lat: 37.2992306061982, lng: 127.042759297239, url: "https://map.kakao.com/?map_type=TYPE_MAP&map_attribute=ROADVIEW&q=%EA%B2%BD%EA%B8%B0+%EC%88%98%EC%9B%90%EC%8B%9C+%EC%98%81%ED%86%B5%EA%B5%AC+%EB%8C%80%ED%95%993%EB%A1%9C+1&urlLevel=2&urlX=509564&urlY=1055558"},
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
