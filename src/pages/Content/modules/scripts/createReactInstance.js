import React from "react";
import { render } from "react-dom";
import Root from "../Root";

const createTheReactInstance = (uuid) => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
  render(<Root uuid={uuid} />, root);
};

export default createTheReactInstance;