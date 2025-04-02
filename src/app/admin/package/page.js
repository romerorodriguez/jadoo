import styles from "./package.module.css"
import Footer from "@/components/footer";
import Navbar2 from "@/components/navbar2";
import Link from "next/link";
import { FiEdit, FiTrash2 } from "react-icons/fi";

async function getPackages() {
    const res = await fetch("http://localhost:3000/api/packages");
    if (!res.ok) {
        throw new Error("Failed to fetch packages");
    }
    return res.json();
}

export default async function Packages() {
    const packages = await getPackages();

    // Agrupar los paquetes por categoría
    const groupedPackages = packages.reduce((acc, pkg) => {
        if (!acc[pkg.categoria]) {
            acc[pkg.categoria] = [];
        }
        acc[pkg.categoria].push(pkg);
        return acc;
    }, {});

    return (
        <div className={styles.container}>
            <Navbar2/>
            <div className={styles.packages}>
                <Link href="/createpackage">
                    <button className={styles.addButton}>Crear paquete</button>
                </Link>
                {Object.entries(groupedPackages).map(([categoria, paquetes]) => (
                    <div key={categoria} className={styles.categoryContainer}>
                        <div className={styles.categoryHeader}>
                            <h4>{categoria}</h4>
                            <div className={styles.categoryActions}>
                                <button className={styles.actionButton}>
                                    <FiEdit className={styles.icon} />
                                </button>
                                <button className={styles.actionButton}>
                                    <FiTrash2 className={styles.icon} />
                                </button>
                            </div>
                        </div>
                        <div className={styles.cardContainer}>
                            {paquetes.map((pkg) => (
                                <div key={pkg.id} className={styles.card}>
                                    <div className={styles.imageContainer}>
                                        <img src={pkg.imagen} alt={pkg.nombre_lugar} className={styles.cardImgTop} />
                                        <div className={styles.imageActions}>
                                            <button className={styles.actionButton}>
                                                <FiEdit className={styles.icon} />
                                            </button>
                                            <button className={styles.actionButton}>
                                                <FiTrash2 className={styles.icon} />
                                            </button>
                                        </div>
                                    </div>
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
                ))}
            </div>
            <Footer />
        </div>
    );
}