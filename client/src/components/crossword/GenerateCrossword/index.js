import React, { useState, useEffect } from 'react';

import { CrosswordTable } from '../CrosswordTable';

import './style.css';


const GenerateCrossword = ({ width, height, dictName }) => {
    const [crossword, setCrossword] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/generate?n=${width}&m=${height}&dictionary=${dictName}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCrossword(data.crossword.words);
            })
            .then(() => {
                const table = document.getElementsByClassName('table').item(0).childNodes.item(0).childNodes;
                crossword.forEach(
                    function (notion) {
                        if (notion.direction==-1) {
                            for (let k = notion.i; k < notion.word.length+notion.i; k++) {
                                table.item(k).childNodes.item(notion.j).textContent = notion.word[k-notion.i];
                                table.item(k).childNodes.item(notion.j).key = notion.word+": "+notion.definition;
                            }
                        }
                        else{
                            for (let k1 = notion.j; k1 < notion.word.length+notion.j; k1++) {
                                table.item(notion.i).childNodes.item(k1).textContent = notion.word[k1-notion.j];
                                table.item(notion.i).childNodes.item(k1).key = notion.word+": "+notion.definition;
                            }
                        }
                    }
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }, [width, height, dictName, crossword]);

    const onCellClick = (e)=>{
        if (e.target.key!=undefined)
            document.getElementsByClassName('definitions').item(0).value = e.target.key;
    }

    return (
        <section className='crossword-generate'>
            <section className='crossword-generate__table'>
                <CrosswordTable
                    width={width}
                    height={height}
                    setCellsChosen={(e)=>{}}
                    wordChosen={[]}
                    setWordChosen={(e)=>{}}
                    onCellClick={onCellClick}
                />
            </section>

            <section className='crossword-generate__info'>
                <p>Словарь: {dictName}</p>

                <textarea className="definitions" rows={20} cols={33} readOnly={true}/>

                <input type='text' placeholder='Название кроссворда' />

                <div>
                    <button>Скачать</button>
                    <button>Сохранить</button>
                </div>
            </section>
        </section>
    );
};

export { GenerateCrossword };
