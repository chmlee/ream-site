import { useState } from 'react';
import init, { ream2csv } from 'reamc';

export default function Editor() {

    const outputModes = [
        { id: 'table', display: 'Table' },
        { id: 'doc', display: 'Doc' },
        { id: 'csv', display: 'CSV' },
    ]
    const [ outputMode, setOutputMode ] = useState(outputModes[0].id);
    const [ result, setResult ] = useState([[]]);
    const [ autoCompile, setAutoCompile ] = useState(true);
    const [ error, setError ] = useState('');

    async function compile(input) {
        await init()

        const result = ream2csv(input)
        console.log(result)
        if (Array.isArray(result)) {
            setError('no error')
            return ream2csv(input)
        } else if (result !== null) {
            const e = Object.keys(result).map(key => {
                const msg = [ key, result[key] ].join(": ")
                return msg
            })[0]
            setError(e)
        }
    }

    async function updateInput(e) {
        if (!autoCompile) return null

        const input = e.target.value
        const result = await compile(input)
        setResult(result)
    }

    async function toggleCompile(e) {
        const input = e.target.parentElement.querySelector("#input").value
        const result = await compile(input)
        setResult(result)
    }

    function updateOutputMode(e) {
        outputMode = e.target.id;
        setOutputMode(outputMode, outputMode)
    }


    function updateAutoCompile(e) {
        setAutoCompile(!autoCompile)
    }



    return (
        <div className="editor-container">
            <div class="editor-tab">Input</div>
            <textarea 
                className="input"
                id="input" 
                name="" 
                cols="30" 
                rows="10"
                onChange={updateInput}
            />
            <div className="output-mode-option-container">
            {
                outputModes.map(mode => {
                    return (
                        <div 
                            className="editor-tab output-mode"
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
            <Output 
                result={result}
                outputMode={outputMode}
            />
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
            <div class="error-message">
                {error}
            </div>
        </div>
    )

}

function Output({ result, outputMode }) {

    //console.log(result, outputMode)

    return (
        <div className="output-container">
            Output
        </div>
    )
}

function Spreadsheet({ array, style }) {
    //console.log(array)
    return (
        <table style={style}>
        <tbody>
            {
                array.map((row, i) => {
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

