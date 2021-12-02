import { useState } from 'react';
import init, { ream2csv } from 'reamc';
import ReactMarkdown from 'react-markdown'; // temp

import styles from './Editor.module.css';



export default function Editor() {

    const outputModes = [
        { id: 'table', display: 'Table' },
        { id: 'doc', display: 'Doc' },
        { id: 'csv', display: 'CSV' },
    ]
    const [ outputMode, setOutputMode ] = useState(outputModes[0].id);
    const [ input, setInput ] = useState('# Data');
    const [ result, setResult ] = useState([[]]);
    const [ autoCompile, setAutoCompile ] = useState(true);
    const [ error, setError ] = useState('');

    async function compile(input) {
        await init()

        setInput(input)
        const result = ream2csv(input)
        if (Array.isArray(result)) {
            setError('')
            setResult(result)
        } else if (result !== null) {
            const e = Object.keys(result).map(key => {
                const msg = [ key, result[key] ].join(": ")
                return msg
            })[0]
            setError(e)
        }
    }

    async function updateInput(e) {
        if (autoCompile) {
            const input = e.target.value
            compile(input)
        }
    }

    async function toggleCompile(e) {
        const input = e
            .target
            .parentElement
            .parentElement
            .querySelector("#input")
            .value
        await compile(input)
    }

    function updateOutputMode(e) {
        setOutputMode(e.target.id)
    }

    function updateAutoCompile(e) {
        setAutoCompile(!autoCompile)
    }

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={`${styles.column} ${styles['input-column']}`}>
                    <div className={styles['textarea-container']}>
                        <textarea 
                            className="input"
                            id="input" 
                            name="" 
                            onChange={updateInput}
                            //value={input}
                        />
                    </div>
                </div>
                <div className={`${styles.column} ${styles['output-column']}`}>
                    <div className={styles.tabs}>
                    {
                        outputModes.map(mode => {
                            return (
                                <div 
                                    className={styles.tab}
                                    id={mode.id}
                                    key={mode.id}
                                    onClick={updateOutputMode}
                                >
                                {mode.display}
                                </div>
                            )
                        })
                    
                    }
                    </div>
                    <div className={styles['output-container']}>
                        <Output 
                            key={outputMode}
                            result={result}
                            input={input}
                            outputMode={outputMode}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.settings}>
                <button onClick={toggleCompile}>
                    Compile
                </button>
                <label className="autoCompileButton">
                    <input 
                        type="checkbox" 
                        onChange={updateAutoCompile}
                        defaultChecked={autoCompile}
                    />
                    <span>Auto Update</span>
                </label>
                <div className={styles['error-message']}>
                    {error}
                </div>
            </div>
        </div>
    )

}

function Output({ result, input, outputMode }) {

    if (outputMode === 'table') {
        return (<Table result={result} />)
    } else if (outputMode === 'doc') {
        return <Doc input={input}/>
    } else if (outputMode === 'csv') {
        return <CSV result={result} />
    }
}

function CSV({ result }) {
    const raw = result.map(row => row.join(',')).join('\n');
    return (
        <div className="csv-wrapper">
            <pre>{raw}</pre>
        </div>
    )
}

function Doc({ input }) {
    return (
        <div className="doc">
            <ReactMarkdown>{input}</ReactMarkdown>
        </div>
    )
}

function Table({ result }) {
    return (
        <table>
        <tbody>
            {
                result.map((row, i) => {
                    return (
                        <tr key={i}>
                            {row.map((cell, j) => {
                                return (
                                    <td key={`${i}-${j}`}>
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

