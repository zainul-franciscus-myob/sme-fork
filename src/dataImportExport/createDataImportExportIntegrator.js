import { EXPORT_CHART_OF_ACCOUNTS, IMPORT_CHART_OF_ACCOUNTS, LOAD_DATA_IMPORT_EXPORT } from './DataImportExportIntents';
import { getBusinessId } from '../linkedAccounts/LinkedAccountsSelectors';
import { getExportChartOfAccountsQueryParams, getImportChartOfAccountsPayload, getLoadDataImportExportParams } from './selectors/DataImportExportIntegratorSelectors';

const createDataImportExportIntegrator = (store, integration) => ({
  loadDataImportExport: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const businessId = getBusinessId(state);
    const urlParams = { businessId };
    const params = getLoadDataImportExportParams();

    integration.read({
      intent: LOAD_DATA_IMPORT_EXPORT,
      urlParams,
      params,
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
