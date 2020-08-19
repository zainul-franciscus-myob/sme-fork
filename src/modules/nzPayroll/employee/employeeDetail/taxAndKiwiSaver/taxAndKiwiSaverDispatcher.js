import { UPDATE_TAX_CODE, UPDATE_TAX_DETAIL } from './TaxAndKiwiSaverIntents';

const taxAndKiwiSaverDispatcher = (store) => ({
  updateTaxDetails: ({ key, value }) => {
    const intent = UPDATE_TAX_DETAIL;
    store.dispatch({ intent, key, value });
  },
  updateTaxCode: ({ value }) => {
    store.dispatch({
      intent: UPDATE_TAX_CODE,
      value,
    });
  },
});

export default taxAndKiwiSaverDispatcher;
