import axios from 'axios';

export const resetUsers = async (set: any, get: any) => {
  await axios.delete('/api/users');
  set({
    activeUser: { ...get().activeUser, loggedIn: false, email: '' },
  });
  axios.defaults.headers.common['Authorization'] = '';
  document.cookie = 'auth_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  get().showNotification('All users were deleted', false);
};
