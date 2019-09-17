import { Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLimit } from '../../selectors/SuperPayItemModalSelectors';
import AmountInput from '../../../../../components/autoFormatter/AmountInput/AmountInput';
import PayItemCombobox from './PayItemCombobox';
import handleAmountInputChange from '../../../../../components/handlers/handleAmountInputChange';
import handleComboboxChange from '../../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../../components/handlers/handleInputChange';

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
        {limitTypeOptions.map(({ name: label, value }) => (
          <Select.Option key={value} value={value} label={label} />
        ))}
      </Select>

      { showPercent && (
        <React.Fragment>
          <AmountInput
            label="Percentage %"
            name="limitPercentage"
            value={limitPercentage}
            onChange={handleAmountInputChange(onSuperPayItemDetailsChange)}
            onBlur={handleAmountInputChange(onSuperPayItemDetailBlur)}
            numeralIntegerScale={3}
            decimalScale={5}
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
          <AmountInput
            label="Dollar $"
            name="limitAmount"
            value={limitAmount}
            onChange={handleAmountInputChange(onSuperPayItemDetailsChange)}
            onBlur={handleAmountInputChange(onSuperPayItemDetailBlur)}
            numeralIntegerScale={13}
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
