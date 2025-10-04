import React from "react";
import { RichUtils } from "draft-js";
import { Bold } from 'lucide-react';

import { EditorState } from "draft-js";

interface ToolbarProps {
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ editorState, setEditorState }) => {
  const tools = [
    { label: "Bold", style: "BOLD", icon: <Bold/>, method: "inline" },
    { label: "Italic", style: "ITALIC", method: "inline" },
    { label: "Underline", style: "UNDERLINE", method: "inline" },
    { label: "Strikethrough", style: "STRIKETHROUGH", method: "inline" },
    { label: "Blockquote", style: "blockquote", method: "block" },
    { label: "Unordered List", style: "unordered-list-item", method: "block" },
    { label: "Ordered List", style: "ordered-list-item", method: "block" },
    { label: "Code Block", style: "code-block", method: "block" },
    { label: "H1", style: "header-one",  method: "block" },
    { label: "H2", style: "header-two",  method: "block" },
    { label: "H3", style: "header-three", method: "block" },
  ];

  const applyStyle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, style: string, method: string) => {
    e.preventDefault();
    setEditorState(
      method === "block"
        ? RichUtils.toggleBlockType(editorState, style)
        : RichUtils.toggleInlineStyle(editorState, style)
    );
  };

  const isActive = (style: string, method: string) => {
    if (!editorState) return false;

    const selection = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();

    if (method === "block") {
      const blockType = currentContent.getBlockForKey(selection.getStartKey()).getType();
      return blockType === style;
    } else {
      return editorState.getCurrentInlineStyle().has(style);
    }
  };

  return (
    <div className="flex border-solid border-black border gap-2 p-2">
      {tools.map((item, idx) => (
        <button
          key={`${item.label}-${idx}`}
          className={`bg-none border-none cursor-pointer text-base p-1.5 transition-all ease-in-out ${isActive(item.style, item.method) ? "active text-blue-300" : ""}`}
          title={item.label}
          onMouseDown={(e) => applyStyle(e, item.style, item.method)}
          type="button"
        > {item?.icon ?? item?.label}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
