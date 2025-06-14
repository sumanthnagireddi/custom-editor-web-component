import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import { html } from "@yoopta/exports";
import { MARKS, plugins, TOOLS } from "./consts";
import React, {
  useEffect,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useState } from "react";

const Editor = forwardRef(({ readonly, htmlData }, ref) => {
  const editor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef(null);
  
  const [isReadonly, setIsReadonly] = useState(readonly)
  useEffect(() => {
    if (htmlData) {
      deserializeHTML(htmlData);
    }
    setIsReadonly(readonly);
  }, [htmlData,readonly]);

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
    setReadonly: (val) => setIsReadonly(val),
    getReadonly: () => isReadonly,
    getHTML: () => serializeHTML(),
    deserializeHTML: (html) => deserializeHTML(html), // <- this makes it callable from parent
  }));

  return (
    <div className="md:px-[20px] max-w-none" ref={selectionRef}>
      <YooptaEditor
        style={{ width: "100%" }}
        readOnly={isReadonly}
        editor={editor}
        plugins={plugins}
        tools={TOOLS}
        marks={MARKS}
        selectionBoxRoot={selectionRef}
      />
    </div>
  );
});

export default Editor;
