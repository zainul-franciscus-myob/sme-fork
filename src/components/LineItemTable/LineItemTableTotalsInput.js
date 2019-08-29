import React from 'react';

import AmountInput from '../autoFormatter/AmountInput/AmountInput';

const LineItemTableTotalsInput = (props) => {
  const { label, value, handler } = props;
  return (
    <tr>
      <td className="line-item__title">
        <h4>{label}</h4>
      </td>
      <td className="line-item__amount">
        <AmountInput
          hideLabel
          textAlign="right"
          name={label}
          label={label}
          value={value}
          onChange={handler}
        />
      </td>
    </tr>
  );
};

export default LineItemTableTotalsInput;
