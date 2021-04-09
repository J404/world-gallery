import React from 'react';

import { Link } from 'react-router-dom';

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
        <div className='w-1/3 mx-auto mt-14'>
          <h2 className='text-6xl tracking-wide'>
            Artists
            <div className='nav-link-underline border-2 border-blue-700 mt-2'
            ></div>
          </h2>
        </div>
        <div
        className='text-lg mt-5 w-3/4 mx-auto space-y-6'>
          <p>
            Can't find a venue for your work?
          </p>
          <p>
            Tired of hours of effort with little to no consideration 
            or appreciation?
          </p>
          <p>
            Consider uploading your work to our discovery map!
          </p>
          <button 
          className='border-blue-700 hover:bg-blue-700 font-semibold'>
            <Link to='/galleries?name=catest1&uploading=1'>Upload</Link>
          </button>
          </div>
      </div>
      <div className='col-span-3'>
        <DiscoverMap></DiscoverMap>
      </div>
    </div>
  );
};

export default Discover;