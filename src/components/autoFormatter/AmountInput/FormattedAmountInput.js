import React, { useCallback } from 'react';

import AutoFormatter from '../AutoFormatterCore/AutoFormatterWithMessage';
import copyEventWithValue from './copyEventWithValue';
import formatNumberWithRoundedScaleRange from '../../../common/valueFormatters/formatNumberWithRoundedScaleRange';
import useFormattedValue from '../../../common/valueFormatters/useFormattedValue';

export const buildOnBlurEvent = e => {
  const { rawValue } = e.target;
  const number = Number(rawValue);

  if (Number.isNaN(number)) {
    return copyEventWithValue(e, '0');
  }

  return copyEventWithValue(e, rawValue);
};

const handleOnBlur = handle => event => {
  const maybeEvent = buildOnBlurEvent(event);

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
  ...props
}) => {
  const onFormat = useCallback(
    val => formatNumberWithRoundedScaleRange(
      val,
      numeralDecimalScaleMin,
      numeralDecimalScaleMax,
    ),
    [numeralDecimalScaleMax, numeralDecimalScaleMin],
  );

  const { formattedValue, newOnBlur, newOnChange } = useFormattedValue({
    value,
    onBlur: onBlur || (() => {}), // onBlur could be undefined
    onChange,
    onFormat,
  });

  return (
    <AutoFormatter
      {...props}
      onChange={newOnChange}
      onBlur={handleOnBlur(newOnBlur)}
      value={formattedValue}
      requiredLabel={requiredLabel}
      options={{
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        numeralDecimalScale: numeralDecimalScaleMax,
        numeralIntegerScale,
        numeralPositiveOnly,
      }}
    />
  );
};

export default AmountInput;
