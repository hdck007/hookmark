import React from 'react';
import { render } from 'react-dom';

import App from './App';
import './newtab.styles.css';

render(<App />, window.document.querySelector('#newtab-container'));

if (module.hot) module.hot.accept();
