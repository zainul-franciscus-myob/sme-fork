import { Icons, Select, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCalculationBasis } from '../superPayItemSelectors';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import PayItemCombobox from './PayItemCombobox';

const handleInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const handleAmountChange = handler => (e) => {
  const { name, rawValue } = e.target;
  handler({ key: name, value: rawValue });
};

const handlePayItemComboboxChange = (handler, key) => (item) => {
  handler({ key, value: item.id });
};

const SuperPayItemCalculationBasis = (props) => {
  const {
    calculationBasisType,
    calculationBasisPercentage,
    calculationBasisPayItemId,
    calculationBasisAmount,
    calculationBasisPeriod,
    exclusion,
    calculationBasisTypes = [],
    calculationBasisPayItems = [],
    periods = [],
    showPercent,
    showAmount,
    onSuperPayItemDetailsChange,
  } = props;

  return (
    <React.Fragment>
      <Select
        name="calculationBasisType"
        label="Calculation basis"
        value={calculationBasisType}
        onChange={handleInputChange(onSuperPayItemDetailsChange)}
      >
        {calculationBasisTypes.map(({ name: label, value }) => (
          <Select.Option key={value} value={value} label={label} />
        ))}
      </Select>

      { showPercent && (
        <React.Fragment>
          <AmountInput
            label="Percentage %"
            name="calculationBasisPercentage"
            value={calculationBasisPercentage}
            onChange={handleAmountChange(onSuperPayItemDetailsChange)}
            numeralIntegerScale={3}
            decimalScale={5}
          />
          <PayItemCombobox
            label="Percent of"
            hideLabel={false}
            items={calculationBasisPayItems}
            selectedId={calculationBasisPayItemId}
            onChange={handlePayItemComboboxChange(onSuperPayItemDetailsChange, 'calculationBasisPayItemId')}
          />
          <AmountInput
            label="Exclusions $"
            name="exclusion"
            value={exclusion}
            onChange={handleAmountChange(onSuperPayItemDetailsChange)}
            numeralIntegerScale={13}
            labelAccessory={(
              <Tooltip triggerContent={<Icons.Info />} placement="right">
                Exclude this first amount of eligible wages from calculations
              </Tooltip>
            )}
          />
        </React.Fragment>
      )}

      { showAmount && (
        <React.Fragment>
          <AmountInput
            label="Dollar $"
            name="calculationBasisAmount"
            value={calculationBasisAmount}
            onChange={handleAmountChange(onSuperPayItemDetailsChange)}
            numeralIntegerScale={13}
          />
          <Select
            name="calculationBasisPeriod"
            label="Per"
            value={calculationBasisPeriod}
            onChange={handleInputChange(onSuperPayItemDetailsChange)}
          >
            {periods.map(({ name: label, value }) => (
              <Select.Option key={value} value={value} label={label} />
            ))}
          </Select>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => getCalculationBasis(state);

export default connect(mapStateToProps)(SuperPayItemCalculationBasis);
