import React from 'react';

const Account: React.FC = () => {
  return (
    <div className='Account w-fit-content max-w-24 h-24 absolute top-2 right-2 '>
      <svg
        className='fill-current text-gray-400 cursor-pointer ml-36'
        xmlns='http://www.w3.org/2000/svg'
        height='48px'
        viewBox='0 0 24 24'
        width='48px'
        fill='#000000'
      >
        <path d='M0 0h24v24H0z' fill='none' />
        <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z' />
      </svg>
      <div >
        <div
          id='triangle'
          className='w-0 h-0 ml-40'
          style={{
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderBottom: '8px solid #1f2937',
          }}
        ></div>
        <div className={'space-y-2 bg-gray-800 p-2 rounded flex flex-col px-6 ' + 
          'text-center border-2 border-gray-900'}>
          <h3 className='text-xl'>
            Create Account
          </h3>
          <input className='text-black'
          placeholder='Email'></input>
          <input className='text-black'
          placeholder='Password'></input>
          <br></br>
          <div className='space-x-6'>
            <button>Create</button>
            <button>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Account;