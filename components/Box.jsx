import styles from './Box.module.scss'

export default function Box({ typ, text }) {

    return (
        <div className={styles['box-wrapper']}>
            <div className={`${styles['box-container']} ${styles[typ]}`}>
                <div className={styles.title}>
                    { typ.toUpperCase() }
                </div>
                <div className={styles.text}>
                    { text }
                </div>
            </div>
        </div>
    )
}
