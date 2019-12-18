import { Select } from '@myob/myob-widgets';
import React from 'react';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MonthSelect = props => (
  <Select {...props}>
    {
      monthNames.map((name, i) => (
        <Select.Option value={i + 1} label={name} />
      ))
    }
  </Select>
);

export default MonthSelect;
