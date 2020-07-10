import {
  LINK_DOCUMENT_TO_BILL,
  LOAD_LINK_BILL,
  SORT_AND_FILTER_BILL_LIST,
} from './LinkBillIntents';
import {
  getBusinessId,
  getDocumentId,
  getFilterOptions,
  getLinkDocumentToBillPayload,
  getOrderBy,
  getSortOrder,
} from './LinkBillSelectors';

const createLinkBillIntegrator = (store, integration) => ({
  loadLinkBill: ({ onSuccess, onFailure }) => {
    const intent = LOAD_LINK_BILL;

    const state = store.getState();
    const businessId = getBusinessId(state);
    const documentId = getDocumentId(state);
    const urlParams = { businessId, documentId };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  sortAndFilterLinkBillList: ({ onSuccess, onFailure }) => {
    const intent = SORT_AND_FILTER_BILL_LIST;

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

  linkDocumentToBill: ({ onSuccess, onFailure }) => {
    const intent = LINK_DOCUMENT_TO_BILL;
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = getLinkDocumentToBillPayload(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createLinkBillIntegrator;
