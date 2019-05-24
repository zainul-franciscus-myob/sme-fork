import React from 'react';

import AutoFormatter from '../AutoFormatterCore/AutoFormatter';

const AmountInput = ({ decimalScale = 2, numeralPositiveOnly, ...props }) => (
  <AutoFormatter
    {...props}
    options={{
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
      numeralDecimalScale: decimalScale,
      numeralPositiveOnly,
    }}
  />
);

export default AmountInput;
