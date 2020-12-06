import {
  CREATE_RECURRING_INVOICE,
  DELETE_RECURRING_INVOICE,
  LOAD_ABN_FROM_CUSTOMER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ACCOUNT_OPTIONS,
  LOAD_CUSTOMER,
  LOAD_ITEM,
  LOAD_NEW_RECURRING_INVOICE,
  LOAD_PAY_DIRECT,
  LOAD_RECURRING_INVOICE,
  UPDATE_RECURRING_INVOICE,
} from './RecurringInvoiceIntents';
import {
  getBusinessId,
  getIsCreating,
  getIsTaxInclusive,
} from './selectors/RecurringInvoiceSelectors';
import {
  getCreateOrUpdateRecurringInvoiceContent,
  getCreateOrUpdateRecurringInvoiceUrlParams,
  getDeleteRecurringInvoiceUrlParams,
  getLoadAbnFromCustomerUrlParams,
  getLoadAddedAccountUrlParams,
  getLoadCustomerUrlParams,
  getLoadPayDirectUrlParams,
  getLoadRecurringInvoiceUrlParams,
} from './selectors/IntegratorSelectors';

const createRecurringInvoiceIntegrator = (store, integration) => ({
  loadRecurringInvoice: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating
      ? LOAD_NEW_RECURRING_INVOICE
      : LOAD_RECURRING_INVOICE;
    const urlParams = getLoadRecurringInvoiceUrlParams(state);

    integration.read({ intent, urlParams, onSuccess, onFailure });
  },

  createOrUpdateRecurringInvoice: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating
      ? CREATE_RECURRING_INVOICE
      : UPDATE_RECURRING_INVOICE;
    const urlParams = getCreateOrUpdateRecurringInvoiceUrlParams(state);
    const content = getCreateOrUpdateRecurringInvoiceContent(state);

    integration.write({ intent, urlParams, content, onSuccess, onFailure });
  },

  deleteRecurringInvoice: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = DELETE_RECURRING_INVOICE;
    const urlParams = getDeleteRecurringInvoiceUrlParams(state);

    integration.write({ intent, urlParams, onSuccess, onFailure });
  },

  loadAccountAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_ACCOUNT_AFTER_CREATE;
    const urlParams = getLoadAddedAccountUrlParams(state, id);

    integration.read({ intent, urlParams, onSuccess, onFailure });
  },

  loadCustomer: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_CUSTOMER;
    const urlParams = getLoadCustomerUrlParams(state);

    integration.read({ intent, urlParams, onSuccess, onFailure });
  },

  loadAbnFromCustomer: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_ABN_FROM_CUSTOMER;
    const urlParams = getLoadAbnFromCustomerUrlParams(state);

    integration.read({ intent, urlParams, onSuccess, onFailure });
  },

  loadAccounts: ({ onSuccess, onFailure, keywords }) => {
    const state = store.getState();
    const intent = LOAD_ACCOUNT_OPTIONS;

    integration.read({
      intent,
      params: {
        keywords,
      },
      urlParams: {
        businessId: getBusinessId(state),
      },
      onSuccess,
      onFailure,
    });
  },

  loadItem: ({ onSuccess, onFailure, itemId }) => {
    const state = store.getState();
    const intent = LOAD_ITEM;
    const businessId = getBusinessId(state);
    const isTaxInclusive = getIsTaxInclusive(state);

    integration.read({
      intent,
      params: {
        isTaxInclusive,
      },
      urlParams: {
        businessId,
        itemId,
      },
      onSuccess,
      onFailure,
    });
  },

  loadPayDirect: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_PAY_DIRECT;
    const urlParams = getLoadPayDirectUrlParams(state);

    integration.read({ intent, urlParams, onSuccess, onFailure });
  },
});

export default createRecurringInvoiceIntegrator;
