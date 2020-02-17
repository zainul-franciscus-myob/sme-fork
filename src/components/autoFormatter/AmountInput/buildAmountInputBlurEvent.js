import copyEventWithValue from './copyEventWithValue';
import formatNumberWithDecimalScaleRange from '../../../common/valueFormatters/formatNumberWithDecimalScaleRange';

const buildAmountInputBlurEvent = (e, numeralDecimalScaleMin, numeralDecimalScaleMax) => {
  const { rawValue } = e.target;
  const number = Number(rawValue);

  if (rawValue && !Number.isNaN(number)) {
    const formattedRawValue = formatNumberWithDecimalScaleRange(
      rawValue, numeralDecimalScaleMin, numeralDecimalScaleMax,
    );

    return copyEventWithValue(e, formattedRawValue);
  }

  return e;
};

export default buildAmountInputBlurEvent;
