import Image from "next/image";
import Navbar from "../components/navbar";
import styles from "./page.module.css";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className={styles.heroSection}>
        <div className={styles.textContainer}>
          <h4 className={styles.subtitle}>¡Descubre tu próxima aventura con nosotros!</h4>
          <h1 className={styles.title}>Reserva fácil,</h1>
          <h1 className={styles.title}>rápido y</h1>
          <h1 className={styles.title}>y seguro</h1>
          <p className={styles.description}>Explora destinos únicos, encuentra el viaje perfecto y vive</p>
          <p className={styles.description}>experiencias inolvidables.</p>
          <button className={styles.seeButton}>Ver más</button>
        </div>
        <div className={styles.imageContainer}>
          <Image src="/img/hero/hero-img.png" alt="Viajera con mochila" width={600} height={600} className={styles.heroImage} />
        </div>
      </div>
      {/* <div className={styles.category}>
        <h5 className={styles.categoryTitle}>Categorías</h5>
        <h3>Explora Nuestras Recomendaciones.</h3>
        <div className={styles.cardsContainer}>
          <div className={styles.cardCategory}>
            <Image src="/img/category/icon1.png" alt="Service" width={120} height={170} className={styles.cardImage}/>
            <h4>Reportes de clima</h4>
            <p>Conoce los diferentes climas de cada región.</p>
          </div>
          <div className={styles.cardCategory}>
            <Image src="/img/category/icon2.png" alt="Service" width={300} height={410} className={styles.cardImage}/>
            <h4>Mejores vuelos</h4>
            <p>Descubre los destinos más impresionantes del mundo.</p>
          </div>
          <div className={styles.cardCategory}>
            <Image src="/img/category/icon3.png" alt="Service" width={300} height={410} className={styles.cardImage}/>
            <h4>Eventos locales</h4>
            <p>Descubre los próximos eventos que se realizarán en tu ciudad.</p>
          </div>
          <div className={styles.cardCategory}>
            <Image src="/img/category/icon4.png" alt="Service" width={300} height={410} className={styles.cardImage}/>
            <h4>Personalización</h4>
            <p>Brindamos servicios de aviación subcontratados para clientes militares.</p>
          </div>
        </div>
      </div> */}
      <div className={styles.sold}>
        <h5 className={styles.soldTitle}>Más vendidos</h5>
        <h3>Inspírate Con Nuestras Recomendaciones Y Arma Tu Viaje Ideal</h3>
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <Image src="/img/dest/dest1.jpg" alt="Roma, Italia" width={300} height={410} className={styles.cardImage}/>
            <h4>Roma, Italia</h4>
            <p>$5.42k</p>
            <p>10 Days Trip</p>
          </div>
          <div className={styles.card}>
            <Image src="/img/dest/dest2.jpg" alt="Londres, Inglaterra" width={300} height={410} className={styles.cardImage}/>
            <h4>Londres, Inglaterra</h4>
            <p>$4.2k</p>
            <p>12 Days Trip</p>
          </div>
          <div className={styles.card}>
            <Image src="/img/dest/dest3.jpg" alt="Notre Dame, Francia" width={300} height={410} className={styles.cardImage}/>
            <h4>Notre Dame, Francia</h4>
            <p>$15k</p>
            <p>28 Days Trip</p>
          </div>
        </div>
      </div>
      {/* <div className={styles.booking}>
        <h5 className={styles.bookingTitle}>Planifica Tu Viaje En Solo Unos Clics</h5>
        <h3>Reserva Tu Próximo Viaje En 3 Sencillos Pasos</h3>
      </div>
      <div className={styles.comments}>
        <h5 className={styles.commentsTitle}>Opiniones de viajeros como tú</h5>
        <h3>¿Qué Dice La Gente Sobre Nosotros?</h3>
      </div> */}
      <div className={styles.send}>
        <div className={styles.box}>
          <h2>Encuentra el viaje perfecto con nuestra búsqueda avanzada</h2>
          <input type="email" placeholder="Ingresa tu email" className={styles.input}/>
          <button className={styles.sendButton}>Enviar</button>
        </div>
      </div>
      <Footer/>
    </div>
  );
}