const SizeInputs = ({ width, setWidth, heigth, setHeigth }) => {
  return (
    <>
      <label>
        Ширина
        <input
          type='number'
          min={10}
          max={30}
          value={width}
          onChange={(event) => setWidth(event.target.value)}
          id='width'
        />
      </label>

      <label>
        Высота
        <input
          type='number'
          min={10}
          max={30}
          value={heigth}
          onChange={(event) => setHeigth(event.target.value)}
          id='height'
        />
      </label>
    </>
  );
};

export { SizeInputs };
