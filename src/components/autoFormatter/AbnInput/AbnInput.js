import React from 'react';

import AutoFormatter from '../AutoFormatterCore/AutoFormatter';

const AbnInput = props => (
  <AutoFormatter
    {...props}
    options={{
      numericOnly: true,
      blocks: [2, 3, 3, 3],
      delimiters: [' '],
    }}
  />
);

export default AbnInput;
