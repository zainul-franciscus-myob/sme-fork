import { Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLimit } from '../superPayItemSelectors';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
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
    onSuperPayItemDetailBlur,
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

      { showPercent && (
        <React.Fragment>
          <AmountInput
            label="Percentage %"
            name="limitPercentage"
            value={limitPercentage}
            onChange={handleAmountChange(onSuperPayItemDetailsChange)}
            onBlur={handleAmountChange(onSuperPayItemDetailBlur)}
            numeralIntegerScale={3}
            decimalScale={5}
          />
          <PayItemCombobox
            label="Percent of"
            hideLabel={false}
            items={limitPayItems}
            selectedId={limitPayItemId}
            onChange={handlePayItemComboboxChange(onSuperPayItemDetailsChange, 'limitPayItemId')}
          />
        </React.Fragment>
      )}

      { showAmount && (
        <React.Fragment>
          <AmountInput
            label="Dollar $"
            name="limitAmount"
            value={limitAmount}
            onChange={handleAmountChange(onSuperPayItemDetailsChange)}
            onBlur={handleAmountChange(onSuperPayItemDetailBlur)}
            numeralIntegerScale={13}
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

const mapStateToProps = state => getLimit(state);

export default connect(mapStateToProps)(SuperPayItemLimit);
