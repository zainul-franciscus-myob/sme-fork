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

export const addPayrollTaxPayItem = (state, action) => {
  const updatedPayItems = [
    ...state.payrollDetails.tax.taxPayItems,
    { id: action.id, type: action.type },
  ];
  const partialTax = { taxPayItems: updatedPayItems };

  return setPayrollTaxState(state, partialTax);
};

export const removePayrollTaxPayItem = (state, action) => {
  const updatedPayItems = state.payrollDetails.tax.taxPayItems
    .filter(payItem => payItem.id !== action.id);
  const partialTax = { taxPayItems: updatedPayItems };

  return setPayrollTaxState(state, partialTax);
};

export const updatePayrollTaxDetail = (state, action) => {
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

export const formatAmountInput = (state, { key, value }) => {
  if (key === 'withholdingVariationRate') {
    return setPayrollTaxState(state, {
      [key]: formatPercentage(value),
    });
  }

  return setPayrollTaxState(state, {
    [key]: formatAmount(value),
  });
};

export const openTaxPayItemModal = (state) => {
  const defaultTaxPayItemModalState = getDefaultTaxPayItemModal();
  return {
    ...state,
    taxPayItemModal: defaultTaxPayItemModalState,
  };
};

export const closeTaxPayItemModal = state => ({
  ...state,
  taxPayItemModal: undefined,
});


export const setTaxPayItemModalLoading = (state, { isLoading }) => ({
  ...state,
  taxPayItemModal: {
    ...state.taxPayItemModal,
    isLoading,
  },
});

export const loadTaxPayItemModal = (state, { tax, atoReportingCategoryList, accounts }) => ({
  ...state,
  taxPayItemModal: {
    ...state.taxPayItemModal,
    tax,
    atoReportingCategoryList,
    accounts,
  },
});

export const updateTaxPayItemModalDetails = (state, { key, value }) => ({
  ...state,
  taxPayItemModal: {
    ...state.taxPayItemModal,
    tax: {
      ...state.taxPayItemModal.tax,
      [key]: value,
    },
  },
});

export const setTaxPayItemModalSubmitting = (state, { isSubmitting }) => ({
  ...state,
  taxPayItemModal: {
    ...state.taxPayItemModal,
    isSubmitting,
  },
});

export const setTaxPayItemModalAlertMessage = (state, { alertMessage }) => ({
  ...state,
  taxPayItemModal: {
    ...state.taxPayItemModal,
    alertMessage,
  },
});
