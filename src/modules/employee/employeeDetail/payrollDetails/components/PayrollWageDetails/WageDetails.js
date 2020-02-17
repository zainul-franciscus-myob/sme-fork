import {
  FieldGroup, FormHorizontal, RadioButtonGroup, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getWageDetails } from '../../selectors/PayrollWageSelectors';
import AccountCombobox from '../../../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../../../components/autoFormatter/AmountInput/AmountInput';
import handleAmountInputChange from '../../../../../../components/handlers/handleAmountInputChange';
import handleComboboxChange from '../../../../../../components/handlers/handleComboboxChange';
import handleRadioButtonChange from '../../../../../../components/handlers/handleRadioButtonChange';
import handleSelectChange from '../../../../../../components/handlers/handleSelectChange';
import styles from './WageDetails.module.css';

const WageDetails = ({
  selectedPayBasis,
  isSelectedPayBasisSalary,
  annualSalary,
  hourlyRate,
  selectedPayCycle,
  payPeriodHours,
  wageExpenseAccounts,
  selectedWageExpenseAccount,
  wagePayCycleOptions,
  wagePayBasisOptions,
  onPayrollWageDetailsChange,
  onPayrollWagePayBasisChange,
  onPayrollWageAnnualSalaryBlur,
  onPayrollWageHourlyRateBlur,
  onPayrollWageHoursInPayCycleBlur,
  onPayrollWageSelectedPayCycleChange,
}) => (
  <div className={styles.wageView}>
    <FormHorizontal>
      <FieldGroup label="Pay details">
        <RadioButtonGroup
          label="Pay basis"
          name="selectedPayBasis"
          options={wagePayBasisOptions}
          value={selectedPayBasis}
          onChange={handleRadioButtonChange('selectedPayBasis', onPayrollWagePayBasisChange)}
        />
        <AmountInput
          key="annualSalary"
          name="annualSalary"
          label="Annual salary $"
          numeralDecimalScaleMax={2}
          numeralIntegerScale={13}
          numeralPositiveOnly
          value={annualSalary}
          onChange={handleAmountInputChange(onPayrollWageDetailsChange)}
          onBlur={handleAmountInputChange(onPayrollWageAnnualSalaryBlur)}
          disabled={!isSelectedPayBasisSalary}
        />
        <AmountInput
          key="hourlyRate"
          name="hourlyRate"
          label="Hourly rate $"
          numeralDecimalScaleMax={4}
          numeralIntegerScale={12}
          numeralPositiveOnly
          value={hourlyRate}
          onChange={handleAmountInputChange(onPayrollWageDetailsChange)}
          onBlur={handleAmountInputChange(onPayrollWageHourlyRateBlur)}
          disabled={isSelectedPayBasisSalary}
        />
        <Select
          name="selectedPayCycle"
          label="Pay cycle"
          onChange={handleSelectChange(onPayrollWageSelectedPayCycleChange)}
          value={selectedPayCycle}
        >
          {wagePayCycleOptions.map(({ displayName, id }) => (
            <Select.Option key={id} value={id} label={displayName} />
          ))}
        </Select>
        <AmountInput
          key="payPeriodHours"
          name="payPeriodHours"
          label="Hours in a pay cycle"
          numeralDecimalScaleMax={3}
          numeralIntegerScale={3}
          numeralPositiveOnly
          value={payPeriodHours}
          onChange={handleAmountInputChange(onPayrollWageDetailsChange)}
          onBlur={handleAmountInputChange(onPayrollWageHoursInPayCycleBlur)}
        />
        <AccountCombobox
          label="Wage expense account"
          hideLabel={false}
          items={wageExpenseAccounts}
          selectedId={selectedWageExpenseAccount}
          onChange={handleComboboxChange('selectedWageExpenseAccount', onPayrollWageDetailsChange)}
        />
      </FieldGroup>
    </FormHorizontal>
  </div>
);

const mapStateToProps = state => getWageDetails(state);

export default connect(mapStateToProps)(WageDetails);
