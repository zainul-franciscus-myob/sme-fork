import { DatePicker, FieldGroup, ReadOnly } from '@myob/myob-widgets';
import React from 'react';

const EmploymentFieldGroup = ({
  startDate,
  terminationDate,
  employmentStatus,
  onDateChange,
}) => (
  <FieldGroup label="Employment">
    <DatePicker
      name="startDate"
      label="Start date"
      value={startDate}
      width="sm"
      onSelect={onDateChange('startDate')}
    />

    <DatePicker
      name="terminationDate"
      label="Termination date"
      value={terminationDate}
      width="sm"
      onSelect={onDateChange('terminationDate')}
    />

    <ReadOnly name="employmentStatus" label="Employment status">
      {employmentStatus}
    </ReadOnly>
  </FieldGroup>
);

export default EmploymentFieldGroup;
