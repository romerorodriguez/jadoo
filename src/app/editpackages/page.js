import styles from "./edit.module.css";

export default function Create() {

    return (
        <div className={styles.container}>
            <h1>Editar paquete</h1>
            <form className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="category" className={styles.label}>Categoría:</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        className={styles.input}
                        required 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="title" className={styles.label}>Título:</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        className={styles.input}
                        required 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.label}>Descripción:</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        rows="5"
                        className={styles.textarea}
                        required
                    ></textarea>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="price" className={styles.label}>Paquete:</label>
                    <input 
                        type="text" 
                        id="package" 
                        name="package" 
                        className={styles.input}
                        required 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="author" className={styles.label}>Precio:</label>
                    <input 
                        type="text" 
                        id="descripcion" 
                        name="description"
                        rows="5"
                        className={styles.input}
                        required 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="image" className={styles.label}>Imagen:</label>
                    <input 
                        type="file" 
                        id="image" 
                        name="image" 
                        accept="image/*"
                        className={styles.fileInput}
                        required 
                    />
                </div>  
                <button type="submit" className={styles.submitButton}>
                    Editar paquete
                </button>
            </form>
        </div>
    );
}