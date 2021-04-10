import React from 'react';

import { Link } from 'react-router-dom';

import { UserData } from './auth';

import DiscoverMap from './Map';

interface Props {
  user: UserData;
}

const Discover: React.FC<Props> = props => {
  return (
    <div className='Discover grid grid-cols-4'>
      <div className='text-center col-span-1'>
        <div className='w-fit-content mx-auto'>
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
        <div className='w-fit-content mx-auto mt-14'>
          <h2 className='text-6xl tracking-wide'>
            Artists
          </h2>
          <div className='nav-link-underline border-2 border-blue-700 mt-2'>
          </div>
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
            <Link to={`/galleries?name=${props.user.name}&uploading=1`}>Upload</Link>
          </button>
          <p>(Note: you must be signed in to upload a new piece.)</p>
          </div>
      </div>
      <div className='col-span-3'>
        <DiscoverMap startCoords={[
          props.user.latitude,
          props.user.longitude,
        ]}></DiscoverMap>
      </div>
    </div>
  );
};

export default Discover;