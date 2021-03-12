import {
  LOAD_REMITTANCE_ADVICE_LIST,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_REMITTANCE_ADVICE_LIST,
} from './RemittanceAdviceIntents';
import { getBusinessId } from './selectors/remittanceAdviceListSelectors';
import { getQueryParamsForList } from './selectors/remittanceAdviceListIntegrationSelectors';

const createRemittanceAdviceListIntegrator = (store, integration) => ({
  loadRemittanceAdviceList: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const params = getQueryParamsForList(state);

    integration.read({
      intent: LOAD_REMITTANCE_ADVICE_LIST,
      params,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  sortAndFilterRemittanceAdviceList: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const params = getQueryParamsForList(state);

    integration.read({
      intent: SORT_AND_FILTER_REMITTANCE_ADVICE_LIST,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  setTableLoadingState: (isTableLoading) =>
    store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    }),
});

export default createRemittanceAdviceListIntegrator;
