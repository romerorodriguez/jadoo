import Image from "next/image";
import Link from "next/link"; 
import styles from "../assets/css/navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Image src="/img/logo.svg" alt="Service" width={90} height={80} className={styles.cardImage} />
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/" className={styles.navLink}>Destinos</Link>
        <Link href="/main" className={styles.navLink}>Paquetes</Link>
        <Link href="/blog" className={styles.navLink}>Blogs</Link>
        <Link href="/" className={styles.navLink}>Contacto</Link>
        <Link href="/login">
          <button className={styles.loginButton}>Inicia sesión</button>
        </Link>
      </div>
    </div>
  );
}

// import Image from "next/image";
// import Link from "next/link"; 
// import styles from "../assets/css/navbar.module.css";

// export default function Navbar() {
//   return (
//     <div className={styles.container}>
//       <div className={styles.navbar}>
//         <Image src="/img/logo.svg" alt="Service" width={90} height={80} className={styles.cardImage} />
//         <Link href="/" className={styles.navLink}>Home</Link>
//         <Link href="/" className={styles.navLink}>Destinos</Link>
//         <Link href="/main" className={styles.navLink}>Paquetes</Link>
//         <Link href="/contact" className={styles.navLink}>Contacto</Link>
//         <Link href="/blog" className={styles.navLink}>Blogs</Link>
//         <Link href="/login">
//           <button className={styles.loginButton}>Inicia sesión</button>
//         </Link>
//         <Link href="/">
//           <button className={styles.loginButton}>Cerrar sesión</button>
//         </Link>
//       </div>
//     </div>
//   );
// }