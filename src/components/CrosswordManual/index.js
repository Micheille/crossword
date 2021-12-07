import React, { useState } from 'react';

import { CrosswordParams } from '../CrosswordParams';
import { MakeCrossword } from '../MakeCrossword';

const CrosswordManual = () => {
  const [width, setWidth] = useState(15);
  const [height, setHeight] = useState(15);
  const [manualStep, setManualStep] = useState(0);

  switch (manualStep) {
    case 0:
      return (
        <CrosswordParams
          setWidth={setWidth}
          setHeight={setHeight}
          setManualStep={setManualStep}
        />
      );
    case 1:
      return <MakeCrossword width={width} height={height} />;
    default:
      return (
        <CrosswordParams
          setWidth={setWidth}
          setHeight={setHeight}
          setManualStep={setManualStep}
        />
      );
  }
};

export { CrosswordManual };
