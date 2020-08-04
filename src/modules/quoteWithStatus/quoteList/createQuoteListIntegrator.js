import {
  LOAD_QUOTE_LIST,
  LOAD_QUOTE_LIST_NEXT_PAGE,
  SORT_AND_FILTER_QUOTE_LIST,
} from '../QuoteIntents';
import {
  getFilterQuoteListParams,
  getLoadNextPageParams,
  getLoadQuoteListParams,
  getQuoteListUrlParams,
} from './quoteListSelectors';

const createQuoteListIntegrator = (store, integration) => ({
  loadQuoteList: ({ onSuccess, onFailure }) => {
    const intent = LOAD_QUOTE_LIST;

    const state = store.getState();
    const urlParams = getQuoteListUrlParams(state);
    const params = getLoadQuoteListParams(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
  sortAndFilterQuoteList: ({ onSuccess, onFailure }) => {
    const intent = SORT_AND_FILTER_QUOTE_LIST;

    const state = store.getState();
    const urlParams = getQuoteListUrlParams(state);
    const params = getFilterQuoteListParams(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
  loadQuoteListNextPage: ({ onSuccess, onFailure }) => {
    const intent = LOAD_QUOTE_LIST_NEXT_PAGE;

    const state = store.getState();
    const urlParams = getQuoteListUrlParams(state);
    const params = getLoadNextPageParams(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
});

export default createQuoteListIntegrator;
