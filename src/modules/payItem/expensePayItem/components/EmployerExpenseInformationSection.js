import {
  Checkbox, CheckboxGroup, FieldGroup, Icons, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsPrintOnPaySlip, getThreshold } from '../ExpensePayItemSelectors';
import CalculationBasisSection from './CalculationBasisSection';
import DollarInput from '../../components/DollarInput';
import LimitSection from './LimitSection';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';

const EmployerExpenseInformationSection = ({
  isPrintOnPaySlip,
  threshold,
  onChangeExpensePayItemInput,
}) => (
  <FieldGroup label="Employer expense information">
    <CheckboxGroup
      label=""
      hideLabel
      renderCheckbox={() => (
        <Checkbox
          name="isPrintOnPaySlip"
          label="Print on pay slip"
          checked={isPrintOnPaySlip}
          onChange={handleCheckboxChange(onChangeExpensePayItemInput)}
        />
      )}
    />
    <CalculationBasisSection onChangeExpensePayItemInput={onChangeExpensePayItemInput} />
    <LimitSection onChangeExpensePayItemInput={onChangeExpensePayItemInput} />
    <DollarInput
      label="Threshold $"
      name="threshold"
      value={threshold}
      onChange={onChangeExpensePayItemInput}
      numeralPositiveOnly
      labelAccessory={(
        <Tooltip triggerContent={<Icons.Info />} placement="right">
            Calculate once eligible wages of this amount have been paid per month
        </Tooltip>
        )}
    />
  </FieldGroup>
);

const mapStateToProps = state => ({
  isPrintOnPaySlip: getIsPrintOnPaySlip(state),
  threshold: getThreshold(state),
});

export default connect(mapStateToProps)(EmployerExpenseInformationSection);
