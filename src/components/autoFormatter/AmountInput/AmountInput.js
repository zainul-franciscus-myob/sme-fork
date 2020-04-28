import React from 'react';

import AutoFormatter from '../AutoFormatterCore/AutoFormatterWithMessage';
import buildAmountInputBlurEvent from './buildAmountInputBlurEvent';
import buildAmountInputChangeEvent from './buildAmountInputChangeEvent';

const handleOnChange = (handle, currentValue) => (event) => {
  const maybeEvent = buildAmountInputChangeEvent(event, currentValue);

  if (maybeEvent) {
    handle(maybeEvent);
  }
};

const handleOnBlur = (
  handle, numeralDecimalScaleMin, numeralDecimalScaleMax,
) => (event) => {
  if (!handle) return;

  const maybeEvent = buildAmountInputBlurEvent(
    event, numeralDecimalScaleMin, numeralDecimalScaleMax,
  );

  if (maybeEvent) {
    handle(maybeEvent);
  }
};

const AmountInput = ({
  numeralDecimalScaleMin = 0,
  numeralDecimalScaleMax = 2,
  numeralIntegerScale,
  numeralPositiveOnly,
  onChange,
  onBlur,
  value,
  requiredLabel,
  width,
  ...props
}) => (
  <AutoFormatter
    {...props}
    onChange={handleOnChange(onChange, value)}
    onBlur={handleOnBlur(onBlur, numeralDecimalScaleMin, numeralDecimalScaleMax)}
    value={value}
    requiredLabel={requiredLabel}
    options={{
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
      numeralDecimalScale: numeralDecimalScaleMax,
      numeralIntegerScale,
      numeralPositiveOnly,
    }}
    width={width}
  />
);

export default AmountInput;
