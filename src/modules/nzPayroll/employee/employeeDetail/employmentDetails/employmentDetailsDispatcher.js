import * as intents from '../EmployeeDetailNzIntents';

const employmentDetailsDispatcher = (store) => ({
  // Employment
  updateEmploymentDetails: ({ key, value }) => {
    const intent = intents.UPDATE_EMPLOYMENT_DETAIL;
    store.dispatch({ intent, key, value });
  },

  // Tax declaration
  updateTaxDetails: ({ key, value }) => {
    const intent = intents.UPDATE_TAX_DETAIL;
    store.dispatch({ intent, key, value });
  },

  // KiwiSaver
  updateKiwiSaverDetails: ({ key, value }) => {
    const intent = intents.UPDATE_KIWISAVER_DETAIL;
    store.dispatch({ intent, key, value });
  },
});

export default employmentDetailsDispatcher;
