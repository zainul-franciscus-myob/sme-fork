import { Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getLimit,
  getLimitAmount,
  getLimitPayItemId,
  getLimitPayItemOptions,
  getLimitPercentage,
  getLimitPeriod,
  getPeriodOptions,
} from '../ExpensePayItemSelectors';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import Limit from '../Limit';
import PayItemCombobox from './PayItemCombobox';
import handleAmountInputChange from '../../../../components/handlers/handleAmountInputChange';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';

const LimitSection = ({
  limit,
  limitPercentage,
  limitPayItemId,
  limitAmount,
  limitPeriod,
  limitPayItemOptions,
  periodOptions,
  onChangeExpensePayItemInput,
  onBlurExpensePayItemAmountInput,
}) => {
  const percentForm = (
    <React.Fragment>
      <AmountInput
        key={Limit.PERCENT}
        label="Percentage %"
        name="limitPercentage"
        value={limitPercentage}
        onChange={handleAmountInputChange(onChangeExpensePayItemInput)}
        onBlur={onBlurExpensePayItemAmountInput}
        numeralIntegerScale={3}
        numeralDecimalScaleMax={5}
        numeralPositiveOnly
      />
      <PayItemCombobox
        label="Percent of"
        hideLabel={false}
        items={limitPayItemOptions}
        selectedId={limitPayItemId}
        onChange={handleComboboxChange('limitPayItemId', onChangeExpensePayItemInput)}
      />
    </React.Fragment>
  );

  const fixedDollarForm = (
    <React.Fragment>
      <AmountInput
        key={Limit.FIXED_DOLLAR}
        label="Dollar $"
        name="limitAmount"
        value={limitAmount}
        onChange={handleAmountInputChange(onChangeExpensePayItemInput)}
        onBlur={onBlurExpensePayItemAmountInput}
        numeralIntegerScale={13}
        numeralDecimalScaleMax={2}
        numeralPositiveOnly
      />
      <Select
        name="limitPeriod"
        label="Per"
        value={limitPeriod}
        onChange={handleSelectChange(onChangeExpensePayItemInput)}
      >
        {periodOptions.map(period => (
          <Select.Option key={period.value} value={period.value} label={period.label} />
        ))}
      </Select>
    </React.Fragment>
  );

  const form = {
    [Limit.NO_LIMIT]: null,
    [Limit.PERCENT]: percentForm,
    [Limit.FIXED_DOLLAR]: fixedDollarForm,
  }[limit];

  return (
    <React.Fragment>
      <Select
        name="limit"
        label="Limit"
        value={limit}
        onChange={handleSelectChange(onChangeExpensePayItemInput)}
      >
        <Select.Option value={Limit.NO_LIMIT} label="No limit" />
        <Select.Option value={Limit.PERCENT} label="Equals a percentage of wage" />
        <Select.Option value={Limit.FIXED_DOLLAR} label="Equals dollars per pay period" />
      </Select>
      {form}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  limit: getLimit(state),
  limitPercentage: getLimitPercentage(state),
  limitPayItemId: getLimitPayItemId(state),
  limitAmount: getLimitAmount(state),
  limitPeriod: getLimitPeriod(state),
  limitPayItemOptions: getLimitPayItemOptions(state),
  periodOptions: getPeriodOptions(state),
});

export default connect(mapStateToProps)(LimitSection);
