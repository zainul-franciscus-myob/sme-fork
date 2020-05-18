
import { UPDATE_TAX_KIWISAVER_DETAIL } from './TaxAndKiwiSaverIntents';

const taxAndKiwiSaverDispatcher = store => ({
  updateTaxAndKiwisaverDetails: ({ key, value }) => {
    const intent = UPDATE_TAX_KIWISAVER_DETAIL;
    store.dispatch({ intent, key, value });
  },
});

export default taxAndKiwiSaverDispatcher;
