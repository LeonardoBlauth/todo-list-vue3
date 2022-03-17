import { createApp } from "vue";
import { createPinia } from "pinia";

import axios from "axios";
import VueAxios from "vue-axios";

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

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

library.add(faMagnifyingGlass);
library.add(faPlus);

import App from "./App.vue";
import router from "./router";

axios.defaults.baseURL = 'http://localhost:8000/api/'

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(BootstrapVue3);
app.use(PrimeVue);
app.use(VueAxios, axios);

app.component("DataTable", DataTable);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
