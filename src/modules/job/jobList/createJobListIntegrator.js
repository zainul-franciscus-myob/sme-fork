import { FILTER_JOB_LIST, LOAD_JOB_LIST } from '../JobIntents';
import {
  getFilterJobListParams,
  getJobListUrlParams,
} from './jobListSelector';

const createJobListIntegrator = (store, integration) => ({
  loadJobList: ({ onSuccess, onFailure }) => {
    const intent = LOAD_JOB_LIST;

    const state = store.getState();
    const urlParams = getJobListUrlParams(state);
    const params = getFilterJobListParams(state);

    integration.read({
      intent, urlParams, params, onSuccess, onFailure,
    });
  },
  filterJobList: ({ onSuccess, onFailure }) => {
    const intent = FILTER_JOB_LIST;

    const state = store.getState();
    const urlParams = getJobListUrlParams(state);
    const params = getFilterJobListParams(state);

    integration.read({
      intent, urlParams, params, onSuccess, onFailure,
    });
  },
});

export default createJobListIntegrator;
