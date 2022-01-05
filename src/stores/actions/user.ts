import axios from 'axios';

export const user = async function (this: any) {
  await axios
    .get('/api/users')
    .then(({ data }) => {
      this.showNotification('User is logged in', false);
      this.activeUser.loggedIn = true;
      this.activeUser.email = data.user.email;
    })
    .catch(() => {
      this.showNotification('User is not authorized', true);
      document.cookie = 'trello_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
};
