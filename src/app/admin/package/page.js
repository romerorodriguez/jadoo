"use client";
import { useState, useEffect } from "react";
import styles from "./package.module.css";
import Footer from "@/components/footer";
import Navbar2 from "@/components/navbar2";
import Link from "next/link";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function Packages() {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        async function fetchPackages() {
            try {
                const res = await fetch("/api/packages");
                if (!res.ok) {
                    throw new Error("Failed to fetch packages");
                }
                const data = await res.json();
                setPackages(data);
            } catch (error) {
                console.error("Error fetching packages:", error);
            }
        }
        fetchPackages();
    }, []);

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
            <Navbar2 />
            <div className={styles.packages}>
                <Link href="/createpackage">
                    <button className={styles.addButton}>Crear paquete</button>
                </Link>
                {Object.entries(groupedPackages).map(([categoria, paquetes]) => (
                    <div key={categoria} className={styles.categoryContainer}>
                        <div className={styles.categoryHeader}>
                            <h4>{categoria}</h4>
                        </div>
                        <div className={styles.cardContainer}>
                            {paquetes.map((pkg) => (
                                <div key={pkg.id} className={styles.card}>
                                    <div className={styles.imageContainer}>
                                        <img src={pkg.imagen} alt={pkg.nombre_lugar} className={styles.cardImgTop} />
                                        <div className={styles.imageActions}>
                                            <Link href="/editpackages">
                                                <button className={styles.actionButton}>
                                                    <FiEdit className={styles.icon} />
                                                </button>
                                            </Link>
                                            <Link href={`/deletepackage?id=${pkg.id}`}>
                                                <button className={styles.actionButton}>
                                                    <FiTrash2 className={styles.icon} />
                                                </button>
                                            </Link>
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
