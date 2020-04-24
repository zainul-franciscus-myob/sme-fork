import {
  DatePicker, FieldGroup, ReadOnly, Select,
} from '@myob/myob-widgets';
import React from 'react';

const PersonalEmploymentFieldGroup = ({
  dateOfBirth, calculatedAge, gender, genderOptions = [],
}) => (
  <FieldGroup label="Personal">
    <DatePicker
      name="dateOfBirth"
      label="Date of birth"
      value={dateOfBirth}
      disabled
      width="sm"
    />
    <ReadOnly name="calculatedAge" label="Calculated age">{ calculatedAge }</ReadOnly>
    <Select name="gender" label="Gender" value={gender} width="sm" disabled>
      {
        genderOptions.map(
          ({ value, name }) => <Select.Option key={value} value={value} label={name} />,
        )
      }
    </Select>
  </FieldGroup>
);

export default PersonalEmploymentFieldGroup;
