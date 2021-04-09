import React, { useRef } from 'react';

import firebase from 'firebase/app';

import 'firebase/storage';

interface Props {
  uid: string;
}

const UploadPiece: React.FC<Props> = (props) => {
  const title = useRef<HTMLInputElement>((null as unknown) as HTMLInputElement);
  const descrip = useRef<HTMLInputElement>(
    (null as unknown) as HTMLInputElement
  );
  const fileInput = useRef<HTMLInputElement>((null as unknown) as HTMLInputElement);

  const uploadImage = async () => {
    const artTitle = ((title.current as unknown) as HTMLInputElement).value;
    const artDescrip = ((descrip.current as unknown) as HTMLInputElement).value;
    const files = ((fileInput.current as unknown) as HTMLInputElement).files;

    if (((files as unknown) as FileList).length !== 1) {
      alert('Submit one image file');
      return;
    }
    
    const file = ((files as unknown) as FileList)[0];

    const storageRef = firebase.storage().ref('galleries');
    const imageRef = storageRef.child(`${props.uid}/${file.name}`);
    
    imageRef.put(file).then(snapshot => {
      console.log('uploaded!');
    });
  };

  return (
    <div
      className={
        'UploadPiece absolute w-1/3 h-1/3 top-1/3 left-1/3 ' +
        'bg-gray-900 rounded-lg p-6 space-y-2 z-20 flex flex-col'
      }
    >
      <h2 className='text-2xl'>Upload a New Piece</h2>
      <input type='text' placeholder='Title'
      ref={title}></input>
      <input type='text' placeholder='Description'
      ref={descrip}></input>
      <br></br>
      <p>Choose image file:</p>
      <input className='text-white' type='file'
      ref={fileInput}></input>
      <button
        className='w-1/6 my-4 border-yellow-300 hover:bg-yellow-300 font-semibold'
        onClick={() => uploadImage()}
      >
        Upload
      </button>
    </div>
  );
};
export default UploadPiece;
