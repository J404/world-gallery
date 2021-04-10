import React from 'react';

interface Props {
  imageURL: string;
  title: string;
  likes: number;
  fileName: string;
  description: string;
}

const ArtPiece: React.FC<Props> = props => {
  return (
    <div className='ArtPiece w-96 h-96 bg-gray-900 border-2 border-yellow-300 rounded'>
      <img src={props.imageURL} 
      alt={`${props.fileName} painting`}></img>
      <div className={'relative bottom-0 h-12 flex flex-row ' +
      'border-2 border-t-0 border-yellow-300 rounded flex flex-row'}>
        <div className='text-yellow-300 font-semibold my-auto mx-4'
        >{props.title}</div>
        <div className='pic-control-svg'>
          <svg className='fill-current text-yellow-300'
          xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
        </div>
        <div className='pic-control-svg'>
          <svg className='fill-current text-yellow-300'
          xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
        </div>
        <div className='pic-control-svg'>
          <svg className='fill-current  text-yellow-300'
          xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M11 17h2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1h-3v-1h4V8h-2V7h-2v1h-1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3v1H9v2h2v1zm9-13H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V6h16v12z"/></svg>
        </div>
      </div>
    </div>
  );
}

export default ArtPiece;