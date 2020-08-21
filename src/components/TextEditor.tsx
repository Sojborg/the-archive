import React, { useRef } from "react";
import JoditEditor from "jodit-react";

interface ITextEditorProps {
  value: string;
  onChange(newContent: string): void;
}

export const TextEditor = (props: ITextEditorProps) => {
  const { value, onChange } = props;

  const editor = useRef(null);

  const config = {
    readonly: false,
  } as any;

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      onBlur={(e: any) => {
        onChange(e.target.textContent);
      }}
      onChange={(newContent) => {}}
    />
  );
};
