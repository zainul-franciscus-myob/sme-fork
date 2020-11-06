import { FormHorizontal, Table, Tooltip } from '@myob/myob-widgets';
import React from 'react';

import HoursInput from '../../../../../../../components/autoFormatter/HoursInput/HoursInput';

const handleInputChange = (handler, employeeId) => (e) => {
  const { rawValue } = e.target;
  handler({
    employeeId,
    daysPaid: rawValue,
  });
};

const QuantityInputField = ({
  value,
  employeeId,
  onChange,
  onBlur,
  isSubmitting,
}) => (
  <FormHorizontal>
    <HoursInput
      name="hours"
      label="Days"
      numeralPositiveOnly
      textAlign="right"
      value={value}
      onChange={handleInputChange(onChange, employeeId)}
      onBlur={handleInputChange(onBlur, employeeId)}
      disabled={isSubmitting}
    />
  </FormHorizontal>
);

const PayDetailsDaysPaidRow = ({
  tableConfig,
  onDaysPaidChange,
  onDaysPaidBlur,
  employeeId,
  daysPaid,
}) => {
  const daysPaidInputField = (
    <QuantityInputField
      onChange={onDaysPaidChange}
      onBlur={onDaysPaidBlur}
      value={daysPaid}
      employeeId={employeeId}
    />
  );

  return (
    <Table.Row key={1}>
      <Table.RowItem cellRole="heading" {...tableConfig.name}>
        Number of days paid this period&nbsp;
        <Tooltip>
          Number of whole or part days where employee earned gross earnings,
          including any paid holiday or paid leave. E.g. Employee works a half
          day on Tuesday, a half day on Wednesday, and takes Thursday as paid
          sick leave would be paid on 3 days.
        </Tooltip>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.hours}>{daysPaidInputField}</Table.RowItem>
      <Table.RowItem {...tableConfig.amount}></Table.RowItem>
    </Table.Row>
  );
};

export default PayDetailsDaysPaidRow;
