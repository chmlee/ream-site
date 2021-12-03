import { useState } from 'react';
import dynamic from 'next/dynamic'
import init, { ream2csv } from 'reamc';

import EditorDoc from './EditorDoc.jsx';
import EditorCSV from './EditorCSV.jsx';
import EditorTable from './EditorTable.jsx';

import styles from './Editor.module.css';

export default function Editor({ source }) {


    const defaultText = source.trim()
    let n = defaultText.split(`\n`).length + 8;
    if (n < 10) {
        n = 10
    } else if (n > 30) {
        n = 30
    }
    console.log(n)
    const height = `${n}em`;
    const columnStyle = { height: height }

    const outputModes = [
        { id: 'table', display: 'Table' },
        { id: 'doc', display: 'Doc' },
        { id: 'csv', display: 'CSV' },
    ]
    const [ outputMode, setOutputMode ] = useState(outputModes[0].id);
    const [ input, setInput ] = useState(source);
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

    async function updateOutputMode(e) {
        const input = e
            .target
            .parentElement
            .parentElement
            .parentElement
            .querySelector("#input")
            .value;
        await compile(input);
        setOutputMode(e.target.id)
    }

    function updateAutoCompile(e) {
        setAutoCompile(!autoCompile)
    }

    return (
        <div className={styles.container}>
            <div className={styles.row} style={columnStyle}>
                <div className={`${styles.column} ${styles['input-column']}`}>
                    <div className={styles['textarea-container']}>
                        <textarea 
                            className="input"
                            id="input" 
                            name="" 
                            onChange={updateInput}
                            defaultValue={defaultText}
                        />
                    </div>
                </div>
                <div className={`${styles.column} ${styles['output-column']}`}>
                    <div className={styles.tabs}>
                    {
                        outputModes.map(mode => {
                            const x = mode.id === outputMode ? 'active' : 'inactive'
                            return (
                                <div 
                                    className={`${styles.tab} ${styles[x]}`}
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
                <label className={styles['autocompile-button']}>
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
        return (<EditorTable result={result} />)
    } else if (outputMode === 'doc') {
        return <EditorDoc input={input}/>
    } else if (outputMode === 'csv') {
        return <EditorCSV result={result} />
    }
}



