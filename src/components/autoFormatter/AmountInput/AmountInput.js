import React from 'react';

import AutoFormatter from '../AutoFormatterCore/AutoFormatter';

const AmountInput = props => (
  <AutoFormatter
    {...props}
    textAlign="right"
    options={{
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
    }}
  />
);

export default AmountInput;
