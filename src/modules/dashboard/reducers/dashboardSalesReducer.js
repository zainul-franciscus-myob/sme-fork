import {
  LOAD_SALES,
  SET_SALES_ERROR_STATE,
  SET_SALES_LOADING_STATE,
} from '../DashboardIntents';

const setSalesState = (state, partialSalesState) => ({
  ...state,
  sales: {
    ...state.sales,
    ...partialSalesState,
  },
});

const loadSales = (state, action) => setSalesState(state, action.sales);

const setSalesLoadingState = (state, { isLoading }) =>
  setSalesState(state, { isLoading });

const setSalesErrorState = (state, { hasError }) =>
  setSalesState(state, { hasError });

export default {
  [LOAD_SALES]: loadSales,
  [SET_SALES_LOADING_STATE]: setSalesLoadingState,
  [SET_SALES_ERROR_STATE]: setSalesErrorState,
};
