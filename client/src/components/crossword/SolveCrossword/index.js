import React, { useState, useEffect } from 'react';

import { CrosswordTable } from '../CrosswordTable';

import './style.css';
import {useParams} from "react-router-dom";


const SolveCrossword = () => {
    const [crossword, setCrossword] = useState([]);
    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(10);
    const [result, setResult] = useState("");
    const correct = {};
    const {crossName} = useParams();
    let corAns = 0;

    useEffect(() => {
        fetch(`http://localhost:8080/browse_crossword?name=${crossName}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCrossword(data.crossword.words);
                setWidth(data.crossword.m);
                setHeight(data.crossword.n);
            })
            .then(()=>{
                const table = document.getElementsByClassName('table').item(0).childNodes.item(0).childNodes;
                table.forEach((tr)=>{
                    tr.childNodes.forEach((td)=>{
                        td.classList.add("table__cell_empty");
                    })
                })
            })
            .then(() => {
                const table = document.getElementsByClassName('table').item(0).childNodes.item(0).childNodes;
                crossword.forEach(
                    function (notion) {
                        if (notion.direction==-1) {
                            for (let k = notion.i; k < notion.word.length+notion.i; k++) {
                                table.item(k).childNodes.item(notion.j).classList.remove("table__cell_empty");
                                table.item(k).childNodes.item(notion.j).classList.add("table__cell_not-empty");
                                table.item(k).childNodes.item(notion.j).ans = notion.word[k-notion.i];
                                table.item(k).childNodes.item(notion.j).key = notion.definition;
                                if(table.item(k).childNodes.item(notion.j).words==undefined)
                                    table.item(k).childNodes.item(notion.j).words = [];
                                table.item(k).childNodes.item(notion.j).words.push(notion.word);
                            }
                        }
                        else{
                            for (let k1 = notion.j; k1 < notion.word.length+notion.j; k1++) {
                                table.item(notion.i).childNodes.item(k1).classList.add("table__cell_not-empty");
                                table.item(notion.i).childNodes.item(k1).ans = notion.word[k1-notion.j];
                                table.item(notion.i).childNodes.item(k1).key = notion.definition;
                                if(table.item(notion.i).childNodes.item(k1).words == undefined)
                                    table.item(notion.i).childNodes.item(k1).words = [];
                                table.item(notion.i).childNodes.item(k1).words.push(notion.word);
                            }
                        }
                    }
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }, [width, height, crossName, crossword]);


    const onCellClick = (e)=>{
        if (e.target.key!=undefined) {
            if(e.target.style.backgroundColor!='red'&&e.target.style.backgroundColor!='green')
                e.target.contentEditable = 'true';
            console.log(e.target.contentEditable);
            document.querySelectorAll(".table__cell_word-selected").forEach((el)=>{
                el.classList.remove("table__cell_word-selected");
            });
            document.querySelectorAll(".table__cell_not-empty").forEach((el)=>{
                if (el.words.includes(e.target.words[e.target.words.length-1])){
                    el.classList.add("table__cell_word-selected");
                }
            });
            document.getElementsByClassName('definitions').item(0).value = e.target.key;
        }
        else {
            e.target.classList.remove("table__cell_chosen");
            document.getElementsByClassName('definitions').item(0).value = result;
            document.querySelectorAll(".table__cell_word-selected").forEach((el)=>{
                el.classList.remove("table__cell_word-selected");
            });
        }
    }

    const onCheckClick = (e)=>{
        document.querySelectorAll(".table__cell_word-selected").forEach((el)=>{
            el.classList.remove("table__cell_word-selected");
        });
        document.querySelectorAll(".table__cell_not-empty").forEach((el)=>{
            el.contentEditable = 'false';
            if (el.textContent.toLowerCase()==el.ans.toLowerCase()){
                el.style.backgroundColor = 'green';
                if(!(el.key in correct))
                    correct[el.key]=0;
                correct[el.key]+=1;
                if(correct[el.key]==2)
                    corAns += 1;
            }
            else {
                el.style.backgroundColor = 'red';
            }
        });
        document.querySelectorAll(".table__cell_not-empty").forEach((el)=>{
           el.textContent = el.ans;
        });
        setResult("Отгадано:"+corAns+"\nВсего слов:"+crossword.length+"\nВаш результат:"+corAns/crossword.length*100+"%");
        document.getElementsByClassName('definitions').item(0).value = result;
        e.target.style.visibility = 'hidden';
    }
    return (
        <section className='crossword-solve'>
            <section className='crossword-solve__table'>
                <CrosswordTable
                    width={width}
                    height={height}
                    setCellsChosen={(e)=>{}}
                    wordChosen={[]}
                    setWordChosen={(e)=>{}}
                    onCellClick={onCellClick}
                />
            </section>

            <section className='crossword-solve__info'>
                <p>Кроссворд: {crossName}</p>

                <textarea className="definitions" rows={20} cols={33} readOnly={true}/>

                <div>
                    <button>Скачать</button>
                    <button>Сохранить</button>
                    <button onClick={onCheckClick}>Завершить</button>
                </div>
            </section>
        </section>
    );
};

export { SolveCrossword };