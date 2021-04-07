import React, { useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useLocation,
  useHistory,
} from 'react-router-dom';

import ArtPiece from './ArtPiece';

const Gallery: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);
  const artist = query.get('artist');

  return (
    <div className='Gallery'>
      {!!!artist ? (
        <div>
          <p>no artist name UwU</p>
        </div>
      ) : (
        <div>
          <div className='GalleryView grid grid-cols-4'>
            <div className='text-center'>
              <div className='w-fit-content mx-auto'>
                <h2 className='text-4xl w-fit-content mx-auto'>
                  {artist}'s Gallery
                </h2>
                <div className='border-2 border-yellow-300 rounded'></div>
              </div>
              <div>
                <p className='text-2xl my-3'>"Example placeholder quote."</p>
                <p className='text-lg my-4'>Example of a description</p>
              </div>
            </div>

            <div className='flex flex-row col-span-3'>
              <ArtPiece
                imageurl='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hausziege_04.jpg/1200px-Hausziege_04.jpg'
                artist='John Doe'
                title='Goat'
              ></ArtPiece>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
