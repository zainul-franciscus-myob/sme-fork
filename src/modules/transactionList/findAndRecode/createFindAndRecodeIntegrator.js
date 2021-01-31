import {
  LOAD_FIND_AND_RECODE_LIST,
  LOAD_FIND_AND_RECODE_LIST_NEXT_PAGE,
  RECODE,
  SORT_AND_FILTER_FIND_AND_RECODE_LIST,
} from './FindAndRecodeIntents';
import {
  getLoadNextPageParams,
  getRecodeItemContent,
  getSortAndFilterParams,
  getUrlParams,
} from './findAndRecodeSelectors';

const createFindAndRecodeIntegrator = (store, integration) => ({
  loadFindAndRecodeList: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.read({
      intent: LOAD_FIND_AND_RECODE_LIST,
      urlParams: getUrlParams(state),
      params: getSortAndFilterParams(state),
      onSuccess,
      onFailure,
    });
  },

  sortAndFilterFindAndRecodeList: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.read({
      intent: SORT_AND_FILTER_FIND_AND_RECODE_LIST,
      urlParams: getUrlParams(state),
      params: getSortAndFilterParams(state),
      onSuccess,
      onFailure,
    });
  },

  loadFindAndRecodeListNextPage: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.read({
      intent: LOAD_FIND_AND_RECODE_LIST_NEXT_PAGE,
      urlParams: getUrlParams(state),
      params: getLoadNextPageParams(state),
      onSuccess,
      onFailure,
    });
  },

  recodeItem: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: RECODE,
      urlParams: getUrlParams(state),
      content: getRecodeItemContent(id)(state),
      onSuccess,
      onFailure,
      allowParallelRequests: true,
    });
  },
});

export default createFindAndRecodeIntegrator;
