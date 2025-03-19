import styles from "./main.module.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

async function getPackages() {
    const res = await fetch("http://localhost:3000/api/packages");
    if (!res.ok) {
        throw new Error("Failed to fetch packages");
    }
    return res.json();
}

export default async function Packages() {
    const packages = await getPackages();

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.packages}>
                <h4>¡Descubre todos los paquetes que tenemos para ti!</h4>
                <div className={styles.cardContainer}>
                    {packages.map((pkg) => (
                        <div key={pkg.id} className={styles.card}>
                            <img src={pkg.imagen} alt={pkg.nombre_lugar} className={styles.cardImgTop} />
                            <div className={styles.cardBody}>
                                <h5 className={styles.cardTitle}>{pkg.nombre_lugar}</h5>
                                <p className={styles.cardText}>{pkg.descripcion}</p>
                            </div>
                            <ul className={styles.listGroup}>
                                <li className={styles.listGroupItem}>{pkg.paquete}</li>
                                <li className={styles.listGroupItem}>Precio final: ${pkg.precio}</li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}