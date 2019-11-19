import React from 'react';

import AutoFormatterWarning from '../AutoFormatterCore/AutoFormatterWarning';
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
  <AutoFormatterWarning
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
