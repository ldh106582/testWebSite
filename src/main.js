import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/index'

const app = createApp(App);
const pinia = createPinia();

app.use(router)
app.use(vuetify);
app.use(pinia);
app.mount('#app');