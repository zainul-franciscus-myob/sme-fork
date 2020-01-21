import {
  EXPORT_CHART_OF_ACCOUNTS, IMPORT_CHART_OF_ACCOUNTS, IMPORT_CONTACTS, LOAD_DATA_IMPORT_EXPORT,
} from './DataImportExportIntents';
import { getBusinessId } from '../linkedAccounts/LinkedAccountsSelectors';
import { getExportChartOfAccountsQueryParams, getImportChartOfAccountsPayload, getImportContactsPayload } from './selectors/DataImportExportIntegratorSelectors';

const createDataImportExportIntegrator = (store, integration) => ({
  loadDataImportExport: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const businessId = getBusinessId(state);
    const urlParams = { businessId };

    integration.read({
      intent: LOAD_DATA_IMPORT_EXPORT,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  importChartOfAccounts: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const businessId = getBusinessId(state);
    const urlParams = { businessId };
    const content = getImportChartOfAccountsPayload(state);

    integration.writeFormData({
      intent: IMPORT_CHART_OF_ACCOUNTS,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  importContacts: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const businessId = getBusinessId(state);
    const urlParams = { businessId };
    const content = getImportContactsPayload(state);

    integration.writeFormData({
      intent: IMPORT_CONTACTS,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  exportChartOfAccounts: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const businessId = getBusinessId(state);
    const urlParams = { businessId };
    const params = getExportChartOfAccountsQueryParams(state);

    integration.readFile({
      intent: EXPORT_CHART_OF_ACCOUNTS,
      params,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createDataImportExportIntegrator;
