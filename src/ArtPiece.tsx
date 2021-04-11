import React, { useEffect, useState } from 'react';

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
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(props.likes);

  useEffect(() => setLikes(props.likes), [props.likes]);

  const handleLike = async () => {
    let response;

    if (!liked) {
      response = await fetch(`${apiRoute}/likes/${props.id}`, { method: 'PUT' });
      setLikes(likes + 1);
      setLiked(true);
    } else {
      response = await fetch(`${apiRoute}/likes/${props.id}`, { method: 'DELETE' });
      setLikes(likes - 1);
      setLiked(false);
    }

    const result = await response.json();

    if (result.error) {
      alert('There was an error. Try again later');
      console.log('Error adding likes, Gallery.tsx line 72');
      setLikes(liked ? likes - 1 : likes + 1);
      setLiked(!liked);
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
            <p className='inline text-yellow-300 font-semibold'>{props.likes}</p>
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