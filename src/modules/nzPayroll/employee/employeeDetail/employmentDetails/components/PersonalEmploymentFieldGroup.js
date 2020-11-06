import { DatePicker, FieldGroup, ReadOnly, Select } from '@myob/myob-widgets';
import React from 'react';

const PersonalEmploymentFieldGroup = ({
  dateOfBirth,
  calculatedAge,
  gender,
  genderOptions = [],
  onDateChange,
  onSelectChange,
}) => (
  <FieldGroup label="Personal">
    <DatePicker
      name="dateOfBirth"
      label="Date of birth"
      value={dateOfBirth}
      width="sm"
      onSelect={onDateChange('dateOfBirth')}
    />
    <ReadOnly name="calculatedAge" label="Calculated age">
      {calculatedAge}
    </ReadOnly>
    <Select
      name="gender"
      label="Gender"
      value={gender}
      width="sm"
      onChange={onSelectChange}
      requiredLabel="Gender is required"
    >
      {genderOptions.map(({ value, name }) => (
        <Select.Option key={value} value={value} label={name} />
      ))}
    </Select>
  </FieldGroup>
);

export default PersonalEmploymentFieldGroup;
