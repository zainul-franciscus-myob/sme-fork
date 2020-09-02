import { FieldGroup, Select } from '@myob/myob-widgets';
import React from 'react';

import TfnInput from '../../../../../../components/autoFormatter/TfnInput/TfnInput';
import handleSelectChange from '../../../../../../components/handlers/handleSelectChange';

const TaxDeclaration = ({
  taxCodeOptions = [],
  tax = {},
  isIrdNumberEditable,
  onTaxInputChange,
  onTaxCodeChange,
}) => (
  <FieldGroup label="Tax declaration">
    <TfnInput
      name="irdNumber"
      label="IRD number"
      requiredLabel="IRD number is required"
      width="sm"
      onChange={onTaxInputChange}
      value={tax.irdNumber}
      disabled={!isIrdNumberEditable}
    />

    <Select
      name="taxCode"
      label="Tax code"
      width="sm"
      value={tax.taxCode}
      onChange={handleSelectChange(onTaxCodeChange)}
    >
      {taxCodeOptions.map(({ key, value }) => (
        <Select.Option key={key} value={key} label={value} />
      ))}
    </Select>
  </FieldGroup>
);

export default TaxDeclaration;
