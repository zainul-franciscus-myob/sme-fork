import { Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCalculationBasis } from '../../selectors/LeavePayItemModalSelectors';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import PayItemCombobox from './PayItemCombobox';
import handleAmountInputChange from '../../../../components/handlers/handleAmountInputChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const handlePayItemComboboxChange = (handler, key) => (item) => {
  handler({ key, value: item.id });
};

const LeavePayItemCalculationBasis = ({
  calculationBasisType,
  calculationBasisPercentage,
  calculationBasisPayItemId,
  calculationBasisAmount,
  calculationBasisPeriod,
  calculationBasisTypes,
  calculationBasisPercentOfOptions,
  payPeriods,
  showPercentage,
  showAmount,
  onCalculationBasisChange,
  onCalculationBasisAmountChange,
}) => (
  <React.Fragment>
    <Select
      name="calculationBasisType"
      label="Calculation basis"
      value={calculationBasisType}
      onChange={handleInputChange(onCalculationBasisChange)}
    >
      {calculationBasisTypes.map(({ name: label, value }) => (
        <Select.Option key={value} value={value} label={label} />
      ))}
    </Select>

    {showPercentage && (
      <React.Fragment>
        <AmountInput
          label="Percentage %"
          name="calculationBasisPercentage"
          value={calculationBasisPercentage}
          onChange={handleAmountInputChange(onCalculationBasisChange)}
          onBlur={handleAmountInputChange(onCalculationBasisAmountChange)}
          numeralIntegerScale={3}
          decimalScale={5}
        />
        <PayItemCombobox
          label="Percent of"
          hideLabel={false}
          items={calculationBasisPercentOfOptions}
          selectedId={calculationBasisPayItemId}
          onChange={handlePayItemComboboxChange(onCalculationBasisChange, 'calculationBasisPayItemId')}
        />
      </React.Fragment>
    )}

    {showAmount && (
      <React.Fragment>
        <AmountInput
          label="Dollar $"
          name="calculationBasisAmount"
          value={calculationBasisAmount}
          onChange={handleAmountInputChange(onCalculationBasisChange)}
          onBlur={handleAmountInputChange(onCalculationBasisAmountChange)}
          numeralIntegerScale={13}
        />
        <Select
          name="calculationBasisPeriod"
          label="Per"
          value={calculationBasisPeriod}
          onChange={handleInputChange(onCalculationBasisChange)}
        >
          {payPeriods.map(({ name: label, value }) => (
            <Select.Option key={value} value={value} label={label} />
          ))}
        </Select>
      </React.Fragment>
    )}
  </React.Fragment>
);

const mapStateToProps = state => getCalculationBasis(state);

export default connect(mapStateToProps)(LeavePayItemCalculationBasis);
