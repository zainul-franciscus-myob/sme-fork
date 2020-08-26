import { UPDATE_TAX_CODE, UPDATE_TAX_DETAIL } from './TaxAndKiwiSaverIntents';

const updateTaxDetails = (state, action) => ({
  ...state,
  isPageEdited: true,
  payrollDetails: {
    ...state.payrollDetails,
    tax: {
      ...state.payrollDetails.tax,
      [action.key]: action.value,
    },
  },
});

const resetIrdNumberIfTaxCodeND = (state, taxCode) =>
  taxCode === 'ND' ? '000 000 000' : state.payrollDetails.tax.irdNumber;

const updateTaxCode = (state, action) => ({
  ...state,
  isPageEdited: true,
  payrollDetails: {
    ...state.payrollDetails,
    tax: {
      ...state.payrollDetails.tax,
      taxCode: action.value,
      irdNumber: resetIrdNumberIfTaxCodeND(state, action.value),
    },
  },
});

export default {
  [UPDATE_TAX_DETAIL]: updateTaxDetails,
  [UPDATE_TAX_CODE]: updateTaxCode,
};
