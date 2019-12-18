import { Select } from '@myob/myob-widgets';
import React from 'react';

const YearSelect = props => (
  <Select {...props}>
    {
      [...Array(1101).keys()].map(i => (
        <Select.Option value={i + 1900} label={i + 1900} />
      ))
    }
  </Select>
);

export default YearSelect;
