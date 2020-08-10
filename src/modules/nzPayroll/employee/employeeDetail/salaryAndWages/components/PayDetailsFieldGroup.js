import { FieldGroup, ReadOnly, Select } from '@myob/myob-widgets';
import React, { useCallback } from 'react';

import AmountInput from '../../../../../../components/autoFormatter/AmountInput/AmountInput';
import handleSelectChange from '../../../../../../components/handlers/handleSelectChange';

const PayDetailsFieldGroup = ({
  hourlyRate,
  selectedPayBasis,
  selectedPayCycle,
  payCycleOptions = [],
  payPeriodHours,
  onWageDetailsChange,
}) => {
  const onInputChange = useCallback(
    (event) =>
      onWageDetailsChange({
        key: event.target.name,
        value: event.target.value,
      }),
    [onWageDetailsChange]
  );

  return (
    <FieldGroup label="Pay details">
      <ReadOnly name="selectedPayBasis" label="Pay basis">
        {selectedPayBasis}
      </ReadOnly>
      <AmountInput
        label="Hourly rate ($)"
        name="hourlyRate"
        value={hourlyRate}
        numeralDecimalScaleMax={4}
        numeralIntegerScale={12}
        textAlign="right"
        width="sm"
        onChange={onInputChange}
      />
      <Select
        label="Pay cycle"
        name="selectedPayCycle"
        value={selectedPayCycle}
        width="sm"
        onChange={handleSelectChange(onWageDetailsChange)}
      >
        {payCycleOptions.map(({ id, displayName }) => (
          <Select.Option label={displayName} value={id} key={id} />
        ))}
      </Select>
      <AmountInput
        key="payPeriodHours"
        name="payPeriodHours"
        label="Estimated hours in a pay cycle"
        numeralDecimalScaleMax={3}
        numeralIntegerScale={3}
        numeralPositiveOnly
        value={payPeriodHours}
        width="sm"
        textAlign="right"
        onChange={onInputChange}
        onBlur={onInputChange}
      />
    </FieldGroup>
  );
};

export default PayDetailsFieldGroup;
