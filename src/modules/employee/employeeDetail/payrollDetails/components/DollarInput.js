import React from 'react';

import AmountInput from '../../../../../components/autoFormatter/AmountInput/AmountInput';
import handleAmountInputChange from '../../../../../components/handlers/handleAmountInputChange';

const DollarInput = ({
  onChange,
  ...props
}) => (
  <AmountInput
    numeralIntegerScale={13}
    numeralDecimalScaleMin={2}
    numeralDecimalScaleMax={2}
    onChange={handleAmountInputChange(onChange)}
    onBlur={handleAmountInputChange(onChange)}
    {...props}
  />
);

export default DollarInput;
