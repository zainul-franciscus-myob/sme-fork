import {
  CREATE_RECURRING_BILL,
  DELETE_RECURRING_BILL,
  LOAD_ABN_FROM_SUPPLIER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ITEM,
  LOAD_NEW_RECURRING_BILL,
  LOAD_RECURRING_BILL,
  LOAD_SUPPLIER,
  UPDATE_RECURRING_BILL,
} from './RecurringBillIntents';
import {
  getCreateOrUpdateRecurringBillContent,
  getCreateOrUpdateRecurringBillUrlParams,
  getDeleteRecurringBillUrlParams,
  getLoadAbnFromSupplierUrlParams,
  getLoadAccountUrlParams,
  getLoadItemParams,
  getLoadItemQueryParams,
  getLoadRecurringBillUrlParams,
  getLoadSupplierUrlParams,
} from './selectors/RecurringBillIntegratorSelectors';
import { getIsCreating } from './selectors/RecurringBillSelectors';

const createRecurringBillIntegrator = (store, integration) => ({
  loadRecurringBill: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating ? LOAD_NEW_RECURRING_BILL : LOAD_RECURRING_BILL;
    const urlParams = getLoadRecurringBillUrlParams(state);

    integration.read({ intent, urlParams, onSuccess, onFailure });
  },

  createOrUpdateRecurringBill: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating ? CREATE_RECURRING_BILL : UPDATE_RECURRING_BILL;
    const urlParams = getCreateOrUpdateRecurringBillUrlParams(state);
    const content = getCreateOrUpdateRecurringBillContent(state);

    integration.write({ intent, content, urlParams, onSuccess, onFailure });
  },

  deleteRecurringBill: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = DELETE_RECURRING_BILL;
    const urlParams = getDeleteRecurringBillUrlParams(state);

    integration.write({ intent, urlParams, onSuccess, onFailure });
  },

  loadSupplier: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_SUPPLIER;
    const urlParams = getLoadSupplierUrlParams(state);

    integration.read({ intent, urlParams, onSuccess, onFailure });
  },

  loadAbnFromSupplier: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_ABN_FROM_SUPPLIER;
    const urlParams = getLoadAbnFromSupplierUrlParams(state);

    integration.read({ intent, urlParams, onSuccess, onFailure });
  },

  loadItem: ({ itemId, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_ITEM;
    const urlParams = getLoadItemParams(state, itemId);
    const params = getLoadItemQueryParams(state);

    integration.read({ intent, urlParams, params, onSuccess, onFailure });
  },

  loadAccountAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_ACCOUNT_AFTER_CREATE;
    const urlParams = getLoadAccountUrlParams(state, id);

    integration.read({ intent, urlParams, onSuccess, onFailure });
  },
});

export default createRecurringBillIntegrator;
