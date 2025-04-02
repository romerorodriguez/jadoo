import styles from "./blog.module.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getBlogs(searchQuery = "") {
    const res = await fetch("http://localhost:3000/api/blogs");
    if (!res.ok) {
        throw new Error("Failed to fetch blogs");
    }
    
    const blogs = await res.json();
    
    if (searchQuery) {
        const lowerSearchQuery = searchQuery.toLowerCase();
        const filteredBlogs = blogs.filter(blog => {
            const title = blog.title?.toLowerCase() || '';
            const description = blog.description?.toLowerCase() || '';
            const content = blog.content?.toLowerCase() || '';
            
            return title.includes(lowerSearchQuery) ||
                   description.includes(lowerSearchQuery) ||
                   content.includes(lowerSearchQuery);
        });
        
        // Si no hay resultados, redirigir a 404
        if (filteredBlogs.length === 0) {
            redirect("/error404");
        }
        
        return filteredBlogs;
    }
    
    return blogs;
}
export default async function Blog({ searchParams }) {
    const searchQuery = searchParams?.q || "";
    const blogs = await getBlogs(searchQuery);

    return (
        <div>
            <Navbar />
            <main className={styles.container}>
                <h1 className={styles.title}>Blog de Viajes</h1>
                <p className={styles.subtitle}>
                    Descubre consejos, destinos y experiencias que te inspirarán a explorar el mundo.
                </p>
                <div className={styles.searchContainer}>
                    <form action="/blog" method="GET">
                        <input 
                            type="text" 
                            name="q"
                            placeholder="Buscar..." 
                            className={styles.searchInput}
                            defaultValue={searchQuery}
                        />
                        <button type="submit" className={styles.searchButton}>Buscar</button>
                    </form>
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
                                    <Link href={`/blog/${blog.id}`} className={styles.readMore}>Leer más</Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    <aside className={styles.rightColumn}>
                        <h3 className={styles.popularPostsTitle}>Publicaciones populares:</h3>
                        <ul className={styles.popularPostsList}>
                            {blogs.slice(0, 10).map((blog) => ( 
                                <li key={blog.id}>
                                    <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
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