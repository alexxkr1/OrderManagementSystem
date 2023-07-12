import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import PrimeVue from "primevue/config";
import { primevueConfig } from "./primevue";

const app = createApp(App);

primevueConfig(app);
app.use(createPinia());
app.use(PrimeVue);
app.use(router);

app.mount("#app");
