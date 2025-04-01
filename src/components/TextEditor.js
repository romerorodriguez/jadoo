"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, useEffect } from "react";

const TextEditor = ({ content, onChange }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!isMounted) {
    return <div className="p-4 border rounded">Cargando editor...</div>;
  }

  return (
    <div className="editor-container border rounded overflow-hidden bg-white">
      {/* Barra de herramientas minimalista (como en la imagen) */}
      <div className="toolbar p-2 bg-gray-100 border-b flex gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1 px-2 rounded ${editor?.isActive("bold") ? "bg-gray-300" : "hover:bg-gray-200"}`}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1 px-2 rounded ${editor?.isActive("italic") ? "bg-gray-300" : "hover:bg-gray-200"}`}
        >
          <em>I</em>
        </button>
        <div className="border-l h-6 mx-2 border-gray-400"></div>
        <select
          className="p-1 px-2 rounded bg-white border border-gray-300 text-sm"
          defaultValue="normal"
        >
          <option value="normal">Normal</option>
          <option value="h1">Título 1</option>
          <option value="h2">Título 2</option>
        </select>
      </div>

      {/* Área de edición (estilo similar a CKEditor) */}
      <EditorContent
        editor={editor}
        className="editor-content p-4 min-h-[200px] bg-white"
        style={{ fontFamily: "Arial, sans-serif", fontSize: "14px" }}
      />
    </div>
  );
};

export default TextEditor;