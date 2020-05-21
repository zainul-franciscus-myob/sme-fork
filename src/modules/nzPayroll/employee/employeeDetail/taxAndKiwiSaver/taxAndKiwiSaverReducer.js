import { UPDATE_TAX_DETAIL } from './TaxAndKiwiSaverIntents';

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

export default {
  [UPDATE_TAX_DETAIL]: updateTaxDetails,
};
