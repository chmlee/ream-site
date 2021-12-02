import styles from './EditorCSV.module.css';

export default function CSV({ result }) {
    const raw = result.map(row => row.join(',')).join('\n');
    return (
        <div className={styles['csv-wrapper']}>
            <pre>{raw}</pre>
        </div>
    )
}
