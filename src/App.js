import React, { useState, useEffect } from 'react';

import './App.css';

const initialCellState = {
  x: -1,
  y: -1,
};

const isCellSelected = (x, y, cellSelectFrom, cellSelectTo) => {
  let { x: xFrom, y: yFrom } = cellSelectFrom;
  let { x: xTo, y: yTo } = cellSelectTo;
  let temp;

  if (xFrom === xTo && xFrom === x) {
    if (yFrom > yTo) {
      // vertical word
      temp = yFrom;
      yFrom = yTo;
      yTo = temp;
    }

    if (y >= yFrom && y <= yTo) {
      return true;
    }
  } else if (yFrom === yTo && yFrom === y) {
    //horizontal word
    if (xFrom > xTo) {
      temp = xFrom;
      xFrom = xTo;
      xTo = temp;
    }

    if (x >= xFrom && x <= xTo) {
      return true;
    }
  }

  return false;
};

function App() {
  const [isMousePressed, setIsMousePressed] = useState(false);

  const [cellSelectFrom, setCellSelectFrom] = useState(initialCellState);
  const [cellSelectTo, setCellSelectTo] = useState(initialCellState);

  const onMouseDownHandle = (event) => {
    setIsMousePressed(true);

    setCellSelectFrom({
      x: +event.target.attributes.x.value,
      y: +event.target.attributes.y.value,
    });

    setCellSelectTo({
      x: +event.target.attributes.x.value,
      y: +event.target.attributes.y.value,
    });

    // убирает баг с запретом выделения
    window.getSelection().removeAllRanges();
  };

  const onMouseOverHandle = (event) => {
    if (isMousePressed) {
      if (event.relatedTarget.tagName !== 'TD') {
        // переход произошел не с другой ячейки
        setIsMousePressed(false);
        setCellSelectFrom(initialCellState);
        setCellSelectTo(initialCellState);
        return;
      }

      setCellSelectTo({
        x: +event.target.attributes.x.value,
        y: +event.target.attributes.y.value,
      });
    }
  };

  const onMouseUpHandle = (event) => {
    if (
      cellSelectFrom.x !== cellSelectTo.x &&
      cellSelectFrom.y !== cellSelectTo.y
    ) {
      setCellSelectFrom(initialCellState);
      setCellSelectTo(initialCellState);
    }

    setIsMousePressed(false);
  };

  useEffect(() => {
    console.log('cell select from', cellSelectFrom);
  }, [cellSelectFrom]);

  useEffect(() => {
    console.log('cell select to', cellSelectTo);
  }, [cellSelectTo]);

  useEffect(() => {
    console.log('mouse pressed', isMousePressed);
  }, [isMousePressed]);

  return (
    <div className='App'>
      <header className='App-header'>
        <table>
          <tbody>
            {[...Array(3)].map((elem, y) => (
              <tr key={y}>
                {[...Array(3)].map((elem, x) => (
                  <td
                    key={x}
                    x={x}
                    y={y}
                    className={
                      isCellSelected(x, y, cellSelectFrom, cellSelectTo)
                        ? isMousePressed
                          ? 'cell_selected'
                          : 'cell_chosen'
                        : 'cell'
                    }
                    onMouseDown={onMouseDownHandle}
                    onMouseOver={onMouseOverHandle}
                    onMouseUp={onMouseUpHandle}
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
