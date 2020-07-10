import {
  CREATE_JOB,
  DELETE_JOB,
  LOAD_CUSTOMER_AFTER_CREATE,
  LOAD_JOB_DETAIL,
  LOAD_NEW_JOB,
  UPDATE_JOB,
} from '../JobIntents';
import {
  getBusinessId,
  getJobDetails,
  getJobId,
  getLoadAddedCustomerUrlParams,
  getRegion,
} from './jobDetailSelectors';

const createJobDetailIntegrator = (store, integration) => ({
  loadNewJob: ({ onSuccess, onFailure }) => {
    const urlParams = {
      businessId: getBusinessId(store.getState()),
      region: getRegion(store.getState()),
    };

    integration.read({
      intent: LOAD_NEW_JOB,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadJobDetail: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
      jobId: getJobId(state),
    };

    integration.read({
      intent: LOAD_JOB_DETAIL,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  deleteJob: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
      jobId: getJobId(state),
    };

    integration.read({
      intent: DELETE_JOB,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  updateJob: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const content = getJobDetails(state);
    const urlParams = {
      businessId: getBusinessId(state),
      jobId: getJobId(state),
    };
    integration.write({
      intent: UPDATE_JOB,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  createJob: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const content = getJobDetails(state);
    const urlParams = {
      businessId: getBusinessId(state),
    };
    integration.write({
      intent: CREATE_JOB,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  loadCustomerAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_CUSTOMER_AFTER_CREATE;
    const urlParams = getLoadAddedCustomerUrlParams(state, id);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createJobDetailIntegrator;
