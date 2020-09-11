import { FieldGroup, Select } from '@myob/myob-widgets';
import React from 'react';

import handleSelectChange from '../../../../../../components/handlers/handleSelectChange';

const EsctRate = ({ esctRate, esctOptions = [], onEsctRateChange }) => (
  <FieldGroup label="Employer superannuation contribution tax rate">
    <Select
      name="employerSuperannuationContributionTax"
      label="Employee annual earnings"
      width="lg"
      requiredLabel="Employee annual earnings is required"
      onChange={handleSelectChange(onEsctRateChange)}
      value={esctRate}
    >
      {esctOptions.map(({ displayName, value }) => (
        <Select.Option key={value} value={value} label={displayName} />
      ))}
    </Select>
  </FieldGroup>
);

export default EsctRate;
