import React, { useEffect, useRef } from 'react';

import * as L from 'leaflet';

const DiscoverMap: React.FC = () => {
  let discovermap = useRef<L.Map>(({} as unknown) as L.Map);
  const didMount = useRef(false);

  const addMarker = (coords: [number, number], title: string, link: string) => {
    const marker = L.marker(coords).addTo(discovermap.current);
    marker.bindPopup(`
    <b>${title}</b>
    <br>
    <a href="${link}">Visit</a>
    `);
  };

  useEffect(() => {
    // Only recreate if the component isn't mounted - not on reload
    if (!didMount.current) {
      didMount.current = true;

      discovermap.current = L.map('discover-map').setView([51.505, -0.09], 13);

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
      ).addTo(discovermap.current);

      // Go to broswer's location if they allow
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const coords: [number, number] = [lat, lon];

          discovermap.current.panTo(coords);

          addMarker(coords, 'Example', 'http://localhost:3000/galleries');
        });
      }
    }
  });

  return (
    <div className='DiscoverMap'>
      <div
        id='discover-map'
        className='w-5/6 mx-auto'
        style={{ height: '80vh' }}
      ></div>
    </div>
  );
};
export default DiscoverMap;
