import { FieldGroup, Input, Select } from '@myob/myob-widgets';
import React from 'react';


const TaxDeclaration = ({
  taxCodeOptions = [], taxAndKiwiSaver = {}, onInputChange,
}) => (
  <FieldGroup label="Tax declaration">
    <Input
      name="irdNumber"
      label="IRD number"
      requiredLabel="IRD number is required"
      width="sm"
      onChange={onInputChange}
      value={taxAndKiwiSaver.irdNumber}
    />

    <Select
      name="taxCode"
      label="Tax code"
      requiredLabel="Tax code is required"
      width="sm"
      value={taxAndKiwiSaver.taxCode}
      onChange={onInputChange}
    >
      {
        taxCodeOptions.map(({ key, value }) => (
          <Select.Option
            key={key}
            value={key}
            label={value}
          />))
      }
    </Select>

  </FieldGroup>
);

export default TaxDeclaration;
