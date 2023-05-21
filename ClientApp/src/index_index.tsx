import React from "react";
import { hydrate, render } from "react-dom";
const rootElement = document.getElementById("root");
import IndexPage from './pages/IndexPage';

if(rootElement)
if (rootElement.hasChildNodes()) {
  hydrate(<IndexPage />, rootElement);
} else {
  render(<IndexPage />, rootElement);
}