//import ReactMarkdown from 'react-markdown'; // temp

import Editor from './Editor.jsx';

import styles from './Feature.module.css';

export default function Feature({ title, detail, source }) {
    return (
        <div className={styles}>
            <h2 className="feature-title">
                { title }
            </h2>
            <div className="feature-detail">
                { detail }
                {//<ReactMarkdown>{ detail }</ReactMarkdown>
}            </div>
            <Editor source={source}/>
        </div>
    )
}
