"use client";
import styles from "./blog.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar2 from "@/components/navbar2";
import Footer from "@/components/footer";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function Blog() {
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            const res = await fetch("/api/blogs");
            if (!res.ok) throw new Error("Error al obtener los blogs");
            const data = await res.json();
            setBlogs(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div>
            <main className={styles.container}>
                <Navbar2/>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Blog de Viajes</h1>
                    <button className={styles.editTitleButton}>
                        <FiEdit className={styles.editIcon} />
                    </button>
                </div>
                <p className={styles.subtitle}>
                    Descubre consejos, destinos y experiencias que te inspirarán a explorar el mundo.
                </p>
                <Link href="/createblogs">
                    <button className={styles.addButton}>Crear blog</button>
                </Link>
                <div className={styles.mainContent}>
                <div className={styles.leftColumn}>
                {blogs.map((blog) => (
                        <article key={blog.id} className={styles.article}>
                            <div className={styles.imageContainer}>
                                <img src={blog.image} alt={blog.title} className={styles.articleImage} />
                                <div className={styles.articleActions}>
                                </div>
                            </div>
                            <div className={styles.articleContent}>
                                <div className={styles.articleHeader}>
                                    <h2 className={styles.articleTitle}>{blog.title}</h2>
                                    <div className={styles.articleButtons}>
                                            <button className={styles.smallActionButton}>
                                                <FiEdit className={styles.smallActionIcon} />
                                            </button>
                                            <button className={styles.smallActionButton}>
                                                <FiTrash2 className={styles.smallActionIcon} />
                                            </button>
                                    </div>
                                </div>
                                <p className={styles.articleMeta}>Escrito por: {blog.author} • {blog.date}</p>
                                    <p className={styles.articleDescription}>{blog.description}</p>
                                    <Link href="/new" className={styles.readMore}>Read More</Link>
                            </div>
                        </article>
                    ))}
                </div>
                <aside className={styles.rightColumn}>
                        <div className={styles.popularHeader}>
                            <h3 className={styles.popularPostsTitle}>Popular posts:</h3>
                        </div>
                        <ul className={styles.popularPostsList}>
                            {blogs.slice(0, 10).map((blog) => ( 
                                <li key={blog.id} className={styles.popularItem}>
                                    {blog.title}
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </main>
            <Footer />
        </div>
    );
}