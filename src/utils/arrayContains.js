const arrayContains = (parent, child) => {
  let initIndex = parent.indexOf(child[0]);
  let match = initIndex >= 0 ? true : false;

  for (let i = 1; i < child.length; i++) {
    const varIndex = parent.indexOf(child[i]);
    if (varIndex === initIndex + 1) {
      initIndex = varIndex;
      continue;
    }
    match = false;
  }

  return match;
};

export { arrayContains };
