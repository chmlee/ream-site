import styles from './EditorTable.module.css';

export default function EditorTable({ result }) {
    return (
        <table  className={styles.table}>
        <tbody>
            {
                result.map((row, i) => {
                    const x = `${i % 2 === 0 ? 'even' : 'odd'}-row`;
                    return (
                        <tr key={i} className={`${styles['table-row']} ${styles[x]}`}>
                            {row.map((cell, j) => {
                                return (
                                    <td key={`${i}-${j}`} className={styles.cell}>
                                        {cell}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })
            }
        </tbody>
        </table>
    )
}

