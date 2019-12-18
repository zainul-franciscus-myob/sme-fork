import {
  LOAD_TRACKING,
  LOAD_TRACKING_DETAIL,
  SET_TRACKING_DETAIL_LOADING_STATE,
  SET_TRACKING_ERROR_STATE,
  SET_TRACKING_LOADING_STATE,
  SET_TRACKING_OPTIONS,
} from '../DashboardIntents';

const setTrackingState = (state, partialTrackingState) => ({
  ...state,
  tracking: {
    ...state.tracking,
    ...partialTrackingState,
  },
});

const loadTracking = (state, { tracking }) => setTrackingState(
  state, tracking,
);

const loadTrackingDetail = (state, {
  isEmpty, incomeAmount, expenseAmount, profitAmount, chart,
}) => setTrackingState(
  state, {
    isEmpty, incomeAmount, expenseAmount, profitAmount, chart,
  },
);

const setTrackingLoadingState = (state, { isLoading }) => setTrackingState(
  state, { isLoading },
);

const setTrackingDetailLoadingState = (state, { isDetailLoading }) => setTrackingState(
  state, { isDetailLoading },
);

const setTrackingErrorState = (state, { hasError }) => setTrackingState(
  state, { hasError },
);

const setTrackingOptions = (state, { key, value }) => setTrackingState(
  state, { [key]: value },
);

export default {
  [LOAD_TRACKING]: loadTracking,
  [LOAD_TRACKING_DETAIL]: loadTrackingDetail,
  [SET_TRACKING_LOADING_STATE]: setTrackingLoadingState,
  [SET_TRACKING_DETAIL_LOADING_STATE]: setTrackingDetailLoadingState,
  [SET_TRACKING_ERROR_STATE]: setTrackingErrorState,
  [SET_TRACKING_OPTIONS]: setTrackingOptions,
};
