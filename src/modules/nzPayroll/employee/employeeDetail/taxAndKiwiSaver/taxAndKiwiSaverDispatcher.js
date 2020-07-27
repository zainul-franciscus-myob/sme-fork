import { UPDATE_TAX_DETAIL } from './TaxAndKiwiSaverIntents';

const taxAndKiwiSaverDispatcher = (store) => ({
  updateTaxDetails: ({ key, value }) => {
    const intent = UPDATE_TAX_DETAIL;
    store.dispatch({ intent, key, value });
  },
});

export default taxAndKiwiSaverDispatcher;
