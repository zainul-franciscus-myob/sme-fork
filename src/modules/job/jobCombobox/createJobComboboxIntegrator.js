import {
  LOAD_JOB_COMBOBOX_OPTIONS,
  LOAD_JOB_COMBOBOX_OPTIONS_BY_IDS,
  SEARCH_COMBOBOX_JOB,
} from '../JobIntents';
import {
  getLoadJobOptionByIdContent,
  getLoadJobOptionsParams,
  getLoadJobOptionsUrlParams,
  getSearchJobParams,
} from './JobComboboxSelectors';

const createJobComboboxIntegrator = ({ store, integration }) => ({
  loadJobOptions: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_JOB_COMBOBOX_OPTIONS;
    const urlParams = getLoadJobOptionsUrlParams(state);
    const params = getLoadJobOptionsParams(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
  searchJob: ({ keywords, onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = SEARCH_COMBOBOX_JOB;
    const urlParams = getLoadJobOptionsUrlParams(state);
    const params = getSearchJobParams(keywords);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
  loadJobOptionById: ({ jobId, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_JOB_COMBOBOX_OPTIONS_BY_IDS;
    const urlParams = getLoadJobOptionsUrlParams(state);
    const content = getLoadJobOptionByIdContent(jobId);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
  loadJobOptionsByIds: ({ ids, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_JOB_COMBOBOX_OPTIONS_BY_IDS;
    const urlParams = getLoadJobOptionsUrlParams(state);

    integration.write({
      intent,
      urlParams,
      content: ids,
      onSuccess,
      onFailure,
    });
  },
});

export default createJobComboboxIntegrator;
