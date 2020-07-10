import { CREATE_JOB_MODAL, LOAD_JOB_MODAL } from '../JobIntents';
import { getBusinessId, getJob } from './JobModalSelectors';

const createJobModalIntegrator = (store, integration) => ({
  loadNewJob: (onSuccess, onFailure) => {
    const intent = LOAD_JOB_MODAL;
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };
    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  createJob: (onSuccess, onFailure) => {
    const intent = CREATE_JOB_MODAL;
    const state = store.getState();
    const content = getJob(state);
    const urlParams = {
      businessId: getBusinessId(state),
    };
    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createJobModalIntegrator;
