import {
  getStandardPayFormattedAmount,
  getStandardPayFormattedHours,
  getStandardPayItems,
  getWageAmountRules,
} from '../selectors/PayrollStandardPaySelectors';

const getStandardPayItemDefaultState = () => ({
  id: '',
  payItemId: '',
  hours: getStandardPayFormattedHours(0),
  appliedHours: getStandardPayFormattedHours(0),
  amount: getStandardPayFormattedAmount(0),
  isLoading: false,
});

const setPayrollStandardPayState = (state, partialStandardPayDetails) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    standardPayDetails: {
      ...state.payrollDetails.standardPayDetails,
      ...partialStandardPayDetails,
    },
  },
  isPageEdited: true,
});

export const loadPayrollStandardPayWageAmountRule = (state, { payItemId, rule }) => {
  const wageAmountRules = getWageAmountRules(state);
  const updatedWageAmountRule = {
    ...wageAmountRules,
    [payItemId]: rule,
  };

  return setPayrollStandardPayState(state, { wageAmountRules: updatedWageAmountRule });
};

export const setPayrollStandardPayDetailsItemInput = (state, { key, value }) => (
  setPayrollStandardPayState(state, { [key]: value })
);

export const setPayrollStandardPayItemInput = (state, { payItemId, key, value }) => {
  const standardPayItems = getStandardPayItems(state);
  const standardPayItemDefaultState = getStandardPayItemDefaultState();

  const standardPayItem = standardPayItems
    .find(({ payItemId: standardPayItemId }) => standardPayItemId === payItemId);

  const updatedStandardPayItems = standardPayItem
    ? standardPayItems.map((payItem) => {
      const { payItemId: standardPayItemId } = payItem;
      return standardPayItemId === payItemId
        ? { ...payItem, [key]: value }
        : payItem;
    })
    : [
      ...standardPayItems,
      {
        ...standardPayItemDefaultState,
        payItemId,
        [key]: value,
      },
    ];

  return setPayrollStandardPayState(state, { standardPayItems: updatedStandardPayItems });
};

export const removePayrollStandardPayItem = (state, { payItemId }) => {
  const standardPayItems = getStandardPayItems(state);
  const updatedStandardPayItems = standardPayItems
    .filter(({ payItemId: standardPayItemId }) => standardPayItemId !== payItemId);

  return setPayrollStandardPayState(state, { standardPayItems: updatedStandardPayItems });
};
