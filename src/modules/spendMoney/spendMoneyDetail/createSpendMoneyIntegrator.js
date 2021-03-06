import {
  CREATE_SPEND_MONEY,
  DELETE_SPEND_MONEY,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  LINK_IN_TRAY_DOCUMENT,
  LOAD_ABN_FROM_CONTACT,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT,
  LOAD_PREFILL_FROM_RECURRING_SPEND_MONEY,
  LOAD_REFERENCE_ID,
  LOAD_SUPPLIER_EXPENSE_ACCOUNT,
  OPEN_ATTACHMENT,
  PREFILL_DATA_FROM_IN_TRAY,
  REMOVE_ATTACHMENT,
  UPDATE_SPEND_MONEY,
  UPLOAD_ATTACHMENT,
} from '../SpendMoneyIntents';
import {
  getBusinessId,
  getLoadAddedAccountUrlParams,
  getLoadContactDetailUrlParams,
  getLoadContactUrlParams,
  getLoadPrefillFromRecurringSpendMoneyUrlParams,
  getLoadSpendMoneyIntent,
  getLoadSpendMoneyRequestParams,
  getLoadSpendMoneyRequestUrlParams,
  getSpendMoneyForCreatePayload,
  getSpendMoneyForUpdatePayload,
  getSpendMoneyId,
  getSpendMoneyUid,
  isReferenceIdDirty,
} from './spendMoneyDetailSelectors';

const createSpendMoneyIntegrator = (store, integration) => ({
  loadSpendMoney: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = getLoadSpendMoneyIntent(state);
    const urlParams = getLoadSpendMoneyRequestUrlParams(state);
    const params = getLoadSpendMoneyRequestParams(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess: onSuccess(intent),
      onFailure,
    });
  },

  loadNextReferenceId: ({
    onSuccess,
    onFailure,
    accountId,
    updateBankStatementText,
  }) => {
    const state = store.getState();
    if (isReferenceIdDirty(state)) {
      updateBankStatementText();
      return;
    }

    const intent = LOAD_REFERENCE_ID;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const params = { accountId };

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  loadSupplierExpenseAccount: ({ onSuccess, onFailure }) => {
    const urlParams = getLoadContactDetailUrlParams(store.getState());

    integration.read({
      intent: LOAD_SUPPLIER_EXPENSE_ACCOUNT,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  createSpendMoneyEntry: ({ onSuccess, onFailure }) => {
    const intent = CREATE_SPEND_MONEY;
    const state = store.getState();
    const content = getSpendMoneyForCreatePayload(state);
    const urlParams = {
      businessId: getBusinessId(state),
    };

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  updateSpendMoneyEntry: ({ onSuccess, onFailure }) => {
    const intent = UPDATE_SPEND_MONEY;
    const state = store.getState();
    const content = getSpendMoneyForUpdatePayload(state);
    const urlParams = {
      businessId: getBusinessId(state),
      spendMoneyId: getSpendMoneyId(state),
    };

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  deleteSpendMoneyTransaction: ({ onSuccess, onFailure, spendMoneyId }) => {
    integration.write({
      intent: DELETE_SPEND_MONEY,
      urlParams: {
        businessId: getBusinessId(store.getState()),
        spendMoneyId,
      },
      onSuccess,
      onFailure,
    });
  },

  uploadAttachment: ({ onSuccess, onFailure, onProgress, file }) => {
    const state = store.getState();

    integration.writeFormData({
      intent: UPLOAD_ATTACHMENT,
      content: {
        relationshipKey: 'SpendMoneyUID',
        relationshipValue: getSpendMoneyUid(state),
        file,
      },
      urlParams: {
        businessId: getBusinessId(state),
      },
      onSuccess,
      onFailure,
      onProgress,
    });
  },

  removeAttachment: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const id = state.pendingDeleteId;

    integration.write({
      intent: REMOVE_ATTACHMENT,
      allowParallelRequests: true,
      urlParams: {
        businessId: getBusinessId(state),
        documentId: id,
      },
      onSuccess,
      onFailure,
    });
  },

  openAttachment: ({ onSuccess, onFailure, id }) => {
    const state = store.getState();

    integration.read({
      intent: OPEN_ATTACHMENT,
      allowParallelRequests: true,
      urlParams: {
        businessId: getBusinessId(state),
        documentId: id,
      },
      onSuccess,
      onFailure,
    });
  },

  downloadInTrayDocument: ({ onSuccess, onFailure, inTrayDocumentId }) => {
    const intent = DOWNLOAD_IN_TRAY_DOCUMENT;

    const urlParams = {
      businessId: getBusinessId(store.getState()),
      inTrayDocumentId,
    };

    integration.readFile({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  prefillDataFromInTray: ({ onSuccess, onFailure, inTrayDocumentId }) => {
    const intent = PREFILL_DATA_FROM_IN_TRAY;

    const urlParams = {
      businessId: getBusinessId(store.getState()),
      inTrayDocumentId,
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  linkInTrayDocument: ({ onSuccess, onFailure, linkContent }) => {
    const state = store.getState();

    integration.write({
      intent: LINK_IN_TRAY_DOCUMENT,
      content: linkContent,
      urlParams: {
        businessId: getBusinessId(state),
      },
      onSuccess,
      onFailure,
    });
  },

  loadAccountAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_ACCOUNT_AFTER_CREATE;
    const urlParams = getLoadAddedAccountUrlParams(state, id);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadContact: ({ contactId, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_CONTACT;
    const urlParams = getLoadContactUrlParams(state, contactId);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadAbnFromContact: ({ contactId, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_ABN_FROM_CONTACT;
    const urlParams = getLoadContactUrlParams(state, contactId);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadPrefillFromRecurringSpendMoney: ({
    recurringTransactionId,
    onSuccess,
    onFailure,
  }) => {
    const state = store.getState();

    const intent = LOAD_PREFILL_FROM_RECURRING_SPEND_MONEY;
    const urlParams = getLoadPrefillFromRecurringSpendMoneyUrlParams(
      state,
      recurringTransactionId
    );

    integration.read({ intent, urlParams, onSuccess, onFailure });
  },
});

export default createSpendMoneyIntegrator;
