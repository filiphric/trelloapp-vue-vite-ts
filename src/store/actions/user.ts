import axios from 'axios';

export const user = async (set: any, get: any, id: number) => {
  await axios
    .get(`/api/users/${id}`)
    .then(({ data }) => {
      get().showNotification('User is logged in', false);
      set({
        activeUser: { ...get().activeUser, loggedIn: true, email: data.email, id: data.id },
      });
    })
    .catch(() => {
      get().showNotification('User is not authorized', true);
      document.cookie = 'auth_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
};
