import { FieldGroup, ReadOnly, Select } from '@myob/myob-widgets';
import React from 'react';

import handleInputChange from '../../../../../../components/handlers/handleInputChange';

const BasePayDetails = ({
  basePayDetails = {},
  payCycleOptions = [],
  onWageDetailsChange,
}) => (
  <FieldGroup label="Base pay details">
    <Select
      label="Pay cycle"
      name="selectedPayCycle"
      value={basePayDetails.selectedPayCycle}
      width="sm"
      onChange={handleInputChange(onWageDetailsChange)}
    >
      {payCycleOptions.map(({ value, label }) => (
        <Select.Option key={value} value={value} label={label} />
      ))}
    </Select>

    <ReadOnly name="selectedPayBasis" label="Pay basis">
      {basePayDetails.selectedPayBasis}
    </ReadOnly>
  </FieldGroup>
);

export default React.memo(BasePayDetails);
