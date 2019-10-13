import {
  LOAD_PURCHASE,
  SET_PURCHASE_ERROR_STATE,
  SET_PURCHASE_LOADING_STATE,
} from '../DashboardIntents';

const setPurchaseState = (state, partialPurchaseState) => ({
  ...state,
  purchase: {
    ...state.purchase,
    ...partialPurchaseState,
  },
});

const loadPurchase = (state, action) => setPurchaseState(state, action.purchase);

const setPurchaseLoadingState = (state, { isLoading }) => setPurchaseState(state, { isLoading });

const setPurchaseErrorState = (state, { hasError }) => setPurchaseState(state, { hasError });

export default {
  [LOAD_PURCHASE]: loadPurchase,
  [SET_PURCHASE_LOADING_STATE]: setPurchaseLoadingState,
  [SET_PURCHASE_ERROR_STATE]: setPurchaseErrorState,
};
