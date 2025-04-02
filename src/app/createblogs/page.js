"use client";
import { useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "../editblogs/Toolbar";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import styles from "./create.module.css";
import Image from "next/image";

export default function Create() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const router = useRouter();

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Blockquote,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Blockquote,
            Heading.configure({ levels: [1, 2, 3] }),
            Highlight,
            CodeBlock
        ],
        content: description,
        onUpdate: ({ editor }) => {
            setDescription(editor.getHTML());
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = async () => {
            const base64Image = reader.result;
    
            const res = await fetch("/api/blogs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    author,
                    image: base64Image,
                    description,
                }),
            });
    
            const responseData = await res.json();
            console.log("Respuesta del servidor:", responseData);
    
            if (res.ok) {
                router.push("/admin/blog");
            } else {
                console.error("Error al guardar el blog:", responseData.message);
            }
        };
    };    

    return (
        <div className={styles.container}>
            <h1>Crear un nuevo blog</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Título:</label>
                    <input 
                        type="text"
                        className={styles.input}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Autor:</label>
                    <input 
                        type="text" 
                        className={styles.input}
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Imagen:</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        className={styles.fileInput}
                        onChange={(e) => setImage(e.target.files[0])}
                        required 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Descripción:</label>
                    <Toolbar editor={editor} />
                    <EditorContent editor={editor} className={styles.textarea} />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Guardar Noticia
                </button>
            </form>
        </div>
    );
}