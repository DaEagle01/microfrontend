import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";

const mount = (el) => {
  const app = createApp(Dashboard);
  app.mount(el);
};

const startApp = () => {
  const devRoot = document.querySelector("#_dashboard-dev-root");

  if (devRoot) {
    mount(devRoot);
  }
};

// Run immediately in both development and production
startApp();

// We are running through container
// and we should export the mount function
export { mount };
