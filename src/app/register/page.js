"use client";
import { useState } from "react";
import styles from "./register.module.css";
import Image from "next/image";
import Link from "next/link"; 
import { FaUser, FaLock, FaFacebook, FaGoogle } from "react-icons/fa";

export default function Register() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [mensaje, setMensaje] = useState("");

    async function handleRegister(e) {
        e.preventDefault();
        setMensaje("");

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, correo, contrasena }),
        });

        const data = await res.json();
        setMensaje(data.message);
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
                    <h1>Un mundo de experiencias te espera</h1>
                    <p>Crea tu cuenta en segundos</p>
                </div>

                <form className={styles.form} onSubmit={handleRegister}>
                    <div className={styles.inputGroup}>
                        <FaUser className={styles.inputIcon} />
                        <input 
                            type="text" 
                            placeholder="Nombre" 
                            className={styles.inputField}
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
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

                    {mensaje && <p className={styles.successMessage}>{mensaje}</p>}

                    <button type="submit" className={styles.loginButton}>
                        Regístrate
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
                        ¿Ya tienes una cuenta? <Link href="/login">Inicia sesión</Link>
                    </p>
                </form>
            </div>
            <div className={styles.decorativeImage}>
                <Image 
                    src="/img/av.jpg" 
                    alt="Destino de viaje" 
                    width={80}
                    height={80}
                />
            </div>
        </div>
    );
}