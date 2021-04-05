import React from 'react';

import ArtPiece from './ArtPiece';

const Gallery: React.FC = () => {
  return (
    <div className='Gallery'>
      gallery
      <ArtPiece imageurl='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hausziege_04.jpg/1200px-Hausziege_04.jpg'
      artist='John Doe'></ArtPiece>
    </div>
  );
}

export default Gallery;