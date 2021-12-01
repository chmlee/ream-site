import { useState } from 'react';
import init, { ream2csv } from 'reamc';

export default function Editor() {

    const [ output, setOutput ] = useState([[]]);
    const [ error, setError ] = useState('');

    async function update(e) {
        await init();
        const new_input = e.target.value
        const output = ream2csv(new_input)
        if (Array.isArray(output)) {
            setOutput(output)
            setError("")
        } else if (output !== null) {
            const e = Object.keys(output).map(key => {
                const msg = [ key, output[key] ].join(": ");
                return msg
            })[0];
            setError(e);
        }
    }

    return (
        <div className="editor-container">
            <textarea 
                className="input"
                id="" 
                name="" 
                cols="30" 
                rows="10"
                onChange={update}
            />
            <div className="error" >
                {error}
            </div>
            <Spreadsheet 
                className="output"
                array={output}
            />
        </div>
    )
}

function Spreadsheet({ array, style }) {
    console.log(array)
    return (
        <table style={style}>
        <tbody>
            {
                array.map(row => {
                    return (
                        <tr>
                            {row.map(cell => <td>{cell}</td>)}
                        </tr>
                    )
                })
            }
        </tbody>
        </table>
    )
}

