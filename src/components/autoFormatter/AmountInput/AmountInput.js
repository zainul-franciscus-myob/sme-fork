import React from 'react';

import AutoFormatter from '../AutoFormatterCore/AutoFormatter';

const AmountInput = ({ decimalScale = 2, ...props }) => (
  <AutoFormatter
    {...props}
    options={{
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
      numeralDecimalScale: decimalScale,
    }}
  />
);

export default AmountInput;
