import { Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCalculationBasis } from '../../selectors/LeavePayItemModalSelectors';
import DollarInput from '../DollarInput';
import PayItemCombobox from './PayItemCombobox';
import PercentInput from '../PercentInput';
import handleInputChange from '../../../../../../components/handlers/handleInputChange';

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
        <PercentInput
          label="Percentage %"
          name="calculationBasisPercentage"
          value={calculationBasisPercentage}
          onChange={onCalculationBasisChange}
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
        <DollarInput
          label="Hours"
          name="calculationBasisAmount"
          value={calculationBasisAmount}
          onChange={onCalculationBasisChange}
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
