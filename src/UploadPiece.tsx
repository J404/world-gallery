import React, { useRef, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/storage';

import { apiRoute } from './auth';

interface Props {
  uid: string;
  closeDialogue: () => void;
}

const UploadPiece: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);

  const title = useRef<HTMLInputElement>((null as unknown) as HTMLInputElement);
  const descrip = useRef<HTMLInputElement>(
    (null as unknown) as HTMLInputElement
  );
  const fileInput = useRef<HTMLInputElement>((null as unknown) as HTMLInputElement);

  const uploadImage = async () => {
    const artTitle = ((title.current as unknown) as HTMLInputElement).value;
    const artDescrip = ((descrip.current as unknown) as HTMLInputElement).value;
    const files = ((fileInput.current as unknown) as HTMLInputElement).files;

    if (!artTitle || !artDescrip || !files || files.length === 0) {
      alert('Fill out all form fields.');
      return;
    }

    if (((files as unknown) as FileList).length !== 1) {
      alert('Submit one image file');
      return;
    }
    
    const file = ((files as unknown) as FileList)[0];

    const storageRef = firebase.storage().ref('galleries');
    const imageRef = storageRef.child(`${props.uid}/${file.name}`);
    
    const uploadTask = imageRef.put(file);

    setLoading(true);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        // Progress event
      },
      error => {
        // Error event
        alert('Error (8): Please try again later');
        console.error(error);
        setLoading(false);
      },
      () => {
        // Done event
        console.log('uploaded!');
        uploadTask.snapshot.ref.getDownloadURL().then(async downloadURL => {
          // Send additional data to endpoint
          const data = {
            description: artDescrip,
            title: artTitle,
            imageURL: downloadURL,
            fileName: file.name,
            uid: props.uid,
          };

          const response = await fetch(
            `${apiRoute}/addPiece`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              redirect: 'follow',
              body: JSON.stringify(data),
            }
          );
          const result = await response.json();

          console.log(result);

          props.closeDialogue();

          setLoading(false);
        });
      });
  };

  return (
    <div
      className={
        'UploadPiece absolute w-1/3 h-1/3 top-1/3 left-1/3 ' +
        'bg-gray-900 rounded-lg p-6 space-y-2 z-30 flex flex-col shadow-md'
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
      accept='image/*'
      ref={fileInput}></input>
      <button
        className='w-1/6 my-4 border-yellow-300 hover:bg-yellow-300 font-semibold'
        onClick={() => uploadImage()}
      >
        Upload
      </button>
      {loading ? (
        <div className='w-16 h-16 mx-auto my-8 rounded-full border-gray-900 animate-spin'
          style={{
            border: '8px solid rgb(31, 41, 55)',
            borderRight: '8px solid rgb(252, 211, 77)',
          }}>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default UploadPiece;
