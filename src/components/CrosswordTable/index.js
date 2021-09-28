import React, { useState } from 'react';

import { isCellSelected } from '../../utils/isCellSelected';

import './style.css';

const initialCellState = {
  x: -1,
  y: -1,
};

const CrosswordTable = ({ width, height }) => {
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

  return (
    <table className='table'>
      <tbody>
        {[...Array(height)].map((elem, y) => (
          <tr key={y}>
            {[...Array(width)].map((elem, x) => (
              <td
                key={x}
                x={x}
                y={y}
                className={
                  isCellSelected(x, y, cellSelectFrom, cellSelectTo)
                    ? isMousePressed
                      ? ' table__cell table__cell_selected'
                      : 'table__cell table__cell_chosen'
                    : 'table__cell'
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
  );
};

export { CrosswordTable };
