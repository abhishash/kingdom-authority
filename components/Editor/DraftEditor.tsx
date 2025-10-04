import React, { useEffect, useRef, useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import { stateToHTML } from "draft-js-export-html";
import Toolbar from "./Toolbar/Toolbar";
import "./DraftEditor.css";

interface DraftEditorProps {
  onChange?: (contentHTML: string) => void;
  defaultValues?: string;
}

const DraftEditor: React.FC<DraftEditorProps> = ({
  onChange,
  defaultValues,
}) => {
  const [editorState, setEditorState] = useState(() => {
    if (defaultValues) {
      return EditorState.createWithContent(stateFromHTML(defaultValues));
    }
    return EditorState.createEmpty();
  });

  const editor = useRef<Editor>(null);

  useEffect(() => {
    focusEditor();
  }, []);

  const focusEditor = () => {
    if (editor.current) {
      editor.current.focus();
    }
  };

  const handleKeyCommand = (
    command: string,
    editorState: EditorState,
  ): "handled" | "not-handled" => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  return (
    <div className="editor-wrapper" onClick={focusEditor}>
      <Toolbar editorState={editorState} setEditorState={setEditorState} />
      <div className="editor-container">
        <Editor
          ref={editor}
          placeholder="Write Here"
          handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          onChange={(newState) => {
            setEditorState(newState);
            const contentHTML = stateToHTML(newState.getCurrentContent());
            onChange?.(contentHTML);
          }}
        />
      </div>
    </div>
  );
};

export default DraftEditor;
