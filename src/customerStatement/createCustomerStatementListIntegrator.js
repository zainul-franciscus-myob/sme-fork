import {
  DOWNLOAD_PDF,
  LOAD_CUSTOMER_STATEMENTS,
  SEND_EMAIL,
  SORT_AND_FILTER_CUSTOMER_STATEMENTS,
} from './CustomerStatementIntents';
import {
  getBusinessId,
  getDownloadPdfQueryParams,
  getQueryParamsForList,
  getSendEmailContent,
} from './selectors/customerStatementListIntegrationSelectors';

const createCustomerStatementListIntegrator = (store, integration) => ({
  loadCustomerStatementList: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const params = getQueryParamsForList(state);

    integration.read({
      intent: LOAD_CUSTOMER_STATEMENTS,
      params,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  sortAndfilterCustomerStatementList: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const params = getQueryParamsForList(state);

    integration.read({
      intent: SORT_AND_FILTER_CUSTOMER_STATEMENTS,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  sendEmail: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const content = getSendEmailContent(state);

    integration.write({
      intent: SEND_EMAIL,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  downloadPdf: ({ onSuccess, onFailure, templateOption }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const params = getDownloadPdfQueryParams(state, templateOption);

    integration.readFile({
      intent: DOWNLOAD_PDF,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
});

export default createCustomerStatementListIntegrator;
