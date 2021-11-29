import { isCellInWord } from './isCellInWord';
import { isCellSelected } from './isCellSelected';

const setClassName = (
  x,
  y,
  wordChosen,
  cellSelectFrom,
  cellSelectTo,
  isMousePressed
) => {
  return isCellInWord(x, y, wordChosen)
    ? 'table__cell table__cell_in-word'
    : isCellSelected(x, y, cellSelectFrom, cellSelectTo)
    ? isMousePressed
      ? 'table__cell table__cell_selected'
      : 'table__cell table__cell_chosen'
    : 'table__cell';
};

export { setClassName };
