const inRange = (value, a, b) => {
  const min = Math.min.apply(Math, [a, b]);
  const max = Math.max.apply(Math, [a, b]);
  return value >= min && value <= max;
};

export { inRange };
