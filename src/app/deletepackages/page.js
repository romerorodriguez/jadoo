"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./delete.module.css";

export default function DeletePackage() {
    const [message, setMessage] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id"); // Obtener el ID desde la URL

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/packages/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("Paquete eliminado con éxito");
                setTimeout(() => router.push("/admin/package"), 2000);
            } else {
                setMessage(data.message || "Error al eliminar el paquete");
            }
        } catch (error) {
            console.error("Error eliminando el paquete:", error);
            setMessage("Error al procesar la solicitud");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.confirmationBox}>
                <p>¿Seguro de eliminar este paquete?</p>
                {message && <p className={styles.message}>{message}</p>}
                <div className={styles.buttonsContainer}>
                    <button onClick={handleDelete} className={styles.confirmButton}>Confirmar</button>
                    <button onClick={() => router.push("/admin/package")} className={styles.cancelButton}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}