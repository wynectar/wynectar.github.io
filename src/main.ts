import { createApp } from 'vue';
import './style.css';
import '@/assets/cdnjs.css';
import App from './App.vue';
import router from '@/router';
import naive from 'naive-ui';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(router);
app.use(naive);
app.use(createPinia());
app.mount('#app');
