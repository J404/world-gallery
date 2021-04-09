import React, { useEffect, useState } from 'react';

import {
  useLocation,
} from 'react-router-dom';

import { apiRoute, UserData } from './auth';

import ArtPiece from './ArtPiece';
import UploadPiece from './UploadPiece';

interface Props {
  user: UserData;
}

const Gallery: React.FC<Props> = (props) => {
  const query = new URLSearchParams(useLocation().search);
  const name = query.get('name');
  const uploading = !!query.get('uploading');

  const [loading, setLoading] = useState(false);
  const [artist, setArtist] = useState({} as unknown as UserData);

  useEffect(() => {
    // If we are viewing a gallery, load in that user's data and images
    const loadUserData = async () => {
      const response = await fetch(`${apiRoute}/search?name=${name}`);
      const result = await response.json();

      console.log(props.user);
      console.log(artist);
      if (result.error) {
        alert('Error (8): Try again later.');
        return;
      }

      const artistData: UserData = result.data[0];
      setArtist(artistData);
    }

    if (name) {
       setLoading(true);
       loadUserData();
       setLoading(false);
    }
  }, []);

  return (
    <div className='Gallery'>
      {!!!name ? (
        <div>
          <p>TODO: Search function to find new artists</p>
        </div>
      ) : (
        <div>
          <div className='GalleryView grid grid-cols-4'>
            <div className='text-center'>
              <div className='w-fit-content mx-auto'>
                <h2 className='text-4xl w-fit-content mx-auto'>
                  {name}'s Gallery
                </h2>
                <div className='border-2 border-yellow-300 rounded'></div>
              </div>
              <div>
                <p className='text-lg my-4'>{artist.description}</p>
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
          {(uploading && props.user.id /* props.user.id === artist.id && */) ? (
            <UploadPiece uid={props.user.id}></UploadPiece>
          ) : (
            <span></span>
          )}
        </div>
      )}
    </div>
  );
};

export default Gallery;
