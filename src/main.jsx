import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Editor from "./Editor";

class MyReactElement extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement("div");
    this.appendChild(mountPoint);
    const root = ReactDOM.createRoot(mountPoint);
    root.render(<Editor />);
  }
}

customElements.define("notion-editor", MyReactElement);
