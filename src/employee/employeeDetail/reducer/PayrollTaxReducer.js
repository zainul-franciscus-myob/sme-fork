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
