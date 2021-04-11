import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { apiRoute } from './auth';

interface Props {
  imageURL: string;
  title: string;
  likes: number;
  fileName: string;
  description: string;
  id: string;
}

const ArtPiece: React.FC<Props> = props => {
  const location = useLocation();

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(props.likes);

  useEffect(() => setLikes(props.likes), [props.likes]);
  
  // Only actually change likes when the URL changes
  useEffect(() => {
    const incrementLikes = async () => {
      const response = await fetch(`${apiRoute}/likePiece`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        body: JSON.stringify({ id: props.id }),
      });
      const result = await response.json();

      if (result.error) {
        console.log('Error; like not properly added (ArtPiece.tsx line 32)');
      }
    }

    if (likes !== props.likes) {
      incrementLikes();
    }
  }, [location]);

  const handleLike = async () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  }

  return (
    <div className='ArtPiece mx-4 mb-8'>
      <div className='bg-gray-900 w-fit-content border-2 border-yellow-300 rounded'>
        <img src={props.imageURL} 
        alt={`${props.fileName}`}
        className='mx-auto'></img>
        <div className={'relative bottom-0 h-12 flex flex-row ' +
        'border-2 border-b-0 border-yellow-300 rounded flex flex-row'}>
          <div className='text-yellow-300 font-semibold my-auto mx-4'
          >{props.title}</div>
          <div className='pic-control-svg'
          onClick={() => handleLike()}>
            <svg className='fill-current text-yellow-300 inline mr-2'
            xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
            <p className='inline text-yellow-300 font-semibold'>{likes}</p>
          </div>
          <div className='pic-control-svg'>
            <svg className='fill-current text-yellow-300'
            xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtPiece;