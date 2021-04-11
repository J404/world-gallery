import React, { useRef, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { createUser, loginUser, signOutUser, UserData } from './auth';

interface Props {
  handleLogin: (user: UserData) => void;
  user: UserData;
}

const Account: React.FC<Props> = props => {
  const history = useHistory();

  const [showForm, setForm] = useState(false);
  const [creatingAcct, setCreating] = useState(true);
  const [loading, setLoading] = useState(false);

  const email = useRef<HTMLInputElement>(null as unknown as HTMLInputElement);
  const password = useRef<HTMLInputElement>(null as unknown as HTMLInputElement);
  const username = useRef<HTMLInputElement>(null as unknown as HTMLInputElement);
  const bio = useRef<HTMLTextAreaElement>(null as unknown as HTMLTextAreaElement);

  const createAccount = async () => {
    if (!creatingAcct) {
      setCreating(true);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const latlon = { lat, lon }
        
        const userEmail = (email.current as unknown as HTMLInputElement).value;
        const userPass = (password.current as unknown as HTMLInputElement).value;
        const name = (username.current as unknown as HTMLInputElement).value;
        const description = (bio.current as unknown as HTMLTextAreaElement).value;

        if (!latlon.lat) {
          alert('You must enable location services to create an account.');
          return;
        }

        setLoading(true);
        await createUser(userEmail, userPass, name, description, latlon, userSignIn);
      });
    } else {
      alert(
        'Please enable location services for this site to work as intended.'
      );
    }
  };
  
  const handleLogin = async () => {
    // We are on create screen, so only switch to login if they click
    if (creatingAcct) {
      setCreating(false);

    // We are already on login, so we want to actually login
    } else {
      const userEmail = (email.current as unknown as HTMLInputElement).value;
      const userPass = (password.current as unknown as HTMLInputElement).value;
      const name = (username.current as unknown as HTMLInputElement).value;

      setLoading(true);
      
      await loginUser(userEmail, userPass, name, userSignIn);
    }
  }

  const handleLogout = () => {
    setLoading(true);
    setCreating(true);
    signOutUser(userSignIn);
    
    history.push('/');

    setLoading(false);
    setForm(false);

    console.log('user sign out');
  }

  const userSignIn = (user: UserData) => {
    setLoading(false);
    setForm(false);
    
    console.log('signed in change');
    props.handleLogin(user);
  }

  return (
    <div className='Account w-fit-content max-w-24 h-24 absolute top-2 right-2 z-10'>
      <div className='ml-52 px-6'>
        <svg
          onClick={() => setForm(!showForm)}
          className='fill-current text-gray-400 cursor-pointer'
          xmlns='http://www.w3.org/2000/svg'
          height='48px'
          viewBox='0 0 24 24'
          width='48px'
          fill='#000000'
        >
          <path d='M0 0h24v24H0z' fill='none' />
          <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z' />
        </svg>
        <div className='font-semibold'>
          { props.user.name }
        </div>
      </div>
      {showForm ? (
        <div className='z-20 focus:outline-none'
        tabIndex={0}>
          <div
            id='triangle'
            className='w-0 h-0 mr-10 ml-auto'
            style={{
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderBottom: '8px solid #1f2937',
            }}
          ></div>
          <div
            className={
              'bg-gray-800 p-2 rounded px-6 ' +
              'text-center border-2 border-gray-900'
          }>
            {!loading ? (
              <>
                {!props.user.uid ? (
                <div className='flex flex-col space-y-2'>
                  <h3 className='text-xl w-60'>
                    {creatingAcct ? 'Create Account' : 'Login'
                    }
                  </h3>

                  <input className='text-black' placeholder='Email'
                  ref={email}></input>

                  <input className='text-black' placeholder='Username'
                  ref={username}></input>

                  <input className='text-black' placeholder='Password' type='password'
                  ref={password}></input>

                  {creatingAcct ? (
                    <textarea className='text-black'
                    placeholder='Description'
                    ref={bio}></textarea>
                  ) : (
                    <span></span>
                  )}
                  
                  <br></br>
                  
                  <div className='space-x-6'>
                    <button className='bg-gray-900 border-gray-900 rounded px-2 py-1' 
                    onClick={() => createAccount()}>Create</button>
                    <span>|</span>
                    <button className={'border-2 border-gray-900 rounded px-2 py-1 ' + 
                    'hover:bg-gray-900 transition ease-in-out'}
                    onClick={() => handleLogin()}>Login</button>
                  </div>
                </div>
                ) : (
                  <div>
                    <Link className='text-yellow-300'
                    to={`/galleries?name=${props.user.name}`}>
                      (go to your gallery)
                    </Link>
                    <br></br>
                    <button className='bg-gray-900 border-gray-900 rounded px-2 py-1 my-5'
                    onClick={() => handleLogout()}>
                      Sign out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className='w-full'>
                <div className='w-16 h-16 mx-auto my-8 rounded-full border-gray-900 animate-spin'
                style={{
                  border: '8px solid rgb(17, 24, 39)',
                  borderRight: '8px solid lightgrey',
                }}>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};
export default Account;
