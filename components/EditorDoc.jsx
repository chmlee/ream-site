import ReactMarkdown from 'react-markdown'; // temp
import styles from './EditorDoc.module.css';

export default function EditorDoc({ input }) {
    return (
        <div className={styles.doc}>
            <ReactMarkdown>{input}</ReactMarkdown>
        </div>
    )
}
