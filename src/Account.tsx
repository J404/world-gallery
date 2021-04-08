import React, { useRef } from 'react';

import { createUser } from './auth';

const Account: React.FC = () => {
  const showForm = useRef(false);

  type Latlon = {lat: number, lon: number};
  const latlon = useRef<Latlon>({} as unknown as Latlon);
  
  const email = useRef<HTMLInputElement>(null as unknown as HTMLInputElement);
  const password = useRef<HTMLInputElement>(null as unknown as HTMLInputElement);
  const username = useRef<HTMLInputElement>(null as unknown as HTMLInputElement);
  const bio = useRef<HTMLTextAreaElement>(null as unknown as HTMLTextAreaElement);

  if (showForm.current) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        latlon.current = { lat, lon };
      });
    } else {
      alert('Please enable location services for this site to work as intended.');
    }
  }

  const createAccount = () => {
    const userEmail = (email.current as unknown as HTMLInputElement).value;
    const userPass = (password.current as unknown as HTMLInputElement).value;
    const name = (username.current as unknown as HTMLInputElement).value;
    const description = (bio.current as unknown as HTMLTextAreaElement).value;

    if (!latlon.current.lat) {
      alert('You must enable location services to create an account.');
      return;
    }

    createUser(userEmail, userPass);
  };

  return (
    <div className='Account w-fit-content max-w-24 h-24 absolute top-2 right-2 '>
      <svg
        className='fill-current text-gray-400 cursor-pointer ml-52'
        xmlns='http://www.w3.org/2000/svg'
        height='48px'
        viewBox='0 0 24 24'
        width='48px'
        fill='#000000'
      >
        <path d='M0 0h24v24H0z' fill='none' />
        <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z' />
      </svg>
      <div>
        <div
          id='triangle'
          className='w-0 h-0 ml-56'
          style={{
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderBottom: '8px solid #1f2937',
          }}
        ></div>
        <div
          className={
            'space-y-2 bg-gray-800 p-2 rounded flex flex-col px-6 ' +
            'text-center border-2 border-gray-900'
          }
        >
          <h3 className='text-xl w-60'>Create Account</h3>

          <input className='text-black' placeholder='Email'
          ref={email}></input>

          <input className='text-black' placeholder='Username'
          ref={username}></input>

          <input className='text-black' placeholder='Password'
          ref={password}></input>

          <textarea className='text-black'
          placeholder='Description'
          ref={bio}></textarea>

          <br></br>
          
          <div className='space-x-6'>
            <button onClick={() => createAccount()}>Create</button>
            <span>|</span>
            <button>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Account;
