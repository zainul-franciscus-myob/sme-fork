import { UPDATE_TAX_KIWISAVER_DETAIL } from './TaxAndKiwiSaverIntents';

const updateTaxAndKiwisaverDetails = (state, action) => ({
  ...state,
  isPageEdited: true,
  payrollDetails: {
    ...state.payrollDetails,
    taxAndKiwiSaver: {
      ...state.payrollDetails.taxAndKiwiSaver,
      [action.key]: action.value,
    },
  },
});

export default {
  [UPDATE_TAX_KIWISAVER_DETAIL]: updateTaxAndKiwisaverDetails,
};
