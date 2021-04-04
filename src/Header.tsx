import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div className="Header">
      <h2 className="text-6xl m-4 ml-8 tracking-wider">artsy</h2>
      <ul className="flex flex-row mx-4 space-x-4">
        <li className="group">
          <Link to="/">about</Link>
          <div className="nav-link-underline group-hover:border-red-600"></div>
        </li>

        <li className="font-extrabold">·</li>

        <li className="group">
          <Link to="/discover">discover</Link>
          <div className="nav-link-underline group-hover:border-blue-700"></div>
        </li>

        <li className="font-extrabold">·</li>

        <li className="group">
          <Link to="/galleries">galleries</Link>
          <div className="nav-link-underline group-hover:border-yellow-300"></div>
        </li>

        <div className={"cursor-pointer rounded-full border-2 " + 
        "border-gray-800 hover:border-green-700 transition duration-75 ease-in-out"
        }>
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
    </div>
  );
};
export default Header;
