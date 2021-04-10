import React, { useEffect, useRef } from 'react';

import * as L from 'leaflet';

interface Props {
  startCoords: [number, number];
}

const DiscoverMap: React.FC<Props> = props => {
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
      
      // default coordinates
      let coords: [number, number] = [488.8566, 2.3522];

      if (props.startCoords[0] && props.startCoords[1]) coords = props.startCoords;

      discovermap.current = L.map('discover-map').setView(coords, 13);

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
    <div className='DiscoverMap w-11/12 mx-auto border-4 border-blue-700 rounded-md'>
      <div
        id='discover-map'
        className='w-full mx-auto z-0'
        style={{ height: '80vh' }}
      ></div>
    </div>
  );
};
export default DiscoverMap;
