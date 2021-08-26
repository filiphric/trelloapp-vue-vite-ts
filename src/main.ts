import { createApp } from 'vue';
import router from './router';
import { createPinia } from 'pinia';
import App from './App.vue';
import VueClickAway from 'vue3-click-away';
import './index.css';
import axios from 'axios';

// redirect on non-existing board
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response.config.url.match(/\/boards\/\d*/g) && error.response.config.method === 'get' && error.response.status === 404) {
      router.push('/404');
    }
    return Promise.reject(error);
  }
);

const app = createApp(App)
  .use(createPinia())
  .use(router)
  .use(VueClickAway);

// make axios available to the whole app by accessing this.axios
app.config.globalProperties.axios = axios;

app.mount('#app');
