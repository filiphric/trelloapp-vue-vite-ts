import axios from 'axios';
import { router } from '@/router/index';

export const login = async function (this: any, email: string, password: string) {
  await axios
    .post('/api/login', { email, password })
    .then(({ data }) => {
      const token = data.accessToken;
      const email = data.user.email;
      const id = data.user.id;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      document.cookie = `trello_token=${token}`;
      router.push('/');
      this.activeUser.id = id;
      this.activeUser.email = email;
      this.activeUser.accessToken = token;
      this.user(this.activeUser.id);
    })
    .catch(({ response }) => {
      this.showNotification(response.data, true);
    });
};
