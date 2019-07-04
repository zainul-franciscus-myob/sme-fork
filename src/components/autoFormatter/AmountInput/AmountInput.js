import React from 'react';

import AutoFormatter from '../AutoFormatterCore/AutoFormatter';

const AmountInput = ({
  decimalScale = 2,
  integerScale,
  numeralIntegerScale,
  numeralPositiveOnly,
  ...props
}) => (
  <AutoFormatter
    {...props}
    options={{
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
      numeralDecimalScale: decimalScale,
      numeralIntegerScale,
      numeralPositiveOnly,
    }}
  />
);

export default AmountInput;
