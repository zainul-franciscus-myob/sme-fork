import React from 'react';

import AmountInput from '../autoFormatter/AmountInput/AmountInput';

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
        <AmountInput
          hideLabel
          textAlign="right"
          name={name}
          label={label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
      </td>
    </tr>
  );
};

export default LineItemTableTotalsInput;
