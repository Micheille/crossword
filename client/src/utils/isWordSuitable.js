const isWordSuitable = (word, wordAttrs) => {
  if (!wordAttrs.length) return true;

  if (word.length === wordAttrs.length) {
    for (let i = 0; i < word.length; i++) {
      if (wordAttrs[i] !== '_' && wordAttrs[i] !== word[i]) {
        return false;
      }
    }

    return true;
  }

  return false;
};

export { isWordSuitable };
