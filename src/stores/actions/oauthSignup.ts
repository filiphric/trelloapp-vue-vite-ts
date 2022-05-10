import axios from 'axios';
import { router } from '@/router/index';

export const oauthSignup = async function (this: any, jwt: string) {
  await axios
    .post('/api/signup', { jwt })
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
