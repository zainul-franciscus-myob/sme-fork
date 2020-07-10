import { Select } from '@myob/myob-widgets';
import React from 'react';

const YearSelect = (props) => {
  const { financialYearOptions } = props;

  return (
    <Select {...props}>
      {financialYearOptions.map((financialYear) => (
        <Select.Option
          key={financialYear}
          value={financialYear}
          label={financialYear}
        />
      ))}
    </Select>
  );
};

export default YearSelect;
