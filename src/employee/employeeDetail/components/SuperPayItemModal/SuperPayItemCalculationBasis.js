import { Icons, Select, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCalculationBasis } from '../../selectors/SuperPayItemModalSelectors';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import PayItemCombobox from './PayItemCombobox';
import handleAmountInputChange from '../../../../components/handlers/handleAmountInputChange';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const SuperPayItemCalculationBasis = (props) => {
  const {
    calculationBasisType,
    calculationBasisPercentage,
    calculationBasisPayItemId,
    calculationBasisAmount,
    calculationBasisPeriod,
    exclusion,
    calculationBasisTypeOptions = [],
    calculationBasisPayItemOptions = [],
    periodOptions = [],
    showPercent,
    showAmount,
    onSuperPayItemDetailsChange,
    onSuperPayItemDetailBlur,
  } = props;

  return (
    <React.Fragment>
      <Select
        name="calculationBasisType"
        label="Calculation basis"
        value={calculationBasisType}
        onChange={handleInputChange(onSuperPayItemDetailsChange)}
      >
        {calculationBasisTypeOptions.map(({ name: label, value }) => (
          <Select.Option key={value} value={value} label={label} />
        ))}
      </Select>

      { showPercent && (
        <React.Fragment>
          <AmountInput
            label="Percentage %"
            name="calculationBasisPercentage"
            value={calculationBasisPercentage}
            onChange={handleAmountInputChange(onSuperPayItemDetailsChange)}
            onBlur={handleAmountInputChange(onSuperPayItemDetailBlur)}
            numeralIntegerScale={3}
            decimalScale={5}
          />
          <PayItemCombobox
            label="Percent of"
            hideLabel={false}
            items={calculationBasisPayItemOptions}
            selectedId={calculationBasisPayItemId}
            onChange={handleComboboxChange('calculationBasisPayItemId', onSuperPayItemDetailsChange)}
          />
          <AmountInput
            label="Exclusions $"
            name="exclusion"
            value={exclusion}
            onChange={handleAmountInputChange(onSuperPayItemDetailsChange)}
            onBlur={handleAmountInputChange(onSuperPayItemDetailBlur)}
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
            onChange={handleAmountInputChange(onSuperPayItemDetailsChange)}
            onBlur={handleAmountInputChange(onSuperPayItemDetailBlur)}
            numeralIntegerScale={13}
          />
          <Select
            name="calculationBasisPeriod"
            label="Per"
            value={calculationBasisPeriod}
            onChange={handleInputChange(onSuperPayItemDetailsChange)}
          >
            {periodOptions.map(({ name: label, value }) => (
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
