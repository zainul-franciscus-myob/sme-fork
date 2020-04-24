import {
  DatePicker, FieldGroup, ReadOnly,
} from '@myob/myob-widgets';
import React from 'react';

const EmploymentFieldGroup = ({
  startDate, terminationDate, employmentStatus,
}) => (
  <FieldGroup label="Employment">
    <DatePicker
      name="startDate"
      label="Start date"
      value={startDate}
      disabled
      width="sm"
    />

    <DatePicker
      name="terminationDate"
      label="Termination date"
      value={terminationDate}
      disabled
      width="sm"
    />

    <ReadOnly name="employmentStatus" label="Employment status">
      {employmentStatus}
    </ReadOnly>
  </FieldGroup>
);

export default EmploymentFieldGroup;
