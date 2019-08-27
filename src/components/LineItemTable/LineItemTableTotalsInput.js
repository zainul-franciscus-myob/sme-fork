import { Input } from '@myob/myob-widgets';
import React from 'react';

const LineItemTableTotalsInput = (props) => {
  const { label, value, handler } = props;
  return (
    <tr>
      <td className="line-item__title">
        <h4>{label}</h4>
      </td>
      <td className="line-item__amount">
        <Input
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
