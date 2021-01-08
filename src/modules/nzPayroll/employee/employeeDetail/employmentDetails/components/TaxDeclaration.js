import { FieldGroup, Select } from '@myob/myob-widgets';
import React from 'react';

import TfnInput from '../../../../../../components/autoFormatter/TfnInput/TfnInput';
import handleInputChange from '../../../../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../../../../components/handlers/handleSelectChange';

const TaxDeclaration = ({
  taxCodeOptions = [],
  taxDetails = {},
  onTaxDetailsChange,
  handleOnBlurWithKey,
}) => {
  const isIrdNumberDisabled = taxDetails.taxCode === 'ND';

  return (
    <FieldGroup label="Tax declaration">
      <Select
        name="taxCode"
        label="Tax code"
        width="sm"
        requiredLabel="Tax code is required"
        value={taxDetails.taxCode}
        onChange={handleSelectChange(onTaxDetailsChange)}
      >
        {taxCodeOptions.map(({ label, value }) => (
          <Select.Option key={value} value={value} label={label} />
        ))}
      </Select>

      <TfnInput
        name="irdNumber"
        label="IRD number"
        requiredLabel="IRD number is required"
        width="sm"
        onChange={handleInputChange(onTaxDetailsChange)}
        onBlur={handleOnBlurWithKey('irdNumberOnBlur', onTaxDetailsChange)}
        value={taxDetails.irdNumber}
        disabled={isIrdNumberDisabled}
      />
    </FieldGroup>
  );
};

export default React.memo(TaxDeclaration);
