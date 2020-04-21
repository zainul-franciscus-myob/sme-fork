import { Card, Select } from '@myob/myob-widgets';
import React from 'react';

import handleSelectChange from '../../../../../components/handlers/handleSelectChange';

const JobKeeperFilter = ({
  payrollYears,
  payrollYear,
  onPayrollYearChange,
}) => {
  const payrollYearChangeHandler = ({ value }) => {
    onPayrollYearChange(value);
  };

  const cardBody = (
    <>
      <Select
        label="Payroll year"
        name="payrollYear"
        value={payrollYear}
        onChange={handleSelectChange(payrollYearChangeHandler)}
        width="sm"
      >
        {payrollYears.map(({ year, label }) => (
          <Select.Option value={year} label={label} key={year} />
        ))}
      </Select>
    </>
  );

  return <Card body={<Card.Body child={cardBody} />} />;
};

export default JobKeeperFilter;
