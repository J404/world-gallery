import React from 'react';

import DiscoverMap from './Map';

const Discover: React.FC = () => {
  return (
    <div className='Discover grid grid-cols-4'>
      <div className='text-center col-span-1'>
        <div className='group w-2/5 mx-auto'>
          <h2 className='text-6xl tracking-wide'>
            Discover
            <div className='nav-link-underline border-2 group-hover:border-blue-700'></div>
          </h2>
        </div>
      </div>
      <div className='col-span-3'>
        <DiscoverMap></DiscoverMap>
      </div>
    </div>
  );
};
export default Discover;
