import React from 'react';

const GallerySearch: React.FC = () => {
  return (
    <div className='GallerySearch mx-12 space-y-3'>
      <div className='w-fit-content'>
        <h2 className='text-4xl'>Search Artists</h2>
        <div className='border-2 border-yellow-300 rounded'></div>
      </div>
      <br></br>
      <div className='w-fit-content'>
        <input type='text' className='bg-gray-900 w-72 text-white p-2' placeholder='Artist name'></input>
        <button className='border-yellow-300 hover:bg-yellow-300 ml-5'>
          Search
        </button>
        <div className='w-16 h-16 mx-auto my-8 rounded-full animate-spin'
          style={{
            border: '8px solid rgb(17, 24, 39)',
            borderRight: '8px solid rgb(252, 211, 77)',
        }}></div>
      </div>
    </div>
  );
}
export default GallerySearch;