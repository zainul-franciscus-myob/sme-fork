import { FieldGroup, FormHorizontal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLeaveDetails } from '../LeaveSelectors';
import AmountInput from '../../../../../../components/autoFormatter/AmountInput/AmountInput';
import handleInputChange from '../../../../../../components/handlers/handleInputChange';

const LeaveTabView = ({ leave, onLeaveChange, onHolidayPayBlur }) => {
  /* eslint-disable */
    const onDateChange = (fieldName) => ({value}) =>
      onLeaveChange({key: fieldName, value});
  
  return (
    <FormHorizontal layout="primary">
      <FieldGroup label="Holidays">
        <AmountInput
          label="Holiday pay (%)"
          numeralDecimalScaleMax={2}
          numeralIntegerScale={3}
          numeralPositiveOnly
          width="xs"
          name="holidayPayRate"
          textAlign="right"
          value={leave.holidayPayRate}
          onBlur={handleInputChange(onHolidayPayBlur)}
          onChange={handleInputChange(onLeaveChange)}
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
          onChange={handleInputChange(onLeaveChange)}
        />
        <AmountInput
          label="Maximum to accure (days)"
          name="sickLeaveMaximumToAccure"
          numeralDecimalScaleMax={4}
          numeralIntegerScale={5}
          numeralPositiveOnly
          textAlign="right"
          width="xs"
          onChange={handleInputChange(onLeaveChange)}
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
          onChange={handleInputChange(onLeaveChange)}
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
          onChange={handleInputChange(onLeaveChange)}
          value={leave.alternativeOpeningBalance}
        />
      </FieldGroup> */}
    </FormHorizontal>
  );
};

const mapStateToProps = (state) => ({
  leave: getLeaveDetails(state),
});

export default connect(mapStateToProps)(LeaveTabView);
