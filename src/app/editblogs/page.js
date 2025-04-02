"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./edit.module.css";

export default function EditBlog() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const blogId = searchParams.get("id");

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        image: "", // Base64 de la imagen
        description: ""
    });

    useEffect(() => {
        const fetchBlog = async () => {
            if (!blogId) return;
            try {
                const res = await fetch(`/api/blogs?id=${blogId}`);
                if (!res.ok) throw new Error("Error al cargar el blog");
                const data = await res.json();
                setFormData({
                    title: data.title,
                    author: data.author,
                    image: data.image, // Mantiene la imagen en base64
                    description: data.description
                });
            } catch (error) {
                console.error(error);
                alert("No se pudo cargar el blog");
            }
        };

        fetchBlog();
    }, [blogId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result }); // Convertir a base64
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/blogs", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: blogId, ...formData }),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Blog actualizado con éxito");
                router.push("/admin/blog");
            } else {
                alert("Error al actualizar: " + data.message);
            }
        } catch (error) {
            alert("Error al actualizar el blog");
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Editar blog</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Título:</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        className={styles.input}
                        required 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Autor:</label>
                    <input 
                        type="text" 
                        name="author" 
                        value={formData.author} 
                        onChange={handleChange} 
                        className={styles.input}
                        required 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Descripción:</label>
                    <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        className={styles.textarea}
                        required
                    ></textarea>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Imagen:</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange} 
                        className={styles.fileInput}
                        required 
                    />
                </div>  
                {formData.image && (
                    <div className={styles.imagePreview}>
                        <img src={formData.image} alt="Vista previa" className={styles.preview} />
                    </div>
                )}
                <button type="submit" className={styles.submitButton}>
                    Editar blog
                </button>
            </form>
        </div>
    );
}