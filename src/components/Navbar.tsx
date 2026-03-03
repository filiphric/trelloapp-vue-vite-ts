import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Home from '@/assets/icons/homeicon.svg';
import LoginButton from '@/components/LoginButton';
import trelloLogo from '@/assets/trello-logo.gif';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="grid fixed top-0 z-10 grid-cols-3 w-full h-10 bg-blue7 shadow-xl">
      <button
        data-test-id="home"
        className={`bg-white bg-opacity-30 hover:bg-opacity-20 self-center text-white rounded-sm ml-3 w-8 h-8 cursor-pointer grid ${
          location.pathname !== '/' ? 'visible' : 'invisible'
        }`}
        onClick={() => navigate('/')}
      >
        <Home className="place-self-center" />
      </button>
      <img
        data-test-id="trello-logo"
        src={trelloLogo}
        className="place-self-center py-3 h-10 opacity-60 hover:opacity-100 cursor-pointer"
        onClick={() => navigate('/')}
      />
      <LoginButton />
    </nav>
  );
};

export default Navbar;
