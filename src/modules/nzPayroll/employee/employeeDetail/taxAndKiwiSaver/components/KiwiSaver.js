import { FieldGroup, Select } from '@myob/myob-widgets';
import React from 'react';

import AmountInput from '../../../../../../components/autoFormatter/AmountInput/AmountInput';
import handleInputChange from '../../../../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../../../../components/handlers/handleSelectChange';

const KiwiSaver = ({
  kiwiSaver = {},
  kiwiSaverStatusOptions = [],
  employeeContributionOptions = [],
  onKiwiSaverInputChange,
}) => (
  <FieldGroup label="KiwiSaver">
    <Select
      name="kiwiSaverStatus"
      label="KiwiSaver Status"
      width="sm"
      onChange={handleSelectChange(onKiwiSaverInputChange)}
      value={kiwiSaver.kiwiSaverStatus}
    >
      {kiwiSaverStatusOptions.map(({ key, value }) => (
        <Select.Option key={key} value={key} label={value} />
      ))}
    </Select>

    <Select
      name="employeeContributionRate"
      label="Employee contribution rate (%)"
      width="sm"
      onChange={handleSelectChange(onKiwiSaverInputChange)}
      value={kiwiSaver.employeeContributionRate}
    >
      {employeeContributionOptions.map(({ key, value }) => (
        <Select.Option key={key} value={key} label={value} />
      ))}
    </Select>

    <AmountInput
      name="employerContributionRate"
      label="Employer contribution rate (%)"
      width="sm"
      onChange={handleInputChange(onKiwiSaverInputChange)}
      numeralDecimalScaleMax={2}
      numeralIntegerScale={3}
      numeralPositiveOnly
      textAlign="left"
      value={kiwiSaver.employerContributionRate}
    />
  </FieldGroup>
);

export default KiwiSaver;
