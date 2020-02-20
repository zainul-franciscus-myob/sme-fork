import { Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLimit } from '../../selectors/SuperPayItemModalSelectors';
import DollarInput from '../DollarInput';
import PayItemCombobox from './PayItemCombobox';
import PercentInput from '../PercentInput';
import handleComboboxChange from '../../../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../../../components/handlers/handleInputChange';

const SuperPayItemLimit = (props) => {
  const {
    limitType,
    limitPercentage,
    limitPayItemId,
    limitAmount,
    limitPeriod,
    limitTypeOptions = [],
    limitPayItemOptions = [],
    periodOptions = [],
    showPercent,
    showAmount,
    onSuperPayItemDetailsChange,
  } = props;

  return (
    <React.Fragment>
      <Select
        name="limitType"
        label="Limit"
        value={limitType}
        onChange={handleInputChange(onSuperPayItemDetailsChange)}
      >
        {limitTypeOptions.map(({ name: label, value }) => (
          <Select.Option key={value} value={value} label={label} />
        ))}
      </Select>

      { showPercent && (
        <React.Fragment>
          <PercentInput
            label="Percentage %"
            name="limitPercentage"
            value={limitPercentage}
            onChange={onSuperPayItemDetailsChange}
          />
          <PayItemCombobox
            label="Percent of"
            hideLabel={false}
            items={limitPayItemOptions}
            selectedId={limitPayItemId}
            onChange={handleComboboxChange('limitPayItemId', onSuperPayItemDetailsChange)}
          />
        </React.Fragment>
      )}

      { showAmount && (
        <React.Fragment>
          <DollarInput
            label="Dollar $"
            name="limitAmount"
            value={limitAmount}
            onChange={onSuperPayItemDetailsChange}
          />
          <Select
            name="limitPeriod"
            label="Per"
            value={limitPeriod}
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

const mapStateToProps = state => getLimit(state);

export default connect(mapStateToProps)(SuperPayItemLimit);
