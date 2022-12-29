import React from 'react';
import { render } from 'react-dom';
import Root from '../Root';
import { ID } from '../constants';

const createTheReactInstance = (uuid) => {
  const root = document.createElement('div');
  root.id = ID;
  document.body.appendChild(root);
  render(<Root uuid={uuid} />, root);
};

export default createTheReactInstance;
