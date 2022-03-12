import { createApp } from "vue";
import { createPinia } from "pinia";

import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

import PrimeVue from "primevue/config";
import DataTable from "primevue/datatable";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(BootstrapVue3);
app.use(PrimeVue);

app.component("DataTable", DataTable);

app.mount("#app");
