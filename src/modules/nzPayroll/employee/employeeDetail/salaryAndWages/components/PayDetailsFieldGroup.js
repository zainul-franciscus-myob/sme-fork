import { FieldGroup, ReadOnly, Select } from '@myob/myob-widgets';
import React from 'react';

import AmountInput from '../../../../../../components/autoFormatter/AmountInput/AmountInput';

const PayDetailsFieldGroup = ({
  hourlyRate,
  selectedPayBasis,
  selectedPayCycle,
  payCycleOptions = [],
}) => (
  <FieldGroup label="Pay Details">
    <ReadOnly
      name="payBasis"
      label="Pay basis"
    >
      {selectedPayBasis}
      </ReadOnly>
    <AmountInput
      label="Hourly rate ($)"
      name="hourlyRate"
      value={hourlyRate}
      disabled
      textAlign="right"
      width="xs"
    />
    <Select
      label="Pay cycle"
      name="payCycle"
      value={selectedPayCycle}
      disabled
      width="sm"
    >
      {
        payCycleOptions.map(({ id, displayName }) => (
          <Select.Option label={displayName} value={id} key={id} />
        ))
      }
    </Select>
  </FieldGroup>
);

export default PayDetailsFieldGroup;
