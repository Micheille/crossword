import React, { useEffect, useState } from 'react';

import { setClassName } from '../../../utils/setClassName';

import './style.css';

const initialCellState = {
  x: null,
  y: null,
};

const CrosswordTable = ({
  width,
  height,
  setCellsChosen,
  wordChosen,
  setWordChosen,
  onCellClick
}) => {
  const [isMousePressed, setIsMousePressed] = useState(false);

  const [cellSelectFrom, setCellSelectFrom] = useState(initialCellState);
  const [cellSelectTo, setCellSelectTo] = useState(initialCellState);

  const onMouseDownHandle = (event) => {
    setWordChosen([]);
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
    const { x: xFrom, y: yFrom } = cellSelectFrom;
    const { x: xTo, y: yTo } = cellSelectTo;

    if (xFrom !== xTo && yFrom !== yTo) {
      setCellSelectFrom(initialCellState);
      setCellSelectTo(initialCellState);
    } else {
      if (xFrom > xTo) {
        setCellSelectFrom({ ...cellSelectFrom, x: xTo });
        setCellSelectTo({ ...cellSelectTo, x: xFrom });
      }
      if (yFrom > yTo) {
        setCellSelectFrom({ ...cellSelectFrom, y: yTo });
        setCellSelectTo({ ...cellSelectTo, y: yFrom });
      }
    }

    setIsMousePressed(false);
  };

  useEffect(() => {
    if (!isMousePressed && cellSelectFrom.x !== null) {
      const cellsChosen = document.querySelectorAll('.table__cell_chosen');
      setCellsChosen(Array.from(cellsChosen));
    }
  }, [isMousePressed, cellSelectFrom, setCellsChosen]);

  return (
    <table className='table'>
      <tbody>
        {[...Array(+height)].map((elem, y) => (
          <tr key={y}>
            {[...Array(+width)].map((elem, x) => (
              <td
                key={x}
                x={x}
                y={y}
                className={setClassName(
                  x,
                  y,
                  wordChosen,
                  cellSelectFrom,
                  cellSelectTo,
                  isMousePressed
                )}
                onMouseDown={onMouseDownHandle}
                onMouseOver={onMouseOverHandle}
                onMouseUp={onMouseUpHandle}
                onClick={onCellClick}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { CrosswordTable };
