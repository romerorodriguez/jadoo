"use client";
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListUl, FaListOl, FaUndo, FaRedo, FaAlignLeft, FaAlignCenter, FaAlignRight, FaQuoteLeft, FaLink, FaImage, FaCode } from "react-icons/fa";

export default function Toolbar({ editor }) {
    if (!editor) return null;

    return (
        <div style={{ borderBottom: "2px solid #ddd", padding: "8px", display: "flex", gap: "10px", flexWrap: "wrap", background: "#f8f8f8", borderRadius: "5px" }}>
            {/* Grupo: Formato de texto */}
            <div>
                <button onClick={() => editor.chain().focus().toggleBold().run()}><FaBold /></button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()}><FaItalic /></button>
                <button onClick={() => editor.chain().focus().toggleUnderline().run()}><FaUnderline /></button>
                <button onClick={() => editor.chain().focus().toggleStrike().run()}><FaStrikethrough /></button>
            </div>

            {/* Grupo: Listas */}
            <div>
                <button onClick={() => editor.chain().focus().toggleBulletList().run()}><FaListUl /></button>
                <button onClick={() => editor.chain().focus().toggleOrderedList().run()}><FaListOl /></button>
            </div>

            {/* Grupo: Alineación */}
            <div>
                <button onClick={() => editor.chain().focus().setTextAlign("left").run()}><FaAlignLeft /></button>
                <button onClick={() => editor.chain().focus().setTextAlign("center").run()}><FaAlignCenter /></button>
                <button onClick={() => editor.chain().focus().setTextAlign("right").run()}><FaAlignRight /></button>
            </div>

            {/* Grupo: Elementos adicionales */}
            <div>
                <button onClick={() => editor.chain().focus().toggleBlockquote().run()}><FaQuoteLeft /></button>
                <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}><FaCode /></button>
                <button onClick={() => {
                    const url = prompt("Ingrese la URL:");
                    if (url) editor.chain().focus().setLink({ href: url }).run();
                }}><FaLink /></button>
                <button onClick={() => {
                    const url = prompt("Ingrese la URL de la imagen:");
                    if (url) editor.chain().focus().setImage({ src: url }).run();
                }}><FaImage /></button>
            </div>

            {/* Grupo: Deshacer/Rehacer */}
            <div>
                <button onClick={() => editor.chain().focus().undo().run()}><FaUndo /></button>
                <button onClick={() => editor.chain().focus().redo().run()}><FaRedo /></button>
            </div>
        </div>
    );
}