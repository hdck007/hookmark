import React from 'react';
import { render } from 'react-dom';
import { GeistProvider, CssBaseline } from '@geist-ui/core';

import App from './App';
import './newtab.styles.css';

render(
  <GeistProvider>
    <CssBaseline />
    <App />
  </GeistProvider>,
  window.document.querySelector('#newtab-container')
);

if (module.hot) module.hot.accept();
