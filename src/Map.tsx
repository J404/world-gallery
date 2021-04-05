import React, { useEffect, useRef } from 'react';

import * as L from 'leaflet';

const DiscoverMap: React.FC = () => {
  const didMount = useRef(false);

  useEffect(() => {
    let discovermap: L.Map = ({} as unknown) as L.Map;

    // Only recreate if the component isn't mounted - not on reload
    if (!didMount.current) {
      didMount.current = true;

      discovermap = L.map('discover-map').setView([51.505, -0.09], 13);

      L.tileLayer(
        `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`,
        {
          attribution: 'Mapbox and stuff',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: process.env.REACT_APP_API_KEY,
        }
      ).addTo(discovermap);

      // Go to broswer's location if they allow
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const coords: [number, number] = [lat, lon];

          discovermap.panTo(coords);
        });
      }
    }

    
  });

  return (
    <div className="DiscoverMap">
      <p>Map component!</p>
      <div
        id="discover-map"
        className="w-3/4 float-right mr-12"
        style={{ height: '80vh' }}
      ></div>
    </div>
  );
};
export default DiscoverMap;
