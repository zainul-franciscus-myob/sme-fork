import { FieldGroup, ReadOnly, Select } from '@myob/myob-widgets';
import React, { useCallback } from 'react';

import AmountInput from '../../../../../../components/autoFormatter/AmountInput/AmountInput';

const PayDetailsFieldGroup = ({
  hourlyRate,
  selectedPayBasis,
  selectedPayCycle,
  payCycleOptions = [],
  onWageDetailsChange,
}) => {
  const onInputChange = useCallback(
    event => onWageDetailsChange({
      key: event.target.name,
      value: event.target.value,
    }),
    [onWageDetailsChange],
  );

  return (
  <FieldGroup label="Pay details">
    <ReadOnly
      name="selectedPayBasis"
      label="Pay basis"
    >
      {selectedPayBasis}
      </ReadOnly>
    <AmountInput
      label="Hourly rate ($)"
      name="hourlyRate"
      value={hourlyRate}
      textAlign="right"
      width="xs"
      onChange={onInputChange}
    />
    <Select
      label="Pay cycle"
      name="selectedPayCycle"
      value={selectedPayCycle}
      width="sm"
      onChange={onInputChange}
    >
      {
        payCycleOptions.map(({ id, displayName }) => (
          <Select.Option label={displayName} value={id} key={id} />
        ))
      }
    </Select>
  </FieldGroup>
  );
};

export default PayDetailsFieldGroup;
