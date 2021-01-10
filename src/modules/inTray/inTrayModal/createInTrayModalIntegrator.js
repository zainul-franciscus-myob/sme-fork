import {
  CREATE_IN_TRAY_MODAL_DOCUMENT,
  GENERATE_IN_TRAY_EMAIL,
  LOAD_IN_TRAY_MODAL,
  VIEW_IN_TRAY_MODAL_DOCUMENT,
} from '../InTrayIntents';
import {
  getBusinessId,
  getFilterOptions,
  getOrderBy,
  getSortOrder,
} from './selectors/InTrayModalSelectors';

const createInTrayModalIntegrator = (store, integration) => ({
  loadInTrayModal: ({ onSuccess, onFailure }) => {
    const intent = LOAD_IN_TRAY_MODAL;
    const state = store.getState();
    const businessId = getBusinessId(state);
    const filterOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);
    const urlParams = { businessId };
    const params = {
      ...filterOptions,
      sortOrder,
      orderBy,
    };

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  createInTrayDocuments: ({
    onProgress,
    onSuccess,
    onFailure,
    onComplete,
    entries,
  }) => {
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    integration.writeManyFormData({
      intent: CREATE_IN_TRAY_MODAL_DOCUMENT,
      contents: entries.map(({ file }) => ({ file })),
      urlParams,
      onProgress,
      onSuccess,
      onFailure,
      onComplete,
    });
  },

  viewInTrayDocument: ({ onSuccess, onFailure, id }) => {
    const intent = VIEW_IN_TRAY_MODAL_DOCUMENT;
    const state = store.getState();
    const businessId = getBusinessId(state);
    const urlParams = { businessId, documentId: id };

    integration.write({
      intent,
      allowParallelRequests: true,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  generateNewEmail: ({ onSuccess, onFailure }) => {
    const intent = GENERATE_IN_TRAY_EMAIL;
    const businessId = getBusinessId(store.getState());

    integration.write({
      intent,
      urlParams: { businessId },
      onSuccess,
      onFailure,
    });
  },
});

export default createInTrayModalIntegrator;
