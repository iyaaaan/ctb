import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import config from "../config";

const app = createApp(App);

app.use(router);
app.use(VueGoogleMaps, {
  load: {
    key: config().GOOGLE_MAPS_API_KEY,
  },
});
app.mount("#app");
