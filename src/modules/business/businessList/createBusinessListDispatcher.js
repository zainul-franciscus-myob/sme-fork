import {
  LOAD_BUSINESS_LIST,
  SET_LOADING_STATE,
  UPDATE_KEYWORD,
  UPDATE_SORT_ORDER,
} from '../BusinessIntents';
import { RESET_STATE } from '../../../SystemIntents';

const createBusinessListDispatcher = store => ({
  loadBusinessList: businesses => store.dispatch({
    intent: LOAD_BUSINESS_LIST,
    businesses,
  }),
  setLoadingState: loadingState => store.dispatch({
    intent: SET_LOADING_STATE,
    loadingState,
  }),
  updateKeyword: keyword => store.dispatch({
    intent: UPDATE_KEYWORD,
    keyword,
  }),
  updateSortOrder: sortOrder => store.dispatch({
    intent: UPDATE_SORT_ORDER,
    sortOrder,
  }),
  resetState: () => store.dispatch({
    intent: RESET_STATE,
  }),
});

export default createBusinessListDispatcher;
