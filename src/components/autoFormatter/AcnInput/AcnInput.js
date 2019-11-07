import React from 'react';

import AutoFormatter from '../AutoFormatterCore/AutoFormatter';

const AcnInput = props => (
  <AutoFormatter
    {...props}
    options={{
      numericOnly: true,
      blocks: [3, 3, 3],
      delimiters: [' '],
    }}
  />
);

export default AcnInput;
