import {
  CLOSE_TASK,
  CREATE_IN_TRAY_DOCUMENT,
  LOAD_ACCOUNT_BANKING,
  LOAD_DASHBOARD,
  LOAD_DEFAULT_BANKING,
  LOAD_IN_TRAY,
  LOAD_PAYROLL,
  LOAD_PAYROLL_REPORTS,
  LOAD_PURCHASE,
  LOAD_SALES,
  LOAD_TASKS,
  LOAD_TRACKING,
  LOAD_TRACKING_DETAIL,
} from './DashboardIntents';
import { getBusinessId } from './selectors/DashboardSelectors';
import { getLoadBankingParams } from './selectors/DashboardBankingSelectors';
import { getLoadPurchaseParams } from './selectors/DashboardPurchaseSelectors';
import { getLoadSalesParams } from './selectors/DashboardSalesSelectors';
import {
  getLoadTrackingDetailUrlParams,
  getLoadTrackingParams,
  getLoadTrackingUrlParams,
} from './selectors/DashboardTrackingSelectors';

const createDashboardIntegrator = (store, integration) => ({
  loadDashboard: ({ onSuccess, onFailure }) => {
    const intent = LOAD_DASHBOARD;

    const state = store.getState();
    const businessId = getBusinessId(state);

    const urlParams = { businessId };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadSales: ({ onSuccess, onFailure }) => {
    const intent = LOAD_SALES;

    const state = store.getState();
    const businessId = getBusinessId(state);

    const urlParams = { businessId };
    const params = getLoadSalesParams(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  loadPurchase: ({ onSuccess, onFailure }) => {
    const intent = LOAD_PURCHASE;

    const state = store.getState();
    const businessId = getBusinessId(state);

    const urlParams = { businessId };
    const params = getLoadPurchaseParams(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  loadTracking: ({ onSuccess, onFailure }) => {
    const intent = LOAD_TRACKING;

    const state = store.getState();
    const urlParams = getLoadTrackingUrlParams(state);
    const params = getLoadTrackingParams();

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  loadTrackingDetail: ({ onSuccess, onFailure }) => {
    const intent = LOAD_TRACKING_DETAIL;

    const state = store.getState();
    const urlParams = getLoadTrackingDetailUrlParams(state);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadBanking: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const businessId = getBusinessId(state);

    const urlParams = { businessId };
    const params = getLoadBankingParams(state);

    const intent = params.bankFeedAccountId
      ? LOAD_ACCOUNT_BANKING
      : LOAD_DEFAULT_BANKING;

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  loadPayroll: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const businessId = getBusinessId(state);

    const urlParams = { businessId };

    const intent = LOAD_PAYROLL;

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadPayrollReports: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const businessId = getBusinessId(state);

    const urlParams = { businessId };

    const intent = LOAD_PAYROLL_REPORTS;

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadInTray: ({ onSuccess, onFailure }) => {
    const intent = LOAD_IN_TRAY;
    const state = store.getState();
    const businessId = getBusinessId(state);
    const urlParams = { businessId };

    integration.read({
      intent,
      urlParams,
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
      intent: CREATE_IN_TRAY_DOCUMENT,
      contents: entries.map(({ file }) => ({ file })),
      urlParams,
      onProgress,
      onSuccess,
      onFailure,
      onComplete,
    });
  },

  loadTasks: ({ onSuccess, onFailure }) => {
    const intent = LOAD_TASKS;
    const state = store.getState();
    const businessId = getBusinessId(state);

    integration.read({
      intent,
      urlParams: { businessId },
      onSuccess,
      onFailure,
    });
  },

  closeTask: ({ onSuccess, onFailure, closeEvent }) => {
    const urlParams = {
      businessId: getBusinessId(store.getState()),
      closeEvent,
    };

    integration.write({
      intent: CLOSE_TASK,
      urlParams,
      onSuccess,
      onFailure,
      allowParallelRequests: true,
    });
  },
});

export default createDashboardIntegrator;
