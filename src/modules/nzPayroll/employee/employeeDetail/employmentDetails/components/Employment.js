import { DatePicker, FieldGroup, Select } from '@myob/myob-widgets';
import React from 'react';

import handleDateChange from '../../../../../../components/handlers/handleDateChange';
import handleSelectChange from '../../../../../../components/handlers/handleSelectChange';

const Employment = ({
  employmentDetails,
  onEmploymentDetailsChange,
  employmentStatusOptions,
}) => (
  <FieldGroup label="Employment">
    <DatePicker
      name="startDate"
      label="Start date"
      value={employmentDetails.startDate}
      width="sm"
      onSelect={handleDateChange('startDate', onEmploymentDetailsChange)}
    />

    <DatePicker
      name="terminationDate"
      label="Termination date"
      value={employmentDetails.terminationDate}
      width="sm"
      onSelect={handleDateChange('terminationDate', onEmploymentDetailsChange)}
    />

    <Select
      name="employmentStatus"
      label="Employment status"
      width="sm"
      onChange={handleSelectChange(onEmploymentDetailsChange)}
      value={employmentDetails.employmentStatus}
    >
      {employmentStatusOptions.map(({ label, value }) => (
        <Select.Option key={label} value={value} label={label} />
      ))}
    </Select>
  </FieldGroup>
);

export default React.memo(Employment);
