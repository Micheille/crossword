import { inRange } from './inRange';

const isCellSelected = (x, y, cellSelectFrom, cellSelectTo) => {
  const { x: xFrom, y: yFrom } = cellSelectFrom;
  const { x: xTo, y: yTo } = cellSelectTo;

  if (xFrom === xTo && xFrom === x) {
    // vertical word
    if (inRange(y, yFrom, yTo)) {
      return true;
    }
  } else if (yFrom === yTo && yFrom === y) {
    // horizontal word
    if (inRange(x, xFrom, xTo)) {
      return true;
    }
  }

  return false;
};

export { isCellSelected };
