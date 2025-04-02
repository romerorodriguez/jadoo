import styles from "./delete.module.css"; 

export default function Delete() {
    return (
        <div className={styles.container}>
            <div className={styles.confirmationBox}>
                <p>¿Seguro de eliminar el paquete?</p>
                <div className={styles.buttonsContainer}>
                    <button className={styles.confirmButton}>Confirmar</button>
                    <button className={styles.cancelButton}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}