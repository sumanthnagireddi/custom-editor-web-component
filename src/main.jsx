import React, { createRef } from "react";
import ReactDOM from "react-dom/client";
import Editor from "./Editor";

class MyReactElement extends HTMLElement {
  constructor() {
    super();
    this.editorRef = createRef();
  }

  connectedCallback() {
    const mountPoint = document.createElement("div");
    this.appendChild(mountPoint);
    const root = ReactDOM.createRoot(mountPoint);
    root.render(<Editor ref={this.editorRef}   readonly={this.hasAttribute("readonly") && this.getAttribute("readonly") === "true"}/>);
  }

  // ✅ Expose method to get HTML
  getHTML() {
    return this.editorRef.current?.getHTML?.();
  }

  // ✅ Expose method to set HTML
  setHTML(html) {
    return this.editorRef.current?.deserializeHTML?.(html);
  }
  // ✅ Expose method to set readonly
  setReadonly(value) {
    this.editorRef.current?.setReadonly?.(value);
  }

  // ✅ Expose method to get readonly
  getReadonly() {
    return this.editorRef.current?.getReadonly?.();
  }
}

customElements.define("notion-editor", MyReactElement);
