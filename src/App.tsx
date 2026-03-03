import React, { useEffect } from 'react';
import { useStore } from '@/store/store';
import Navbar from '@/components/Navbar';
import Notification from '@/components/Notification';
import Tools from '@/components/Tools';
import Search from '@/components/Search';
import Footer from '@/components/Footer';
import AppRoutes from '@/router/index';
import axios from 'axios';

const App: React.FC = () => {
  const showSearch = useStore((s) => s.showSearch);
  const showTools = useStore((s) => s.showTools);
  const toggleTools = useStore((s) => s.toggleTools);
  const toggleSearch = useStore((s) => s.toggleSearch);
  const showNotification = useStore((s) => s.showNotification);
  const user = useStore((s) => s.user);

  useEffect(() => {
    const getCookieValue = (name: string) => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop();

    const authToken = getCookieValue('auth_token');
    const authTokenValid = authToken?.split('.')[1];

    if (authToken && !authTokenValid) {
      showNotification('Invalid authorization', true);
      document.cookie = 'auth_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }

    if (authToken && authTokenValid) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      const userData = window.atob(authTokenValid);
      const userId = JSON.parse(userData).sub;
      user(userId);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F2') {
        toggleTools(!useStore.getState().showTools);
      }
      if (e.key === 'k' && e.metaKey) {
        e.preventDefault();
        toggleSearch(!useStore.getState().showSearch);
      }
      if (e.key === 'Escape') {
        toggleSearch(false);
        toggleTools(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleTools, toggleSearch]);

  return (
    <>
      {showSearch && <Search />}
      <Navbar />
      <Notification />
      {showTools && <Tools />}
      <div className="mt-10">
        <AppRoutes />
      </div>
      <Footer />
    </>
  );
};

export default App;
