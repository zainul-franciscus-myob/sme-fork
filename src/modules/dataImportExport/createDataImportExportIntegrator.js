import {
  EXPORT_CHART_OF_ACCOUNTS,
  EXPORT_COMPANY_FILE,
  EXPORT_COMPANY_FILE_RESULT,
  IMPORT_CHART_OF_ACCOUNTS,
  IMPORT_CONTACTS,
  IMPORT_EMPLOYEES,
  IMPORT_GENERAL_JOURNALS,
  IMPORT_ITEMS,
  IMPORT_TIMESHEETS,
  IMPORT_TRANSACTION_JOURNALS,
  LOAD_DATA_IMPORT_EXPORT,
} from './DataImportExportIntents';
import { getBusinessId } from '../linkedAccounts/LinkedAccountsSelectors';
import {
  getExportChartOfAccountsQueryParams,
  getExportCompanyFileQueryParams,
  getImportChartOfAccountsPayload,
  getImportContactsPayload,
  getImportEmployeesPayload,
  getImportGeneralJournalsPayload,
  getImportItemsPayload,
  getImportTimesheetsPayload,
  getImportTransactionJournalsPayload,
} from './selectors/DataImportExportIntegratorSelectors';

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

  importEmployees: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const businessId = getBusinessId(state);
    const urlParams = { businessId };
    const content = getImportEmployeesPayload(state);

    integration.writeFormData({
      intent: IMPORT_EMPLOYEES,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  importItems: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const businessId = getBusinessId(state);
    const urlParams = { businessId };
    const content = getImportItemsPayload(state);

    integration.writeFormData({
      intent: IMPORT_ITEMS,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  importGeneralJournals: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const businessId = getBusinessId(state);
    const urlParams = { businessId };
    const content = getImportGeneralJournalsPayload(state);

    integration.writeFormData({
      intent: IMPORT_GENERAL_JOURNALS,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  importTransactionJournals: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const businessId = getBusinessId(state);
    const urlParams = { businessId };
    const content = getImportTransactionJournalsPayload(state);

    integration.writeFormData({
      intent: IMPORT_TRANSACTION_JOURNALS,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  importTimesheets: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const businessId = getBusinessId(state);
    const urlParams = { businessId };
    const content = getImportTimesheetsPayload(state);

    integration.writeFormData({
      intent: IMPORT_TIMESHEETS,
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

  exportCompanyFile: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const businessId = getBusinessId(state);
    const urlParams = { businessId };
    const params = getExportCompanyFileQueryParams(state);

    integration.write({
      intent: EXPORT_COMPANY_FILE,
      params,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  exportCompanyFileResult: ({ jobId, onSuccess, onFailure }) => {
    const state = store.getState();
    const businessId = getBusinessId(state);
    const urlParams = { businessId, jobId };

    integration.write({
      intent: EXPORT_COMPANY_FILE_RESULT,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createDataImportExportIntegrator;
