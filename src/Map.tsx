import React, { useEffect, useRef } from 'react';

import * as L from 'leaflet';

const DiscoverMap: React.FC = () => {
  const didMount = useRef(false);

  async function getCoords() {
    let coords: [number, number] = [0, 0];
    const geo = navigator.geolocation;

    console.log(geo);

    if (geo) {
      const location = geo.getCurrentPosition(
        (position) => {
          coords = [position.coords.latitude, position.coords.longitude];
          console.log(coords);
          return coords;
        },
        () => {
          console.error('Could not fetch location of browser');
          return null;
        }
      );
    } else {
      return null;
    }
  }

  useEffect(() => {
    async function makeMap() {
      let coords: [number, number] = [51.505, -0.09];
      const browserCoords = await getCoords();

      if (browserCoords) coords = browserCoords;

      let discovermap: L.Map = ({} as unknown) as L.Map;

      console.log(coords);

      if (!didMount.current) {
        discovermap = L.map('discover-map').setView(coords, 13);
        didMount.current = true;
      } else discovermap = L.map('discover-map');

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
    }

    makeMap();
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
