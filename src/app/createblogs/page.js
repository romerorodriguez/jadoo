"use client";
import { useState } from "react";
import styles from "./create.module.css";
import { useRouter } from "next/navigation";

export default function Create() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const router = useRouter();

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
                    <textarea 
                        className={styles.textarea}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className={styles.submitButton}>
                    Guardar Noticia
                </button>
            </form>
        </div>
    );
}