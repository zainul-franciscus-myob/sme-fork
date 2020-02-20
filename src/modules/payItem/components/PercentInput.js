import React from 'react';

import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import handleAmountInputChange from '../../../components/handlers/handleAmountInputChange';

const PercentInput = ({
  onChange,
  ...props
}) => (
  <AmountInput
    numeralIntegerScale={3}
    numeralDecimalScaleMin={2}
    numeralDecimalScaleMax={5}
    onChange={handleAmountInputChange(onChange)}
    onBlur={handleAmountInputChange(onChange)}
    {...props}
  />
);

export default PercentInput;
