import React, { useRef, useState } from 'react';

import { apiRoute, UserData } from './auth';

import ArtistResult from './ArtistResult';

const GallerySearch: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<UserData[]>([]);

  const search = useRef<HTMLInputElement>(null as unknown as HTMLInputElement);

  const searchUsers = async () => {
    const searchTerm = (search.current as unknown as HTMLInputElement).value;
    
    setResults([]);
    setLoading(true);
    
    const response = await fetch(`${apiRoute}/search?name=${searchTerm}`);
    const result = await response.json();

    if (result.error) {
      alert('No users found');
      setLoading(false);
      return;
    }

    setLoading(false);
    setResults(result.data);
  }

  return (
    <div className='GallerySearch mx-12 space-y-3'>
      <div className='w-fit-content'>
        <h2 className='text-4xl'>Search Artists</h2>
        <div className='border-2 border-yellow-300 rounded'></div>
      </div>
      <br></br>
      <div className='w-fit-content'>
        <input type='text' className='bg-gray-900 w-72 text-white p-2' 
        placeholder='Artist name'
        ref={search}></input>

        <button className='border-yellow-300 hover:bg-yellow-300 ml-5'
        onClick={() => searchUsers()}>
          Search
        </button>
        <p className='mt-2 text-gray-500 text-sm'>
          (enter the exact username of the artist)
        </p>
        {loading ? (
          <div className='w-16 h-16 mx-auto my-8 rounded-full animate-spin'
          style={{
            border: '8px solid rgb(17, 24, 39)',
            borderRight: '8px solid rgb(252, 211, 77)',
          }}></div>
        ) : (
          <></>
        )}
      </div>
      <br></br>
      <div>
        {
          results.map((artist, i) => {
            return <ArtistResult key={i}
            artist={artist}>{ artist.name }</ArtistResult>
          })
        }
      </div>
    </div>
  );
}
export default GallerySearch;