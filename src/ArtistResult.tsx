import React from 'react';

import { Link } from 'react-router-dom';

import { UserData } from './auth';

interface Props {
  artist: UserData;
}

const ArtistResult: React.FC<Props> = props => {
  return (
    <div className={'ArtistResult w-artist-result bg-gray-900 rounded p-4 '
    + 'text-lg border-2 border-gray-900 hover:border-yellow-300 transition '
    + 'ease-in-out'}>
      <Link to={`/galleries?name=${props.artist.name}`}>
        <div className='flex flex-row space-x-4'>
          <p className='font-semibold'>{ props.artist.name }</p>
          <span>|</span>
          <p>{ props.artist.description.length > 50 ?
            props.artist.description.substring(0, 50) + '...'
            :
            props.artist.description}
          </p>
        </div>
      </Link>
    </div>
  );
}
export default ArtistResult;