import { Icons, Select, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCalculationBasis } from '../../selectors/SuperPayItemModalSelectors';
import DollarInput from '../DollarInput';
import PayItemCombobox from './PayItemCombobox';
import PercentInput from '../PercentInput';
import handleComboboxChange from '../../../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../../../components/handlers/handleInputChange';

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
          <PercentInput
            label="Percentage %"
            name="calculationBasisPercentage"
            value={calculationBasisPercentage}
            onChange={onSuperPayItemDetailsChange}
          />
          <PayItemCombobox
            label="Percent of"
            hideLabel={false}
            items={calculationBasisPayItemOptions}
            selectedId={calculationBasisPayItemId}
            onChange={handleComboboxChange('calculationBasisPayItemId', onSuperPayItemDetailsChange)}
          />
          <DollarInput
            label="Exclusions $"
            name="exclusion"
            value={exclusion}
            onChange={onSuperPayItemDetailsChange}
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
          <DollarInput
            label="Dollar $"
            name="calculationBasisAmount"
            value={calculationBasisAmount}
            onChange={onSuperPayItemDetailsChange}
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
