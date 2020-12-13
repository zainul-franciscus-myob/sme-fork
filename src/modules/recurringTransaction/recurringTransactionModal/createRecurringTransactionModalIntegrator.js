import {
  CREATE_RECURRING_TRANSACTION,
  LOAD_NEW_RECURRING_TRANSACTION,
} from './RecurringTransactionModalIntents';
import {
  getCreateRecurringTransactionContent,
  getCreateRecurringTransactionUrlParams,
  getLoadNewRecurringTransactionUrlParams,
} from './RecurringTransactionModalSelectors';

const createRecurringTransactionModalIntegrator = (store, integration) => ({
  loadNewRecurringTransaction: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_NEW_RECURRING_TRANSACTION;
    const urlParams = getLoadNewRecurringTransactionUrlParams(state);

    integration.read({ intent, urlParams, onSuccess, onFailure });
  },
  createRecurringTransaction: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = CREATE_RECURRING_TRANSACTION;
    const urlParams = getCreateRecurringTransactionUrlParams(state);
    const content = getCreateRecurringTransactionContent(state);

    integration.write({ intent, urlParams, content, onSuccess, onFailure });
  },
});

export default createRecurringTransactionModalIntegrator;
