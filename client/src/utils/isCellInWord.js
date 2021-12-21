const isCellInWord = (x, y, wordChosen) => {
    for (let i = 0; i < wordChosen.length; i++) {
      if (
        x === +wordChosen[i].attributes.x.value &&
        y === +wordChosen[i].attributes.y.value
      )
        return true;
    }
    return false;
};

export { isCellInWord };
