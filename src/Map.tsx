import React, { useEffect, useRef } from 'react';

import * as L from 'leaflet';

const DiscoverMap: React.FC = () => {
  const didMount = useRef(false);

  useEffect(() => { 
    let discovermap: L.Map = {} as unknown as L.Map;

    if (!didMount.current) {  
      discovermap = L.map('discover-map').setView(
        [51.505, -0.09],
        13
      );

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
  });

  return (
    <div className="DiscoverMap">
      <p>Map component!</p>
      <div id="discover-map" className='w-3/4 float-right mr-12' style={{height: '80vh',}}
      ></div>
    </div>
  );
};
export default DiscoverMap;
