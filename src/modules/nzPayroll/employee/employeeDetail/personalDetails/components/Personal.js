import {
  Checkbox,
  CheckboxGroup,
  DatePicker,
  FieldGroup,
  Input,
  ReadOnly,
  Select,
} from '@myob/myob-widgets';
import React from 'react';

import handleCheckboxChange from '../../../../../../components/handlers/handleCheckboxChange';
import handleDateChange from '../../../../../../components/handlers/handleDateChange';
import handleInputChange from '../../../../../../components/handlers/handleInputChange';

const Personal = ({
  personalDetail,
  onPersonalDetailsChange,
  isEap = true,
  genderOptions = [],
  calculatedAge,
}) => (
  <FieldGroup label="Personal">
    <Input
      label="First name"
      name="firstName"
      value={personalDetail.firstName}
      onChange={handleInputChange(onPersonalDetailsChange)}
      width="lg"
    />
    <Input
      label="Surname or family name"
      name="lastName"
      value={personalDetail.lastName}
      onChange={handleInputChange(onPersonalDetailsChange)}
      requiredLabel="Surname or family name is required"
      width="lg"
    />

    <DatePicker
      name="dateOfBirth"
      label="Date of birth"
      value={personalDetail.dateOfBirth}
      width="lg"
      onSelect={handleDateChange('dateOfBirth', onPersonalDetailsChange)}
    />
    <ReadOnly name="calculatedAge" label="Calculated age">
      {calculatedAge}
    </ReadOnly>
    <Select
      name="gender"
      label="Gender"
      value={personalDetail.gender}
      width="lg"
      onChange={handleInputChange(onPersonalDetailsChange)}
    >
      {genderOptions.map(({ value, label }) => (
        <Select.Option key={value} value={value} label={label} />
      ))}
    </Select>

    <Input
      label="Employee number"
      name="employeeNumber"
      value={personalDetail.employeeNumber}
      onChange={handleInputChange(onPersonalDetailsChange)}
      width="lg"
    />
    {isEap === false && (
      <CheckboxGroup
        label="Inactive employee"
        hideLabel
        renderCheckbox={() => (
          <Checkbox
            name="isInactive"
            label="Inactive employee"
            checked={personalDetail.isInactive}
            onChange={handleCheckboxChange(onPersonalDetailsChange)}
          />
        )}
      />
    )}
  </FieldGroup>
);

export default React.memo(Personal);
