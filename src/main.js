import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import Paginate from "vue-pagination-2";

const app = createApp(App);
app.use(store);
app.use(router);
app.component("paginate", Paginate);
app.mount("#app");
