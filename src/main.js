import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router/index';
import { useAuthStore } from '@/stores/useAuthStore';
import PrimeVue from 'primevue/config';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

app.use(router)
app.use(vuetify);

const authStore = useAuthStore();
authStore.initialize();

app.mount('#app');
app.use(PrimeVue);