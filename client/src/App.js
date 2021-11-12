import React, { useState, useEffect } from 'react';

import './App.css';

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
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const [cellSelectFrom, setCellSelectFrom] = useState({ x: -1, y: -1 });
  const [cellSelectTo, setCellSelectTo] = useState({ x: -1, y: -1 });

  const onMouseDownHandle = (event) => {
    setMouseIsPressed(true);

    setCellSelectFrom({
      x: +event.target.attributes.x.value,
      y: +event.target.attributes.y.value,
    });

    setCellSelectTo({
      x: +event.target.attributes.x.value,
      y: +event.target.attributes.y.value,
    });
  };

  const onMouseOverHandle = (event) => {
    if (mouseIsPressed) {
      setCellSelectTo({
        x: +event.target.attributes.x.value,
        y: +event.target.attributes.y.value,
      });
    }
  };

  const onMouseUpHandle = (event) => {
    setMouseIsPressed(false);
  };

  useEffect(() => {
    console.log('cell select from', cellSelectFrom);
  }, [cellSelectFrom]);

  useEffect(() => {
    console.log('cell select to', cellSelectTo);
  }, [cellSelectTo]);

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
                        ? 'cell_selected'
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
