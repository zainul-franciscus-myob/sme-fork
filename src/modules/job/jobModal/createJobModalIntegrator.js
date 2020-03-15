import { CREATE_JOB_MODAL, LOAD_JOB_MODAL } from '../JobIntents';
import {
  getCreateJobModalUrlParams,
  getJob,
  getLoadNewJobModalQueryParams,
  getLoadNewJobModalUrlParams,
} from './JobModalSelectors';

const createJobModalIntegrator = (store, integration) => ({
  loadJobModal: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_JOB_MODAL;
    const urlParams = getLoadNewJobModalUrlParams(state);
    const params = getLoadNewJobModalQueryParams(state);

    integration.read({
      intent, urlParams, params, onSuccess, onFailure,
    });
  },

  createJobModal: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = CREATE_JOB_MODAL;
    const urlParams = getCreateJobModalUrlParams(state);
    const content = getJob(state);

    integration.write({
      intent, urlParams, content, onSuccess, onFailure,
    });
  },
});

export default createJobModalIntegrator;
