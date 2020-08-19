import { FieldGroup, Select } from '@myob/myob-widgets';
import React from 'react';

import TfnInput from '../../../../../../components/autoFormatter/TfnInput/TfnInput';

const TaxDeclaration = ({ taxCodeOptions = [], tax = {}, onInputChange }) => (
  <FieldGroup label="Tax declaration">
    <TfnInput
      name="irdNumber"
      label="IRD number"
      requiredLabel="IRD number is required"
      width="sm"
      onChange={onInputChange}
      value={tax.irdNumber}
    />

    <Select
      name="taxCode"
      label="Tax code"
      requiredLabel="Tax code is required"
      width="sm"
      value={tax.taxCode}
      onChange={onInputChange}
    >
      {taxCodeOptions.map(({ key, value }) => (
        <Select.Option key={key} value={key} label={value} />
      ))}
    </Select>
  </FieldGroup>
);

export default TaxDeclaration;
