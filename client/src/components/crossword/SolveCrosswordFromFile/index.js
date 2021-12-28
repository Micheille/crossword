import React, { useState, useEffect } from 'react';

import { CrosswordTable } from '../CrosswordTable';

import './style.css';
import {useParams} from "react-router-dom";


const SolveCrosswordFromFile = ({ data }) => {
    const [crossword, setCrossword] = useState([]);
    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(10);
    const [result, setResult] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);
    const [crossName, setCrossName] = useState("");
    const correct = {};
    let corAns = 0;

    useEffect(() => {

        setCrossword(data.words);
        setWidth(data.m);
        setHeight(data.n);
        setCrossName(data.name);

        const table = document.getElementsByClassName('table').item(0).childNodes.item(0).childNodes;
           table.forEach((tr)=>{
               tr.childNodes.forEach((td)=>{
                   td.classList.add("table__cell_empty");
               })
           })

        crossword.forEach(
              function (notion) {
                  if (notion.direction==-1) {
                      for (let k = notion.i; k < notion.word.length+notion.i; k++) {
                          table.item(k).childNodes.item(notion.j).classList.remove("table__cell_empty");
                          table.item(k).childNodes.item(notion.j).classList.add("table__cell_not-empty");
                          table.item(k).childNodes.item(notion.j).ans = notion.word[k-notion.i];
                          if(table.item(k).childNodes.item(notion.j).words==undefined){
                              table.item(k).childNodes.item(notion.j).words = [];
                              table.item(k).childNodes.item(notion.j).defs = [];
                          }
                          if(table.item(k).childNodes.item(notion.j).words.length<2) {
                              table.item(k).childNodes.item(notion.j).words.push(notion.word);
                              table.item(k).childNodes.item(notion.j).defs.push(notion.definition);
                          }
                      }
                  }
                  else{
                      for (let k1 = notion.j; k1 < notion.word.length+notion.j; k1++) {
                          table.item(notion.i).childNodes.item(k1).classList.add("table__cell_not-empty");
                          table.item(notion.i).childNodes.item(k1).ans = notion.word[k1-notion.j];
                          if(table.item(notion.i).childNodes.item(k1).words == undefined) {
                              table.item(notion.i).childNodes.item(k1).words = [];
                              table.item(notion.i).childNodes.item(k1).defs = [];
                          }
                          if(table.item(notion.i).childNodes.item(k1).words.length<2) {
                              table.item(notion.i).childNodes.item(k1).words.push(notion.word);
                              table.item(notion.i).childNodes.item(k1).defs.push(notion.definition);
                          }
                      }
                  }
              }
          );

    }, [width, height, crossName, crossword]);


const onCellClick = (e)=>{
        if (e.target.words!=undefined) {
            if(e.target.key==undefined)
                e.target.key = 0;
            e.target.key += 1;
            if(e.target.style.backgroundColor!='red'&&e.target.style.backgroundColor!='green')
                e.target.contentEditable = 'true';
            console.log(e.target.defs);
            document.querySelectorAll(".table__cell_word-selected").forEach((el)=>{
                el.classList.remove("table__cell_word-selected");
            });
            document.querySelectorAll(".table__cell_not-empty").forEach((el)=>{
                if (el.words.includes(e.target.words[e.target.key%2])){
                    el.classList.add("table__cell_word-selected");
                }
            });
            if(e.target.words.length>1) {
                console.log(e.target.defs);
                console.log(e.target.key+" "+e.target.key%2 +" "+ e.target.defs[e.target.key % 2]);
                document.getElementsByClassName('definitions').item(0).value = e.target.defs[e.target.key % 2];
            }
            else
                document.getElementsByClassName('definitions').item(0).value = e.target.defs[0];
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
        localStorage.removeItem(crossName);
        document.querySelectorAll(".table__cell_word-selected").forEach((el)=>{
            el.classList.remove("table__cell_word-selected");
        });
        document.querySelectorAll(".table__cell_not-empty").forEach((el)=>{
            el.contentEditable = 'false';
            if (el.textContent.toLowerCase()==el.ans.toLowerCase()){
                el.style.backgroundColor = 'green';
                if(!(el.defs[0] in correct))
                    correct[el.defs[0]]=0;
                correct[el.defs[0]]+=1;
                if(correct[el.defs[0]]==2)
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
        document.querySelectorAll("button").forEach(el=>el.style.visibility = 'hidden');
        //e.target.style.visibility = 'hidden';
    }

    const save = (e)=>{
        var data = {};
        document.getElementsByClassName('table').item(0).childNodes.item(0).childNodes
            .forEach((el, ndx)=>{
                data[ndx] = [];
                el.childNodes.forEach((el1, ndx1)=>{
                    data[ndx][ndx1] = el1.textContent;
                })
            });
        console.log(data);
        localStorage.setItem(crossName, JSON.stringify(data));
    }

    const getData = (e)=>{
        var data = JSON.parse(localStorage.getItem(crossName));
        const table = document.getElementsByClassName('table').item(0).childNodes.item(0).childNodes;
        console.log(data);
        for (let el in data){
            data[el].forEach((el1, ndx1)=>{
                table.item(parseInt(el)).childNodes.item(ndx1).textContent = el1;
            })
            console.log(data[el]);
        };
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
                    <button onClick={save}>Сохранить</button>
                    <button onClick={onCheckClick}>Завершить</button>
                    <button onClick={getData}>Продолжить разгадывание</button>
                </div>
            </section>
        </section>
    );
};

export { SolveCrosswordFromFile };