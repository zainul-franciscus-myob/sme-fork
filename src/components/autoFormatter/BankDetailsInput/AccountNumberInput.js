import React from 'react';

import AutoFormatter from '../AutoFormatterCore/AutoFormatter';

const AccountNumberInput = (props) => (
  <AutoFormatter
    {...props}
    options={{
      numericOnly: true,
      blocks: [9],
    }}
  />
);

export default AccountNumberInput;
