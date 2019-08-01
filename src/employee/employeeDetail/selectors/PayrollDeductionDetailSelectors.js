import { createSelector } from 'reselect/lib/index';

const getDeductionPayItemOptions = state => state.deductionPayItemOptions;

export const getDeductionPayItems = state => (
  state.payrollDetails.deductionDetails.deductionPayItems
);

export const getFilteredDeductionPayItemOptions = createSelector(
  getDeductionPayItemOptions,
  getDeductionPayItems,
  (deductionPayItemOptions, deductionPayItems) => deductionPayItemOptions
    .filter(deductionPayItemOption => !deductionPayItems
      .some(deductionPayItem => deductionPayItem.id === deductionPayItemOption.id)),
);
