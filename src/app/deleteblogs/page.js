"use client";
import styles from "./delete.module.css"; 
import { useRouter, useSearchParams } from "next/navigation";

export default function Delete() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const blogId = searchParams.get("id");

    const handleDelete = async () => {
        if (!blogId) {
            alert("Error: No se encontró el ID del blog.");
            return;
        }
        try {
            const res = await fetch("/api/blogs", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: blogId }),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Blog eliminado con éxito");
                router.push("/admin/blog");
            } else {
                alert("No se eliminó el blog: " + data.message);
            }
        } catch (error) {
            alert("Error al eliminar el blog");
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.confirmationBox}>
                <p>¿Seguro de eliminar el blog?</p>
                <div className={styles.buttonsContainer}>
                    <button className={styles.confirmButton} onClick={handleDelete}>Confirmar</button>
                    <button className={styles.cancelButton} onClick={() => router.push("/admin/blog")}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}