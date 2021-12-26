import React, { useState, useEffect } from 'react';

import { CrosswordTable } from '../CrosswordTable';

import './style.css';


const GenerateCrossword = ({ width, height, dictName }) => {
    const [respCross, setRespCross] = useState({});
    const [crossword, setCrossword] = useState([]);
    const [crossName, setCrossName] = useState("Без имени");

    useEffect(() => {
        fetch(`http://localhost:8080/generate?n=${height}&m=${width}&dictionary=${dictName}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setRespCross(data.crossword);
                setCrossword(data.crossword.words);
            })
            .then(()=>{
                const table = document.getElementsByClassName('table').item(0).childNodes.item(0).childNodes;
                table.forEach((tr)=>{
                    tr.childNodes.forEach((td)=>{
                        td.style = "background-color:black";
                    })
                })
            })
            .then(() => {
                const table = document.getElementsByClassName('table').item(0).childNodes.item(0).childNodes;
                crossword.forEach(
                    function (notion) {
                        if (notion.direction==-1) {
                            for (let k = notion.i; k < notion.word.length+notion.i; k++) {
                                table.item(k).childNodes.item(notion.j).style = "background-color:white";
                                table.item(k).childNodes.item(notion.j).textContent = notion.word[k-notion.i];
                                table.item(k).childNodes.item(notion.j).key = notion.word+": "+notion.definition;
                            }
                        }
                        else{
                            for (let k1 = notion.j; k1 < notion.word.length+notion.j; k1++) {
                                table.item(notion.i).childNodes.item(k1).style = "background-color:white";
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
        else
            document.getElementsByClassName('definitions').item(0).value = "";
    }

    const save = (e)=>{
        fetch(`http://localhost:8080/save_crossword?name=${crossName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(respCross),
        })
            .then((response) => {
                if (response.status==201) {
                    alert("Кроссворд сохранен!");
                    console.log("Сохранен");
                }
                return response.json();
            })
            .catch((error) => {
                console.log('error: ', error.message);
            });
    }
    const download = (e) => {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(respCross)));
        pom.setAttribute('download', crossName+'.kros');

        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        }
        else {
            pom.click();
        }
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

                <input type='text' placeholder='Название кроссворда' onChange={(e)=>{
                    setCrossName(e.target.value);
                    respCross.name = crossName;}}
                />

                <div>
                    <button onClick={download}>Скачать</button>
                    <button onClick={save}>Сохранить</button>
                </div>
            </section>
        </section>
    );
};

export { GenerateCrossword };
