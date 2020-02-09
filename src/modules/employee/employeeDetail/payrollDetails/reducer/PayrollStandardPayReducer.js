import {
  LOAD_PAYROLL_STANDARD_PAY_WAGE_AMOUNT_RULE,
  REMOVE_PAYROLL_STANDARD_PAY_ITEM,
  SET_PAYROLL_STANDARD_PAY_DETAILS_INPUT,
  SET_PAYROLL_STANDARD_PAY_ITEM_INPUT,
  SET_SHOW_ADD_WAGE_PAY_ITEM,
} from '../../../EmployeeIntents';
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

const loadPayrollStandardPayWageAmountRule = (state, { payItemId, rule }) => {
  const wageAmountRules = getWageAmountRules(state);
  const updatedWageAmountRule = {
    ...wageAmountRules,
    [payItemId]: rule,
  };

  return setPayrollStandardPayState(state, { wageAmountRules: updatedWageAmountRule });
};

const setPayrollStandardPayDetailsItemInput = (state, { key, value }) => (
  setPayrollStandardPayState(state, { [key]: value })
);

const setPayrollStandardPayItemInput = (state, { payItemId, key, value }) => {
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

const removePayrollStandardPayItem = (state, { payItemId }) => {
  const standardPayItems = getStandardPayItems(state);
  const updatedStandardPayItems = standardPayItems
    .filter(({ payItemId: standardPayItemId }) => standardPayItemId !== payItemId);

  return setPayrollStandardPayState(state, { standardPayItems: updatedStandardPayItems });
};

const showAddWagePayItemDropdown = (state, action) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    wage: {
      ...state.payrollDetails.wage,
      showAddWagePayItemButton: action.showDropdown,
    },
  },
});

export default {
  [LOAD_PAYROLL_STANDARD_PAY_WAGE_AMOUNT_RULE]: loadPayrollStandardPayWageAmountRule,
  [SET_PAYROLL_STANDARD_PAY_DETAILS_INPUT]: setPayrollStandardPayDetailsItemInput,
  [SET_PAYROLL_STANDARD_PAY_ITEM_INPUT]: setPayrollStandardPayItemInput,
  [REMOVE_PAYROLL_STANDARD_PAY_ITEM]: removePayrollStandardPayItem,
  [SET_SHOW_ADD_WAGE_PAY_ITEM]: showAddWagePayItemDropdown,
};
