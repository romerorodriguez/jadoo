import styles from "./blog.module.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link"; 

async function getBlogs() {
    const res = await fetch("http://localhost:3000/api/blogs");
    if (!res.ok) {
        throw new Error("Failed to fetch blogs");
    }
    return res.json();
}

export default async function Blog() {
    const blogs = await getBlogs();

    return (
        <div>
            <Navbar />
            <main className={styles.container}>
                <h1 className={styles.title}>Blog de Viajes</h1>
                <p className={styles.subtitle}>
                Descubre consejos, destinos y experiencias que te inspirarán a explorar el mundo.
                </p>
                <div className={styles.searchContainer}>
                    <input 
                        type="text" 
                        placeholder="Buscar..." 
                        className={styles.searchInput}
                    />
                </div>
                <div className={styles.mainContent}>
                    <div className={styles.leftColumn}>
                        {blogs.map((blog) => (
                            <article key={blog.id} className={styles.article}>
                                <img src={blog.image} alt={blog.title} className={styles.articleImage} />
                                <div className={styles.articleContent}>
                                    <h2 className={styles.articleTitle}>{blog.title}</h2>
                                    <p className={styles.articleMeta}>Escrito por: {blog.author} • {blog.date}</p>
                                    <p className={styles.articleDescription}>{blog.description}</p>
                                    <Link href="/new" className={styles.readMore}>Read More</Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    <aside className={styles.rightColumn}>
                        <h3 className={styles.popularPostsTitle}>Popular posts:</h3>
                        <ul className={styles.popularPostsList}>
                            {blogs.slice(0, 10).map((blog) => ( 
                                <li key={blog.id}>{blog.title}</li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </main>
            <Footer />
        </div>
    );
}