import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import { primevueConfig } from "./primevue";
import "./assets/base.scss";
const app = createApp(App);
primevueConfig(app);
app.use(createPinia());
app.use(router);

import Platform from "./layouts/platform.vue";
app.component("platform-layout", Platform);

app.mount("#app");
