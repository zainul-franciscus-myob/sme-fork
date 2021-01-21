import {
  CREATE_RECURRING_SPEND_MONEY,
  DELETE_RECURRING_SPEND_MONEY,
  LOAD_ABN_FROM_CONTACT,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_NEW_RECURRING_SPEND_MONEY,
  LOAD_RECURRING_SPEND_MONEY,
  UPDATE_RECURRING_SPEND_MONEY,
} from './RecurringSpendMoneyIntents';
import {
  getBusinessId,
  getCreateOrUpdateSpendMoneyPayload,
  getIsCreating,
  getLoadAddedAccountUrlParams,
  getLoadContactUrlParams,
  getLoadSpendMoneyRequestUrlParams,
  getRecurringTransactionId,
} from './RecurringSpendMoneySelectors';

const createRecurringSpendMoneyIntegrator = (store, integration) => ({
  loadSpendMoney: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating
      ? LOAD_NEW_RECURRING_SPEND_MONEY
      : LOAD_RECURRING_SPEND_MONEY;
    const urlParams = getLoadSpendMoneyRequestUrlParams(state);

    integration.read({
      intent,
      urlParams,
      onSuccess: onSuccess(intent),
      onFailure,
    });
  },

  createOrUpdateRecurringSpendMoney: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const isCreating = getIsCreating(state);
    const intent = isCreating
      ? CREATE_RECURRING_SPEND_MONEY
      : UPDATE_RECURRING_SPEND_MONEY;
    const content = getCreateOrUpdateSpendMoneyPayload(state);
    const urlParams = {
      businessId: getBusinessId(state),
      recurringTransactionId: isCreating
        ? getRecurringTransactionId(state)
        : undefined,
    };

    integration.write({ intent, urlParams, content, onSuccess, onFailure });
  },

  deleteRecurringSpendMoney: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = DELETE_RECURRING_SPEND_MONEY;
    const urlParams = {
      businessId: getBusinessId(state),
      recurringTransactionId: getRecurringTransactionId(state),
    };

    integration.write({ intent, urlParams, onSuccess, onFailure });
  },

  loadAccountAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_ACCOUNT_AFTER_CREATE;
    const urlParams = getLoadAddedAccountUrlParams(state, id);

    integration.read({ intent, urlParams, onSuccess, onFailure });
  },

  loadAbnFromContact: ({ contactId, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_ABN_FROM_CONTACT;
    const urlParams = getLoadContactUrlParams(state, contactId);

    integration.read({ intent, urlParams, onSuccess, onFailure });
  },
});

export default createRecurringSpendMoneyIntegrator;
