import { FieldGroup, ReadOnly, Select, Tooltip } from '@myob/myob-widgets';
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

  const payPeriodHoursToolTips =
    'Amount of hours this employee usually works in their pay cycle. Can be overridden during the pay run. Value must be greater than 0';

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
        numeralDecimalScaleMin={2}
        numeralIntegerScale={12}
        numeralPositiveOnly
        textAlign="right"
        width="sm"
        onChange={onInputChange}
        onBlur={onInputChange}
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
        label="Hours in pay cycle"
        numeralDecimalScaleMax={4}
        numeralDecimalScaleMin={2}
        numeralIntegerScale={3}
        numeralPositiveOnly
        value={payPeriodHours}
        width="sm"
        textAlign="right"
        requiredLabel="Hours in pay cycle is required"
        onChange={onInputChange}
        onBlur={onInputChange}
        labelAccessory={<Tooltip>{payPeriodHoursToolTips}</Tooltip>}
      />
    </FieldGroup>
  );
};

export default PayDetailsFieldGroup;
