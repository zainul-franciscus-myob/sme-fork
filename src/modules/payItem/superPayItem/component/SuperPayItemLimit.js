import { Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLimit } from '../superPayItemSelectors';
import DollarInput from '../../components/DollarInput';
import PayItemCombobox from './PayItemCombobox';
import PercentInput from '../../components/PercentInput';

const handleInputChange = (handler) => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const handlePayItemComboboxChange = (handler, key) => (item) => {
  handler({ key, value: item.id });
};

const SuperPayItemLimit = (props) => {
  const {
    limitType,
    limitPercentage,
    limitPayItemId,
    limitAmount,
    limitPeriod,
    limitTypes = [],
    limitPayItems = [],
    periods = [],
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
        {limitTypes.map(({ name: label, value }) => (
          <Select.Option key={value} value={value} label={label} />
        ))}
      </Select>

      {showPercent && (
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
            items={limitPayItems}
            selectedId={limitPayItemId}
            onChange={handlePayItemComboboxChange(
              onSuperPayItemDetailsChange,
              'limitPayItemId'
            )}
          />
        </React.Fragment>
      )}

      {showAmount && (
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
            {periods.map(({ name: label, value }) => (
              <Select.Option key={value} value={value} label={label} />
            ))}
          </Select>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => getLimit(state);

export default connect(mapStateToProps)(SuperPayItemLimit);
