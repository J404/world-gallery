import React from 'react';

const Map: React.FC = () => {
  const discovermap = L.map('discover-map').setView([51.505, -0.09], 13);
  L.tileLayer(
    `https://api.mapbox.com/styles/v1/J404/tiles/1/51.505/-0.09?access_token=${process.env.API_KEY}`
  );

  return (
    <div className='Map'>
      <div id="discover-map" style={{height: '180px'}}></div>
    </div>
  );
}
export default Map;