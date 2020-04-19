import React from 'react';

import FormattedAmountInput from '../autoFormatter/AmountInput/FormattedAmountInput';

const LineItemTableTotalsInput = (props) => {
  const {
    name, label, value, onChange, onBlur, disabled,
  } = props;

  return (
    <tr>
      <td className="line-item__title">
        <h4>{label}</h4>
      </td>
      <td className="line-item__amount">
        <FormattedAmountInput
          hideLabel
          textAlign="right"
          name={name}
          label={label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          numeralDecimalScaleMin={2}
        />
      </td>
    </tr>
  );
};

export default LineItemTableTotalsInput;
