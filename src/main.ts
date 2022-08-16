import './index.css';
import { createApp } from 'vue';
import { createPinia } from '@/store';
import App from './App.vue';
import VueClickAway from 'vue3-click-away';
import { router } from '@/router/index';
const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(VueClickAway)
  .use(router)
  .mount('#app');
