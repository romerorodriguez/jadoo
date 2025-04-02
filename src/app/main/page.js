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
            <Navbar />
            <div className={styles.searchContainer}>
                    <input 
                        type="text" 
                        placeholder="Buscar..." 
                        className={styles.searchInput}
                    />
                </div>
            <div className={styles.packages}>
                {Object.entries(groupedPackages).map(([categoria, paquetes]) => (
                    <div key={categoria}>
                        <h4>{categoria}</h4>
                        <div className={styles.cardContainer}>
                            {paquetes.map((pkg) => (
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
                ))}
            </div>
            <Footer />
        </div>
    );
}