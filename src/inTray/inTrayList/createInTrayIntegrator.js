import {
  CREATE_IN_TRAY_DOCUMENT,
  DELETE_IN_TRAY_DOCUMENT,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  GENERATE_IN_TRAY_EMAIL,
  LOAD_IN_TRAY,
  SORT_AND_FILTER_IN_TRAY_LIST,
} from '../InTrayIntents';
import {
  getAppliedFilterOptions,
  getFilterOptions,
  getOrderBy,
  getSortOrder,
} from './selectors/InTrayListSelectors';
import { getBusinessId } from './selectors/InTraySelectors';

const createInTrayIntegrator = (store, integration) => ({
  loadInTray: ({ onSuccess, onFailure }) => {
    const intent = LOAD_IN_TRAY;

    const state = store.getState();
    const businessId = getBusinessId(state);
    const filterOptions = getFilterOptions(state);

    const urlParams = { businessId };
    const params = { ...filterOptions };

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  filterInTrayList: ({ onSuccess, onFailure }) => {
    const intent = SORT_AND_FILTER_IN_TRAY_LIST;

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

  sortInTrayList: ({
    orderBy, sortOrder, onSuccess, onFailure,
  }) => {
    const intent = SORT_AND_FILTER_IN_TRAY_LIST;

    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const filterOptions = getAppliedFilterOptions(state);

    integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder,
        orderBy,
      },
      onSuccess,
      onFailure,
    });
  },

  createInTrayDocuments: ({
    onProgress, onSuccess, onFailure, onComplete, entries,
  }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    integration.writeManyFormData({
      intent: CREATE_IN_TRAY_DOCUMENT,
      contents: entries.map(({ file }) => ({ file })),
      urlParams,
      onProgress,
      onSuccess,
      onFailure,
      onComplete,
    });
  },

  deleteInTrayDocument: ({ onSuccess, onFailure, id }) => {
    const intent = DELETE_IN_TRAY_DOCUMENT;

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

  downloadInTrayDocument: ({ onSuccess, onFailure, id }) => {
    const intent = DOWNLOAD_IN_TRAY_DOCUMENT;

    const state = store.getState();
    const businessId = getBusinessId(state);
    const urlParams = { businessId, documentId: id };

    integration.readFile({
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

export default createInTrayIntegrator;
