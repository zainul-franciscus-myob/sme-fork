import React from 'react';

import AutoFormatter from '../AutoFormatterCore/AutoFormatter';

const YearInput = (props) => (
  <AutoFormatter
    {...props}
    options={{
      numericOnly: true,
      blocks: [4],
    }}
  />
);

export default YearInput;
