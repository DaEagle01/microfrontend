import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from "./App";

const mount = (el, { onNavigate, defaultHistory, initialPath } = {}) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath || '/']
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
    }
  };
};

// Mount function for running marketing app standalone
const mountApp = () => {
  const devRoot = document.querySelector('#_marketing-dev-root');
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  mountApp();
}

// If we are running through container
// and we are in development or production,
// export the mount function
if (!window.marketing) {
  mountApp();
}

export { mount };