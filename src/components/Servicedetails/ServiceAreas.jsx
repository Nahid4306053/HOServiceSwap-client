import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 
"react-leaflet";
import "leaflet/dist/leaflet.css";
import map_alt from '/images/map_alt.gif'
import L from 'leaflet';
export default function ServiceAreas({ areas }) {
  if (!areas || areas.length === 0) {
    return null;
  }
  const customMarkerIcon = L.icon({
    iconUrl: map_alt,
    iconSize: [70, 70],  
    iconAnchor: [36, 78], 
    popupAnchor: [0, -60], 
  });

  const markerPositions = areas.map((area) => [
    area.coordinates.lat,
    area.coordinates.lng,
  ]);
  const bounds =
    markerPositions.length > 1
      ? markerPositions
      : [markerPositions[0], markerPositions[0]];

  return (
    <div>
      <h1 className="text-2xl font-Montserrat font-medium">
        This Service Available  at {areas.length } area in Bangladesh:
      </h1>
      <div className="p-5 bg-green-200 rounded-lg z-[2] mt-10">
        <MapContainer
          bounds={bounds}
          style={{ height: "550px", width: "100%" ,zIndex: 10}}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {areas.map((area) => (
            <Marker
              key={area.id}
              position={[area.coordinates.lat, area.coordinates.lng]}
              icon={customMarkerIcon}
            >
             <Popup>{area.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
