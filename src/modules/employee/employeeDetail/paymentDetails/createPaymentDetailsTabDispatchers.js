import { UPDATE_BANK_ACCOUNT_DETAILS, UPDATE_PAYMENT_DETAILS } from '../../EmployeeIntents';
import createEmployeeDetailDispatcher from '../createEmployeeDetailDispatcher';

const createPaymentDetailsTabDispatchers = store => ({
  ...createEmployeeDetailDispatcher(store),

  updatePaymentDetails: ({ key, value }) => {
    const intent = UPDATE_PAYMENT_DETAILS;
    store.dispatch({ intent, key, value });
  },

  updateBankAccountDetails: ({ key, value, index }) => {
    const intent = UPDATE_BANK_ACCOUNT_DETAILS;
    store.dispatch({
      intent,
      key,
      value,
      index,
    });
  },
});

export default createPaymentDetailsTabDispatchers;
