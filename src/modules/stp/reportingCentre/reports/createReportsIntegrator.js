import {
  FILTER_PAY_EVENTS,
  LOAD_EMPLOYEE_YTD_REPORT,
  LOAD_PAY_EVENTS,
  LOAD_PAY_EVENT_DETAILS,
} from './ReportsIntents';
import {
  getBusinessId,
  getFilterPayEventsParams,
  getLoadPayEventDetailsUrlParams,
  getSelectedPayEventId,
} from './ReportsSelector';

const createReportsIntegrator = (store, integration) => ({
  loadPayEvents: ({ onSuccess, onFailure }) => {
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    integration.read({
      intent: LOAD_PAY_EVENTS,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  filterPayEvents: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = getFilterPayEventsParams(state);

    integration.read({
      intent: FILTER_PAY_EVENTS,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  loadPayEventDetails: ({ onSuccess, onFailure }) => {
    const urlParams = getLoadPayEventDetailsUrlParams(store.getState());

    integration.read({
      intent: LOAD_PAY_EVENT_DETAILS,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadEmployeeYtdReport: ({ onSuccess, onFailure }) => {
    const urlParams = {
      businessId: getBusinessId(store.getState()),
      payEventId: getSelectedPayEventId(store.getState()),
    };

    integration.readFile({
      intent: LOAD_EMPLOYEE_YTD_REPORT,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createReportsIntegrator;
