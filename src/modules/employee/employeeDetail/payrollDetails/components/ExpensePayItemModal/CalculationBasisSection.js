import { Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getCalculationBasis,
  getCalculationBasisAmount,
  getCalculationBasisPayItemId,
  getCalculationBasisPayItemOptions,
  getCalculationBasisPercentage,
  getCalculationBasisPeriod,
  getPeriodOptions,
} from '../../selectors/ExpensePayItemModalSelectors';
import CalculationBasis from '../../../CalculationBasis';
import DollarInput from '../DollarInput';
import PayItemCombobox from './PayItemCombobox';
import PercentInput from '../PercentInput';
import handleComboboxChange from '../../../../../../components/handlers/handleComboboxChange';
import handleSelectChange from '../../../../../../components/handlers/handleSelectChange';

const CalculationBasisSection = ({
  calculationBasis,
  calculationBasisPercentage,
  calculationBasisPayItemId,
  calculationBasisAmount,
  calculationBasisPeriod,
  calculationBasisPayItemOptions,
  periodOptions,
  onChangeExpensePayItemInput,
}) => {
  const percentForm = (
    <React.Fragment>
      <PercentInput
        key={CalculationBasis.PERCENT}
        label="Percentage %"
        name="calculationBasisPercentage"
        value={calculationBasisPercentage}
        onChange={onChangeExpensePayItemInput}
        numeralPositiveOnly
      />
      <PayItemCombobox
        label="Percent of"
        hideLabel={false}
        items={calculationBasisPayItemOptions}
        selectedId={calculationBasisPayItemId}
        onChange={handleComboboxChange(
          'calculationBasisPayItemId',
          onChangeExpensePayItemInput
        )}
      />
    </React.Fragment>
  );

  const fixedDollarForm = (
    <React.Fragment>
      <DollarInput
        key={CalculationBasis.FIXED_DOLLAR}
        label="Dollar $"
        name="calculationBasisAmount"
        value={calculationBasisAmount}
        onChange={onChangeExpensePayItemInput}
        numeralPositiveOnly
      />
      <Select
        name="calculationBasisPeriod"
        label="Per"
        value={calculationBasisPeriod}
        onChange={handleSelectChange(onChangeExpensePayItemInput)}
      >
        {periodOptions.map((period) => (
          <Select.Option
            key={period.value}
            value={period.value}
            label={period.label}
          />
        ))}
      </Select>
    </React.Fragment>
  );

  const form = {
    [CalculationBasis.PERCENT]: percentForm,
    [CalculationBasis.FIXED_DOLLAR]: fixedDollarForm,
  }[calculationBasis];

  return (
    <React.Fragment>
      <Select
        name="calculationBasis"
        label="Calculation Basis"
        value={calculationBasis}
        onChange={handleSelectChange(onChangeExpensePayItemInput)}
      >
        <Select.Option
          value={CalculationBasis.PERCENT}
          label="Equals a percentage of wages"
        />
        <Select.Option
          value={CalculationBasis.FIXED_DOLLAR}
          label="Equals dollars per pay period"
        />
      </Select>
      {form}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  calculationBasis: getCalculationBasis(state),
  calculationBasisPercentage: getCalculationBasisPercentage(state),
  calculationBasisPayItemId: getCalculationBasisPayItemId(state),
  calculationBasisAmount: getCalculationBasisAmount(state),
  calculationBasisPeriod: getCalculationBasisPeriod(state),
  calculationBasisPayItemOptions: getCalculationBasisPayItemOptions(state),
  periodOptions: getPeriodOptions(state),
});

export default connect(mapStateToProps)(CalculationBasisSection);
