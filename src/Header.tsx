import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div className='Header'>
      <h2 className='text-6xl m-4 ml-8 tracking-wider'>artsy</h2>
      <ul className='flex flex-row mx-4 space-x-6'>
        <li>
          <Link to='/'>about</Link>
        </li>
        <li>
          <Link to='/discover'>discover</Link>
        </li>
        <li>
          <Link to='/galleries'>galleries</Link>
        </li>
        <span>
          <svg className='fill-current text-white'
          xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </span>
      </ul>
    </div>
  );
}
export default Header;