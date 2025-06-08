
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import { html } from "@yoopta/exports";
import {  MARKS, plugins, TOOLS } from "./consts";
import React, { useEffect, useMemo, useRef, forwardRef, useImperativeHandle } from "react";

const Editor =forwardRef(({ readOnly, htmlData }, ref) => {
  const editor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef(null);

  useEffect(() => {
    if (htmlData) {
      deserializeHTML(htmlData);
    }
  }, [htmlData]);


  // from html to @yoopta content
  const deserializeHTML = (data) => {
    const content = html.deserialize(editor, data);
    editor.setEditorValue(content);
  };

  // from @yoopta content to html string
  const serializeHTML = () => {
    const data = editor.getEditorValue();
    const htmlString = html.serialize(editor, data);
    return htmlString;
  };

  useImperativeHandle(ref, () => ({
    getHTML: () => serializeHTML(),
  }));

  return (
      <div className="md:px-[20px] max-w-none" ref={selectionRef}>
        <YooptaEditor
          readOnly={readOnly}
          editor={editor}
          plugins={plugins}
          tools={TOOLS}
          marks={MARKS}
          selectionBoxRoot={selectionRef}
        />
      </div>
      
  );
})

export default Editor;
