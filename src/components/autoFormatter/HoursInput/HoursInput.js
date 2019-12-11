import React from 'react';

import AutoFormatterWithMessage from '../AutoFormatterCore/AutoFormatterWithMessage';
import buildAmountInputChangeEvent from './buildAmountInputChangeEvent';

const handleOnChange = (handle, currentValue) => (event) => {
  const maybeEvent = buildAmountInputChangeEvent(event, currentValue);

  if (maybeEvent) {
    handle(maybeEvent);
  }
};

const HoursInput = ({
  decimalScale = 3,
  numeralIntegerScale,
  numeralPositiveOnly,
  onChange,
  value,
  requiredLabel,
  ...props
}) => (
  <AutoFormatterWithMessage
    {...props}
    onChange={handleOnChange(onChange, value)}
    value={value}
    requiredLabel={requiredLabel}
    options={{
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
      numeralDecimalScale: decimalScale,
      numeralIntegerScale,
      numeralPositiveOnly,
    }}
  />
);

export default HoursInput;
