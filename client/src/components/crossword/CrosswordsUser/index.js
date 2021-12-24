import React, {useState} from 'react';
import {SolveCrossword} from "../SolveCrossword";
import {Link} from "react-router-dom";

const CrosswordsUser = () => {
    const [crossName, setCrossName] = useState("Общий 15 17");

    return (
        <section>
            <p>Выберите кроссворд для разгадывания:</p>
            <Link to={`/crosswords/solve/${crossName}`}>Общий 15 17</Link>

            <input type='file'></input>
        </section>
    );
};

export { CrosswordsUser };
