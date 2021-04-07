import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from 'react-router-dom';

import ArtPiece from './ArtPiece';

const Gallery: React.FC = () => {
  const GalleryView: React.FC = () => {
    const { artist } = useParams<{ artist: string }>();

    return (
      <div className='GalleryView grid grid-cols-4'>
        <div className='text-center w-fit-content mx-auto'>
          <h2 className='text-4xl w-fit-content mx-auto'>
            {artist}'s Gallery
          </h2>
          <div className='border-2 border-yellow-300 rounded'
          ></div>
        </div>
        <div className='flex flex-row col-span-3'>
          <ArtPiece
            imageurl='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hausziege_04.jpg/1200px-Hausziege_04.jpg'
            artist='John Doe'
            title='Goat'
          ></ArtPiece>
        </div>
      </div>
    );
  };

  return (
    <div className='Gallery'>
      <Router>
        <Switch>
          <Route path='/galleries/:artist'
          children={
            <GalleryView></GalleryView>
          }></Route>

          <Route path='/galleries'>
            <p>helakedf</p>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Gallery;
