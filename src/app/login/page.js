"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import Image from "next/image";
import Link from "next/link"; 
import { FaUser, FaLock, FaFacebook, FaGoogle } from "react-icons/fa";

export default function Login() {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [mensaje, setMensaje] = useState("");
    const router = useRouter();

    async function handleLogin(e) {
        e.preventDefault();
        setMensaje(""); // Limpiar mensaje anterior

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo, contrasena }),
        });

        const data = await res.json();
        
        if (res.status === 200) {
            router.push("/main"); // Redirige a la pantalla principaz
        } else {
            setMensaje(data.message); // Muestra el mensaje de error
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginCard}>
                <div className={styles.header}>
                    <Image 
                        src="/img/logo.svg" 
                        alt="Agencia de Viajes" 
                        width={100}
                        height={100}
                        className={styles.logo}
                    />
                    <h1>Bienvenido de vuelta</h1>
                    <p>Tu próximo destino te espera.</p>
                </div>
                
                <form className={styles.form} onSubmit={handleLogin}>
                    <div className={styles.inputGroup}>
                        <FaUser className={styles.inputIcon} />
                        <input 
                            type="email" 
                            placeholder="Correo electrónico" 
                            className={styles.inputField}
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <FaLock className={styles.inputIcon} />
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            className={styles.inputField}
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                        />
                    </div>

                    {mensaje && <p className={styles.errorMessage}>{mensaje}</p>} {/* Mostrar mensaje de error */}

                    <button type="submit" className={styles.loginButton}>
                        Iniciar Sesión
                    </button>

                    <div className={styles.divider}>
                        <span>o continúa con</span>
                    </div>
                    
                    <div className={styles.socialLogin}>
                        <button type="button" className={styles.GoogleButton}>
                            <FaGoogle /> Google
                        </button>
                        <button type="button" className={styles.FaceButton}>
                            <FaFacebook /> Facebook
                        </button>
                    </div>

                    <p className={styles.signupLink}>
                        ¿No tienes una cuenta? <Link href="/register">Regístrate</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}