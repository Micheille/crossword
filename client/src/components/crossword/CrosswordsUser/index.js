import React, {useState} from 'react';
import {SolveCrossword} from "../SolveCrossword";
import {Link} from "react-router-dom";

const CrosswordsUser = () => {
    const [manualStep, setManualStep] = useState(0);
    const [crossName, setCrossName] = useState("Oбщий 15*17");
    const onCrosswordChosen = (e)=>{
        setManualStep(1);
        console.log(e.target.innerText);
        setCrossName(e.target.innerText);
    }

    /*
    return (
        <section>
            <p>Выберите кроссворд для разгадывания:</p>
            <Link to={{pathname:'/crosswords/solve', crossName:crossName}}>Oбщий 15*17</Link>

            <input type='file'></input>
        </section>
    );
    */

    switch (manualStep) {
        case 0:
            return (
                <section>
                    <p>Выберите кроссворд для разгадывания:</p>
                    <Link to='/crosswords/solve' params = {{crossName:crossName}}/>
                    <button onClick={onCrosswordChosen}>Общий 15 17</button>
                    <input type='file'></input>
                </section>
            );
            break;
        case 1:
            return (
                <SolveCrossword
                    crossName={crossName}
                />
            );
            break;
        default:
            return (
                <section>
                    <p>Выберите кроссворд для разгадывания:</p>
                    <button onClick={onCrosswordChosen}>Общий 15 17</button>
                    <input type='file'></input>
                </section>
            );
            break;
    }
};

export { CrosswordsUser };
