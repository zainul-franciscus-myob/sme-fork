import { Select } from '@myob/myob-widgets';
import React from 'react';

const MonthSelect = (props) => {
  const { monthOptions } = props;
  return (
    <Select {...props}>
      {monthOptions.map((name, i) => (
        <Select.Option value={i + 1} key={name} label={name} />
      ))}
    </Select>
  );
};

export default MonthSelect;
