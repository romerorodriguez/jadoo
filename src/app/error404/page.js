import styles from "./error404.module.css";

export default function Error404() {
  return (
    <div className={styles.main}>
      <div className={styles.fof}>
        <h1>Error 404</h1>
        <p>El mapa que buscabas se fue de viaje, ¿Te ayudamos a encontrar otro?</p>
        <a href="/">Ir a menú</a>
      </div>
    </div>
  );
}