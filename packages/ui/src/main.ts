import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bulma/css/bulma.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// font awesome initialization
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faLock,
  faTrashAlt,
  faCheckCircle,
  faFeatherAlt,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faFacebook,
  faGithub
} from "@fortawesome/free-brands-svg-icons";

library.add(
  faEnvelope,
  faLock,
  faTrashAlt,
  faCheckCircle,
  faFeatherAlt,
  faSpinner,
  faGithub,
  faFacebook,
  faGoogle
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

// page layout initialization
import DefaultLayout from "@/components/layouts/Default.vue";
import FullLayout from "@/components/layouts/Full.vue";
import Loading from "@/components/Loading.vue";

Vue.component("default-layout", DefaultLayout);
Vue.component("full-layout", FullLayout);
Vue.component("loading", Loading);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
