import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { UserData } from './auth';

import Account from './Account';

interface Props {
  handleLogin: (user: UserData) => void;
  user: UserData;
}

const Header: React.FC<Props> = (props) => {
  const location = useLocation();

  let initLinks = [true, false, false];
  const [links, setLinkState] = useState(initLinks);

  useEffect(() => {
    if (location.pathname.startsWith('/galleries')) setLinkState([false, false, true]);
    else if (location.pathname.startsWith('/discover')) setLinkState([false, true, false]);
    else if (location.pathname === '/') setLinkState([true, false, false]);
  }, [location])


  function clickLink(id: number) {
    let newLinks = [...links];

    for (let i = 0; i < 3; i++) {
      if (i === id) newLinks[i] = true;
      else newLinks[i] = false;
    }

    setLinkState(newLinks);
  }

  return (
    <div className="Header bg-gray-900 pb-5">
      <div className='w-fit-content p-4 ml-8'>
        <h2 className="text-6xl tracking-wider font-main-header shadow-sm">
          {/* <svg width="225" height="110" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 44C40 55.0457 31.0457 64 20 64C8.95431 64 0 55.0457 0 44C0 32.9543 8.95431 24 20 24C31.0457 24 40 32.9543 40 44ZM3 44C3 53.3888 10.6112 61 20 61C29.3888 61 37 53.3888 37 44C37 34.6112 29.3888 27 20 27C10.6112 27 3 34.6112 3 44Z" fill="#EC1D1D"/>
            <path d="M49 34.5C49 31.7152 50.0536 29.0445 51.9289 27.0754C53.8043 25.1062 56.3478 24 59 24C61.6522 24 64.1957 25.1062 66.0711 27.0754C67.9464 29.0445 69 31.7152 69 34.5L66.0134 34.5C66.0134 32.5469 65.2745 30.6739 63.9592 29.2928C62.6439 27.9118 60.8601 27.136 59 27.136C57.1399 27.136 55.3561 27.9118 54.0408 29.2928C52.7255 30.6739 51.9866 32.5469 51.9866 34.5H49Z" fill="#303FC1"/>
            <path d="M145 46.5C145 49.2848 143.894 51.9555 141.925 53.9246C139.955 55.8938 137.285 57 134.5 57C131.715 57 129.045 55.8938 127.075 53.9246C125.106 51.9555 124 49.2848 124 46.5L127.026 46.5C127.026 48.4823 127.813 50.3834 129.215 51.785C130.617 53.1867 132.518 53.9742 134.5 53.9742C136.482 53.9742 138.383 53.1867 139.785 51.785C141.187 50.3834 141.974 48.4823 141.974 46.5H145Z" fill="#0C6815"/>
            <path d="M145 78.5C145 81.2848 143.894 83.9555 141.925 85.9246C139.955 87.8938 137.285 89 134.5 89C131.715 89 129.045 87.8938 127.075 85.9246C125.106 83.9555 124 81.2848 124 78.5L127.026 78.5C127.026 80.4823 127.813 82.3834 129.215 83.785C130.617 85.1867 132.518 85.9742 134.5 85.9742C136.482 85.9742 138.383 85.1867 139.785 83.785C141.187 82.3834 141.974 80.4823 141.974 78.5H145Z" fill="#0C6815"/>
            <path d="M102.999 47.1659C101.199 47.1355 99.4413 46.5957 97.9111 45.6034C96.3808 44.6111 95.1347 43.2031 94.3041 41.5279C93.4735 39.8528 93.0893 37.9726 93.192 36.0856C93.2947 34.1987 93.8805 32.375 94.8875 30.8069C95.8946 29.2388 97.2856 27.9845 98.9138 27.1763C100.542 26.368 102.347 26.0358 104.139 26.2146C105.93 26.3935 107.642 27.0768 109.093 28.1925C110.544 29.3081 111.681 30.8148 112.383 32.5536L109.633 33.7822C109.14 32.5628 108.343 31.5061 107.326 30.7236C106.308 29.9411 105.108 29.4619 103.851 29.3365C102.595 29.211 101.329 29.444 100.187 30.0109C99.0448 30.5778 98.0692 31.4575 97.3629 32.5572C96.6567 33.657 96.2458 34.936 96.1738 36.2594C96.1018 37.5827 96.3713 38.9014 96.9538 40.0763C97.5363 41.2511 98.4102 42.2386 99.4835 42.9345C100.557 43.6304 101.789 44.009 103.052 44.0304L102.999 47.1659Z" fill="#EDD923"/>
            <path d="M102 44C103.821 44 105.608 44.5224 107.168 45.5107C108.727 46.499 110 47.9158 110.848 49.6081C111.697 51.3004 112.089 53.2039 111.983 55.1132C111.877 57.0224 111.276 58.865 110.245 60.4418C109.214 62.0187 107.793 63.27 106.134 64.0606C104.476 64.8513 102.643 65.1514 100.834 64.9284C99.025 64.7054 97.3083 63.9678 95.8693 62.7953C94.4303 61.6228 93.3236 60.0599 92.6687 58.2752L95.4556 57.1477C95.9149 58.3993 96.6911 59.4955 97.7003 60.3178C98.7096 61.1401 99.9135 61.6574 101.182 61.8138C102.451 61.9702 103.736 61.7598 104.9 61.2052C106.063 60.6507 107.06 59.7731 107.782 58.6672C108.505 57.5613 108.927 56.2691 109.001 54.93C109.076 53.591 108.801 52.256 108.206 51.0691C107.611 49.8823 106.718 48.8886 105.624 48.1955C104.531 47.5023 103.277 47.136 102 47.136L102 44Z" fill="#EDD923"/>
            <rect x="37" y="24" width="3" height="40" fill="#EC1D1D"/>
            <rect x="78" width="3" height="65" fill="#EE8423"/>
            <rect x="70" y="16" width="19" height="3" fill="#EE8423"/>
            <rect x="49" y="34" width="3" height="30" fill="#303FC1"/>
            <rect x="124" y="26" width="3" height="21" fill="#0C6815"/>
            <rect x="142" y="26" width="3" height="53" fill="#0C6815"/>
            <path d="M122.973 76.6113C121.97 78.9015 121.06 80.5653 119.227 82.1763C116.897 82.3453 116.897 82.3453 115.477 80.8506C114.928 78.8636 115.117 78.1822 116.611 76.7625C118.598 76.2131 120.453 77.4617 122.973 76.6113Z" fill="black"/>
            <path d="M115.545 79.603C115.439 79.5221 115.306 79.4866 115.174 79.5045C115.042 79.5224 114.923 79.5922 114.842 79.6983L107.656 89.1983C107.575 89.3044 107.541 89.438 107.559 89.5697C107.578 89.7014 107.648 89.8202 107.754 89.9L109.754 91.4C109.968 91.5603 110.27 91.5243 110.44 91.3181L118.009 82.1418C118.095 82.0371 118.135 81.9017 118.12 81.7668C118.104 81.632 118.035 81.5092 117.927 81.4266L115.545 79.603Z" fill="#32241F" stroke="#32241F" strokeLinejoin="round"/>
            <path d="M126.5 77C126.5 77.6598 126.18 77.9532 125.894 77.4958C125.58 76.9958 125.68 76.4532 125.394 75.9958C125.68 75.9532 125.831 76.0384 126.107 76.0384C126.394 76.4958 126.287 76.9574 126.5 77Z" fill="#0C6815"/>
            <path d="M125 75.5C125 75.7761 124.776 76 124.5 76C124 75.5 123.5 76.7761 123.5 76.5C123.5 76.2239 123.5 75.5 124.5 75C124.776 75 125 75.2239 125 75.5Z" fill="#0C6815"/>
          </svg> */}
          World Gallery
        </h2>
        <div className='h-2 border-1 border-gray-900 rounded-lg bg-gradient-to-r from-red-600 via-indigo-600 to-yellow-400'></div>
      </div>
      <ul className="flex flex-row mx-4 space-x-4 font-headers">
        <li className="group" onClick={() => clickLink(0)}>
          <Link to="/">about</Link>
          <div
            className={
              'nav-link-underline ' + (links[0]
                ? 'border-red-600'
                : 'group-hover:border-red-600')
            }
          ></div>
        </li>

        <li className="font-extrabold">·</li>

        <li className="group" onClick={() => clickLink(1)}>
          <Link to="/discover">discover</Link>
          <div
            className={
              'nav-link-underline ' + (links[1]
                ? 'border-blue-700'
                : 'group-hover:border-blue-700')
            }
          ></div>
        </li>

        <li className="font-extrabold">·</li>

        <li className="group" onClick={() => clickLink(2)}>
          <Link to="/galleries">galleries</Link>
          <div
            className={
              'nav-link-underline ' + (links[2]
                ? 'border-yellow-300'
                : 'group-hover:border-yellow-300')
            }
          ></div>
        </li>

        <div
          className={
            'cursor-pointer rounded-full border-2 ' +
            'border-gray-800 hover:border-green-700 transition duration-75 ease-in-out'
          }
        >
          <svg
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>
      </ul>
      <Account user={props.user}
      handleLogin={props.handleLogin}></Account>
    </div>
  );
};
export default Header;
