import React from 'react';

import AutoFormatter from '../AutoFormatterCore/AutoFormatter';

const IntegerInput = ({ blocks, ...props }) => {
  return (
    <AutoFormatter
      {...props}
      options={{
        numericOnly: true,
        blocks: [blocks],
      }}
    />
  );
};

export default IntegerInput;
