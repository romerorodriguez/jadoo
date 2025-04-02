import styles from "../assets/css/footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.footer}>
        <div className={styles.sections}>
          <div className={styles.section}>
          <img src="/img/logo2.svg" alt="Logo" width="100" height="100" />
          </div>
          <div className={styles.section}>
            <h4>Confianza</h4>
            <a href="#">Términos y condiciones</a>
            <a href="#">Aviso de privacidad</a>
            <a href="#">Eliminar mi cuenta</a>
          </div>
          <div className={styles.section}> 
            <h4>Contacto</h4>
            <a href="#">WhatsApp</a>
            <a href="#">Email</a>
            <a href="#">Teléfono</a>
            <a href="#">Ubicación</a>
          </div>
          <div className={styles.section}>
            <h4>Asistencia</h4>
            <a href="#">Mapa de sitio</a>
            <a href="#">Centro de ayuda</a>
            <a href="#">Preguntas frecuentes</a>
            <a href="#">Opciones de cancelación</a>
          </div>
          <div className={styles.section}>
            <h4>Descubre nuestra app</h4>
            <a href="#">Google Play</a>
            <a href="#">Apple Store</a>
          </div>
        </div>
        <p className={styles.copyright}>© 2023 Jadoo. Todos los derechos reservados.</p>
      </div>
    </div>
  );
}