import React from "react";
import { hydrate, render } from "react-dom";
const rootElement = document.getElementById("root");
import IndexPage from './pages/IndexPage';
import { createRoot } from "react-dom/client";

if(rootElement)
if (rootElement.hasChildNodes()) {
  
  hydrate(<IndexPage />, rootElement);
} else {
  const root=createRoot(rootElement);
  root.render(
      <IndexPage/>);
}