import React from 'react';

import AutoFormatter from '../AutoFormatterCore/AutoFormatter';
import buildAmountInputChangeEvent from './buildAmountInputChangeEvent';

const handleOnChange = (handle, currentValue) => (event) => {
  const maybeEvent = buildAmountInputChangeEvent(event, currentValue);

  if (maybeEvent) {
    handle(maybeEvent);
  }
};

const AmountInput = ({
  decimalScale = 2,
  numeralIntegerScale,
  numeralPositiveOnly,
  onChange,
  value,
  ...props
}) => (
  <AutoFormatter
    {...props}
    onChange={handleOnChange(onChange, value)}
    value={value}
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
