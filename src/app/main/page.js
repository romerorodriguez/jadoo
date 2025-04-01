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
            <div className={styles.section}>
                <div className={styles.content}>
                    <h2>Paquete de viajes</h2>
                    <div className={styles.searchContainer}>
                        <div className={styles.searchGroup}>
                            <label htmlFor="origin">Destino</label>
                            <input 
                                type="text" 
                                id="origin" 
                                placeholder="Buscar destinos"
                                className={styles.searchInput}
                            />
                        </div>
                        <div className={styles.searchGroup}>
                            <label htmlFor="check-in">Fechas</label>
                            <div className={styles.dateInputs}>
                                <input 
                                    type="text" 
                                    id="check-in" 
                                    placeholder="Agrega tu fecha de llegada"
                                    className={styles.searchInput}
                                />
                                <input 
                                    type="text" 
                                    id="check-out" 
                                    placeholder="Agrega tu fecha de salida"
                                    className={styles.searchInput}
                                />
                            </div>
                        </div>
                        <div className={styles.searchGroup}>
                            <label htmlFor="rooms">Habitaciones</label>
                            <div className={styles.roomInput}>
                                <button className={styles.roomButton}>-</button>
                                <input 
                                    type="text" 
                                    id="rooms" 
                                    value="1" 
                                    readOnly
                                    className={styles.roomCount}
                                />
                                <button className={styles.roomButton}>+</button>
                            </div>
                        </div>
                        <button className={styles.searchButton}>Buscar</button>
                    </div>
                </div>
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