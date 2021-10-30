import axios from 'axios';
import router from '@/router';

export const login = async function(this: any, email: string, password: string) {
  await axios
    .post('/api/login', { email, password })
    .then(({ data }) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
      document.cookie = `trello_token=${data.accessToken}`;
      router.push('/');
      this.user();
    })
    .catch(({ response }) => {
      this.showNotification(response.data, true);
    });
};
