import {
  SET_PAYROLL_PAY_HISTORY_FILTER_OPTIONS,
  SET_PAYROLL_PAY_HISTORY_ITEM_INPUT,
} from '../../../EmployeeIntents';
import {
  getUpdatedPayHistoryItems,
  getUpdatedPayHistoryItemsFromFilterOptions,
} from '../selectors/PayrollPayHistorySelectors';

const setPayrollPayHistoryState = (state, partialPayHistoryDetails) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    payHistoryDetails: {
      ...state.payrollDetails.payHistoryDetails,
      ...partialPayHistoryDetails,
    },
  },
});

const setPayrollPayHistoryAndPageEdited = (
  state,
  partialPayHistoryDetails
) => ({
  ...setPayrollPayHistoryState(state, partialPayHistoryDetails),
  isPageEdited: true,
});

const setPayrollPayHistoryFilterOptions = (state, { value: period }) => {
  const updatedFilterOptions = {
    ...state.payrollDetails.payHistoryDetails.filterOptions,
    period,
  };

  const updatedPayHistoryItems = getUpdatedPayHistoryItemsFromFilterOptions(
    state,
    period
  );

  return setPayrollPayHistoryState(state, {
    filterOptions: updatedFilterOptions,
    payHistoryItems: updatedPayHistoryItems,
  });
};

const setPayrollPayHistoryItemInput = (
  state,
  { payItemId, payItemType, value: total }
) =>
  setPayrollPayHistoryAndPageEdited(state, {
    payHistoryItems: getUpdatedPayHistoryItems(state, {
      payItemId,
      payItemType,
      total,
    }),
  });

export default {
  [SET_PAYROLL_PAY_HISTORY_FILTER_OPTIONS]: setPayrollPayHistoryFilterOptions,
  [SET_PAYROLL_PAY_HISTORY_ITEM_INPUT]: setPayrollPayHistoryItemInput,
};
