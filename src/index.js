
// outsource dependencies
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { ProSidebarProvider } from 'react-pro-sidebar';

// local dependencies
import { App } from './modules';
import { store } from './constants';

// import styles
import './styles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  </Provider>
);
