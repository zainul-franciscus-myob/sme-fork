import {
  UPDATE_IRDNUMBER_ONBLUR,
  UPDATE_KIWISAVER_DETAIL,
  UPDATE_KIWISAVER_EMPLOYER_CONTRIBUTION_RATE,
  UPDATE_TAX_CODE,
  UPDATE_TAX_DETAIL,
} from './TaxAndKiwiSaverIntents';

const taxAndKiwiSaverDispatcher = (store) => ({
  updateTaxDetails: ({ key, value }) => {
    const intent = UPDATE_TAX_DETAIL;
    store.dispatch({ intent, key, value });
  },

  updateIrdNumberOnBlur: ({ key, value }) => {
    const intent = UPDATE_IRDNUMBER_ONBLUR;
    store.dispatch({ intent, key, value });
  },

  updateTaxCode: ({ value }) => {
    store.dispatch({
      intent: UPDATE_TAX_CODE,
      value,
    });
  },

  updateKiwiSaverDetails: ({ key, value }) => {
    const intent = UPDATE_KIWISAVER_DETAIL;
    store.dispatch({ intent, key, value });
  },

  updateKiwiSaverEmployerContributionRate: ({ value }) => {
    const intent = UPDATE_KIWISAVER_EMPLOYER_CONTRIBUTION_RATE;
    store.dispatch({ intent, value });
  },
});

export default taxAndKiwiSaverDispatcher;
