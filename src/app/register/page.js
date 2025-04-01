import styles from "./register.module.css";
import Image from "next/image";
import Link from "next/link"; 
import { FaUser, FaLock, FaFacebook, FaGoogle } from "react-icons/fa";

export default function Register() {
    return (
        <div className={styles.container}>
            <div className={styles.loginCard}>
                {/* Encabezado con logo */}
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
                
                {/* Formulario */}
                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <FaUser className={styles.inputIcon} />
                        <input 
                            type="email" 
                            placeholder="Correo electrónico" 
                            className={styles.inputField}
                            required
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <FaLock className={styles.inputIcon} />
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            className={styles.inputField}
                            required
                        />
                    </div>
                    
                    <div className={styles.options}>
                        <label className={styles.rememberMe}>
                            <input type="checkbox" />
                            <span>Recordarme</span>
                        </label>
                        <a href="#" className={styles.forgotPassword}>¿Olvidaste tu contraseña?</a>
                    </div>
                    
                    <button type="submit" className={styles.loginButton}>
                        Iniciar Sesión
                    </button>
                    
                    <div className={styles.divider}>
                        <span>o continúa con</span>
                    </div>
                    
                    {/* Login con redes sociales */}
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
            
            {/* Imagen decorativa */}
            <div className={styles.decorativeImage}>
                <Image 
                    src="/" 
                    alt="Destino de viaje" 
                    width={100}
                    height={100}
                />
            </div>
        </div>
    );
}