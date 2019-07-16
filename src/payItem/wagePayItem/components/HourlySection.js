import {
  Checkbox, CheckboxGroup, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getPayRateList,
  getWage,
} from '../wagePayItemSelector';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import OverrideAccount from './OverrideAccount';
import handleAmountInputChange from '../../../components/handlers/handleAmountInputChange';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleSelectChange from '../../../components/handlers/handleSelectChange';

const HourlySection = ({
  wage,
  payRateList,
  onDetailsChange,
  onAmountInputBlur,
  onOverrideAccountChange,
}) => (
  <React.Fragment>
    <Select
      name="payRate"
      label="Pay rate"
      value={wage.payRate}
      onChange={handleSelectChange(onDetailsChange)}
      disabled={wage.isSystem}
    >
      {
        payRateList.map(category => (
          <Select.Option key={category.value} value={category.value} label={category.name} />
        ))
      }
    </Select>
    {
      wage.payRate === 'RegularRate' ? (
        <AmountInput
          key="payRateMultiplier"
          name="payRateMultiplier"
          label="payRateMultiplier"
          hideLabel
          decimalScale={4}
          numeralIntegerScale={3}
          numeralPositiveOnly
          value={wage.payRateMultiplier}
          onChange={handleAmountInputChange(onDetailsChange)}
          onBlur={handleAmountInputChange(onAmountInputBlur)}
          disabled={wage.isSystem}
        />
      ) : (
        <AmountInput
          key="fixedHourlyPayRate"
          name="fixedHourlyPayRate"
          label="fixedHourlyPayRate"
          hideLabel
          decimalScale={4}
          numeralIntegerScale={13}
          numeralPositiveOnly
          value={wage.fixedHourlyPayRate}
          onChange={handleAmountInputChange(onDetailsChange)}
          onBlur={handleAmountInputChange(onAmountInputBlur)}
          disabled={wage.isSystem}
        />
      )
    }
    <OverrideAccount
      onDetailsChange={onDetailsChange}
      onOverrideAccountChange={onOverrideAccountChange}
    />
    <CheckboxGroup
      label="autoAdjustBase"
      hideLabel
      renderCheckbox={() => (
        <Checkbox
          name="autoAdjustBase"
          label="Automatically adjust base hourly or base salary details"
          checked={wage.autoAdjustBase}
          onChange={handleCheckboxChange(onDetailsChange)}
          disabled={wage.isSystem}
        />
      )}
    />
  </React.Fragment>
);

const mapStateToProps = state => ({
  wage: getWage(state),
  payRateList: getPayRateList(state),
});

export default connect(mapStateToProps)(HourlySection);
