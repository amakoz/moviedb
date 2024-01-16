import { createApp } from 'vue'
import App from './App.vue'
import router from "./app.router";
import { createPinia } from 'pinia'
import { createMetaManager } from "vue-meta";


const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(createMetaManager());
app.mount("#app");

