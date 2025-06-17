import { useState } from "react";
import {
  Map,
  MapMarker,
  MapTypeId,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";

const properties = [
  { id: 1, type: "living", lat: 37.5665, lng: 126.978 },
  { id: 2, type: "commercial", lat: 37.565, lng: 126.977 },
  { id: 3, type: "living", lat: 37.567, lng: 126.975 },
  { id: 4, type: "commercial", lat: 37.564, lng: 126.976 },
];

const KakaoMap = () => {
  const [filters, setFilters] = useState(["living", "commercial"]);

  const toggleFilter = (type) => {
    setFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filteredMarkers = properties.filter((p) => filters.includes(p.type));

  const getMarkerColor = (type) =>
    type === "living" ? "red" : type === "commercial" ? "blue" : "gray";

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => toggleFilter("living")}
          className={`px-4 py-2 rounded ${
            filters.includes("living") ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Living
        </button>
        <button
          onClick={() => toggleFilter("commercial")}
          className={`px-4 py-2 rounded ${
            filters.includes("commercial") ? "bg-red-600 text-white" : "bg-gray-200"
          }`}
        >
          Commercial
        </button>
      </div>

      {/* Map with Markers */}
      <Map
        center={{ lat: 37.5665, lng: 126.978 }}
        style={{ width: "100%", height: "500px", borderRadius: "8px" }}
        level={3}
      >
        {filteredMarkers.map((property) => (
          <MapMarker
            key={property.id}
            position={{ lat: property.lat, lng: property.lng }}
            image={{
              src:
                property.type === "living"
                  ? "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png"
                  : "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
              size: {
                width: 24,
                height: 35,
              },
            }}
          />
        ))}
      </Map>
    </div>
  );
};

export default KakaoMap;
