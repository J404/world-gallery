import React, { useEffect, useState } from 'react';

import {
  useLocation,
} from 'react-router-dom';

import { apiRoute, UserData } from './auth';

import GallerySearch from './GallerySearch';
import ArtPiece from './ArtPiece';
import UploadPiece from './UploadPiece';

interface Props {
  user: UserData;
}

interface ArtData {
  description: string;
  fileName: string;
  imageURL: string;
  likes: number;
  title: string;
}

const Gallery: React.FC<Props> = (props) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const name = query.get('name');

  const [uploading, setUploading] = useState(!!query.get('uploading'));
  const [loading, setLoading] = useState(false);
  const [artist, setArtist] = useState({} as unknown as UserData);
  const [pieces, setPieces] = useState<ArtData[]>([]);

  const loadPieces = async (artist: UserData) => {
    const response = await fetch(`${apiRoute}/getAllPieces?user=${artist.uid}`);
    const result = await response.json();
    
    console.log(result);

    if (result.error) {
      alert('Error (18): Try again later');
      return;
    }

    const pieces = result.data.pieces;
    setPieces(pieces);
  }

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
      console.log(artistData);
      setArtist(artistData);

      await loadPieces(artistData);
      setLoading(false);
    }

    if (name) {
       setLoading(true);
       loadUserData();
    }
  }, [location]);

  return (
    <div className='Gallery'>
      {!!!name ? (
        <div>
          <GallerySearch></GallerySearch>
        </div>
      ) : (
        <div>
          <div className='GalleryView grid grid-cols-4'>
            <div className='text-center col-span-1'>
              <div className='w-fit-content mx-auto'>
                <h2 className='text-4xl w-fit-content mx-auto'>
                  {name}'s Gallery
                </h2>
                <div className='border-2 border-yellow-300 rounded'></div>
                {loading ? (
                <div className='w-16 h-16 mx-auto my-8 rounded-full border-gray-900 animate-spin'
                  style={{
                    border: '8px solid rgb(17, 24, 39)',
                    borderRight: '8px solid rgb(252, 211, 77)',
                  }}>
                </div>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <p className='text-lg my-4'>{artist.description}</p>
              </div>
              {(props.user.uid && !loading && props.user.uid === artist.uid) ? (
                <div>
                  <p>Want to add a new piece to your collection?</p>
                  <button className='my-2 p-1 border-yellow-300 hover:bg-yellow-300'
                  onClick={() => setUploading(true)}>
                    Upload
                  </button>
                </div>
              ) : (
                <></>
              )}
              
            </div>

            <div className='col-span-3 grid grid-cols-4 w-auto'>
              {
                pieces.map((piece, i) =>
                  <ArtPiece
                  imageURL={piece.imageURL}
                  fileName={piece.fileName}
                  description={piece.description}
                  likes={piece.likes}
                  title={piece.title}
                  key={i}></ArtPiece>
                )
              }
            </div>
          </div>
          {(uploading && props.user.uid && props.user.uid === artist.uid) ? (
            <div>
              <div className='z-20 bg-black opacity-20 w-full h-full absolute top-0 left-0'
              onClick={() => setUploading(false)}>
              </div>
              <UploadPiece uid={props.user.uid}
              closeDialogue={() => setUploading(false)}></UploadPiece>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default Gallery;
