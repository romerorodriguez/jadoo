"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./create.module.css";

export default function Create() {
    const [formData, setFormData] = useState({
        category: "",    // Se almacena en "categoria"
        title: "",       // Se almacena en "nombre_lugar"
        description: "", // Se almacena en "descripcion"
        package: "",     // Se almacena en "paquete"
        price: "",       // Se almacena en "precio"
        image: ""        // Se almacena en "imagen"
    });    
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/packages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setMessage("Paquete guardado con éxito");
                setTimeout(() => router.push("/packages"), 2000);
            } else {
                setMessage("Error al guardar el paquete");
            }
        } catch (error) {
            console.error(error);
            setMessage("Error al procesar la solicitud");
        }
    };

    return (
        <div className={styles.container}>
            <h1>Crear un nuevo paquete</h1>
            {message && <p className={styles.message}>{message}</p>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Categoría:</label>
                    <input type="text" name="category" className={styles.input} required onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Título:</label>
                    <input type="text" name="title" className={styles.input} required onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Descripción:</label>
                    <textarea name="description" rows="5" className={styles.textarea} required onChange={handleChange}></textarea>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Paquete:</label>
                    <input type="text" name="package" className={styles.input} required onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Precio:</label>
                    <input type="text" name="price" className={styles.input} required onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Imagen:</label>
                    <input type="file" accept="image/*" className={styles.fileInput} required onChange={handleImageChange} />
                </div>  
                <button type="submit" className={styles.submitButton}>Guardar paquete</button>
            </form>
        </div>
    );
}