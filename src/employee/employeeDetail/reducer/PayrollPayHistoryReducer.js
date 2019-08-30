import {
  getFormattedActivity,
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

const setPayrollPayHistoryAndPageEdited = (state, partialPayHistoryDetails) => ({
  ...setPayrollPayHistoryState(state, partialPayHistoryDetails),
  isPageEdited: true,
});

export const setPayrollPayHistoryFilterOptions = (state, { value: period }) => {
  const updatedFilterOptions = {
    ...state.payrollDetails.payHistoryDetails.filterOptions,
    period,
  };

  const updatedPayHistoryItems = getUpdatedPayHistoryItemsFromFilterOptions(state, period);

  return setPayrollPayHistoryState(state, {
    filterOptions: updatedFilterOptions,
    payHistoryItems: updatedPayHistoryItems,
  });
};

export const setPayrollPayHistoryItemInput = (state, { payItemId, payItemType, value: total }) => (
  setPayrollPayHistoryAndPageEdited(state, {
    payHistoryItems: getUpdatedPayHistoryItems(state, { payItemId, payItemType, total }),
  })
);

export const formatPayrollPayHistoryItemInput = (state, {
  payItemId, payItemType, key, value,
}) => {
  const formattedValue = getFormattedActivity({ key, value });

  return setPayrollPayHistoryAndPageEdited(state, {
    payHistoryItems: getUpdatedPayHistoryItems(state, {
      payItemId, payItemType, total: formattedValue,
    }),
  });
};
