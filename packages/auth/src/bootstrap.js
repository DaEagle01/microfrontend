import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

const mount = (el, { onNavigate, defaultHistory, initialPath } = {}) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath || "/"],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// Immediately mount function
const startApp = () => {
  const el = document.querySelector("#_auth-dev-root");

  // If we're not running through the container and we find our element
  if (el && !window.__AUTH_DEV__) {
    // Set a flag to prevent double mounting
    window.__AUTH_DEV__ = true;

    // Use browser history for standalone mode
    mount(el, { defaultHistory: createBrowserHistory() });
  }
};

// Run immediately in both development and production
startApp();

// We are running through container
// and we should export the mount function
export { mount };
