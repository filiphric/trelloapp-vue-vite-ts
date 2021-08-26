import axios from 'axios';
import router from '@/router';

export const signup = async function(this: any, email: string, password: string, welcomeEmail: boolean) {
  await axios
    .post('/api/signup', { email, password, welcomeEmail })
    .then(({ data }) => {
      router.push('/');
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
      document.cookie = `trello_token=${data.accessToken}`;
      this.activeUser.loggedIn = true;
      this.activeUser.email = email;
      this.showNotification('User was successfully created', false);

      welcomeEmail &&
        axios.post('/api/welcomeemail', {
          email
        });
    })
    .catch(e => {
      this.showNotification(e.response.data, true);
    });
};
