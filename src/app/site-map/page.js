import Footer from '@/components/footer';
import styles from './site-map.module.css';
import Navbar from '@/components/navbar';

export default function SiteMap() {
    return (
        <div>
            <Navbar />
            <main className={styles.container}>
                <h1 className={styles.title}>Mapa de Sitio</h1>
                <section className={styles.sitemap}>
                    <div className={styles.sitemapSection}>
                        <h2>Páginas Principales</h2>
                        <ul>
                            <li><a href="/">Inicio</a></li>
                            <li><a href="/">Sobre Nosotros</a></li>
                            <li><a href="/">Contacto</a></li>
                            <li><a href="/">Política de Privacidad</a></li>
                            <li><a href="/">Términos y Condiciones</a></li>
                        </ul>
                    </div>

                    <div className={styles.sitemapSection}>
                        <h2>Destinos</h2>
                        <ul>
                            <li><a href="/destinos/nacionales">Destinos Nacionales</a></li>
                            <li><a href="/destinos/internacionales">Destinos Internacionales</a></li>
                            <li><a href="/destinos/populares">Destinos Populares</a></li>
                            <li><a href="/destinos/exoticos">Destinos Exóticos</a></li>
                        </ul>
                    </div>

                    <div className={styles.sitemapSection}>
                        <h2>Servicios</h2>
                        <ul>
                            <li><a href="/vuelos">Vuelos</a></li>
                            <li><a href="/hoteles">Hoteles</a></li>
                            <li><a href="/paquetes-turisticos">Paquetes Turísticos</a></li>
                            <li><a href="/cruceros">Cruceros</a></li>
                            <li><a href="/alquiler-de-coches">Alquiler de Coches</a></li>
                            <li><a href="/seguros-de-viaje">Seguros de Viaje</a></li>
                        </ul>
                    </div>

                    <div className={styles.sitemapSection}>
                        <h2>Ofertas</h2>
                        <ul>
                            <li><a href="/ofertas-especiales">Ofertas Especiales</a></li>
                            <li><a href="/ultima-hora">Última Hora</a></li>
                            <li><a href="/descuentos">Descuentos</a></li>
                            <li><a href="/viajes-en-grupo">Viajes en Grupo</a></li>
                        </ul>
                    </div>

                    <div className={styles.sitemapSection}>
                        <h2>Blog y Recursos</h2>
                        <ul>
                            <li><a href="/blog">Blog de Viajes</a></li>
                            <li><a href="/guias-de-viaje">Guías de Viaje</a></li>
                            <li><a href="/consejos-para-viajar">Consejos para Viajar</a></li>
                            <li><a href="/testimonios">Testimonios</a></li>
                        </ul>
                    </div>

                    <div className={styles.sitemapSection}>
                        <h2>Atención al Cliente</h2>
                        <ul>
                            <li><a href="/soporte">Soporte</a></li>
                            <li><a href="/reclamaciones">Reclamaciones</a></li>
                            <li><a href="/chat-en-vivo">Chat en Vivo</a></li>
                        </ul>
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    );
}