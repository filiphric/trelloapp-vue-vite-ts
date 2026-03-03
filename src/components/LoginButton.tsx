import React from 'react';
import { useStore } from '@/store/store';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoutIcon from '@/assets/icons/logoutIcon.svg';
import User from '@/assets/icons/user.svg';
import axios from 'axios';

const LoginButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showNotification = useStore((s) => s.showNotification);
  const getBoardList = useStore((s) => s.getBoardList);
  const activeUser = useStore((s) => s.activeUser);

  const logout = () => {
    useStore.setState({
      activeUser: { ...activeUser, loggedIn: false },
    });
    axios.defaults.headers.common['Authorization'] = '';
    document.cookie = 'auth_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    showNotification('User was logged out', false);
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className={`flex justify-end mr-3 text-white ${isAuthPage ? 'invisible' : 'visible'}`}>
      {!activeUser.loggedIn ? (
        <div
          className="flex self-center h-8 text-sm bg-white bg-opacity-30 hover:bg-opacity-20 rounded-sm cursor-pointer"
          data-test-id="login-menu"
          onClick={() => navigate('/login')}
        >
          <User className="self-center ml-2 w-6 h-6" />
          <span className="self-center pr-2 pl-1">Log&nbsp;in</span>
        </div>
      ) : (
        <div
          className="flex self-center h-8 text-sm bg-white bg-opacity-30 hover:bg-opacity-20 rounded-sm cursor-pointer"
          data-test-id="logged-user"
          onClick={() => {
            logout();
            getBoardList();
            navigate('/');
          }}
        >
          <LogoutIcon className="self-center ml-2 w-5 h-5 text-white fill-current" />
          <div className="inline-block self-center pr-2 pl-1">{activeUser.email}</div>
        </div>
      )}
    </div>
  );
};

export default LoginButton;
