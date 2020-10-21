import { FieldGroup, FormHorizontal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getHolidayPay, getLeaveDetails } from '../LeaveSelectors';
import AmountInput from '../../../../../../components/autoFormatter/AmountInput/AmountInput';

const LeaveTabView = ({ holidayPay, onLeaveChange }) => {
  const onInputChange = (event) =>
    onLeaveChange({
      key: event.target.name,
      value: event.target.value,
    });
  //  eslint-disable-next-line

  return (
    <FormHorizontal layout="primary">
      <FieldGroup label="Holidays">
        <AmountInput
          label="Holiday pay (%)"
          numeralDecimalScaleMax={2}
          numeralIntegerScale={3}
          numeralPositiveOnly
          width="xs"
          name="holidayPay"
          textAlign="right"
          value={holidayPay.holidayPayRate}
          onChange={onInputChange}
          disabled // Disabled to meet EAP requirement
        />
      </FieldGroup>
      {/*
      <FieldGroup label="Sick leave ">
        <ReadOnly name="sickLeaveCurrentBalance" label="Current balance (days)">
          {leave.sickLeaveCurrentBalance}
        </ReadOnly>
        <AmountInput
          label="Annual entitlement (days)"
          name="sickLeaveAnnualEntitlement"
          numeralDecimalScaleMax={4}
          numeralIntegerScale={5}
          numeralPositiveOnly
          textAlign="right"
          width="xs"
          value={leave.sickLeaveAnnualEntitlement}
          onChange={onInputChange}
        />
        <AmountInput
          label="Maximum to accure (days)"
          name="sickLeaveMaximumToAccure"
          numeralDecimalScaleMax={4}
          numeralIntegerScale={5}
          numeralPositiveOnly
          textAlign="right"
          width="xs"
          onChange={onInputChange}
          value={leave.sickLeaveMaximumToAccure}
        />
        <DatePicker
          name="nextAnniversaryDate"
          label="Next anniversary date"
          width="sm"
          value={leave.nextAnniversaryDate}
          onSelect={onDateChange('nextAnniversaryDate')}
        />
        <AmountInput
          label="Opening balance (days)"
          name="sickLeaveOpeningBalance"
          numeralDecimalScaleMax={4}
          numeralIntegerScale={5}
          textAlign="right"
          width="xs"
          onChange={onInputChange}
          value={leave.sickLeaveOpeningBalance}
        />
      </FieldGroup>

      <FieldGroup label="Alternative holidays">
        <ReadOnly
          name="alternativeCurrentBalance"
          label="Current balance (days)"
        >
          {leave.alternativeCurrentBalance}
        </ReadOnly>
        <AmountInput
          label="Opening balance (days)"
          name="alternativeOpeningBalance"
          numeralDecimalScaleMax={4}
          numeralIntegerScale={5}
          textAlign="right"
          width="xs"
          onChange={onInputChange}
          value={leave.alternativeOpeningBalance}
        />
      </FieldGroup>
     */}
    </FormHorizontal>
  );
};

const mapStateToProps = (state) => ({
  leave: getLeaveDetails(state),
  holidayPay: getHolidayPay(state),
});

export default connect(mapStateToProps)(LeaveTabView);
