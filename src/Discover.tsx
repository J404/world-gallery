import React from 'react';

import DiscoverMap from './Map';

const Discover: React.FC = () => {
  return (
    <div className='Discover grid grid-cols-4'>
      <div className='text-center col-span-1'>
        <div className='group w-/13'>
          <h2 className='text-6xl'>Discover</h2>
          <div className='h-2 group-hover:bg-blue-700'></div>
        </div>
      </div>
      <div className='col-span-3'>
        <DiscoverMap></DiscoverMap>
      </div>
    </div>
  );
};
export default Discover;
