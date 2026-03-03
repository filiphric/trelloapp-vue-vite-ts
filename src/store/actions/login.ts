import axios from 'axios';

export const login = async (set: any, get: any, email: string, password: string) => {
  await axios
    .post('/api/login', { email, password })
    .then(({ data }) => {
      const token = data.accessToken;
      const email = data.user.email;
      const id = data.user.id;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      document.cookie = `auth_token=${token}`;
      set({
        activeUser: { ...get().activeUser, id, email, accessToken: token },
      });
      get().user(id);
    })
    .catch(({ response }) => {
      get().showNotification(response.data, true);
    });
};
