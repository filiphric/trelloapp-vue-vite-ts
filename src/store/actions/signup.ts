import axios from 'axios';

export const signup = async (set: any, get: any, email: string, password: string, welcomeEmail: boolean) => {
  await axios
    .post('/api/signup', { email, password, welcomeEmail })
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
      get().showNotification('User was successfully created', false);

      welcomeEmail &&
        axios.post('/api/welcomeemail', {
          email,
        });
    })
    .catch((e) => {
      get().showNotification(e.response.data, true);
    });
};
