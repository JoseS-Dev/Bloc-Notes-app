import { createApp } from 'vue';
import './assets/main.css';
import router from './router/routes';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#app');
