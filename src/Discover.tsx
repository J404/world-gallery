import React from 'react';

import DiscoverMap from './Map';

const Discover: React.FC = () => {
  return (
    <div className='Discover grid grid-cols-4'>
      <div className='text-center col-span-1'>
        <div className='group w-2/5 mx-auto'>
          <h2 className='text-6xl tracking-wide'>
            Discover
            <div className='nav-link-underline border-2 border-blue-700 mt-2'
            ></div>
          </h2>
        </div>
        <div id='description'
        className='text-lg mt-5 w-3/4 mx-auto space-y-6'>
          <p>
            Are you looking for local or international art from 
            artists with little exposure or publicity?
          </p>
          <p>
            Our discovery map makes it easy to find art from creators
            near you, abroad, or any place in between.
          </p>
          <p>
            Artists are freed from traditional requirements of publishing, and
            you are free to browse at your leisure.
          </p>
          <p>
            Prices are affordable and sensical.
          </p>
          <p>
            Discover the next big thing!
          </p>
        </div>
      </div>
      <div className='col-span-3'>
        <DiscoverMap></DiscoverMap>
      </div>
    </div>
  );
};

export default Discover;