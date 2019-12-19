import {
  CREATE_SPEND_MONEY,
  DELETE_SPEND_MONEY,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  GET_CALCULATED_TOTALS,
  LINK_IN_TRAY_DOCUMENT,
  LOAD_NEW_SPEND_MONEY,
  LOAD_REFERENCE_ID,
  LOAD_SPEND_MONEY_DETAIL,
  OPEN_ATTACHMENT,
  PREFILL_DATA_FROM_IN_TRAY,
  REMOVE_ATTACHMENT,
  UPDATE_SPEND_MONEY,
  UPLOAD_ATTACHMENT,
} from '../SpendMoneyIntents';
import {
  getBusinessId,
  getCalculatedTotalsPayload,
  getSpendMoneyForCreatePayload,
  getSpendMoneyForUpdatePayload,
  getSpendMoneyId,
  getSpendMoneyUid,
  isReferenceIdDirty,
} from './spendMoneyDetailSelectors';

const createSpendMoneyIntegrator = (store, integration) => ({
  loadSpendMoney: ({
    onSuccess, onFailure, spendMoneyId, isCreating,
  }) => {
    const intent = isCreating
      ? LOAD_NEW_SPEND_MONEY
      : LOAD_SPEND_MONEY_DETAIL;

    const urlParams = {
      businessId: getBusinessId(store.getState()),
      ...(!isCreating && { spendMoneyId }),
    };

    integration.read({
      intent,
      urlParams,
      onSuccess: onSuccess(intent),
      onFailure,
    });
  },

  loadNextReferenceId: ({ onSuccess, onFailure, accountId }) => {
    const state = store.getState();
    if (isReferenceIdDirty(state)) {
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

  getCalculatedTotals: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = GET_CALCULATED_TOTALS;

    integration.write({
      intent,
      urlParams: { businessId: getBusinessId(state) },
      content: getCalculatedTotalsPayload(state),
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

  uploadAttachment: ({
    onSuccess, onFailure, onProgress, file,
  }) => {
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

    integration.write({
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

  downloadInTrayDocument: ({
    onSuccess, onFailure, inTrayDocumentId,
  }) => {
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

  prefillDataFromInTray: ({
    onSuccess, onFailure, inTrayDocumentId,
  }) => {
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

  linkInTrayDocument: ({
    onSuccess, onFailure, linkContent,
  }) => {
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
});

export default createSpendMoneyIntegrator;
