import {
  ADD_PAYROLL_TAX_PAY_ITEM,
  CLOSE_TAX_PAY_ITEM_MODAL,
  FORMAT_PAYROLL_TAX_AMOUNT,
  LOAD_TAX_PAY_ITEM_MODAL,
  OPEN_TAX_PAY_ITEM_MODAL,
  REMOVE_PAYROLL_TAX_PAY_ITEM,
  SET_TAX_PAY_ITEM_MODAL_ALERT_MESSAGE,
  SET_TAX_PAY_ITEM_MODAL_LOADING_STATE,
  SET_TAX_PAY_ITEM_MODAL_SUBMITTING_STATE,
  UPDATE_PAYROLL_TAX_DETAILS,
  UPDATE_TAX_PAY_ITEM_MODAL_DETAILS,
} from '../../../EmployeeIntents';

const getDefaultTaxPayItemModal = () => ({
  tax: {
    atoReportingCategory: '',
    accountId: '',
  },
  accounts: [],
  atoReportingCategoryList: [],
  isLoading: false,
  isSubmitting: false,
  alertMessage: '',
});

const setPayrollTaxState = (state, partialTax) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    tax: {
      ...state.payrollDetails.tax,
      ...partialTax,
    },
  },
  isPageEdited: true,
});

const addPayrollTaxPayItem = (state, action) => {
  const updatedPayItems = [
    ...state.payrollDetails.tax.taxPayItems,
    { id: action.id, type: action.type },
  ];
  const partialTax = { taxPayItems: updatedPayItems };

  return setPayrollTaxState(state, partialTax);
};

const removePayrollTaxPayItem = (state, action) => {
  const updatedPayItems = state.payrollDetails.tax.taxPayItems
    .filter(payItem => payItem.id !== action.id);
  const partialTax = { taxPayItems: updatedPayItems };

  return setPayrollTaxState(state, partialTax);
};

const updatePayrollTaxDetail = (state, action) => {
  const partialTax = {
    [action.key]: action.value,
  };

  return setPayrollTaxState(state, partialTax);
};

const formatAmount = value => (Number(value) || 0).toFixed(2);

const removeTrailingZeroes = number => String(Number(number));

const countDecimalPlaces = (num) => {
  if (Math.floor(num) === num) return 0;
  return num.toString().split('.')[1].length || 0;
};

const formatPercentage = (value) => {
  const percentage = Number(value) || 0;

  if (countDecimalPlaces(percentage) < 2) {
    return percentage.toFixed(2);
  }

  return removeTrailingZeroes(percentage.toFixed(5));
};

const formatAmountInput = (state, { key, value }) => {
  if (key === 'withholdingVariationRate') {
    return setPayrollTaxState(state, {
      [key]: formatPercentage(value),
    });
  }

  return setPayrollTaxState(state, {
    [key]: formatAmount(value),
  });
};

const openTaxPayItemModal = (state) => {
  const defaultTaxPayItemModalState = getDefaultTaxPayItemModal();
  return {
    ...state,
    taxPayItemModal: defaultTaxPayItemModalState,
  };
};

const closeTaxPayItemModal = state => ({
  ...state,
  taxPayItemModal: undefined,
});


const setTaxPayItemModalLoading = (state, { isLoading }) => ({
  ...state,
  taxPayItemModal: {
    ...state.taxPayItemModal,
    isLoading,
  },
});

const loadTaxPayItemModal = (state, { tax, atoReportingCategoryList, accounts }) => ({
  ...state,
  taxPayItemModal: {
    ...state.taxPayItemModal,
    tax,
    atoReportingCategoryList,
    accounts,
  },
});

const updateTaxPayItemModalDetails = (state, { key, value }) => ({
  ...state,
  taxPayItemModal: {
    ...state.taxPayItemModal,
    tax: {
      ...state.taxPayItemModal.tax,
      [key]: value,
    },
  },
});

const setTaxPayItemModalSubmitting = (state, { isSubmitting }) => ({
  ...state,
  taxPayItemModal: {
    ...state.taxPayItemModal,
    isSubmitting,
  },
});

const setTaxPayItemModalAlertMessage = (state, { alertMessage }) => ({
  ...state,
  taxPayItemModal: {
    ...state.taxPayItemModal,
    alertMessage,
  },
});

export default {
  [ADD_PAYROLL_TAX_PAY_ITEM]: addPayrollTaxPayItem,
  [REMOVE_PAYROLL_TAX_PAY_ITEM]: removePayrollTaxPayItem,
  [UPDATE_PAYROLL_TAX_DETAILS]: updatePayrollTaxDetail,
  [FORMAT_PAYROLL_TAX_AMOUNT]: formatAmountInput,
  [OPEN_TAX_PAY_ITEM_MODAL]: openTaxPayItemModal,
  [CLOSE_TAX_PAY_ITEM_MODAL]: closeTaxPayItemModal,
  [SET_TAX_PAY_ITEM_MODAL_LOADING_STATE]: setTaxPayItemModalLoading,
  [LOAD_TAX_PAY_ITEM_MODAL]: loadTaxPayItemModal,
  [UPDATE_TAX_PAY_ITEM_MODAL_DETAILS]: updateTaxPayItemModalDetails,
  [SET_TAX_PAY_ITEM_MODAL_SUBMITTING_STATE]: setTaxPayItemModalSubmitting,
  [SET_TAX_PAY_ITEM_MODAL_ALERT_MESSAGE]: setTaxPayItemModalAlertMessage,
};