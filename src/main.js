import { createApp } from 'vue'

import '@/assets/styles/index.scss';

import App from './App.vue'
import router from './router'

const app = createApp(App);
app.config.globalProperties.$imageUrl = 'https://image.tmdb.org/t/p/w500/';

app.use(router).mount('#app')
