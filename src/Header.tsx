import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Header: React.FC = () => {
  const history = useHistory();

  let initLinks = [true, false, false];

  if (history.location.pathname === '/') initLinks = [true, false, false];
  if (history.location.pathname === '/discover') initLinks = [false, true, false];
  if (history.location.pathname === '/galleries') initLinks = [false, false, true];

  const [buttons, setButtons] = useState(initLinks);

  function clickLink(id: number) {
    let newButtons = [...buttons];

    for (let i = 0; i < 3; i++) {
      if (i === id) newButtons[i] = true;
      else newButtons[i] = false;
    }

    setButtons(newButtons);
  }

  return (
    <div className="Header bg-gray-900 pb-5">
      <h2 className="text-6xl p-4 ml-8 tracking-wider">artsy</h2>
      <ul className="flex flex-row mx-4 space-x-4">
        <li className="group" onClick={() => clickLink(0)}>
          <Link to="/">about</Link>
          <div
            className={
              'nav-link-underline ' + (buttons[0]
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
              'nav-link-underline ' + (buttons[1]
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
              'nav-link-underline ' + (buttons[2]
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
    </div>
  );
};
export default Header;
